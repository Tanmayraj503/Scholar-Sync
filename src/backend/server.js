/**
 * server.js  –  YouTube + Gemini topic explorer
 *
 * POST /api/analyze
 *   body: { topic: string }
 *   returns: {
 *     videos: {
 *       mostRelevant:     Video[],   // blended relevance + view score
 *       mostLiked:        Video[],
 *       shortestDuration: Video[],
 *     },
 *     summary: string,
 *     hasVideos: boolean,
 *   }
 *
 * Video shape:
 *   { videoId, title, channelTitle, publishedAt, viewCount, likeCount, duration, thumbnail }
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GEMINI_API_KEY  = process.env.GEMINI_API_KEY;

// ─── YouTube helpers ─────────────────────────────────────────────────────────

async function searchYouTube({ topic, order, maxResults = 20 }) {
  const params = new URLSearchParams({
    part: "snippet",
    q: topic,
    type: "video",
    order,
    maxResults,
    key: YOUTUBE_API_KEY,
    videoEmbeddable: "true",
    relevanceLanguage: "en",
  });

  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`YouTube search error: ${JSON.stringify(err)}`);
  }
  const data = await res.json();
  console.log(`[YouTube] order=${order} → ${data.items?.length ?? 0} results`);
  return data;
}

async function fetchVideoDetails(videoIds) {
  if (!videoIds.length) return [];

  const BATCH_SIZE = 50;
  const batches = [];
  for (let i = 0; i < videoIds.length; i += BATCH_SIZE) {
    batches.push(videoIds.slice(i, i + BATCH_SIZE));
  }

  const results = await Promise.all(batches.map(async (batch) => {
    const params = new URLSearchParams({
      part: "contentDetails,statistics,snippet",
      id: batch.join(","),
      key: YOUTUBE_API_KEY,
    });
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(`YouTube videos error: ${JSON.stringify(err)}`);
    }
    const data = await res.json();
    return data.items || [];
  }));

  return results.flat();
}

function isoToSeconds(iso) {
  if (!iso) return Infinity;
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return Infinity;
  return (parseInt(m[1]) || 0) * 3600 +
         (parseInt(m[2]) || 0) * 60 +
         (parseInt(m[3]) || 0);
}

function toVideo(item) {
  const { id, snippet = {}, contentDetails = {}, statistics = {} } = item;
  const videoId = typeof id === "string" ? id : id?.videoId;
  return {
    videoId,
    title:        snippet.title          || "Untitled",
    channelTitle: snippet.channelTitle   || "Unknown",
    publishedAt:  snippet.publishedAt    || null,
    viewCount:    statistics.viewCount   || "0",
    likeCount:    statistics.likeCount   || "0",
    duration:     contentDetails.duration || null,
    thumbnail:    snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || null,
  };
}


function buildRelevanceViewScore(videos, relevanceOrderIds) {
  const n = relevanceOrderIds.length;

  // Build a rank map: videoId → 0-based position in relevance results
  const rankMap = {};
  relevanceOrderIds.forEach((id, i) => { rankMap[id] = i; });

  // Compute log view counts
  const logViews = videos.map(v => Math.log10(Math.max(parseInt(v.viewCount) || 1, 1)));
  const maxLog = Math.max(...logViews, 1);

  return videos.map((v, idx) => {
    const rank          = rankMap[v.videoId] ?? n;           // missing = worst rank
    const relevanceScore = 1 - rank / n;                     // 1 = rank 0, 0 = rank n
    const viewScore      = logViews[idx] / maxLog;           // 0 → 1

    const blended = 0.55 * relevanceScore + 0.45 * viewScore;
    return { ...v, _score: blended };
  });
}

// ─── Gemini helper ────────────────────────────────────────────────────────────

const GEMINI_MODELS = [
  { name: "gemini-2.5-flash",      version: "v1beta" },  // primary — free tier, stable
  { name: "gemini-2.5-flash-lite", version: "v1beta" },  // fallback — fastest & cheapest 2.5
];

const GEMINI_PROMPT = (topic) =>
  `Write a concise, beginner-friendly summary of the topic: "${topic}".

Rules you must follow:
- Between 150 and 250 words — no more, no less.
- You MUST finish every sentence you start. Never stop mid-sentence.
- End on a complete, properly punctuated sentence.
- Use plain paragraphs only — no bullet points, no headers, no markdown.
- Cover: what it is, why it matters, and 2-3 key things a beginner should know.`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callGemini(model, version, topic, retries = 1) {
  const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [{ parts: [{ text: GEMINI_PROMPT(topic) }] }],
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.5,
      thinkingConfig: { thinkingBudget: 0 },
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const status  = data?.error?.status  || res.status;
    const message = data?.error?.message || "Unknown error";

    if (status === "RESOURCE_EXHAUSTED" && retries > 0) {
      const delayMatch = message.match(/retry in ([\d.]+)s/i);
      const waitMs = delayMatch ? Math.ceil(parseFloat(delayMatch[1])) * 1000 : 30000;
      console.warn(`[Gemini] ⏳ Rate limited on "${model}". Retrying in ${waitMs / 1000}s...`);
      await sleep(waitMs);
      return callGemini(model, version, topic, retries - 1);
    }

    console.error(`[Gemini] ❌ "${model}" (${version}) — ${status}: ${message}`);
    return null;
  }

  const candidate   = data?.candidates?.[0];
  const finishReason = candidate?.finishReason;

  // Collect all text parts (2.5-flash returns a thinking block + text block)
  const parts = candidate?.content?.parts || [];
  let text = parts.map((p) => p.text || "").join("").trim();

  if (!text) {
    console.warn(`[Gemini] ⚠️  "${model}" returned empty text (finishReason: ${finishReason})`);
    return null;
  }

  // If the model was cut off mid-sentence (MAX_TOKENS), trim to the last complete sentence
  if (finishReason === "MAX_TOKENS") {
    console.warn(`[Gemini] ⚠️  "${model}" hit token limit — trimming to last complete sentence`);
    const lastPeriod = Math.max(
      text.lastIndexOf(". "),
      text.lastIndexOf("! "),
      text.lastIndexOf("? "),
      text.lastIndexOf(".\n"),
    );
    if (lastPeriod > text.length * 0.5) {
      text = text.slice(0, lastPeriod + 1).trim();
    }
  }

  console.log(`[Gemini] ✅ "${model}" — ${text.length} chars, finishReason: ${finishReason}`);
  return text;
}

async function getGeminiSummary(topic) {
  if (!GEMINI_API_KEY) {
    console.error("[Gemini] ❌ GEMINI_API_KEY is not set in .env");
    return "Summary unavailable — API key missing.";
  }

  for (const { name, version } of GEMINI_MODELS) {
    const result = await callGemini(name, version, topic);
    if (result) return result;
  }

  console.error("[Gemini] ❌ All models failed.");
  return "Summary unavailable at the moment.";
}

// ─── route ───────────────────────────────────────────────────────────────────

app.post("/api/analyze", async (req, res) => {
  const { topic } = req.body;

  if (!topic || !topic.trim()) {
    return res.status(400).json({ error: "Topic is required." });
  }
  if (!YOUTUBE_API_KEY) return res.status(500).json({ error: "YOUTUBE_API_KEY not set." });
  if (!GEMINI_API_KEY)  return res.status(500).json({ error: "GEMINI_API_KEY not set."  });

  try {
    const t = topic.trim();
    console.log(`\n[Search] Topic: "${t}"`);

    // ── 1. Three parallel YouTube searches ────────────────────────────────────
    const [relevanceSearch, ratingSearch, viewedSearch] = await Promise.all([
      searchYouTube({ topic: t, order: "relevance" }),
      searchYouTube({ topic: t, order: "rating"    }),
      searchYouTube({ topic: t, order: "viewCount" }),
    ]);

    // ── 2. Deduplicate across all three searches ───────────────────────────────
    const seen     = new Set();
    const allItems = [];

    // Keep relevance results first so their rank order is preserved
    const addItems = (searchResult) => {
      for (const item of searchResult.items || []) {
        const id = item.id?.videoId;
        if (id && !seen.has(id)) {
          seen.add(id);
          allItems.push({ ...item, id });
        }
      }
    };
    addItems(relevanceSearch);
    addItems(ratingSearch);
    addItems(viewedSearch);

    // ── 3. Fetch full details for all unique IDs ───────────────────────────────
    const allIds      = allItems.map((i) => (typeof i.id === "string" ? i.id : i.id?.videoId));
    const detailItems = await fetchVideoDetails(allIds);

    const detailMap = {};
    for (const d of detailItems) detailMap[d.id] = d;

    const videos = allIds
      .filter((id) => detailMap[id])
      .map((id) => toVideo(detailMap[id]));

    const hasVideos = videos.length > 0;

    // ── 4. Build three NON-OVERLAPPING categories ──────────────────────────────
    const usedIds = new Set();
    const pickTop = (sorted, n = 3) => {
      const picks = [];
      for (const v of sorted) {
        if (!usedIds.has(v.videoId) && picks.length < n) {
          usedIds.add(v.videoId);
          picks.push(v);
        }
      }
      return picks;
    };

    // Relevance order = the order YouTube's relevance search returned them
    const relevanceOrderIds = (relevanceSearch.items || []).map(i => i.id?.videoId).filter(Boolean);

    // mostRelevant: blended relevance + view score
    const scored      = buildRelevanceViewScore(videos, relevanceOrderIds);
    const mostRelevant = pickTop([...scored].sort((a, b) => b._score - a._score))
                          .map(({ _score, ...v }) => v);   // strip internal score field

    // longestDuration: longest video not already claimed
    const longestDuration = pickTop(
      [...videos].sort((a, b) => isoToSeconds(b.duration) - isoToSeconds(a.duration))
    );

    // shortestDuration: shortest video not already claimed
    const shortestDuration = pickTop(
      [...videos].sort((a, b) => isoToSeconds(a.duration) - isoToSeconds(b.duration))
    );

    // ── 5. Gemini summary ──────────────────────────────────────────────────────
    const summary = await getGeminiSummary(t);

    return res.json({
      videos: { mostRelevant, longestDuration, shortestDuration },
      summary,
      hasVideos,
    });

  } catch (err) {
    console.error("Analyze error:", err);
    return res.status(500).json({ error: err.message || "Internal server error." });
  }
});



app.get("/api/test-gemini", async (req, res) => {
  const key = GEMINI_API_KEY;
  if (!key) return res.json({ ok: false, reason: "GEMINI_API_KEY is not set in your .env file" });

  const results = [];
  for (const { name, version } of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/${version}/models/${name}:generateContent?key=${key}`;
    try {
      const r    = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Say hello in one sentence." }] }] }),
      });
      const data = await r.json();
      if (!r.ok) {
        results.push({ model: name, ok: false, status: r.status, error: data?.error?.status, message: data?.error?.message });
      } else {
        const parts = data?.candidates?.[0]?.content?.parts || [];
        const text  = parts.map(p => p.text || "").join("").trim();
        results.push({ model: name, ok: true, response: text });
      }
    } catch (e) {
      results.push({ model: name, ok: false, message: e.message });
    }
  }

  return res.json({ keyProvided: !!key, keyPrefix: key.slice(0, 8) + "...", results });
});

// ─── start ───────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`);
});