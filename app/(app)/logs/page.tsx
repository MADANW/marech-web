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
    <div className="p-7 max-w-7xl mx-auto space-y-5">
      <PageHeader
        title="Traffic Logs"
        subtitle="Every request we've inspected — searchable and exportable"
        action={
          <Button variant="secondary" size="sm" className="!rounded-lg" onClick={handleExport}>
            <DownloadIcon className="w-4 h-4" />
            Export CSV
          </Button>
        }
      />

      {/* Summary chips */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Matched", value: filtered.length, icon: ActivityIcon, iconTone: "bg-white/[0.06] text-app-muted" },
          { label: "Blocked", value: filtered.filter((l) => l.action === "block").length, icon: BanIcon, iconTone: "bg-danger/12 text-red-400" },
          { label: "Allowed", value: filtered.filter((l) => l.action === "allow").length, icon: ShieldCheckIcon, iconTone: "bg-success/12 text-success" },
        ].map(({ label, value, icon: Icon, iconTone }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-app-border bg-app-card p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconTone}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xl font-semibold text-app-text tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>{value.toLocaleString()}</div>
              <div className="text-[12px] text-app-muted">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-faint" />
            <input
              type="text"
              placeholder="Search IP, path, or user agent…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-app-border bg-app-inset text-app-text placeholder-app-faint text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
            />
          </div>
          <select
            value={botFilter}
            onChange={(e) => { setBotFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-app-border bg-app-inset text-app-text text-sm outline-none focus:border-accent/50 [&>option]:bg-[#141416]"
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
            className="px-3 py-2 rounded-lg border border-app-border bg-app-inset text-app-text text-sm outline-none focus:border-accent/50 [&>option]:bg-[#141416]"
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
              <tr className="border-b border-app-border bg-app-inset text-left">
                <th className="px-4 py-3 text-xs font-medium text-app-muted">Timestamp</th>
                <th className="px-4 py-3 text-xs font-medium text-app-muted">User agent</th>
                <th className="px-4 py-3 text-xs font-medium text-app-muted">Bot type</th>
                <th className="px-4 py-3 text-xs font-medium text-app-muted">IP</th>
                <th className="px-4 py-3 text-xs font-medium text-app-muted">Path</th>
                <th className="px-4 py-3 text-xs font-medium text-app-muted">Action</th>
                <th className="px-4 py-3 text-xs font-medium text-app-muted">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border-faint">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-app-faint text-sm">
                    No logs match your filters.
                  </td>
                </tr>
              )}
              {visible.map((log) => (
                <tr key={log.id} className="hover:bg-app-hover transition-colors">
                  <td className="px-4 py-3.5 text-app-faint font-mono text-xs whitespace-nowrap">{formatDate(log.timestamp)}</td>
                  <td className="px-4 py-3.5 text-app-text text-[13px] max-w-[200px] truncate" title={log.userAgent}>{log.userAgent}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-2 text-xs text-app-muted">
                      <span className={`h-1.5 w-1.5 rounded-full ${BOT_DOT[log.botType]}`} />
                      {log.botType}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-app-faint">{log.ip}</td>
                  <td className="px-4 py-3.5 text-app-faint max-w-[160px] truncate font-mono text-xs" title={log.path}>{log.path}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={log.action === "block" ? "danger" : log.action === "allow" ? "success" : "warning"}>
                      {log.action === "block" ? "Blocked" : log.action === "allow" ? "Allowed" : "Log only"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 rounded-full bg-white/[0.08] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${log.confidence > 0.66 ? "bg-red-400" : log.confidence > 0.33 ? "bg-warning" : "bg-white/40"}`}
                          style={{ width: `${log.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-app-faint text-xs font-mono tabular-nums w-8">{(log.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-app-border flex items-center justify-between text-sm text-app-muted">
            <span className="tabular-nums">
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="!rounded-lg" disabled={page === 0} onClick={() => setPage(page - 1)}>
                ← Prev
              </Button>
              <Button variant="secondary" size="sm" className="!rounded-lg" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                Next →
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
