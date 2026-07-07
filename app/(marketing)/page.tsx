import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { AnalyticsMockup } from "@/components/marketing/AnalyticsMockup";
import { AnimatedTerminal } from "@/components/marketing/AnimatedTerminal";
import { OrbitingPlatforms } from "@/components/marketing/OrbitingPlatforms";
import { FadeIn } from "@/components/ui/FadeIn";
import { NumberTicker } from "@/components/ui/number-ticker";
import { CheckIcon, ActivityIcon, ZapIcon } from "@/components/ui/icons";

export const metadata = {
  title: "Marech — Stop AI from Stealing Your Content",
  description: "See AI scrapers hitting your site in minutes, then block ChatGPT, Claude, GPTBot and more at the edge with a drop-in integration.",
};

const PAD = "px-6 sm:px-10 lg:px-16";

export default function LandingPage() {
  return (
    <>
      {/* ── Hero — text left, live threat feed bleeding right ── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-[1fr_1fr] items-stretch min-h-[75vh]">
          <FadeIn className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 pb-8 md:pb-0 md:pr-6">
            <span className="text-eyebrow text-mars-ember mb-6">Planetary-grade content defence</span>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.02] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Stop AI bots
              <br />
              before they
              <br />
              <span className="text-mars-ember">strike.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-md mb-8 leading-relaxed">
              Drop in one snippet to see every AI scraper hitting your site.
              Add the edge integration to block them for real — GPTBot, ChatGPT,
              Claude, and more.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/signup">
                <Button variant="accent" size="lg">Start Free Trial →</Button>
              </Link>
              <Link href="/how-it-works">
                <InteractiveHoverButton className="border-white/25">See How It Works</InteractiveHoverButton>
              </Link>
            </div>
            <div className="text-eyebrow flex flex-wrap gap-4 text-white/35">
              <span>7-day free trial</span>
              <span className="text-white/15">·</span>
              <span>No credit card</span>
              <span className="text-white/15">·</span>
              <span>2 min setup</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="left" className="self-stretch pl-4 pr-6 sm:pr-10 py-6 md:py-10">
            <AnalyticsMockup />
          </FadeIn>
        </div>
      </section>

      {/* ── Telemetry strip — mono numerals over hairlines ── */}
      <section className={`${PAD} pb-20`}>
        <FadeIn>
          <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-3 border-y border-app-border divide-y sm:divide-y-0 sm:divide-x divide-app-border">
            {STATS.map((s) => (
              <div key={s.label} className="py-6 sm:px-8 first:sm:pl-0">
                <div
                  className="text-4xl sm:text-[2.75rem] font-bold text-white flex items-baseline gap-0.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <NumberTicker value={s.value} decimalPlaces={s.decimals ?? 0} className="text-white" />
                  {s.suffix && <span className="text-mars-ember">{s.suffix}</span>}
                </div>
                <div className="text-eyebrow text-white/40 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Why Marech — orbit left, feature cards right ── */}
      <section className={`${PAD} py-20`}>
        <div className="grid md:grid-cols-[5fr_6fr] gap-16 items-start">
          <FadeIn direction="right">
            <OrbitingPlatforms />
          </FadeIn>

          <div>
            <FadeIn>
              <span className="text-eyebrow text-mars-ember block mb-3">Why Marech</span>
              <h2
                className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Protection that
                <br />
                just works.
              </h2>
            </FadeIn>

            <div className="space-y-4">
              {FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={0.1 + i * 0.1}>
                  <div className="mars-card--marketing rounded-xl p-6 group">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5 text-mars-ember group-hover:bg-accent/20 transition-colors duration-150">
                        {f.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                        <p className="text-sm leading-relaxed text-white/55">{f.body}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Under the hood — bento over the scape ── */}
      <section className={`${PAD} py-20 border-t border-app-border-faint`}>
        <FadeIn className="mb-12">
          <span className="text-eyebrow text-mars-ember block mb-3">Under the hood</span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em] max-w-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built to be invisible.
            <br />
            Enforced at the edge.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FadeIn className="md:col-span-2" delay={0.05}>
            <div className="mars-card--marketing rounded-2xl p-6 h-full min-h-[300px] flex flex-col">
              <div className="mb-4">
                <span className="text-eyebrow text-white/25">01</span>
                <h3 className="text-xl font-semibold text-white mt-2">Real-time detection</h3>
                <p className="text-sm text-white/50 mt-1">Every request scanned in milliseconds.</p>
              </div>
              <div className="flex-1">
                <AnimatedTerminal />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mars-card--marketing rounded-2xl p-6 h-full min-h-[300px] flex flex-col justify-between">
              <div>
                <span className="text-eyebrow text-white/25">02</span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-2">Real blocking</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  With the edge integration (Cloudflare Worker, WordPress plugin, or
                  proxy), bots hit a 403 before they read a single character.
                </p>
              </div>
              <div className="mt-6 space-y-2">
                {["GPTBot", "ClaudeBot", "CCBot", "Amazonbot"].map((bot) => (
                  <div key={bot} className="flex items-center justify-between text-xs border-b border-app-border-faint pb-2 last:border-0 last:pb-0">
                    <span className="text-white/55" style={{ fontFamily: "var(--font-mono)" }}>{bot}</span>
                    <span className="text-eyebrow text-mars-rust">Blocked</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mars-card--marketing rounded-2xl p-6 h-full min-h-[260px] flex flex-col justify-between">
              <div>
                <span className="text-eyebrow text-white/25">03</span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-2">30-second monitoring</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Copy one line of JavaScript, paste it in your header, and watch
                  the traffic roll in. Blocking is a second step.
                </p>
              </div>
              <div
                className="mt-4 rounded-lg border border-app-border bg-black/40 p-3 text-xs text-mars-ember"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {'<script src="marech.js"></script>'}
              </div>
            </div>
          </FadeIn>

          <FadeIn className="md:col-span-2" delay={0.2}>
            <div className="mars-card--marketing rounded-2xl p-6 h-full min-h-[260px] flex flex-col justify-between">
              <div>
                <span className="text-eyebrow text-white/25">04</span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-2">Zero maintenance</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-md">
                  We update the bot database automatically as new AI scrapers emerge.
                  Set it once, forget it forever.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Auto-updates", "No code changes", "24/7 monitoring", "99.9% uptime"].map((tag) => (
                  <span key={tag} className="text-xs border border-app-border rounded-full px-3 py-1 text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials — static editorial 3-up ── */}
      <section className={`${PAD} py-20 border-t border-app-border-faint`}>
        <FadeIn className="mb-12">
          <span className="text-eyebrow text-mars-ember block mb-3">Field reports</span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Creators fighting back.
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={0.05 + i * 0.08}>
              <TestimonialCard {...t} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Pricing preview — split ── */}
      <section className={`${PAD} py-16 border-t border-app-border-faint`}>
        <FadeIn>
          <div className="grid md:grid-cols-[3fr_2fr] gap-16 items-center">
            <div>
              <span className="text-eyebrow text-mars-ember block mb-4">Pricing</span>
              <div
                className="text-7xl sm:text-8xl font-bold text-white mb-4 leading-none"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                $25<span className="text-3xl text-white/40 font-medium">/mo</span>
              </div>
              <p className="text-white/50 text-lg mb-10 max-w-sm leading-relaxed">
                Plans start small. Scale when you need it. No lock-in.
              </p>
              <Link href="/pricing">
                <InteractiveHoverButton>See All Plans →</InteractiveHoverButton>
              </Link>
            </div>

            <div className="mars-card--marketing rounded-3xl p-8">
              <div className="space-y-3">
                {[
                  { name: "Starter", price: "$25/mo", highlight: false },
                  { name: "Pro", price: "$50/mo", highlight: true },
                  { name: "Enterprise", price: "$125/mo", highlight: false },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border ${
                      plan.highlight
                        ? "border-accent/40 bg-accent/10 mars-glow-rust"
                        : "border-app-border-faint bg-white/[0.03]"
                    }`}
                  >
                    <span className="font-semibold text-sm text-white" style={{ fontFamily: "var(--font-mono)" }}>
                      {plan.name}
                    </span>
                    <div className="flex items-center gap-3">
                      {plan.highlight && <span className="text-eyebrow text-mars-ember">Popular</span>}
                      <span className="text-sm text-white/60" style={{ fontFamily: "var(--font-mono)" }}>
                        {plan.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Final CTA ── */}
      <section className={`relative ${PAD} py-28 border-t border-app-border-faint`}>
        <div className="mars-horizon" />
        <FadeIn className="relative z-10">
          <div className="grid md:grid-cols-[4fr_1fr] gap-8 items-end">
            <div>
              <span className="text-eyebrow text-mars-ember block mb-6">Ready?</span>
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] mb-8 leading-[1.02]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Protect your
                <br />
                content today.
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-md leading-relaxed">
                Join thousands of creators blocking AI scrapers every day.
                Your work is yours — keep it that way.
              </p>
              <Link href="/signup">
                <Button variant="accent" size="lg">Start Free Trial — No Credit Card →</Button>
              </Link>
            </div>
            {/* Decorative "blocked" glyph */}
            <div className="hidden md:flex items-end justify-end pb-2">
              <span
                className="text-[160px] font-bold leading-none text-white/8 select-none"
                style={{ fontFamily: "var(--font-mono)" }}
                aria-hidden="true"
              >
                ✕
              </span>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

const STATS: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: 10, suffix: "M+", label: "Bots blocked per day" },
  { value: 2, suffix: "min", label: "Average setup time" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
];

const FEATURES = [
  {
    icon: <CheckIcon className="w-5 h-5" />,
    title: "Monitoring in 30 Seconds",
    body: "Copy one line of JavaScript into your site header — works anywhere — and see the AI scrapers hitting you in your dashboard.",
  },
  {
    icon: <ActivityIcon className="w-5 h-5" />,
    title: "Real Edge Blocking",
    body: "Add the Cloudflare Worker, WordPress plugin, or proxy and scrapers get a 403 before your content loads — even non-JS bots the script can't stop.",
  },
  {
    icon: <ZapIcon className="w-5 h-5" />,
    title: "Zero Maintenance",
    body: "We update the bot database automatically. New AI scrapers get blocked the moment they're identified — no action needed.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    title: "Food Blogger · sarahcooks.com",
    quote:
      "I was livid when I found my recipes being fed to AI chatbots. Marech stopped it in seconds. Incredibly satisfying to watch every scraper get blocked.",
  },
  {
    name: "Mike Torres",
    title: "Shopify Store Owner · gearup.io",
    quote:
      "Competitors were using AI to scrape my product descriptions and undercut my prices. Marech caught 2,000+ scrapes in week one. Game changer.",
  },
  {
    name: "Lisa Park",
    title: "SaaS Founder · docsapp.dev",
    quote:
      "My documentation was training competing AI models. The policy controls let me block exactly who I want. The API on Pro is a bonus I didn't expect.",
  },
];

function TestimonialCard({ name, title, quote }: { name: string; title: string; quote: string }) {
  return (
    <div className="mars-card--marketing rounded-2xl p-7 flex flex-col h-full">
      <blockquote className="text-white/70 text-sm leading-relaxed flex-1 mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 border-t border-app-border-faint pt-4">
        <div
          className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 text-mars-ember font-bold flex items-center justify-center text-sm"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {name[0]}
        </div>
        <div>
          <div className="text-white text-sm font-semibold">{name}</div>
          <div className="text-eyebrow text-white/35 mt-0.5">{title}</div>
        </div>
      </div>
    </div>
  );
}
