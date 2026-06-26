import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUpIcon, TrendingDownIcon } from "@/components/ui/icons";

type Accent = "orange" | "red" | "green" | "blue";

const ACCENT: Record<Accent, string> = {
  orange: "bg-accent/12 text-accent",
  red: "bg-danger/12 text-red-400",
  green: "bg-success/12 text-success",
  blue: "bg-white/[0.06] text-app-muted",
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
        "rounded-xl border bg-app-card p-5 transition-colors",
        highlight ? "border-accent/35" : "border-app-border hover:border-white/15"
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            ACCENT[accent]
          )}
        >
          {icon}
        </span>
        {trend && <TrendPill {...trend} />}
      </div>
      <div className="mt-5">
        <div
          className="text-[28px] font-semibold leading-none tracking-tight text-app-text tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {value}
        </div>
        <div className="mt-2.5 text-[13px] text-app-muted">{label}</div>
        {sub && <div className="mt-1 text-xs text-app-faint">{sub}</div>}
      </div>
    </div>
  );
}
