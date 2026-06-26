"use client";
import { useState, useMemo } from "react";
import useSWR from "swr";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { DownloadIcon, SearchIcon, ActivityIcon, BanIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/utils";
import { generateLogs, type LogEntry, type BotType } from "@/lib/mock";
import { isMock, fetchLogs, downloadCsv } from "@/lib/api";

const BOT_DOT: Record<BotType, string> = {
  scraper: "bg-red-400",
  ai_tool: "bg-accent",
  local_llm: "bg-purple-400",
  human: "bg-success",
  unknown: "bg-white/40",
};

const MOCK_LOGS = generateLogs(120);
const PAGE_SIZE = 50;

export default function LogsPage() {
  const { data: apiData } = useSWR(
    isMock ? null : "logs",
    () => fetchLogs({ limit: 120 })
  );
  const ALL_LOGS: LogEntry[] = isMock ? MOCK_LOGS : ((apiData?.logs ?? []) as LogEntry[]);

  const [search, setSearch] = useState("");
  const [botFilter, setBotFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    return ALL_LOGS.filter((l) => {
      if (actionFilter !== "all" && l.action !== actionFilter) return false;
      if (botFilter !== "all" && l.botType !== botFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!l.ip.includes(q) && !l.path.toLowerCase().includes(q) && !l.userAgent.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, botFilter, actionFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleExport = () => {
    if (!isMock) {
      downloadCsv().catch(console.error);
      return;
    }
    const headers = "Timestamp,User Agent,Bot Type,IP,Path,Action,Confidence\n";
    const rows = ALL_LOGS.map(
      (l) =>
        `"${l.timestamp}","${l.userAgent}","${l.botType}","${l.ip}","${l.path}","${l.action}","${(l.confidence * 100).toFixed(0)}%"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blockme-logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <PageHeader
        title="Traffic Logs"
        subtitle="Every request we've inspected — searchable and exportable"
        action={
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <DownloadIcon className="w-4 h-4" />
            Export CSV
          </Button>
        }
      />

      {/* Summary chips */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Matched", value: filtered.length, icon: ActivityIcon, tone: "text-white border-white/10 bg-white/5", iconTone: "text-white/60" },
          { label: "Blocked", value: filtered.filter((l) => l.action === "block").length, icon: BanIcon, tone: "text-red-400 border-danger/25 bg-danger/10", iconTone: "text-red-400" },
          { label: "Allowed", value: filtered.filter((l) => l.action === "allow").length, icon: ShieldCheckIcon, tone: "text-success border-success/25 bg-success/10", iconTone: "text-success" },
        ].map(({ label, value, icon: Icon, tone, iconTone }) => (
          <div key={label} className={`flex items-center gap-3 rounded-xl border p-4 ${tone}`}>
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg bg-black/20 ${iconTone}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xl font-bold tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>{value.toLocaleString()}</div>
              <div className="text-[11px] uppercase tracking-wide text-white/45">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search IP, path, or user agent…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white placeholder-white/30 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <select
            value={botFilter}
            onChange={(e) => { setBotFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white text-sm outline-none focus:border-accent/50 [&>option]:bg-gray-900"
          >
            <option value="all">All bot types</option>
            <option value="scraper">Scraper</option>
            <option value="ai_tool">AI Tool</option>
            <option value="local_llm">Local LLM</option>
            <option value="human">Human</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            value={actionFilter}
            onChange={(e) => { setActionFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white text-sm outline-none focus:border-accent/50 [&>option]:bg-gray-900"
          >
            <option value="all">All actions</option>
            <option value="block">Blocked</option>
            <option value="allow">Allowed</option>
            <option value="log">Log only</option>
          </select>
          {(search || botFilter !== "all" || actionFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setSearch(""); setBotFilter("all"); setActionFilter("all"); setPage(0); }}
            >
              Clear filters
            </Button>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">Timestamp</th>
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">User Agent</th>
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">Bot Type</th>
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">IP</th>
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">Path</th>
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">Action</th>
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-white/40 text-sm">
                    No logs match your filters.
                  </td>
                </tr>
              )}
              {visible.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white/50 font-mono text-xs whitespace-nowrap">{formatDate(log.timestamp)}</td>
                  <td className="px-4 py-3 text-white/70 max-w-[200px] truncate" title={log.userAgent}>{log.userAgent}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-xs text-white/70">
                      <span className={`h-1.5 w-1.5 rounded-full ${BOT_DOT[log.botType]}`} />
                      {log.botType}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-white/50">{log.ip}</td>
                  <td className="px-4 py-3 text-white/50 max-w-[160px] truncate font-mono text-xs" title={log.path}>{log.path}</td>
                  <td className="px-4 py-3">
                    <Badge variant={log.action === "block" ? "danger" : log.action === "allow" ? "success" : "warning"}>
                      {log.action === "block" ? "Blocked" : log.action === "allow" ? "Allowed" : "Log only"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${log.confidence > 0.66 ? "bg-red-400" : log.confidence > 0.33 ? "bg-warning" : "bg-white/40"}`}
                          style={{ width: `${log.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-white/50 text-xs font-mono tabular-nums w-8">{(log.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-sm text-white/50">
            <span>
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                ← Prev
              </Button>
              <Button variant="secondary" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                Next →
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
