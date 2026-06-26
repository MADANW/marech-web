import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUpIcon, TrendingDownIcon } from "@/components/ui/icons";

type Accent = "orange" | "red" | "green" | "blue";

const ACCENT: Record<Accent, string> = {
  orange: "bg-accent/10 text-accent border-accent/25",
  red: "bg-danger/10 text-red-400 border-danger/30",
  green: "bg-success/10 text-success border-success/25",
  blue: "bg-primary/10 text-blue-300 border-primary/30",
};

interface Trend {
  dir: "up" | "down";
  value: string;
  /** When true, an "up" trend is good (green). Default true. */
  goodUp?: boolean;
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  trend?: Trend;
  accent?: Accent;
  highlight?: boolean;
}

function TrendPill({ dir, value, goodUp = true }: Trend) {
  const positive = dir === "up" ? goodUp : !goodUp;
  const Icon = dir === "up" ? TrendingUpIcon : TrendingDownIcon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
        positive ? "bg-success/10 text-success" : "bg-danger/10 text-red-400"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {value}
    </span>
  );
}

export function StatCard({
  icon,
  label,
  value,
  sub,
  trend,
  accent = "orange",
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-[#1a1a1a] p-5 shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-colors",
        highlight ? "border-accent/30 hover:border-accent/50" : "border-white/10 hover:border-white/20"
      )}
    >
      {highlight && (
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/15 blur-2xl" />
      )}
      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border",
            ACCENT[accent]
          )}
        >
          {icon}
        </span>
        {trend && <TrendPill {...trend} />}
      </div>
      <div className="relative mt-4">
        <div
          className="text-3xl font-bold leading-none text-white tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {value}
        </div>
        <div className="mt-2 text-xs font-medium uppercase tracking-wide text-white/50">
          {label}
        </div>
        {sub && <div className="mt-1 text-xs text-white/40">{sub}</div>}
      </div>
    </div>
  );
}
