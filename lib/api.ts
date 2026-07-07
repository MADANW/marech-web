const BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.marech.tech";

// Mock mode is opt-in: only NEXT_PUBLIC_MOCK="true" (inlined at build time)
// shows demo data. Any other value — including unset — talks to the real API,
// so a missing or mistyped env var can never ship mock data to production.
export const isMock = process.env.NEXT_PUBLIC_MOCK === "true";
export const apiBase = BASE;

const TOKEN_KEY = "marech_token";

/* ----------------------------- token storage ----------------------------- */
// Stored in localStorage (persists across tabs/reloads) and mirrored to a
// cookie so the route middleware (proxy.ts) can gate the portal routes.

export function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  // 7 days, matches the backend JWT lifetime.
  document.cookie = `${TOKEN_KEY}=${token}; path=/; SameSite=Lax; max-age=604800`;
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/* ----------------------------- fetch helpers ----------------------------- */

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

/* ----------------------------- auth ----------------------------- */

export async function loginWithGoogle(credential: string) {
  const res = await fetch(`${BASE}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });
  if (!res.ok) throw new Error("Google sign-in failed");
  return res.json() as Promise<{ token: string; user: unknown }>;
}

export async function fetchMe() {
  return apiFetch<unknown>("/auth/me");
}

/** Redeem the email-verification token from the link in the signup email. Public. */
export async function verifyEmail(token: string) {
  const res = await fetch(`${BASE}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error ?? "Verification failed");
  return body as { message: string; user: unknown };
}

/** Ask the API to send a fresh verification email. Public, rate-limited. */
export async function resendVerification(email: string) {
  const res = await fetch(`${BASE}/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Could not resend verification email");
  return res.json() as Promise<{ message: string }>;
}

export async function updateMe(data: { name?: string; websiteUrl?: string; platform?: string }) {
  return apiFetch<unknown>("/auth/me", { method: "PATCH", body: JSON.stringify(data) });
}

export async function updatePassword(data: { currentPassword: string; newPassword: string }) {
  return apiFetch<unknown>("/auth/password", { method: "PATCH", body: JSON.stringify(data) });
}

export async function deleteAccount() {
  return apiFetch<unknown>("/auth/me", { method: "DELETE" });
}

/* ----------------------------- traffic logs ----------------------------- */

export async function fetchLogs(params?: { limit?: number; offset?: number; format?: "json" | "csv" }) {
  const q = new URLSearchParams();
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.offset) q.set("offset", String(params.offset));
  if (params?.format) q.set("format", params.format);
  return apiFetch<{ logs: unknown[]; count: number }>(`/v1/logs?${q}`);
}

export async function downloadCsv() {
  const token = getToken();
  const res = await fetch(`${BASE}/v1/logs?format=csv&limit=1000`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "marech-logs.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* ----------------------------- policies ----------------------------- */

export async function fetchPolicies() {
  return apiFetch<{ policies: unknown[] }>("/v1/policies");
}

export async function createPolicy(data: unknown) {
  return apiFetch<unknown>("/v1/policies", { method: "POST", body: JSON.stringify(data) });
}

export async function updatePolicy(id: number | string, data: unknown) {
  return apiFetch<unknown>(`/v1/policies/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function deletePolicy(id: number | string) {
  return apiFetch<unknown>(`/v1/policies/${id}`, { method: "DELETE" });
}

/* ----------------------------- API keys ----------------------------- */
// Keys authenticate the server-side enforcement integrations (nginx proxy,
// Cloudflare Worker, WordPress plugin) that call POST /v1/enforce. The raw
// key is returned by the backend only once, at creation.

export interface ApiKey {
  id: number;
  name: string;
  siteUrl: string | null;
  createdAt: string;
  revoked: boolean;
}

export async function listKeys() {
  return apiFetch<{ keys: ApiKey[] }>("/v1/keys");
}

export async function createKey(name: string, siteUrl?: string) {
  return apiFetch<{ id: number; key: string; name: string; message: string }>("/v1/keys", {
    method: "POST",
    body: JSON.stringify({ name, ...(siteUrl ? { siteUrl } : {}) }),
  });
}

export async function revokeKey(id: number) {
  return apiFetch<{ message: string }>(`/v1/keys/${id}`, { method: "DELETE" });
}

/* ----------------------------- billing (Stripe) ----------------------------- */

/** Start Stripe Checkout for a plan; returns a URL to redirect the user to. */
export async function startCheckout(plan: "starter" | "pro" | "enterprise") {
  return apiFetch<{ url: string }>("/billing/checkout", {
    method: "POST",
    body: JSON.stringify({ plan }),
  });
}

/** Open the Stripe billing portal (update card, invoices, cancel). */
export async function openBillingPortal() {
  return apiFetch<{ url: string }>("/billing/portal", { method: "POST" });
}

/* ----------------------------- snippet ----------------------------- */

/** Public URL of an account's protection snippet, served by the API/CDN. */
export function snippetUrl(snippetId: string): string {
  const cdn = process.env.NEXT_PUBLIC_CDN_URL ?? BASE;
  return `${cdn}/cdn/${snippetId}.js`;
}
