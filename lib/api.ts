const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://3.144.114.30:3000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

export const isMock = process.env.NEXT_PUBLIC_MOCK !== "false";

function getToken() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("blockme_token") ?? "";
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (res.status === 401) {
    sessionStorage.removeItem("blockme_token");
    document.cookie = "blockme_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Unauthorized");
  }
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
  const token = getToken();
  const res = await fetch(`${BASE}/v1/logs?format=csv&limit=1000`, {
    headers: {
      "X-API-Key": API_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
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

export async function fetchPolicies() {
  return apiFetch<{ policies: unknown[] }>("/v1/policies");
}

export async function createPolicy(data: unknown) {
  return apiFetch<unknown>("/v1/policies", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePolicy(id: number, data: unknown) {
  return apiFetch<unknown>(`/v1/policies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deletePolicy(id: number) {
  return apiFetch<unknown>(`/v1/policies/${id}`, { method: "DELETE" });
}

export async function fetchMe() {
  return apiFetch<unknown>("/auth/me");
}

export async function updateMe(data: { name?: string; websiteUrl?: string; platform?: string }) {
  return apiFetch<unknown>("/auth/me", { method: "PATCH", body: JSON.stringify(data) });
}

export async function updatePassword(data: { currentPassword: string; newPassword: string }) {
  return apiFetch<unknown>("/auth/password", { method: "PATCH", body: JSON.stringify(data) });
}
