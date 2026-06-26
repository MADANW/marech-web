"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
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
  { href: "/snippet", label: "Get Snippet Code", desc: "Install on your site", icon: CodeIcon },
  { href: "/policies", label: "Create Policy", desc: "Fine-tune what's blocked", icon: ShieldPlusIcon },
  { href: "/logs", label: "Export Logs", desc: "Download as CSV", icon: DownloadIcon },
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
        setLogs(generateLogs(20));
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
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Real-time overview of your content protection"
        action={<LivePill>Live · updates every 5s</LivePill>}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<ActivityIcon className="h-5 w-5" />}
          accent="blue"
          label="Requests Today"
          value={formatNumber(todayTotal)}
          trend={{ dir: reqDelta >= 0 ? "up" : "down", value: `${Math.abs(reqDelta).toFixed(1)}%`, goodUp: true }}
          sub="vs. yesterday"
        />
        <StatCard
          icon={<BanIcon className="h-5 w-5" />}
          accent="red"
          highlight
          label="Bots Blocked"
          value={formatNumber(todayBlocked)}
          trend={{ dir: blkDelta >= 0 ? "up" : "down", value: `${Math.abs(blkDelta).toFixed(1)}%`, goodUp: true }}
          sub={`${blockRate}% of all traffic`}
        />
        <StatCard
          icon={<ShieldCheckIcon className="h-5 w-5" />}
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
      <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-white">Traffic — Last 7 Days</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-white/60">
              <span className="h-2 w-2 rounded-full bg-accent" /> Total Requests
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/60">
              <span className="h-2 w-2 rounded-full bg-red-400" /> Bots Blocked
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={WEEK_STATS} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)", background: "#0d0704", color: "#fff", fontSize: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: "rgba(255,255,255,0.15)" }}
            />
            <Line type="monotone" dataKey="total" name="Total Requests" stroke="#f97316" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="blocked" name="Bots Blocked" stroke="#f87171" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#1a1a1a] overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Live Activity
            </h2>
            <Link href="/logs" className="text-xs text-accent hover:underline inline-flex items-center gap-0.5">
              View all logs <ChevronRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {logs.slice(0, 8).map((log) => {
              const blocked = log.action === "block";
              return (
                <div key={log.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/[0.03] transition-colors">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${blocked ? "bg-danger/10 border-danger/25 text-red-400" : "bg-success/10 border-success/25 text-success"}`}>
                    <BotIcon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-white/80 truncate">{log.userAgent.split("/")[0]}</div>
                    <div className="text-[11px] text-white/35 font-mono truncate">{log.path}</div>
                  </div>
                  <Badge variant={blocked ? "danger" : "success"} className="shrink-0">
                    {blocked ? "Blocked" : "Allowed"}
                  </Badge>
                  <span className="hidden sm:block text-[11px] text-white/30 font-mono w-24 text-right shrink-0">{log.ip}</span>
                  <span className="text-[11px] text-white/40 w-14 text-right shrink-0">{formatTime(log.timestamp)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions + top blockers */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
            <h2 className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
            <div className="space-y-1.5">
              {QUICK_ACTIONS.map(({ href, label, desc, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-accent/40 hover:bg-accent/[0.06]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{label}</div>
                    <div className="text-[11px] text-white/40">{desc}</div>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white/50" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
            <h2 className="text-sm font-semibold text-white mb-3">Top Blockers Today</h2>
            <div className="space-y-3">
              {TOP_BOTS.map((b) => (
                <div key={b.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white/60">{b.name}</span>
                    <span className="font-semibold text-red-400 font-mono tabular-nums">{b.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-500/70 to-red-400"
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
