const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://3.144.114.30:3000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

export const isMock = process.env.NEXT_PUBLIC_MOCK !== "false";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      ...init?.headers,
    },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function fetchLogs(params?: {
  limit?: number;
  offset?: number;
  format?: "json" | "csv";
}) {
  const q = new URLSearchParams();
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.offset) q.set("offset", String(params.offset));
  if (params?.format) q.set("format", params.format);
  return apiFetch<{ logs: unknown[]; count: number }>(`/v1/logs?${q}`);
}

export async function downloadCsv() {
  const res = await fetch(`${BASE}/v1/logs?format=csv&limit=1000`, {
    headers: { "X-API-Key": API_KEY },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "blockme-logs.csv";
  a.click();
  URL.revokeObjectURL(url);
}
