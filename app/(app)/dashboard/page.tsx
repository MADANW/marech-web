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
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatNumber, formatTime } from "@/lib/utils";
import { generateLogs, generateWeekStats, type LogEntry } from "@/lib/mock";
import { isMock, fetchLogs } from "@/lib/api";

const INITIAL_LOGS = generateLogs(20);
const WEEK_STATS = generateWeekStats();

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

  const todayTotal = WEEK_STATS[WEEK_STATS.length - 1].total;
  const todayBlocked = WEEK_STATS[WEEK_STATS.length - 1].blocked;
  const blockRate = ((todayBlocked / todayTotal) * 100).toFixed(1);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <span className="text-xs text-gray-400">Live · updates every 5s</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Requests Today</div>
          <div className="text-3xl font-bold text-gray-900">{formatNumber(todayTotal)}</div>
        </Card>
        <Card padding="md">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bots Blocked</div>
          <div className="text-3xl font-bold text-danger">{formatNumber(todayBlocked)}</div>
          <div className="text-xs text-gray-400 mt-1">{blockRate}% of traffic</div>
        </Card>
        <Card padding="md">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Protection</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-3 h-3 rounded-full bg-success animate-pulse" />
            <span className="text-lg font-semibold text-success">Active</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">All pages protected</div>
        </Card>
      </div>

      {/* Chart */}
      <Card padding="md">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Traffic — Last 7 Days</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={WEEK_STATS} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Requests"
              stroke="#1a56db"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="blocked"
              name="Bots Blocked"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <Card padding="none" className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Live Activity</h2>
            <Link href="/logs" className="text-xs text-primary hover:underline">View all logs →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <span className="text-xs text-gray-400 w-14 shrink-0">{formatTime(log.timestamp)}</span>
                <span className="text-xs font-medium text-gray-700 w-24 shrink-0 truncate">{log.userAgent.split("/")[0]}</span>
                <Badge variant={log.action === "block" ? "danger" : "success"} className="shrink-0">
                  {log.action === "block" ? "Blocked" : "Allowed"}
                </Badge>
                <span className="text-xs text-gray-400 truncate">{log.path}</span>
                <span className="text-xs text-gray-300 shrink-0 hidden sm:block">{log.ip}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <div className="space-y-3">
          <Card padding="md">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/snippet" className="block">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <CodeIcon className="w-4 h-4" /> Get Snippet Code
                </Button>
              </Link>
              <Link href="/policies" className="block">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <ShieldIcon className="w-4 h-4" /> Create Policy
                </Button>
              </Link>
              <Link href="/logs" className="block">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <DownloadIcon className="w-4 h-4" /> Export Logs
                </Button>
              </Link>
            </div>
          </Card>

          <Card padding="md">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Top Blockers Today</h2>
            <div className="space-y-2">
              {TOP_BOTS.map((b) => (
                <div key={b.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{b.name}</span>
                  <span className="font-semibold text-danger">{b.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const TOP_BOTS = [
  { name: "GPTBot", count: 34 },
  { name: "ClaudeBot", count: 21 },
  { name: "CCBot", count: 18 },
  { name: "PerplexityBot", count: 9 },
  { name: "Amazonbot", count: 7 },
];

function CodeIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
}
function ShieldIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}
function DownloadIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
}
