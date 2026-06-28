"use client";
import { Fragment, useMemo, useState } from "react";
import useSWR from "swr";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tooltip } from "@/components/ui/Tooltip";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { LocalTime } from "@/components/ui/LocalTime";
import { useToast } from "@/components/ui/Toast";
import {
  DownloadIcon, SearchIcon, ActivityIcon, BanIcon, ShieldCheckIcon, ChevronRightIcon, InboxIcon,
} from "@/components/ui/icons";
import { generateLogs, type LogEntry, type BotType } from "@/lib/mock";
import { isMock, fetchLogs, downloadCsv } from "@/lib/api";
import { cn } from "@/lib/utils";

const BOT_DOT: Record<BotType, string> = {
  scraper: "bg-red-400",
  ai_tool: "bg-accent",
  local_llm: "bg-purple-400",
  human: "bg-success",
  unknown: "bg-white/40",
};

const MOCK_LOGS = generateLogs(120);

const RANGES = [
  { id: "24h", label: "24h", hours: 24 },
  { id: "7d", label: "7 days", hours: 24 * 7 },
  { id: "30d", label: "30 days", hours: 24 * 30 },
  { id: "all", label: "All", hours: Infinity },
] as const;
type RangeId = (typeof RANGES)[number]["id"];

const columnHelper = createColumnHelper<LogEntry>();

