import Link from "next/link";
import { CopyableCode } from "@/components/marketing/CopyableCode";
import {
  DocHero,
  TableOfContents,
  DocSection,
  Callout,
  FeatureGrid,
  NextSteps,
  DocCTA,
} from "@/components/marketing/DocsKit";

export const metadata = {
  title: "Docs — Marech",
  description:
    "How Marech protects your site from AI scrapers: the two protection modes, core concepts, architecture, detection, and a setup guide for every platform.",
};

/** Every platform guide, grouped by whether real server-side blocking is possible. */
const CAN_BLOCK = [
  { name: "WordPress", href: "/wordpress", note: "Plugin — native server-side blocking, no proxy needed" },
  { name: "Custom / HTML", href: "/html", note: "nginx proxy, Cloudflare Worker, or Vercel middleware" },
  { name: "Next.js / React", href: "/nextjs", note: "Edge middleware or Cloudflare Worker" },
  { name: "Shopify", href: "/shopify", note: "Custom domain via Cloudflare (storefront pages)" },
  { name: "Webflow", href: "/webflow", note: "Block via Cloudflare when fronted" },
  { name: "Ghost", href: "/ghost", note: "Block via Cloudflare when fronted" },
];

const MONITOR_ONLY = [
  { name: "Wix", href: "/wix", note: "Fully hosted platform" },
  { name: "Squarespace", href: "/squarespace", note: "Fully hosted platform" },
  { name: "Framer", href: "/framer", note: "Managed hosting & SSL" },
  { name: "Duda", href: "/duda", note: "Fully hosted platform" },
  { name: "Blogger", href: "/blogger", note: "Hosted by Google" },
];

const CONCEPTS = [
  {
    eyebrow: "Concept",
    title: "The snippet",
    body: (
      <>
        One line of JavaScript served per account. Runs in the visitor&apos;s browser, reports page
        views, and overlays JS-running bots. Find yours on the{" "}
        <Link href="/snippet" className="text-accent hover:underline">Snippet</Link> page.
      </>
    ),
  },
  {
    eyebrow: "Concept",
    title: "API key",
    body: (
      <>
        A secret <code>bm_</code> key that authenticates your server-side integration. Created on the{" "}
        <Link href="/keys" className="text-accent hover:underline">API Keys</Link> page and shown
        once at creation.
      </>
    ),
  },
  {
    eyebrow: "Concept",
    title: "Policy",
    body: (
      <>
        The rules that decide what gets blocked — by bot type, path, or schedule. Enforcement honors
        the same policies the dashboard shows. Manage them on{" "}
        <Link href="/policies" className="text-accent hover:underline">Policies</Link>.
      </>
    ),
  },
  {
    eyebrow: "Concept",
    title: "Traffic logs",
    body: (
      <>
        Every decision — bot type, path, action — recorded and scoped to your account. Browse or
        export them from{" "}
        <Link href="/logs" className="text-accent hover:underline">Traffic Logs</Link>.
      </>
    ),
  },
  {
    eyebrow: "Concept",
    title: "Fail-open",
    body: "Every server-side integration serves your page normally if Marech is ever unreachable or slow. Protection can never take your site offline.",
  },
  {
    eyebrow: "Concept",
    title: "Monitor vs. block",
    body: "Monitoring sees traffic (any platform). Blocking stops non-JS scrapers before content is served (only where you control the edge). Most people monitor first, then block.",
  },
];

const DETECTION = [
  {
    eyebrow: "01",
    title: "Known-bot database",
    body: "A continuously updated list of known AI scrapers and crawlers — GPTBot, ClaudeBot, CCBot, Amazonbot, PerplexityBot, and more — matched on each request.",
  },
  {
    eyebrow: "02",
    title: "Behavior signals",
    body: "Requests that look automated — missing or inconsistent headers, non-human timing, and whether the client executes JavaScript — are weighed together, so bots that spoof a browser user-agent still stand out.",
  },
  {
    eyebrow: "03",
    title: "Network origin",
    body: "Real people browse from home and mobile networks; scrapers tend to run from cloud datacenters. Requests from datacenter ranges are flagged accordingly.",
  },
];

