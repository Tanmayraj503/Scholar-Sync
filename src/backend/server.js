/**
 * server.js  –  YouTube + Gemini topic explorer
 *
 * POST /api/analyze
 *   body: { topic: string }
 *   returns: {
 *     videos: {
 *       mostViewed:       Video[],
 *       mostLiked:        Video[],
 *       shortestDuration: Video[],
 *     },
 *     summary: string,
 *     hasVideos: boolean,
 *   }
 *
 * Video shape:
 *   { videoId, title, channelTitle, publishedAt, viewCount, duration, thumbnail }
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

/**
 * Extract the core keywords from a topic for relevance filtering.
 * e.g. "node.js tutorial for beginners" -> ["node", "nodejs", "node.js", "tutorial", "beginners"]
 */
function extractKeywords(topic) {
  const stopWords = new Set(["for", "the", "a", "an", "in", "of", "to", "and", "or", "how", "what", "is", "with", "using"]);
  const raw = topic.toLowerCase().replace(/[^a-z0-9.\s]/g, " ").split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));
  // also add dot-stripped variants so "node.js" matches "nodejs" and vice-versa
  const extras = raw.flatMap(w => [w.replace(/\./g, ""), w.replace(/\./g, "js")]).filter(w => w.length > 1);
  return [...new Set([...raw, ...extras])];
}

/**
 * Return true if the video title/description contains at least one keyword from the topic.
 * This filters out completely unrelated results that YouTube sometimes returns.
 */
function isRelevant(item, keywords) {
  if (!keywords.length) return true;
  const haystack = [
    item.snippet?.title || "",
    item.snippet?.description || "",
    item.snippet?.channelTitle || "",
  ].join(" ").toLowerCase();
  return keywords.some(kw => haystack.includes(kw));
}

/**
 * Search YouTube for a topic with a given sort order, then filter by keyword relevance.
 */
async function searchYouTube({ topic, keywords, order, maxResults = 20 }) {
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

  // Filter results to only include videos whose title/description contains a keyword
  const filtered = (data.items || []).filter(item => isRelevant(item, keywords));
  console.log(`[YouTube] order=${order} → ${data.items?.length ?? 0} results, ${filtered.length} after keyword filter`);
  return { ...data, items: filtered };
}

/**
 * Fetch content-details (duration) and statistics (viewCount) for a list of video IDs.
 */
async function fetchVideoDetails(videoIds) {
  if (!videoIds.length) return [];

  const params = new URLSearchParams({
    part: "contentDetails,statistics,snippet",
    id: videoIds.join(","),
    key: YOUTUBE_API_KEY,
  });

  const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`YouTube videos error: ${JSON.stringify(err)}`);
  }
  const data = await res.json();
  return data.items || [];
}

/**
 * Parse ISO 8601 duration (PT#H#M#S) to total seconds.
 */
function isoToSeconds(iso) {
  if (!iso) return Infinity;
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return Infinity;
  return (parseInt(m[1]) || 0) * 3600 +
         (parseInt(m[2]) || 0) * 60 +
         (parseInt(m[3]) || 0);
}

/**
 * Convert a raw YouTube API item → our Video shape.
 */
function toVideo(item) {
  const { id, snippet = {}, contentDetails = {}, statistics = {} } = item;
  const videoId = typeof id === "string" ? id : id?.videoId;
  return {
    videoId,
    title:        snippet.title         || "Untitled",
    channelTitle: snippet.channelTitle  || "Unknown",
    publishedAt:  snippet.publishedAt   || null,
    viewCount:    statistics.viewCount  || "0",
    likeCount:    statistics.likeCount   || "0",
    duration:     contentDetails.duration || null,
    thumbnail:    snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || null,
  };
}

// ─── Gemini helper ────────────────────────────────────────────────────────────

// Try these models in order until one works
const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

const GEMINI_PROMPT = (topic) =>
  `Give a concise, beginner-friendly summary of the topic: "${topic}". Cover what it is, why it matters, and 2-3 key things a learner should know. Keep it under 200 words. Use plain paragraphs, no markdown headers or bullet points.`;

