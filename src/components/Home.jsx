import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { AiOutlineRise } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import { FaYoutube, FaClock, FaEye, FaThumbsUp, FaPlay } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import ScrollToTopButton from "./ScrollToTopButton";
import { motion, AnimatePresence } from "framer-motion";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDuration(iso) {
  if (!iso) return "N/A";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return iso;
  const [, h, m, s] = match.map((v) => parseInt(v) || 0);
  if (h) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatViews(n) {
  if (!n) return "N/A";
  const num = parseInt(n);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M views`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K views`;
  return `${num} views`;
}


// ─── sub-components ─────────────────────────────────────────────────────────

const categoryMeta = {
  mostViewed: {
    label: "Most Viewed",
    icon: <FaEye className="text-rose-400" />,
    accent: "from-rose-500/20 to-transparent",
    border: "border-rose-500/30",
    badge: "bg-rose-500/20 text-rose-300",
  },
  mostLiked: {
    label: "Most Liked",
    icon: <FaThumbsUp className="text-amber-400" />,
    accent: "from-amber-500/20 to-transparent",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-300",
  },
  shortestDuration: {
    label: "Shortest Duration",
    icon: <FaClock className="text-emerald-400" />,
    accent: "from-emerald-500/20 to-transparent",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
};

function VideoCard({ video, meta, index }) {
  const { videoId, title, channelTitle, viewCount, likeCount, duration, thumbnail } = video;

  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      className="group flex flex-col rounded-xl overflow-hidden border border-white/10 dark:border-white/10 border-[#d3d2d2]/60 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
    >
      {/* thumbnail */}
      <div className="relative aspect-video bg-black overflow-hidden">
        <img
          src={thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
          <FaPlay className="text-white text-3xl opacity-0 group-hover:opacity-90 transition-opacity drop-shadow-lg" />
        </div>
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(duration)}
          </span>
        )}
      </div>

      {/* info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-[#047b33] dark:group-hover:text-cyan-400 transition-colors">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{channelTitle}</p>
        <div className="flex gap-3 mt-auto pt-1 text-xs text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <FaEye /> {formatViews(viewCount)}
          </span>
          <span className="flex items-center gap-1">
            <FaThumbsUp /> {formatViews(likeCount).replace('views', 'likes')}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function CategorySection({ categoryKey, videos }) {
  const meta = categoryMeta[categoryKey];
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-12"
    >
      {/* category header */}
      <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${meta.border}`}>
        <span className="text-xl">{meta.icon}</span>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{meta.label}</h2>
        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${meta.badge}`}>
          {videos.length} video{videos.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, i) => (
          <VideoCard key={video.videoId} video={video} meta={meta} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

function SummaryBox({ summary }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-10 mb-12 p-6 rounded-2xl border border-emerald-500/20 dark:border-cyan-500/20 bg-emerald-50 dark:bg-cyan-500/5 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-3">
        <BsStars className="text-emerald-500 dark:text-cyan-400 text-xl" />
        <h3 className="font-bold text-emerald-700 dark:text-cyan-300 text-base">Quick Summary</h3>
        <span className="text-xs text-emerald-600/60 dark:text-cyan-500/60 ml-auto">Powered by Gemini</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
        {summary}
      </p>
    </motion.div>
  );
}

function NoVideosBox() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-10 mb-6 flex flex-col items-center justify-center p-10 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-white/5 text-center"
    >
      <MdOutlineErrorOutline className="text-5xl text-gray-400 dark:text-gray-500 mb-3" />
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
        No videos found
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        We couldn't find YouTube videos for this topic. Try a different search term.
      </p>
    </motion.div>
  );
}

