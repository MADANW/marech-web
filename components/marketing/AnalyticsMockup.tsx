"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface Bot {
  name: string;
  count: number;
  pct: number;
}

const INITIAL_BOTS: Bot[] = [
  { name: "GPTBot", count: 1247, pct: 62 },
  { name: "ClaudeBot", count: 893, pct: 45 },
  { name: "Amazonbot", count: 756, pct: 38 },
  { name: "ByteSpider", count: 578, pct: 29 },
  { name: "CCBot", count: 412, pct: 21 },
  { name: "PerplexityBot", count: 334, pct: 17 },
];

const CHART_PATH =
  "M 0,82 C 20,80 35,74 55,60 S 90,18 120,24 S 158,50 188,54 S 220,30 250,14 S 285,44 308,66 S 342,54 378,68 L 400,72";

export function AnalyticsMockup() {
  const [bots, setBots] = useState<Bot[]>(INITIAL_BOTS);
  // Per-row "+N just blocked" flash; keyed by bot name → amount.
  const [flash, setFlash] = useState<Record<string, number>>({});
  const flashTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Simulate a live stream of blocks: every ~1.4s a random bot gains hits.
  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * INITIAL_BOTS.length);
      const gain = 1 + Math.floor(Math.random() * 8);
      let name = "";

      setBots((prev) =>
        prev.map((b, i) => {
          if (i !== idx) return b;
          name = b.name;
          return {
            ...b,
            count: b.count + gain,
            pct: Math.min(96, b.pct + Math.random() * 2.5),
          };
        })
      );

      if (name) {
        setFlash((prev) => ({ ...prev, [name]: gain }));
        clearTimeout(flashTimers.current[name]);
        flashTimers.current[name] = setTimeout(() => {
          setFlash((prev) => {
            const next = { ...prev };
            delete next[name];
            return next;
          });
        }, 900);
      }
    }, 1400);

    const timers = flashTimers.current;
    return () => {
      clearInterval(interval);
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 flex flex-col h-full min-h-[380px] shadow-[0_6px_28px_rgba(0,0,0,0.35)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-xs font-bold tracking-[0.15em] uppercase text-white/50"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Live Threat Feed
        </span>
        <span className="flex items-center gap-1.5 text-xs text-success font-medium">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse inline-block" />
          Active
        </span>
      </div>

      {/* SVG Line Chart */}
      <div className="flex-1 flex flex-col">
        <div className="relative">
          <svg viewBox="0 0 400 100" className="w-full h-32" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[25, 50, 75].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            {/* Area fill */}
            <motion.path
              d={`${CHART_PATH} L 400,100 L 0,100 Z`}
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            {/* Line */}
            <motion.path
              d={CHART_PATH}
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            {/* Sweeping scan line — loops forever to read as "actively scanning" */}
            <motion.line
              y1="0"
              y2="100"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              initial={{ x1: 0, x2: 0 }}
              animate={{ x1: [0, 400], x2: [0, 400] }}
              transition={{ duration: 2.6, ease: "linear", repeat: Infinity }}
            />
            {/* Endpoint dot — looping pulse */}
            <motion.circle
              cx="400"
              cy="72"
              r="4"
              fill="#f97316"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.45, 1] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
              style={{ transformOrigin: "400px 72px" }}
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-white/20 mt-1 mb-5">
          {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "Now"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* Bot rows */}
        <div className="space-y-3">
          {bots.map((bot) => (
            <div key={bot.name}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-white/60 font-medium flex items-center gap-1.5">
                  {bot.name}
                  {flash[bot.name] && (
                    <motion.span
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-accent font-mono text-[10px] font-bold"
                    >
                      +{flash[bot.name]}
                    </motion.span>
                  )}
                </span>
                <motion.span
                  key={bot.count}
                  initial={{ color: flash[bot.name] ? "#f97316" : "rgba(255,255,255,0.35)" }}
                  animate={{ color: "rgba(255,255,255,0.35)" }}
                  transition={{ duration: 0.9 }}
                  className="font-mono"
                >
                  {bot.count.toLocaleString()} blocked
                </motion.span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  animate={{ width: `${bot.pct}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
