// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-12 h-6 p-2 rounded-full border border-stone-300 dark:border-stone-600 bg-[#103998] dark:bg-stone-700 transition-colors duration-300 cursor-pointer"
      aria-label="Toggle theme"
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-stone-900 shadow flex items-center justify-center text-xs transition-transform duration-300
          ${dark ? "translate-x-6" : "translate-x-0"}`}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}