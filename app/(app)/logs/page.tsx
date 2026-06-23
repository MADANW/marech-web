"use client";
import { useState, useMemo } from "react";
import useSWR from "swr";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import { generateLogs, type LogEntry } from "@/lib/mock";
import { isMock, fetchLogs, downloadCsv } from "@/lib/api";

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
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Traffic Logs</h1>
        <Button variant="secondary" size="sm" onClick={handleExport}>
          <DownloadIcon className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search IP, path, or user agent…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="flex-1 min-w-48 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <select
            value={botFilter}
            onChange={(e) => { setBotFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
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
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
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
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Timestamp</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">User Agent</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Bot Type</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">IP</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Path</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">
                    No logs match your filters.
                  </td>
                </tr>
              )}
              {visible.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">{formatDate(log.timestamp)}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate" title={log.userAgent}>{log.userAgent}</td>
                  <td className="px-4 py-3">
                    <Badge variant="neutral">{log.botType}</Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{log.ip}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate font-mono text-xs" title={log.path}>{log.path}</td>
                  <td className="px-4 py-3">
                    <Badge variant={log.action === "block" ? "danger" : log.action === "allow" ? "success" : "warning"}>
                      {log.action === "block" ? "Blocked" : log.action === "allow" ? "Allowed" : "Log only"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{(log.confidence * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
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

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}
