"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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

/* Smooth Catmull-Rom → cubic-bezier path through fixed sample points, so the
   chart reads like real traffic instead of a hand-wobbled line. */
function smoothPath(pts: [number, number][]): string {
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1: [number, number] = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: [number, number] = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

// Total inbound traffic (faint, upper) and blocked bots (rust, lower).
const TOTAL_PTS: [number, number][] = [
  [0, 46], [40, 40], [80, 30], [120, 36], [160, 18], [200, 26],
  [240, 12], [280, 24], [320, 16], [360, 26], [400, 20],
];
const BLOCKED_PTS: [number, number][] = [
  [0, 86], [40, 80], [80, 68], [120, 74], [160, 56], [200, 63],
  [240, 46], [280, 60], [320, 50], [360, 62], [400, 54],
];
const TOTAL_PATH = smoothPath(TOTAL_PTS);
const BLOCKED_PATH = smoothPath(BLOCKED_PTS);
const NOW = BLOCKED_PTS[BLOCKED_PTS.length - 1];

const TIME_LABELS = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "NOW"];

/** HUD corner brackets — the instrument-panel frame. */
function CornerTicks() {
  const base = "absolute w-3 h-3 border-white/20 pointer-events-none";
  return (
    <>
      <span aria-hidden className={`${base} left-2 top-2 border-l border-t`} />
      <span aria-hidden className={`${base} right-2 top-2 border-r border-t`} />
      <span aria-hidden className={`${base} left-2 bottom-2 border-l border-b`} />
      <span aria-hidden className={`${base} right-2 bottom-2 border-r border-b`} />
    </>
  );
}

export function AnalyticsMockup() {
  const [bots, setBots] = useState<Bot[]>(INITIAL_BOTS);
  // Per-row "+N just blocked" flash; keyed by bot name → amount.
  const [flash, setFlash] = useState<Record<string, number>>({});
  const flashTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const reducedMotion = useReducedMotion();

  // Simulate a live stream of blocks: every ~1.4s a random bot gains hits.
  useEffect(() => {
    if (reducedMotion) return;
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
  }, [reducedMotion]);

  const totalBlocked = bots.reduce((sum, b) => sum + b.count, 0);

  return (
    <div className="mars-card--marketing relative rounded-2xl flex flex-col h-full min-h-[380px] overflow-hidden">
      <CornerTicks />

      {/* Console header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-app-border-faint">
        <span className="text-eyebrow text-white/50">Live threat feed</span>
        <span className="flex items-center gap-3">
          <span className="text-eyebrow text-white/25 hidden sm:inline">24H</span>
          <span
            className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-success"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Tracking
          </span>
        </span>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-5 pb-4">
        {/* Chart */}
        <div className="relative">
          <svg viewBox="0 0 400 100" className="w-full h-32" preserveAspectRatio="none">
            <defs>
              <linearGradient id="threatFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2562a" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#e2562a" stopOpacity="0" />
              </linearGradient>
              <filter id="threatGlow" x="-10%" y="-40%" width="120%" height="180%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Horizon grid — dashed hairlines */}
            {[25, 50, 75].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="400"
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                strokeDasharray="1 5"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Total inbound traffic — faint context line */}
            <motion.path
              d={TOTAL_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />

            {/* Blocked threats — rust area + glowing line */}
            <motion.path
              d={`${BLOCKED_PATH} L 400,100 L 0,100 Z`}
              fill="url(#threatFill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.path
              d={BLOCKED_PATH}
              fill="none"
              stroke="#e2562a"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              filter="url(#threatGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />

            {/* NOW cursor — quiet dashed marker instead of a sweeping line */}
            <line
              x1={NOW[0]}
              y1="4"
              x2={NOW[0]}
              y2="96"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
              strokeDasharray="2 4"
              vectorEffect="non-scaling-stroke"
            />
            <motion.circle
              cx={NOW[0]}
              cy={NOW[1]}
              r="3.5"
              fill="#e2562a"
              animate={reducedMotion ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
              style={{ transformOrigin: `${NOW[0]}px ${NOW[1]}px` }}
            />
          </svg>

          {/* Series legend */}
          <div
            className="absolute left-0 top-0 flex items-center gap-3 text-[9px] uppercase tracking-[0.14em] text-white/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="flex items-center gap-1">
              <span className="h-px w-3 bg-white/30" /> Traffic
            </span>
            <span className="flex items-center gap-1">
              <span className="h-[2px] w-3 rounded bg-mars-rust" /> Blocked
            </span>
          </div>
        </div>

        {/* X-axis */}
        <div
          className="flex justify-between text-[9px] tracking-[0.1em] text-white/25 mt-1.5 mb-5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {TIME_LABELS.map((t) => (
            <span key={t} className={t === "NOW" ? "text-mars-ember" : undefined}>{t}</span>
          ))}
        </div>

        {/* Ranked threat table — rows share the card's spare height evenly */}
        <div className="flex-1 flex flex-col">
          {bots.map((bot, i) => (
            <div
              key={bot.name}
              className="flex flex-1 min-h-9 items-center gap-3 py-2 border-b border-app-border-faint last:border-0"
            >
              <span
                className="w-5 text-[10px] text-white/25 tabular-nums shrink-0"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="w-28 text-xs text-white/70 truncate shrink-0"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {bot.name}
              </span>
              <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-mars-rust-dim to-mars-rust"
                  animate={{ width: `${bot.pct}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
              <span className="w-14 shrink-0 text-right">
                {flash[bot.name] ? (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-bold text-mars-ember"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    +{flash[bot.name]}
                  </motion.span>
                ) : null}
              </span>
              <motion.span
                key={bot.count}
                initial={{ color: flash[bot.name] ? "#ff8a5b" : "rgba(255,255,255,0.4)" }}
                animate={{ color: "rgba(255,255,255,0.4)" }}
                transition={{ duration: 0.9 }}
                className="w-16 shrink-0 text-right text-xs tabular-nums"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {bot.count.toLocaleString()}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Console footer — live totalizer */}
        <div
          className="flex items-center justify-between pt-3 mt-1 border-t border-app-border-faint text-[10px] uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="text-white/40">
            <span className="text-mars-ember tabular-nums">{totalBlocked.toLocaleString()}</span>
            {" "}threats neutralized
          </span>
          <span className="text-white/20">Marech grid</span>
        </div>
      </div>
    </div>
  );
}
