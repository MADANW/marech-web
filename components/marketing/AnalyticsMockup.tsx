"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const BOTS = [
  { name: "GPTBot", count: "1,247", pct: 62 },
  { name: "ClaudeBot", count: "893", pct: 45 },
  { name: "CCBot", count: "412", pct: 21 },
];

const CHART_PATH =
  "M 0,82 C 20,80 35,74 55,60 S 90,18 120,24 S 158,50 188,54 S 220,30 250,14 S 285,44 308,66 S 342,54 378,68 L 400,72";

export function AnalyticsMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col h-full min-h-[380px]"
    >
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
        <svg viewBox="0 0 400 100" className="w-full h-32" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[25, 50, 75].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="400"
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          {/* Area fill */}
          <motion.path
            d={`${CHART_PATH} L 400,100 L 0,100 Z`}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          {/* Endpoint dot */}
          <motion.circle
            cx="400"
            cy="72"
            r="4"
            fill="#f97316"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          />
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-white/20 mt-1 mb-5">
          {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "Now"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* Bot rows */}
        <div className="space-y-3">
          {BOTS.map((bot, i) => (
            <div key={bot.name}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-white/60 font-medium">{bot.name}</span>
                <span className="text-white/35 font-mono">{bot.count} blocked</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${bot.pct}%` } : { width: 0 }}
                  transition={{ duration: 0.9, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
