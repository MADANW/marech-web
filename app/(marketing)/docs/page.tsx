import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Docs — Marech",
  description: "How Marech protects your site: monitoring vs. blocking, and the integration for each platform.",
};

const PAD = "px-6 sm:px-10 lg:px-16";

const PLATFORMS = [
  { name: "WordPress", href: "/wordpress", blocks: true, note: "Plugin — real server-side blocking" },
  { name: "Custom / HTML", href: "/html", blocks: true, note: "nginx proxy, Cloudflare Worker, or Vercel middleware" },
  { name: "Shopify", href: "/shopify", blocks: true, note: "Custom domain via Cloudflare (storefront pages)" },
  { name: "Webflow", href: "/webflow", blocks: false, note: "Monitoring; block via Cloudflare if fronted" },
  { name: "Ghost", href: "/ghost", blocks: false, note: "Monitoring; block via Cloudflare if fronted" },
  { name: "Wix", href: "/wix", blocks: false, note: "Monitoring only (hosted platform)" },
  { name: "Squarespace", href: "/squarespace", blocks: false, note: "Monitoring only (hosted platform)" },
];

export default function DocsPage() {
  return (
    <div className="py-24">
      <div className={`${PAD} max-w-4xl mx-auto`}>
        <div className="mb-14">
          <span className="text-eyebrow text-mars-ember block mb-3">Documentation</span>
          <h1 className="text-5xl font-bold text-white tracking-[-0.02em] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Docs
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Marech works in two modes. Understand the difference first — it decides what you can
            actually stop.
          </p>
        </div>

        {/* Two tiers */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          <div className="mars-card--marketing rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-2">1 · Monitoring (the snippet)</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Paste one line of JavaScript into your site&apos;s <code>&lt;head&gt;</code>. It runs
              in the visitor&apos;s browser, reports traffic to your dashboard, and overlays
              JS-running bots. Works anywhere — but a non-JS scraper never runs it, so it can&apos;t
              block those.
            </p>
          </div>
          <div className="mars-card--marketing rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-2">2 · Blocking (the edge integration)</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              A Cloudflare Worker, WordPress plugin, Vercel middleware, or nginx proxy checks each
              request <em>before</em> your content is served and returns a 403 for bots. This is
              the only thing that stops curl / python-requests / GPTBot. Needs an{" "}
              <Link href="/keys" className="text-accent hover:underline">API key</Link> and a{" "}
              <Link href="/policies" className="text-accent hover:underline">block policy</Link>.
            </p>
          </div>
        </div>

        {/* Per-platform */}
        <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Guides by platform
        </h2>
        <div className="space-y-3 mb-16">
          {PLATFORMS.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="mars-card--marketing flex items-center justify-between gap-4 rounded-xl p-5 hover:border-white/20 transition-colors"
            >
              <div>
                <div className="font-semibold text-white">{p.name}</div>
                <div className="text-xs text-white/50 mt-0.5">{p.note}</div>
              </div>
              <span className={`text-eyebrow shrink-0 ${p.blocks ? "text-mars-ember" : "text-white/35"}`}>
                {p.blocks ? "Can block" : "Monitor only"}
              </span>
            </Link>
          ))}
        </div>

        <div className="mars-card--marketing rounded-xl p-5 mb-16 text-sm text-white/60">
          Looking for the integration source (WordPress plugin, Cloudflare Worker, nginx config,
          Vercel middleware)? It lives in the{" "}
          <a href="https://github.com/MADANW/marech-BD/tree/main/integrations" className="text-accent hover:underline">
            marech-BD <code>integrations/</code> directory
          </a>{" "}
          on GitHub, with setup instructions for each.
        </div>

        {/* CTA */}
        <div className="mars-card--marketing rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Ready to start?
          </h2>
          <p className="text-white/60 mb-6">Free 7-day trial. Monitor in minutes, block when you&apos;re ready.</p>
          <Link href="/signup">
            <Button variant="accent" size="lg">Start Free Trial</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