export default function LogsPage() {
  const toast = useToast();
  const { data: apiData, isLoading } = useSWR(isMock ? null : "logs", () => fetchLogs({ limit: 120 }));
  const ALL_LOGS: LogEntry[] = isMock ? MOCK_LOGS : ((apiData?.logs ?? []) as LogEntry[]);
  const loading = !isMock && isLoading;

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([{ id: "timestamp", desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [range, setRange] = useState<RangeId>("all");
  const [dense, setDense] = useState(false);
  const [colMenu, setColMenu] = useState(false);

  // Date-range filter, relative to the most recent log so presets work on mock data.
  const rangedLogs = useMemo(() => {
    const hours = RANGES.find((r) => r.id === range)!.hours;
    if (!isFinite(hours) || ALL_LOGS.length === 0) return ALL_LOGS;
    const newest = Math.max(...ALL_LOGS.map((l) => new Date(l.timestamp).getTime()));
    const cutoff = newest - hours * 3_600_000;
    return ALL_LOGS.filter((l) => new Date(l.timestamp).getTime() >= cutoff);
  }, [ALL_LOGS, range]);

  const botFilter = (columnFilters.find((f) => f.id === "botType")?.value as string) ?? "all";
  const actionFilter = (columnFilters.find((f) => f.id === "action")?.value as string) ?? "all";
  const setColFilter = (id: string, value: string) =>
    setColumnFilters((prev) => {
      const rest = prev.filter((f) => f.id !== id);
      return value === "all" ? rest : [...rest, { id, value }];
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = useMemo<ColumnDef<LogEntry, any>[]>(() => [
    columnHelper.display({
      id: "expander",
      header: () => null,
      cell: ({ row }) => (
        <button
          onClick={row.getToggleExpandedHandler()}
          aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
          className="flex h-6 w-6 items-center justify-center rounded text-app-faint hover:bg-app-hover hover:text-app-text"
        >
          <ChevronRightIcon className={cn("h-4 w-4 transition-transform", row.getIsExpanded() && "rotate-90")} />
        </button>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("timestamp", {
      header: "Timestamp",
      cell: (info) => <LocalTime ts={info.getValue()} mode="date" className="font-mono text-xs text-app-faint" />,
    }),
    columnHelper.accessor("userAgent", {
      header: "User agent",
      cell: (info) => (
        <Tooltip content={info.getValue()}>
          <span className="block max-w-[220px] truncate text-[13px] text-app-text">{info.getValue()}</span>
        </Tooltip>
      ),
    }),
    columnHelper.accessor("botType", {
      header: "Bot type",
      filterFn: "equalsString",
      cell: (info) => (
        <span className="inline-flex items-center gap-2 text-xs text-app-muted">
          <span className={cn("h-1.5 w-1.5 rounded-full", BOT_DOT[info.getValue() as BotType])} />
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("ip", {
      header: "IP",
      cell: (info) => <span className="font-mono text-xs text-app-faint">{info.getValue()}</span>,
    }),
    columnHelper.accessor("path", {
      header: "Path",
      cell: (info) => (
        <Tooltip content={info.getValue()}>
          <span className="block max-w-[160px] truncate font-mono text-xs text-app-faint">{info.getValue()}</span>
        </Tooltip>
      ),
    }),
    columnHelper.accessor("action", {
      header: "Action",
      filterFn: "equalsString",
      cell: (info) => (
        <Badge variant={info.getValue() === "block" ? "danger" : info.getValue() === "allow" ? "success" : "warning"}>
          {info.getValue() === "block" ? "Blocked" : info.getValue() === "allow" ? "Allowed" : "Log only"}
        </Badge>
      ),
    }),
    columnHelper.accessor("confidence", {
      header: "Confidence",
      cell: (info) => {
        const c = info.getValue();
        return (
          <Tooltip content={`${(c * 100).toFixed(1)}% confidence`}>
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className={cn("h-full rounded-full", c > 0.66 ? "bg-red-400" : c > 0.33 ? "bg-warning" : "bg-white/40")}
                  style={{ width: `${c * 100}%` }}
                />
              </div>
              <span className="w-8 font-mono text-xs tabular-nums text-app-faint">{(c * 100).toFixed(0)}%</span>
            </div>
          </Tooltip>
        );
      },
    }),
  ], []);

  const table = useReactTable({
    data: rangedLogs,
    columns,
    state: { globalFilter, sorting, columnFilters, columnVisibility },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    initialState: { pagination: { pageSize: 25 } },
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const counts = {
    matched: filteredRows.length,
    blocked: filteredRows.filter((r) => r.original.action === "block").length,
    allowed: filteredRows.filter((r) => r.original.action === "allow").length,
  };
  const hasFilters = !!globalFilter || botFilter !== "all" || actionFilter !== "all" || range !== "all";
  const clearAll = () => { setGlobalFilter(""); setColumnFilters([]); setRange("all"); };

  const handleExport = () => {
    if (!isMock) {
      downloadCsv().then(() => toast.success("Export started", "Your CSV download will begin shortly.")).catch(() => toast.error("Export failed", "Could not download logs. Try again."));
      return;
    }
    const headers = "Timestamp,User Agent,Bot Type,IP,Path,Action,Confidence\n";
    const rows = filteredRows.map((r) => {
      const l = r.original;
      return `"${l.timestamp}","${l.userAgent}","${l.botType}","${l.ip}","${l.path}","${l.action}","${(l.confidence * 100).toFixed(0)}%"`;
    }).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marech-logs.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Logs exported", `${filteredRows.length.toLocaleString()} rows saved to marech-logs.csv`);
  };

  const rowPad = dense ? "py-2" : "py-3.5";
  const pg = table.getState().pagination;
  const colSpan = table.getVisibleLeafColumns().length;

  return (
    <div className="p-7 max-w-7xl mx-auto space-y-5">
      <PageHeader
        title="Traffic Logs"
        subtitle="Every request we've inspected — searchable and exportable"
        action={
          <Button variant="secondary" size="sm" className="!rounded-lg" onClick={handleExport}>
            <DownloadIcon className="w-4 h-4" /> Export CSV
          </Button>
        }
      />

      {/* Summary chips */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Matched", value: counts.matched, icon: ActivityIcon, iconTone: "bg-white/[0.06] text-app-muted" },
          { label: "Blocked", value: counts.blocked, icon: BanIcon, iconTone: "bg-danger/12 text-red-400" },
          { label: "Allowed", value: counts.allowed, icon: ShieldCheckIcon, iconTone: "bg-success/12 text-success" },
        ].map(({ label, value, icon: Icon, iconTone }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl mars-card p-4">
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", iconTone)}>
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xl font-semibold tabular-nums text-app-text" style={{ fontFamily: "var(--font-mono)" }}>{value.toLocaleString()}</div>
              <div className="text-[12px] text-app-muted">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <Card padding="sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-48 flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-faint" />
            <input
              type="text"
              placeholder="Search IP, path, or user agent…"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full rounded-lg border border-app-border bg-app-inset py-2 pl-9 pr-3 text-sm text-app-text placeholder-app-faint outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
            />
          </div>

          {/* Date range presets */}
          <div className="flex rounded-lg border border-app-border bg-app-inset p-0.5">
            {RANGES.map((r) => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                  range === r.id ? "bg-app-card text-app-text" : "text-app-muted hover:text-app-text"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <select
            value={botFilter}
            onChange={(e) => setColFilter("botType", e.target.value)}
            className="rounded-lg border border-app-border bg-app-inset px-3 py-2 text-sm text-app-text outline-none focus:border-accent/50 [&>option]:bg-[#141416]"
          >
            <option value="all">All bot types</option>
            <option value="scraper">scraper</option>
            <option value="ai_tool">ai_tool</option>
            <option value="local_llm">local_llm</option>
            <option value="human">human</option>
            <option value="unknown">unknown</option>
          </select>
          <select
            value={actionFilter}
            onChange={(e) => setColFilter("action", e.target.value)}
            className="rounded-lg border border-app-border bg-app-inset px-3 py-2 text-sm text-app-text outline-none focus:border-accent/50 [&>option]:bg-[#141416]"
          >
            <option value="all">All actions</option>
            <option value="block">Blocked</option>
            <option value="allow">Allowed</option>
            <option value="log">Log only</option>
          </select>

          {/* Density */}
          <Tooltip content={dense ? "Comfortable rows" : "Compact rows"}>
            <button
              onClick={() => setDense((d) => !d)}
              aria-label="Toggle density"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-app-border bg-app-inset text-app-muted hover:text-app-text"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                {dense ? <path d="M4 7h16M4 12h16M4 17h16" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </Tooltip>

          {/* Column visibility */}
          <div className="relative">
            <button
              onClick={() => setColMenu((o) => !o)}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-app-border bg-app-inset px-3 text-sm text-app-muted hover:text-app-text"
            >
              Columns
              <ChevronRightIcon className={cn("h-3.5 w-3.5 transition-transform", colMenu ? "-rotate-90" : "rotate-90")} />
            </button>
            {colMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setColMenu(false)} />
                <div className="mars-card absolute right-0 z-20 mt-1 w-44 rounded-lg py-1 shadow-2xl">
                  {table.getAllLeafColumns().filter((c) => c.getCanHide()).map((c) => (
                    <label key={c.id} className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm text-app-muted hover:bg-app-hover hover:text-app-text">
                      <input type="checkbox" checked={c.getIsVisible()} onChange={c.getToggleVisibilityHandler()} className="accent-[#e2562a]" />
                      <span className="capitalize">{c.id === "userAgent" ? "User agent" : c.id === "botType" ? "Bot type" : c.id}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearAll}>Clear filters</Button>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="max-h-[60vh] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-app-border bg-app-inset/95 text-left backdrop-blur">
                  {hg.headers.map((header) => {
                    const sortable = header.column.getCanSort();
                    const sorted = header.column.getIsSorted();
                    return (
                      <th key={header.id} className="px-4 py-3 text-xs font-medium text-app-muted">
                        {header.isPlaceholder ? null : sortable ? (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1 hover:text-app-text"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <span className="text-app-faint">{sorted === "asc" ? "▲" : sorted === "desc" ? "▼" : "↕"}</span>
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-app-border-faint">
              {loading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={`sk-${i}`}>
                    {Array.from({ length: colSpan }).map((__, j) => (
                      <td key={j} className={cn("px-4", rowPad)}><Skeleton className="h-4 w-full" /></td>
                    ))}
                  </tr>
                ))}

              {!loading && table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <tr className="hover:bg-app-hover transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={cn("px-4", rowPad)}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr key={`${row.id}-detail`} className="bg-app-inset/40">
                      <td colSpan={colSpan} className="px-4 py-4">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 pl-10 text-xs sm:grid-cols-4">
                          <Detail label="User agent" value={row.original.userAgent} mono full />
                          <Detail label="IP address" value={row.original.ip} mono />
                          <Detail label="Path" value={row.original.path} mono />
                          <Detail label="Bot type" value={row.original.botType} />
                          <Detail label="Action" value={row.original.action} />
                          <Detail label="Confidence" value={`${(row.original.confidence * 100).toFixed(1)}%`} />
                          <Detail label="Reason" value={row.original.reason} />
                          <Detail label="Timestamp" value={row.original.timestamp} mono />
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>

          {!loading && filteredRows.length === 0 && (
            <EmptyState
              icon={<InboxIcon className="h-6 w-6" />}
              title="No requests match your filters"
              description="Try a wider date range or clear the active filters."
              action={hasFilters ? <Button variant="secondary" size="sm" className="!rounded-lg" onClick={clearAll}>Clear filters</Button> : undefined}
            />
          )}
        </div>

        {/* Pagination */}
        {filteredRows.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-app-border px-4 py-3 text-sm text-app-muted">
            <div className="flex items-center gap-2">
              <span className="tabular-nums">
                {pg.pageIndex * pg.pageSize + 1}–{Math.min((pg.pageIndex + 1) * pg.pageSize, filteredRows.length)} of {filteredRows.length.toLocaleString()}
              </span>
              <select
                value={pg.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="rounded-md border border-app-border bg-app-inset px-2 py-1 text-xs text-app-muted outline-none [&>option]:bg-[#141416]"
              >
                {[25, 50, 100].map((n) => <option key={n} value={n}>{n} / page</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="tabular-nums text-app-faint">Page {pg.pageIndex + 1} of {table.getPageCount()}</span>
              <Button variant="secondary" size="sm" className="!rounded-lg" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>← Prev</Button>
              <Button variant="secondary" size="sm" className="!rounded-lg" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next →</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Detail({ label, value, mono, full }: { label: string; value: string; mono?: boolean; full?: boolean }) {
  return (
    <div className={cn(full && "col-span-2 sm:col-span-4")}>
      <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-app-faint">{label}</div>
      <div className={cn("mt-0.5 break-all text-app-text", mono && "font-mono")}>{value}</div>
    </div>
  );
}