async function callGemini(model, topic) {
  // gemini-2.5-flash uses v1; older models use v1beta
  const apiVersion = model.startsWith("gemini-2.5") ? "v1" : "v1beta";
  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [{ parts: [{ text: GEMINI_PROMPT(topic) }] }],
    generationConfig: { maxOutputTokens: 1024, temperature: 0.6 },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(`[Gemini] ❌ Model "${model}" (${apiVersion}) failed — ${data?.error?.status}: ${data?.error?.message}`);
    return null;
  }

  // Log the raw response structure so we can debug extraction issues
  const candidate = data?.candidates?.[0];
  console.log(`[Gemini] Raw candidate finishReason: ${candidate?.finishReason}`);

  // Some models (2.5-flash) return multiple parts including a thinking block;
  // find the first part that actually has text content
  const parts = candidate?.content?.parts || [];
  const text = parts.map(p => p.text || "").join("").trim();

  if (!text) {
    console.warn(`[Gemini] ⚠️  Model "${model}" returned empty text. Full response:`);
    console.warn(JSON.stringify(data, null, 2));
    return null;
  }

  console.log(`[Gemini] ✅ Summary generated with model "${model}" (${text.length} chars)`);
  return text;
}

async function getGeminiSummary(topic) {
  if (!GEMINI_API_KEY) {
    console.error("[Gemini] ❌ GEMINI_API_KEY is not set in .env");
    return "Summary unavailable — API key missing.";
  }

  for (const model of GEMINI_MODELS) {
    const result = await callGemini(model, topic);
    if (result) return result;
  }

  console.error("[Gemini] ❌ All models failed. Check your API key and quota at https://aistudio.google.com");
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
    // ── 1. Parallel YouTube searches (20 results each, keyword-filtered) ────────
    const t = topic.trim();
    const keywords = extractKeywords(t);
    console.log(`[YouTube] Searching for: "${t}" | keywords: [${keywords.join(", ")}]`);

    const [viewedSearch, ratingSearch, relevanceSearch] = await Promise.all([
      searchYouTube({ topic: t, keywords, order: "viewCount" }),
      searchYouTube({ topic: t, keywords, order: "rating"    }),
      searchYouTube({ topic: t, keywords, order: "relevance" }),
    ]);

    // ── 2. Deduplicate & collect all IDs ──────────────────────────────────────
    const seen     = new Set();
    const allItems = [];

    const addItems = (searchResult) => {
      for (const item of searchResult.items || []) {
        const id = item.id?.videoId;
        if (id && !seen.has(id)) {
          seen.add(id);
          allItems.push({ ...item, id });
        }
      }
    };
    addItems(viewedSearch);
    addItems(ratingSearch);
    addItems(relevanceSearch);

    // ── 3. Fetch full details (duration, statistics) for all IDs ─────────────
    const allIds      = allItems.map((i) => (typeof i.id === "string" ? i.id : i.id?.videoId));
    const detailItems = await fetchVideoDetails(allIds);

    const detailMap = {};
    for (const d of detailItems) {
      detailMap[d.id] = d;
    }

    const videos = allIds
      .filter((id) => detailMap[id])
      .map((id) => toVideo(detailMap[id]));

    const hasVideos = videos.length > 0;

    // ── 4. Build three NON-OVERLAPPING category arrays ────────────────────────
    // Each video appears in at most ONE category. We assign greedily:
    // mostViewed first (highest signal), then mostLiked, then shortestDuration.

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

    const mostViewed = pickTop(
      [...videos].sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount))
    );

    const mostLiked = pickTop(
      [...videos].sort((a, b) => parseInt(b.likeCount) - parseInt(a.likeCount))
    );

    const shortestDuration = pickTop(
      [...videos].sort((a, b) => isoToSeconds(a.duration) - isoToSeconds(b.duration))
    );

    // ── 5. Gemini summary (always fetch; show after videos or if no videos) ──
    const summary = await getGeminiSummary(topic.trim());

    return res.json({
      videos: {
        mostViewed,
        mostLiked,
        shortestDuration,
      },
      summary,
      hasVideos,
    });

  } catch (err) {
    console.error("Analyze error:", err);
    return res.status(500).json({ error: err.message || "Internal server error." });
  }
});

// ─── Gemini debug route ───────────────────────────────────────────────────────
// Visit http://localhost:5000/api/test-gemini in your browser to diagnose issues

app.get("/api/test-gemini", async (req, res) => {
  const key = GEMINI_API_KEY;

  if (!key) {
    return res.json({ ok: false, reason: "GEMINI_API_KEY is not set in your .env file" });
  }

  const results = [];

  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Say hello in one sentence." }] }],
        }),
      });

      const data = await r.json();

      if (!r.ok) {
        results.push({
          model,
          ok: false,
          status: r.status,
          error: data?.error?.status,
          message: data?.error?.message,
        });
      } else {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        results.push({ model, ok: true, response: text });
      }
    } catch (e) {
      results.push({ model, ok: false, message: e.message });
    }
  }

  return res.json({
    keyProvided: !!key,
    keyPrefix: key ? key.slice(0, 8) + "..." : null,
    results,
  });
});

// ─── start ───────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`);
});