const ARCHITECTURE = `Monitoring (any platform)
  Browser ──▶ your site ──▶ loads snippet ──▶ POST /v1/decisions ──▶ Dashboard
                                                (reports the visit)

Blocking (where you control the edge)
  Scraper ──▶ [edge check] ──▶ POST /v1/enforce ──▶ block?  ──▶ 403 (content never served)
              worker/plugin/                                 └▶ allow ──▶ your origin
              middleware/nginx`;

export default function DocsPage() {
  return (
    <div className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <DocHero
          eyebrow="Documentation"
          title="Marech Docs"
          lede={
            <>
              Marech stops AI scrapers from harvesting your website&apos;s content. It works in two
              modes — monitor anywhere, block where you control the edge. Start here to understand
              the difference, then jump to the guide for your platform.
            </>
          }
        />

        <TableOfContents
          items={[
            { href: "#start", label: "Start here" },
            { href: "#modes", label: "The two protection modes" },
            { href: "#concepts", label: "Core concepts" },
            { href: "#architecture", label: "How it fits together" },
            { href: "#detection", label: "How detection works" },
            { href: "#platforms", label: "Guides by platform" },
            { href: "#reference", label: "Reference" },
          ]}
        />

        {/* Start here */}
        <DocSection
          id="start"
          title="Start here"
          lede="Three ways in, depending on what you want to do right now."
        >
          <NextSteps
            items={[
              { href: "/snippet", title: "1 · Add the snippet", body: "Paste one line into your <head> to start monitoring scraper traffic in minutes." },
              { href: "#platforms", title: "2 · Find your platform", body: "Exact click-by-click steps for WordPress, Shopify, Next.js, and more." },
              { href: "/keys", title: "3 · Turn on blocking", body: "Create an API key + policy and deploy an edge integration to return 403s to scrapers." },
            ]}
          />
        </DocSection>

        {/* Two modes */}
        <DocSection
          id="modes"
          title="The two protection modes"
          lede="Understand this first — it decides what you can actually stop."
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="mars-card--marketing rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-2">1 · Monitoring (the snippet)</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Paste one line of JavaScript into your site&apos;s <code>&lt;head&gt;</code>. It runs
                in the visitor&apos;s browser, reports traffic to your dashboard, and overlays
                JS-running bots. Works anywhere — but a non-JS scraper never runs it, so it
                can&apos;t block those.
              </p>
            </div>
            <div className="mars-card--marketing rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-2">2 · Blocking (the edge integration)</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                A Cloudflare Worker, WordPress plugin, Vercel middleware, or nginx proxy checks each
                request <em>before</em> your content is served and returns a 403 for bots. This is
                the only thing that stops curl / python-requests / GPTBot. Needs an{" "}
                <Link href="/keys" className="text-accent hover:underline">API key</Link> and a{" "}
                <Link href="/policies" className="text-accent hover:underline">block policy</Link>.
              </p>
            </div>
          </div>
          <Callout tone="info" title="The key point">
            A client-side script can only act on clients that run JavaScript. The scrapers most
            people care about download the HTML directly and never run it. To actually block those,
            you must enforce server-side — which is only possible where you control the request path.
          </Callout>
        </DocSection>

        {/* Concepts */}
        <DocSection
          id="concepts"
          title="Core concepts"
          lede="The handful of terms that show up across the dashboard and these guides."
        >
          <FeatureGrid items={CONCEPTS} columns={3} />
        </DocSection>

        {/* Architecture */}
        <DocSection
          id="architecture"
          title="How it fits together"
          lede="Two request paths: the snippet reports visits for monitoring; the edge check enforces blocking before your origin responds."
        >
          <div className="mars-card--marketing rounded-xl p-5 overflow-x-auto">
            <pre className="text-[12.5px] leading-relaxed text-white/70 font-mono whitespace-pre">
              {ARCHITECTURE}
            </pre>
          </div>
          <p className="text-sm text-white/50 mt-4">
            Your dashboard data is scoped to your account, and both paths evaluate the same policies —
            so what counts as a bot is consistent whether you&apos;re only monitoring or actively
            blocking.
          </p>
        </DocSection>

        {/* Detection */}
        <DocSection
          id="detection"
          title="How detection works"
          lede="Marech weighs several independent signals to tell an automated scraper from a real visitor. At a high level:"
        >
          <FeatureGrid items={DETECTION} columns={3} />
          <p className="text-sm text-white/50 mt-4">
            You stay in control of what happens to a flagged request via{" "}
            <Link href="/policies" className="text-accent hover:underline">policies</Link>. For a
            walkthrough of the decision flow, see{" "}
            <Link href="/how-it-works" className="text-accent hover:underline">How Marech Works</Link>.
          </p>
        </DocSection>

        {/* Platform directory */}
        <DocSection
          id="platforms"
          title="Guides by platform"
          lede="Whether a platform can block comes down to who owns the request path. If you (or Cloudflare) can sit in front of the server, you can block; fully-hosted builders can only monitor."
        >
          <h3 className="text-sm font-semibold text-mars-ember mb-3 flex items-center gap-2">
            <span className="text-eyebrow">Real blocking</span>
          </h3>
          <div className="space-y-3 mb-8">
            {CAN_BLOCK.map((p) => (
              <PlatformRow key={p.name} {...p} blocks />
            ))}
          </div>

          <h3 className="text-sm font-semibold text-white/40 mb-3">
            <span className="text-eyebrow">Monitoring only</span>
          </h3>
          <div className="space-y-3">
            {MONITOR_ONLY.map((p) => (
              <PlatformRow key={p.name} {...p} />
            ))}
          </div>

          <div className="mars-card--marketing rounded-xl p-5 mt-8 text-sm text-white/60">
            Looking for the integration source (WordPress plugin, Cloudflare Worker, nginx config,
            Vercel middleware)? It lives in the{" "}
            <a
              href="https://github.com/MADANW/marech-BD/tree/main/integrations"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              marech-BD <code>integrations/</code> directory
            </a>{" "}
            on GitHub, with setup instructions for each.
          </div>
        </DocSection>

        {/* Reference */}
        <DocSection
          id="reference"
          title="Reference"
          lede="Quick commands to confirm each mode is working. Swap in your own snippet ID, API key, and domain."
        >
          <div className="space-y-5">
            <div>
              <div className="text-sm font-semibold text-white mb-2">
                Confirm the snippet is served for your account
              </div>
              <CopyableCode code={"curl https://api.marech.tech/cdn/<snippetId>.js"} label="monitoring" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-2">
                Confirm blocking (a scraper gets 403, a browser gets 200)
              </div>
              <CopyableCode
                code={
                  'curl -i -X POST https://api.marech.tech/v1/enforce \\\n' +
                  '  -H "Content-Type: application/json" -H "X-API-Key: bm_..." \\\n' +
                  '  -d \'{"userAgent":"Mozilla/5.0 (compatible; GPTBot/1.0)","ip":"1.2.3.4","path":"/"}\''
                }
                label="blocking"
              />
              <p className="text-sm text-white/50 mt-2">
                A blocked request responds with <code>403</code> and the header{" "}
                <code>X-Blockme-Action: block</code>.
              </p>
            </div>
          </div>
        </DocSection>

        <DocCTA
          title="Ready to start?"
          body="Free 7-day trial. Monitor in minutes, block when you're ready."
        />
      </div>
    </div>
  );
}

function PlatformRow({
  name,
  href,
  note,
  blocks = false,
}: {
  name: string;
  href: string;
  note: string;
  blocks?: boolean;
}) {
  return (
    <Link
      href={href}
      className="mars-card--marketing flex items-center justify-between gap-4 rounded-xl p-5 hover:border-white/20 transition-colors"
    >
      <div>
        <div className="font-semibold text-white">{name}</div>
        <div className="text-xs text-white/50 mt-0.5">{note}</div>
      </div>
      <span className={`text-eyebrow shrink-0 ${blocks ? "text-mars-ember" : "text-white/35"}`}>
        {blocks ? "Can block" : "Monitor only"}
      </span>
    </Link>
  );
}
