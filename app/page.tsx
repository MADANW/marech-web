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

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed galactic background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: "url(/bg.jpg)", backgroundSize: "cover", backgroundPosition: "center top", zIndex: 0 }}
      />
      <div className="fixed inset-0 bg-black/55 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="relative flex flex-col flex-1" style={{ zIndex: 2 }}>
        <ScrollProgress className="h-0.5 from-black via-[#f97316] to-white" />
        <Nav />
        <main className="flex-1">

          {/* ── Hero ── */}
          <section className="px-4 sm:px-6 pt-24 pb-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10 items-center min-h-[75vh]">

                {/* Left: Text */}
                <FadeIn className="flex flex-col justify-center">
                  <span
                    className="inline-block text-accent text-xs font-bold tracking-[0.2em] uppercase mb-6"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Content Protection
                  </span>
                  <h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Stop AI Bots<br />
                    <span className="text-accent">Before They</span><br />
                    Strike.
                  </h1>
                  <p className="text-lg text-white/60 max-w-md mb-6 leading-relaxed">
                    Block ChatGPT, Claude, and every AI scraper in under 2 minutes.
                    One snippet. Zero maintenance. Full visibility.
                  </p>
                  <div className="mb-8">
                    <MorphingText
                      texts={["Protecting your blog.", "Protecting your store.", "Protecting your docs.", "Protecting your work.", "Protecting your revenue."]}
                      className="h-12 md:h-12 lg:h-12 text-2xl md:text-2xl lg:text-2xl text-accent font-bold text-left max-w-none"
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

                {/* Right: Analytics Mockup */}
                <FadeIn delay={0.15} direction="left">
                  <AnalyticsMockup />
                </FadeIn>

              </div>
            </div>
          </section>

          {/* ── Stats ── */}
          <section className="px-4 sm:px-6 pb-20">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STATS.map((s, i) => (
                  <FadeIn key={s.label} delay={i * 0.1}>
                    <div
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/8 hover:border-white/15 transition-all"
                      style={{ transform: `translateY(${[-8, 8, -4][i]}px)` }}
                    >
                      <div
                        className="text-4xl sm:text-5xl font-bold text-white mb-1 flex items-center justify-center gap-1"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {s.prefix && <span>{s.prefix}</span>}
                        <NumberTicker value={s.value} className="text-white" />
                        {s.suffix && <span>{s.suffix}</span>}
                      </div>
                      <div className="text-white/50 text-sm font-medium">{s.label}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ── Why BlockMe + Orbiting Platforms ── */}
          <section className="px-4 sm:px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">

                {/* Left: Feature cards */}
                <div>
                  <FadeIn>
                    <span
                      className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Why BlockMe
                    </span>
                    <h2
                      className="text-4xl sm:text-5xl font-bold text-white mb-10"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Protection that<br />just works.
                    </h2>
                  </FadeIn>

                  <div className="space-y-4">
                    {FEATURES.map((f, i) => (
                      <FadeIn key={f.title} delay={0.1 + i * 0.1}>
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-white/18 transition-all group">
                          <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                              <span className="text-accent">{f.icon}</span>
                            </div>
                            <div>
                              <h3
                                className="font-bold text-white mb-1"
                                style={{ fontFamily: "var(--font-syne)" }}
                              >
                                {f.title}
                              </h3>
                              <p className="text-sm text-white/55 leading-relaxed">{f.body}</p>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>

                {/* Right: Orbiting Platforms */}
                <FadeIn delay={0.2} direction="left">
                  <OrbitingPlatforms />
                </FadeIn>

              </div>
            </div>
          </section>

          {/* ── Bento Grid ── */}
          <section className="px-4 sm:px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <FadeIn className="text-center mb-12">
                <span
                  className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Under the Hood
                </span>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Built to be invisible.<br />Impossible to bypass.
                </h2>
              </FadeIn>

              {/* Bento grid — 3 col */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Terminal — col-span-2, tall */}
                <FadeIn className="md:col-span-2" delay={0.05}>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full min-h-[300px] flex flex-col">
                    <div className="mb-4">
                      <span
                        className="text-4xl font-bold text-accent/20"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >01</span>
                      <h3
                        className="text-xl font-bold text-white mt-2"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        Real-Time Detection
                      </h3>
                      <p className="text-sm text-white/50 mt-1">Every request scanned in milliseconds.</p>
                    </div>
                    <div className="flex-1">
                      <AnimatedTerminal />
                    </div>
                  </div>
                </FadeIn>

                {/* Real-Time Blocking — col-span-1 */}
                <FadeIn delay={0.1}>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full min-h-[300px] flex flex-col justify-between">
                    <div>
                      <span
                        className="text-4xl font-bold text-accent/20"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >02</span>
                      <h3
                        className="text-xl font-bold text-white mt-2 mb-2"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        Instant Block
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        Bots hit a 403 before they read a single character of your content.
                      </p>
                    </div>
                    <div className="mt-6 space-y-2">
                      {["GPTBot", "ClaudeBot", "CCBot", "Amazonbot"].map((bot) => (
                        <div key={bot} className="flex items-center justify-between text-xs">
                          <span className="text-white/50">{bot}</span>
                          <span className="text-danger/80 font-mono bg-danger/10 px-2 py-0.5 rounded-full">BLOCKED</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {/* 30-sec Setup — col-span-1 */}
                <FadeIn delay={0.15}>
                  <div className="bg-accent/8 backdrop-blur-xl border border-accent/20 rounded-2xl p-6 h-full min-h-[260px] flex flex-col justify-between">
                    <div>
                      <span
                        className="text-4xl font-bold text-accent/30"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >03</span>
                      <h3
                        className="text-xl font-bold text-white mt-2 mb-2"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
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

                {/* Zero Maintenance — col-span-2 */}
                <FadeIn className="md:col-span-2" delay={0.2}>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full min-h-[260px] flex flex-col justify-between">
                    <div>
                      <span
                        className="text-4xl font-bold text-accent/20"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >04</span>
                      <h3
                        className="text-xl font-bold text-white mt-2 mb-2"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        Zero Maintenance
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed max-w-md">
                        We update the bot database automatically as new AI scrapers emerge. Set it once, forget it forever.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["Auto-updates", "No code changes", "24/7 monitoring", "99.9% uptime"].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-white/8 border border-white/10 rounded-full px-3 py-1 text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>

              </div>
            </div>
          </section>

          {/* ── Testimonials ── */}
          <section className="py-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <FadeIn className="text-center mb-12">
                <h2
                  className="text-4xl sm:text-5xl font-bold text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Creators fighting back.
                </h2>
              </FadeIn>
            </div>
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

          {/* ── Pricing Teaser ── */}
          <section className="px-4 sm:px-6 py-16">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                  <span
                    className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-4"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Pricing
                  </span>
                  <div
                    className="text-6xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    $10<span className="text-2xl text-white/40 font-medium">/mo</span>
                  </div>
                  <p className="text-white/50 mb-8">Plans start small. Scale when you need it.</p>
                  <Link href="/pricing">
                    <Button variant="accent" size="lg">See All Plans →</Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section className="px-4 sm:px-6 py-32 text-center">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <span
                  className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-6"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Ready?
                </span>
                <h2
                  className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Protect your<br />content today.
                </h2>
                <p className="text-white/50 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  Join thousands of creators blocking AI scrapers every day. Your work is yours — keep it that way.
                </p>
                <Link href="/signup">
                  <Button variant="accent" size="lg">
                    Start Free Trial — No Credit Card →
                  </Button>
                </Link>
              </FadeIn>
            </div>
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
    <div className="mx-3 w-[340px] shrink-0 whitespace-normal bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-7 flex flex-col">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
          <svg key={j} className="w-4 h-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-white/70 text-sm leading-relaxed flex-1 mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold flex items-center justify-center text-sm"
          style={{ fontFamily: "var(--font-syne)" }}
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
