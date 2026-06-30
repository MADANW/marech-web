"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const LINES = [
  { text: "$ marech scan --watch", color: "text-white/60" },
  { text: "⟶  scanning incoming requests...", color: "text-white/35" },
  { text: "⚠  GPTBot/1.0  [103.21.xx.xx]", color: "text-yellow-400/80" },
  { text: "   ✓ BLOCKED → 403 Forbidden", color: "text-green-400" },
  { text: "⚠  ClaudeBot/3.0  [54.92.xx.xx]", color: "text-yellow-400/80" },
  { text: "   ✓ BLOCKED → 403 Forbidden", color: "text-green-400" },
  { text: "✓  2 bots blocked in 12ms", color: "text-accent" },
];

const LINE_DELAY_MS = 550;
const PAUSE_MS = 2200;

export function AnimatedTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [cycle, setCycle] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    setVisibleCount(0);

    const ids: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      ids.push(setTimeout(() => setVisibleCount(i + 1), i * LINE_DELAY_MS + 100));
    });
    ids.push(
      setTimeout(() => setCycle((c) => c + 1), LINES.length * LINE_DELAY_MS + PAUSE_MS)
    );
    return () => ids.forEach(clearTimeout);
  }, [isInView, cycle]);

  return (
    <div
      ref={ref}
      className="bg-black/60 rounded-xl p-5 font-mono text-xs h-full min-h-[200px] overflow-hidden border border-white/5"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-white/10 block" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10 block" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10 block" />
        <span className="ml-2 text-white/20 text-xs">marech — terminal</span>
      </div>

      <div className="space-y-1.5 leading-relaxed">
        {visibleCount === 0 && (
          <span className="text-white/30">
            $ <span className="animate-pulse">▌</span>
          </span>
        )}
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div key={`${cycle}-${i}`} className={line.color}>
            {line.text}
            {i === visibleCount - 1 && visibleCount < LINES.length && (
              <span className="animate-pulse ml-0.5">▌</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
