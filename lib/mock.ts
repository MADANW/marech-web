export type Action = "block" | "allow" | "log";
export type BotType = "scraper" | "ai_tool" | "local_llm" | "human" | "unknown";
export type AccountStatus = "trial" | "active" | "payment_failed" | "suspended";
export type Plan = "free" | "starter" | "pro" | "enterprise";

export interface LogEntry {
  id: number;
  timestamp: string;
  userAgent: string;
  ip: string;
  path: string;
  action: Action;
  reason: string;
  botType: BotType;
  confidence: number;
}

export interface DayStats {
  date: string;
  total: number;
  blocked: number;
}

export interface Policy {
  id: number;
  name: string;
  enabled: boolean;
  conditions: {
    botTypes?: BotType[];
    pathPatterns?: string[];
    ipRanges?: string[];
  };
  action: Action;
  priority: number;
}

export interface MockAccount {
  email: string;
  websiteUrl: string;
  platform: string;
  plan: Plan;
  status: AccountStatus;
  emailVerified: boolean;
  trialDaysLeft: number;
  usageThisMonth: number;
  planLimit: number;
  snippetId: string;
}

const BOT_NAMES = [
  { ua: "GPTBot/1.0", type: "scraper" as BotType, name: "GPTBot" },
  { ua: "ClaudeBot/1.0", type: "ai_tool" as BotType, name: "ClaudeBot" },
  { ua: "CCBot/2.0", type: "scraper" as BotType, name: "CCBot" },
  { ua: "anthropic-ai/1.0", type: "ai_tool" as BotType, name: "Anthropic" },
  { ua: "PerplexityBot/1.0", type: "ai_tool" as BotType, name: "PerplexityBot" },
  { ua: "Amazonbot/0.1", type: "scraper" as BotType, name: "Amazonbot" },
  { ua: "Mozilla/5.0 (compatible; Googlebot/2.1)", type: "human" as BotType, name: "Googlebot" },
];

const PATHS = [
  "/blog/recipe-pasta",
  "/products/shirt-blue",
  "/about",
  "/pricing",
  "/api/products",
  "/blog/2024-review",
  "/contact",
  "/shop/checkout",
  "/docs/api",
  "/",
];

const IPS = [
  "23.102.140.1",
  "40.77.167.224",
  "66.249.66.1",
  "192.178.1.33",
  "13.65.245.175",
  "52.167.144.90",
  "185.191.171.4",
];

/**
 * Seeded PRNG (mulberry32). The mock is deterministic by default so the
 * server and client render identical markup — no hydration mismatch. Pass
 * `live` for fresh random data in client-only contexts (e.g. the dashboard's
 * polling interval), which run after hydration and so can't cause a mismatch.
 */
function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fixed reference instant so mock timestamps are deterministic. */
const MOCK_NOW = Date.parse("2026-06-28T12:00:00Z");

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function generateLogs(count = 60, live = false): LogEntry[] {
  const rng = live ? Math.random : mulberry32(0x9e3779b9 ^ count);
  const base = live ? Date.now() : MOCK_NOW;
  return Array.from({ length: count }, (_, i) => {
    const bot = pick(BOT_NAMES, rng);
    const isBot = bot.type !== "human";
    return {
      id: count - i,
      timestamp: new Date(base - i * 0.4 * 3_600_000).toISOString(),
      userAgent: bot.ua,
      ip: pick(IPS, rng),
      path: pick(PATHS, rng),
      action: isBot ? "block" : "allow",
      reason: isBot ? "Known AI scraper" : "Human visitor",
      botType: bot.type,
      confidence: isBot ? 0.85 + rng() * 0.14 : 0.1 + rng() * 0.2,
    };
  });
}

export function generateWeekStats(): DayStats[] {
  const rng = mulberry32(0x1234abcd);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(MOCK_NOW);
    d.setUTCDate(d.getUTCDate() - (6 - i));
    const total = 800 + Math.floor(rng() * 600);
    const blocked = Math.floor(total * (0.05 + rng() * 0.12));
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
      total,
      blocked,
    };
  });
}

export const MOCK_ACCOUNT: MockAccount = {
  email: "sarah@foodblog.com",
  websiteUrl: "foodblog.com",
  platform: "WordPress",
  plan: "starter",
  status: "trial",
  emailVerified: true,
  trialDaysLeft: 5,
  usageThisMonth: 45234,
  planLimit: 100000,
  snippetId: "live_abc123xyz",
};

export const MOCK_POLICIES: Policy[] = [
  {
    id: 1,
    name: "Block AI Scrapers",
    enabled: true,
    conditions: { botTypes: ["scraper", "ai_tool"] },
    action: "block",
    priority: 100,
  },
  {
    id: 2,
    name: "Log Local LLMs",
    enabled: true,
    conditions: { botTypes: ["local_llm"] },
    action: "log",
    priority: 80,
  },
  {
    id: 3,
    name: "Protect API routes",
    enabled: false,
    conditions: { pathPatterns: ["/api/*"] },
    action: "block",
    priority: 120,
  },
];

export const MOCK_BILLING_HISTORY = [
  { date: "Jun 1, 2026", description: "Starter Plan", amount: "$25.00", status: "Paid" },
  { date: "May 1, 2026", description: "Starter Plan", amount: "$25.00", status: "Paid" },
  { date: "Apr 1, 2026", description: "Starter Plan", amount: "$25.00", status: "Paid" },
];
