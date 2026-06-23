import Link from "next/link";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/Button";
import { AnalyticsMockup } from "@/components/marketing/AnalyticsMockup";
import { AnimatedTerminal } from "@/components/marketing/AnimatedTerminal";
import { OrbitingPlatforms } from "@/components/marketing/OrbitingPlatforms";
import { FadeIn } from "@/components/ui/FadeIn";
import { NumberTicker } from "@/components/ui/number-ticker";
import { MorphingText } from "@/components/ui/morphing-text";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";

export const metadata = {
  title: "BlockMe — Stop AI from Stealing Your Content",
  description: "Block ChatGPT, Claude, and other AI scrapers in 30 seconds. No code required.",
};

const PAD = "px-6 sm:px-10 lg:px-16";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#c44a1a" }}>
      <div className="relative flex flex-col flex-1">
        <ScrollProgress className="h-0.5 from-black via-[#f97316] to-white" />
        <Nav />
        <main className="flex-1">

          {/* ── Hero — text left-padded, mockup bleeds to right edge ── */}
          <section className="pt-24 pb-16 overflow-hidden">
            <div className="grid md:grid-cols-[1fr_1fr] items-stretch min-h-[75vh]">

              <FadeIn className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 pb-8 md:pb-0 md:pr-6">
                <span
                  className="inline-block text-[#f5f0eb] text-xs font-bold tracking-[0.2em] uppercase mb-6"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Content Protection
                </span>
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Stop AI Bots<br />
                  <span className="text-[#f5f0eb]">Before They</span><br />
                  Strike.
                </h1>
                <p className="text-lg text-white/60 max-w-md mb-6 leading-relaxed">
                  Block ChatGPT, Claude, and every AI scraper in under 2 minutes.
                  One snippet. Zero maintenance. Full visibility.
                </p>
                <div className="mb-8">
                  <MorphingText
                    texts={["Protecting your blog.", "Protecting your store.", "Protecting your docs.", "Protecting your work.", "Protecting your revenue."]}
                    className="h-8 lg:h-8 text-xl lg:text-xl text-black font-bold text-left max-w-none ![filter:none]"
                  />
                </div>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link href="/signup">
                    <Button variant="accent" size="lg">Start Free Trial →</Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button variant="secondary" size="lg">See How It Works</Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-white/35 font-medium">
                  <span>14-Day Free Trial</span>
                  <span className="text-white/15">·</span>
                  <span>No Credit Card</span>
                  <span className="text-white/15">·</span>
                  <span>2 Min Setup</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.15} direction="left" className="self-stretch pl-4 pr-6 sm:pr-10 py-6 md:py-10">
                <AnalyticsMockup />
              </FadeIn>

            </div>
          </section>

          {/* ── Stats — left-anchored, no mx-auto ── */}
          <section className={`${PAD} pb-20`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {STATS.map((s, i) => {
                const light = i % 2 === 0;
                return (
                  <FadeIn key={s.label} delay={i * 0.1}>
                    <div
                      className={`${light ? "bg-[#f5f0eb] border-black/8 shadow-[0_6px_24px_rgba(0,0,0,0.18)]" : "bg-[#1a1a1a] border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.35)]"} border rounded-2xl p-7 transition-all`}
                      style={{ transform: `translateY(${[-8, 8, -4][i]}px)` }}
                    >
                      <div
                        className={`text-4xl sm:text-5xl font-bold mb-1 flex items-center gap-1 ${light ? "text-gray-900" : "text-white"}`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {s.prefix && <span>{s.prefix}</span>}
                        <NumberTicker value={s.value} className={light ? "text-gray-900" : "text-white"} />
                        {s.suffix && <span>{s.suffix}</span>}
                      </div>
                      <div className={`text-sm font-medium ${light ? "text-gray-500" : "text-white/50"}`}>{s.label}</div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </section>

          {/* ── Why BlockMe — orbit LEFT, features RIGHT ── */}
          <section className={`${PAD} py-20`}>
            <div className="grid md:grid-cols-[5fr_6fr] gap-16 items-start">

              {/* Left: Orbiting Platforms */}
              <FadeIn direction="right">
                <OrbitingPlatforms />
              </FadeIn>

              {/* Right: Feature cards */}
              <div>
                <FadeIn>
                  <span
                    className="text-[#f5f0eb] text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Why BlockMe
                  </span>
                  <h2
                    className="text-4xl sm:text-5xl font-bold text-white mb-10"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Protection that<br />just works.
                  </h2>
                </FadeIn>

                <div className="space-y-4">
                  {FEATURES.map((f, i) => {
                    const light = i % 2 === 1;
                    return (
                      <FadeIn key={f.title} delay={0.1 + i * 0.1}>
                        <div className={`${light ? "bg-[#f5f0eb] border-black/8 shadow-[0_6px_24px_rgba(0,0,0,0.18)]" : "bg-[#1a1a1a] border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.35)]"} border rounded-xl p-6 transition-all group`}>
                          <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                              <span className="text-[#f5f0eb]">{f.icon}</span>
                            </div>
                            <div>
                              <h3
                                className={`font-bold mb-1 ${light ? "text-gray-900" : "text-white"}`}
                                style={{ fontFamily: "var(--font-mono)" }}
                              >
                                {f.title}
                              </h3>
                              <p className={`text-sm leading-relaxed ${light ? "text-gray-500" : "text-white/55"}`}>{f.body}</p>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>

            </div>
          </section>

          {/* ── Bento Grid — left-aligned heading ── */}
          <section className={`${PAD} py-20`}>
            <FadeIn className="mb-12">
              <span
                className="text-[#f5f0eb] text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Under the Hood
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold text-white max-w-xl"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Built to be invisible.<br />Impossible to bypass.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Terminal — col-span-2 — DARK */}
              <FadeIn className="md:col-span-2" delay={0.05}>
                <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 h-full min-h-[300px] flex flex-col shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#f5f0eb]/20" style={{ fontFamily: "var(--font-mono)" }}>01</span>
                    <h3 className="text-xl font-bold text-white mt-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Real-Time Detection
                    </h3>
                    <p className="text-sm text-white/50 mt-1">Every request scanned in milliseconds.</p>
                  </div>
                  <div className="flex-1">
                    <AnimatedTerminal />
                  </div>
                </div>
              </FadeIn>

              {/* Instant Block — OFF-WHITE */}
              <FadeIn delay={0.1}>
                <div className="bg-[#f5f0eb] border border-black/8 rounded-2xl p-6 h-full min-h-[300px] flex flex-col justify-between shadow-[0_6px_24px_rgba(0,0,0,0.18)]">
                  <div>
                    <span className="text-4xl font-bold text-[#f5f0eb]/30" style={{ fontFamily: "var(--font-mono)" }}>02</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Instant Block
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Bots hit a 403 before they read a single character of your content.
                    </p>
                  </div>
                  <div className="mt-6 space-y-2">
                    {["GPTBot", "ClaudeBot", "CCBot", "Amazonbot"].map((bot) => (
                      <div key={bot} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{bot}</span>
                        <span className="text-danger/80 font-mono bg-danger/10 px-2 py-0.5 rounded-full">BLOCKED</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* 30-sec Setup — DARK */}
              <FadeIn delay={0.15}>
                <div className="bg-[#1a1a1a] border border-accent/20 rounded-2xl p-6 h-full min-h-[260px] flex flex-col justify-between shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
                  <div>
                    <span className="text-4xl font-bold text-[#f5f0eb]/30" style={{ fontFamily: "var(--font-mono)" }}>03</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      30-Second Setup
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Copy one line of JavaScript. Paste into your site header. Done.
                    </p>
                  </div>
                  <div className="mt-4 bg-black/40 rounded-lg p-3 font-mono text-xs text-green-400">
                    {"<script src=\"blockme.js\"></script>"}
                  </div>
                </div>
              </FadeIn>

              {/* Zero Maintenance — OFF-WHITE */}
              <FadeIn className="md:col-span-2" delay={0.2}>
                <div className="bg-[#f5f0eb] border border-black/8 rounded-2xl p-6 h-full min-h-[260px] flex flex-col justify-between shadow-[0_6px_24px_rgba(0,0,0,0.18)]">
                  <div>
                    <span className="text-4xl font-bold text-[#f5f0eb]/30" style={{ fontFamily: "var(--font-mono)" }}>04</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Zero Maintenance
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                      We update the bot database automatically as new AI scrapers emerge. Set it once, forget it forever.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Auto-updates", "No code changes", "24/7 monitoring", "99.9% uptime"].map((tag) => (
                      <span key={tag} className="text-xs bg-[#ede8df] border border-black/8 rounded-full px-3 py-1 text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>
          </section>

          {/* ── Testimonials — left-aligned heading ── */}
          <section className="py-20 overflow-hidden">
            <FadeIn className={`${PAD} mb-12`}>
              <h2
                className="text-4xl sm:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Creators fighting back.
              </h2>
            </FadeIn>
            <ScrollVelocityContainer>
              <ScrollVelocityRow baseVelocity={3} direction={1}>
                {TESTIMONIALS.map((t) => (
                  <TestimonialCard key={t.name} {...t} />
                ))}
              </ScrollVelocityRow>
              <ScrollVelocityRow baseVelocity={3} direction={-1} className="mt-4">
                {[...TESTIMONIALS].reverse().map((t) => (
                  <TestimonialCard key={t.name + "-r"} {...t} />
                ))}
              </ScrollVelocityRow>
            </ScrollVelocityContainer>
          </section>

          {/* ── Pricing — 2-col split ── */}
          <section className={`${PAD} py-16`}>
            <FadeIn>
              <div className="grid md:grid-cols-[3fr_2fr] gap-16 items-center">

                {/* Left: big typography */}
                <div>
                  <span
                    className="text-[#f5f0eb] text-xs font-bold tracking-[0.2em] uppercase block mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Pricing
                  </span>
                  <div
                    className="text-7xl sm:text-8xl font-bold text-white mb-4 leading-none"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    $10<span className="text-3xl text-white/40 font-medium">/mo</span>
                  </div>
                  <p className="text-white/50 text-lg mb-10 max-w-sm leading-relaxed">
                    Plans start small. Scale when you need it. No lock-in.
                  </p>
                  <Link href="/pricing">
                    <Button variant="accent" size="lg">See All Plans →</Button>
                  </Link>
                </div>

                {/* Right: plan tiers card */}
                <div className="bg-[#f5f0eb] border border-black/8 rounded-3xl p-8 shadow-[0_6px_24px_rgba(0,0,0,0.18)]">
                  <div className="space-y-3">
                    {[
                      { name: "Starter", price: "$10/mo", highlight: false },
                      { name: "Pro", price: "$29/mo", highlight: true },
                      { name: "Team", price: "$79/mo", highlight: false },
                    ].map((plan) => (
                      <div
                        key={plan.name}
                        className={`flex items-center justify-between px-5 py-4 rounded-2xl ${plan.highlight ? "bg-[#1a1a1a] shadow-[0_4px_16px_rgba(0,0,0,0.3)]" : "bg-[#ede8df]"}`}
                      >
                        <span className={`font-semibold text-sm ${plan.highlight ? "text-white" : "text-gray-700"}`} style={{ fontFamily: "var(--font-mono)" }}>
                          {plan.name}
                        </span>
                        <div className="flex items-center gap-3">
                          {plan.highlight && <span className="text-xs text-[#f5f0eb] font-bold tracking-wide">POPULAR</span>}
                          <span className={`text-sm font-mono ${plan.highlight ? "text-white/70" : "text-gray-500"}`}>{plan.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </FadeIn>
          </section>

          {/* ── Final CTA — left-aligned ── */}
          <section className={`${PAD} py-28`}>
            <FadeIn>
              <div className="grid md:grid-cols-[4fr_1fr] gap-8 items-end">
                <div>
                  <span
                    className="text-[#f5f0eb] text-xs font-bold tracking-[0.2em] uppercase block mb-6"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Ready?
                  </span>
                  <h2
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Protect your<br />content today.
                  </h2>
                  <p className="text-white/50 text-lg mb-10 max-w-md leading-relaxed">
                    Join thousands of creators blocking AI scrapers every day. Your work is yours — keep it that way.
                  </p>
                  <Link href="/signup">
                    <Button variant="accent" size="lg">
                      Start Free Trial — No Credit Card →
                    </Button>
                  </Link>
                </div>
                {/* Decorative large glyph */}
                <div className="hidden md:flex items-end justify-end pb-2">
                  <span
                    className="text-[160px] font-bold leading-none text-white/8 select-none"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    ✕
                  </span>
                </div>
              </div>
            </FadeIn>
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
}

const STATS = [
  { value: 10, prefix: "", suffix: "M+", label: "Bots Blocked per Day" },
  { value: 2, prefix: "", suffix: " min", label: "Average Setup Time" },
  { value: 99.9, prefix: "", suffix: "%", label: "Uptime" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    title: "30-Second Setup",
    body: "Copy one line of JavaScript, paste into your site header. Works on Wix, Shopify, WordPress, Squarespace — anywhere.",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
    ),
    title: "Real-Time Blocking",
    body: "See every bot blocked as it hits. Live dashboard shows confidence score, IP, path, and bot type.",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      </svg>
    ),
    title: "Zero Maintenance",
    body: "We update the bot database automatically. New AI scrapers get blocked the moment they're identified — no action needed.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    title: "Food Blogger · sarahcooks.com",
    quote:
      "I was livid when I found my recipes being fed to AI chatbots. BlockMe stopped it in seconds. Incredibly satisfying to watch every scraper get blocked.",
  },
  {
    name: "Mike Torres",
    title: "Shopify Store Owner · gearup.io",
    quote:
      "Competitors were using AI to scrape my product descriptions and undercut my prices. BlockMe caught 2,000+ scrapes in week one. Game changer.",
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
    <div className="mx-3 w-[340px] shrink-0 whitespace-normal bg-[#1a1a1a] border border-white/10 rounded-2xl p-7 flex flex-col shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
          <svg key={j} className="w-4 h-4 text-[#f5f0eb]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-white/70 text-sm leading-relaxed flex-1 mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 text-[#f5f0eb] font-bold flex items-center justify-center text-sm"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {name[0]}
        </div>
        <div>
          <div className="text-white text-sm font-semibold">{name}</div>
          <div className="text-white/40 text-xs">{title}</div>
        </div>
      </div>
    </div>
  );
}