// ─── main ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null); // { videos, summary, hasVideos }
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: input.trim() }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Analyze error:", err);
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const hasAnyVideos =
    results &&
    Object.values(results.videos || {}).some((arr) => arr?.length > 0);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-10 dark:bg-[#0F172A] bg-[#fbf8ec] lg:pt-12 pb-24">
        {/* ── hero ── */}
        <div className="flex pt-24 lg:pt-30 mx-auto flex-col justify-center items-center px-7">
          <motion.h1
            className="text-black font-['Playfair_Display'] dark:text-white text-center font-bold text-[36px] sm:text-[42px] md:text-5xl mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ease: "easeOut", duration: 0.6 }}
          >
            Stop Scrolling, Start Syncing!
          </motion.h1>
          <motion.p
            className="text-gray-700 dark:text-gray-400 text-center md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, ease: "easeOut", duration: 0.6 }}
          >
            Instantly get the best YouTube resources for any topic — sorted by views, recency, and
            length.
          </motion.p>
        </div>

        {/* ── stats ── */}
        <motion.div
          className="flex flex-wrap justify-center items-center sm:gap-20 px-7 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ease: "easeOut", duration: 0.6, delay: 0.2 }}
        >
          <div className="mt-10 flex flex-col justify-center items-center">
            <div className="flex gap-2 items-center">
              <span className="text-gray-800 dark:text-gray-300">
                <AiOutlineRise className="text-2xl" />
              </span>
              <h1 className="text-gray-700 dark:text-gray-300 text-3xl font-bold">9</h1>
            </div>
            <p className="text-lg font-semibold dark:text-cyan-500 text-[#045b65]">
              Videos Per Search
            </p>
          </div>
          <div className="mt-10 flex flex-col justify-center items-center">
            <div className="flex gap-2 items-center">
              <span className="text-gray-800 dark:text-gray-300">
                <IoTimeOutline className="text-2xl" />
              </span>
              <h1 className="text-gray-700 dark:text-gray-300 text-3xl font-bold">3</h1>
            </div>
            <p className="text-lg text-center font-semibold dark:text-cyan-500 text-[#045b65]">
              Smart Categories
            </p>
          </div>
        </motion.div>

        {/* ── input card ── */}
        <div className="mt-15 max-w-7xl px-7 mx-auto">
          <motion.div
            className="bg-white dark:bg-white/5 backdrop-blur-xl border border-[#d3d2d2] dark:border-white/10 rounded-2xl border-opacity-20 p-8 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ease: "easeOut", duration: 0.6, delay: 0.26 }}
          >
            <div className="mb-6">
              <div className="flex items-start justify-start">
                <label className="block dark:text-cyan-500 text-[#045b65] sm:text-start text-center mb-4 text-lg font-medium">
                  Enter a topic to explore on YouTube!
                </label>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
                className="w-full px-4 py-3 bg-opacity-10 border border-[#a5a4a4] dark:border-gray-600 border-opacity-30 rounded-xl dark:text-gray-300 text-gray-700 dark:placeholder:text-gray-400 placeholder:text-gray-600 placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#047b33] focus:border-[#047b33] dark:focus:ring-[#0195be] dark:focus:border-[#0195be] placeholder:text-center sm:placeholder:text-start resize-none"
                placeholder="e.g. Machine Learning, Quantum Physics, React hooks…"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              className="px-4 sm:px-16 w-full sm:w-auto bg-[#047b33] hover:bg-[#036a2a] dark:bg-[#0195be] dark:hover:bg-[#0181a4] text-white py-4 rounded-xl font-semibold sm:text-lg transition text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
            >
              <FaYoutube className="text-xl" />
              {loading ? "Searching…" : "Find Videos"}
            </button>
          </motion.div>
        </div>

        {/* ── loading skeleton ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl px-7 mx-auto mt-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-white/10 animate-pulse" />
                <div className="h-4 w-40 rounded bg-gray-300 dark:bg-white/10 animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-white/10 bg-white dark:bg-white/5 animate-pulse"
                  >
                    <div className="aspect-video bg-gray-200 dark:bg-white/10" />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-full" />
                      <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-2/3" />
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded w-1/2 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── error ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl px-7 mx-auto mt-10 p-5 rounded-xl border border-red-400/40 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* ── results ── */}
        {results && !loading && (
          <div className="max-w-7xl px-7 mx-auto mt-12">
            {!hasAnyVideos ? (
              <>
                <NoVideosBox />
                {results.summary && <SummaryBox summary={results.summary} />}
              </>
            ) : (
              <>
                {Object.entries(results.videos).map(([key, videos]) =>
                  videos?.length > 0 ? (
                    <CategorySection key={key} categoryKey={key} videos={videos} />
                  ) : null
                )}
                {results.summary && <SummaryBox summary={results.summary} />}
              </>
            )}
          </div>
        )}
      </div>


      <ScrollToTopButton />
      <Footer />
    </>
  );
}