"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { PageHeader, LivePill } from "@/components/ui/PageHeader";
import {
  ActivityIcon,
  BanIcon,
  ShieldCheckIcon,
  BotIcon,
  CodeIcon,
  ShieldPlusIcon,
  DownloadIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";
import { formatNumber, formatTime } from "@/lib/utils";
import { generateLogs, generateWeekStats, type LogEntry } from "@/lib/mock";
import { isMock, fetchLogs } from "@/lib/api";

const INITIAL_LOGS = generateLogs(20);
const WEEK_STATS = generateWeekStats();

const QUICK_ACTIONS = [
  { href: "/snippet", label: "Get snippet code", icon: CodeIcon },
  { href: "/policies", label: "Create policy", icon: ShieldPlusIcon },
  { href: "/logs", label: "Export logs", icon: DownloadIcon },
];

const TOP_BOTS = [
  { name: "GPTBot", count: 34 },
  { name: "ClaudeBot", count: 21 },
  { name: "CCBot", count: 18 },
  { name: "PerplexityBot", count: 9 },
  { name: "Amazonbot", count: 7 },
];

export default function DashboardPage() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);

  useEffect(() => {
    const refresh = () => {
      if (isMock) {
        setLogs(generateLogs(20, true));
      } else {
        fetchLogs({ limit: 20 })
          .then((res) => setLogs(res.logs as LogEntry[]))
          .catch(console.error);
      }
    };
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, []);

  const today = WEEK_STATS[WEEK_STATS.length - 1];
  const yest = WEEK_STATS[WEEK_STATS.length - 2] ?? today;
  const todayTotal = today.total;
  const todayBlocked = today.blocked;
  const blockRate = ((todayBlocked / todayTotal) * 100).toFixed(1);

  const pctChange = (a: number, b: number) => (b ? ((a - b) / b) * 100 : 0);
  const reqDelta = pctChange(todayTotal, yest.total);
  const blkDelta = pctChange(todayBlocked, yest.blocked);
  const maxTop = Math.max(...TOP_BOTS.map((b) => b.count));

  return (
    <div className="p-7 max-w-6xl mx-auto space-y-5">
      <PageHeader
        title="Dashboard"
        subtitle="Real-time overview of your content protection"
        action={<LivePill>Live · updates every 5s</LivePill>}
      />

      {/* Hero / telemetry band */}
      <div className="relative overflow-hidden rounded-xl mars-card px-6 py-6 sm:px-7">
        <div className="mars-grid absolute inset-0" />
        <div className="mars-horizon" />
        <div className="relative flex items-center justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-mars-rust">
              <span className="h-1.5 w-1.5 rounded-full bg-mars-rust shadow-[0_0_8px_1px_rgba(226,86,42,0.7)]" />
              Marech control
            </div>
            <h2
              className="mt-2.5 text-2xl font-bold tracking-[-0.01em] text-app-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Protection active
            </h2>
            <p className="mt-1.5 max-w-md text-[13px] text-app-muted">
              Your site is shielded across every page. Live telemetry refreshes every 5 seconds.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Telemetry label="Uptime" value="99.98%" />
              <Telemetry label="Edge regions" value="14" />
              <Telemetry label="Throughput" value={`${formatNumber(Math.round(todayTotal / 1440))}/min`} />
            </div>
          </div>
          <PlanetOrbit />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<ActivityIcon className="h-[18px] w-[18px]" />}
          accent="blue"
          label="Requests today"
          value={formatNumber(todayTotal)}
          trend={{ dir: reqDelta >= 0 ? "up" : "down", value: `${Math.abs(reqDelta).toFixed(1)}%`, goodUp: true }}
          sub="vs. yesterday"
        />
        <StatCard
          icon={<BanIcon className="h-[18px] w-[18px]" />}
          accent="red"
          highlight
          label="Bots blocked"
          value={formatNumber(todayBlocked)}
          trend={{ dir: blkDelta >= 0 ? "up" : "down", value: `${Math.abs(blkDelta).toFixed(1)}%`, goodUp: true }}
          sub={`${blockRate}% of all traffic`}
        />
        <StatCard
          icon={<ShieldCheckIcon className="h-[18px] w-[18px]" />}
          accent="green"
          label="Protection"
          value={
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              Active
            </span>
          }
          sub="All pages protected"
        />
      </div>

      {/* Chart */}
      <div className="rounded-xl mars-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13.5px] font-semibold text-app-text">Traffic · last 7 days</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-app-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-mars-cyan" /> Total
            </span>
            <span className="inline-flex items-center gap-1.5 text-app-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-mars-rust" /> Blocked
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={210}>
          <AreaChart data={WEEK_STATS} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.16} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillBlocked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2562a" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#e2562a" stopOpacity={0} />
              </linearGradient>
              <filter id="glowRust" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8a7f76" }} axisLine={false} tickLine={false} dy={6} />
            <YAxis tick={{ fontSize: 11, fill: "#8a7f76" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "#16130f", color: "#ededee", fontSize: 12, boxShadow: "0 12px 32px rgba(0,0,0,0.6)" }}
              labelStyle={{ color: "#9a9aa3" }}
              itemStyle={{ color: "#ededee" }}
              cursor={{ stroke: "rgba(255,255,255,0.12)" }}
            />
            <Area type="monotone" dataKey="total" name="Total" stroke="#22d3ee" strokeWidth={2} fill="url(#fillTotal)" dot={false} activeDot={{ r: 4 }} />
            <Area type="monotone" dataKey="blocked" name="Blocked" stroke="#e2562a" strokeWidth={2} fill="url(#fillBlocked)" filter="url(#glowRust)" dot={false} activeDot={{ r: 4, fill: "#e2562a" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Activity feed */}
        <div className="lg:col-span-2 rounded-xl mars-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-app-border flex items-center justify-between">
            <h2 className="text-[13.5px] font-semibold text-app-text flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Live activity
            </h2>
            <Link href="/logs" className="text-xs text-accent hover:text-accent-dark inline-flex items-center gap-0.5">
              View all logs <ChevronRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-app-border-faint">
            {logs.slice(0, 8).map((log) => {
              const blocked = log.action === "block";
              return (
                <div key={log.id} className="flex items-center gap-3 px-5 py-3 hover:bg-app-hover transition-colors">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${blocked ? "bg-danger/10 text-red-400" : "bg-success/10 text-success"}`}>
                    <BotIcon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-app-text truncate">{log.userAgent.split("/")[0]}</div>
                    <div className="text-[11px] text-app-faint font-mono truncate">{log.path}</div>
                  </div>
                  <Badge variant={blocked ? "danger" : "success"} className="shrink-0">
                    {blocked ? "Blocked" : "Allowed"}
                  </Badge>
                  <span className="hidden sm:block text-[11px] text-app-faint font-mono w-24 text-right shrink-0">{log.ip}</span>
                  <span className="text-[11px] text-app-faint w-14 text-right shrink-0 tabular-nums">{formatTime(log.timestamp)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions + top blockers */}
        <div className="space-y-4">
          <div className="rounded-xl mars-card p-4">
            <h2 className="text-[13.5px] font-semibold text-app-text mb-2 px-1">Quick actions</h2>
            <div className="space-y-0.5">
              {QUICK_ACTIONS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-app-hover"
                >
                  <Icon className="h-4 w-4 shrink-0 text-accent" />
                  <span className="flex-1 text-[13px] font-medium text-app-text">{label}</span>
                  <ChevronRightIcon className="h-4 w-4 text-app-faint transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl mars-card p-5">
            <h2 className="text-[13.5px] font-semibold text-app-text mb-3.5">Top blockers today</h2>
            <div className="space-y-3">
              {TOP_BOTS.map((b) => (
                <div key={b.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-app-muted">{b.name}</span>
                    <span className="font-medium text-app-text font-mono tabular-nums">{b.count}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent/80"
                      style={{ width: `${(b.count / maxTop) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Telemetry({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-base font-semibold text-app-text tabular-nums"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-app-faint">
        {label}
      </div>
    </div>
  );
}

/** Decorative Mars planet with an orbiting satellite. */
function PlanetOrbit() {
  return (
    <div className="relative hidden h-36 w-36 shrink-0 sm:block" aria-hidden>
      <div className="mars-orbit-ring mars-orbit-spin absolute inset-0">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mars-cyan shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]" />
      </div>
      <div className="mars-orbit-ring absolute inset-[18px] opacity-50" />
      <div className="mars-planet absolute inset-[34px]" />
    </div>
  );
}
