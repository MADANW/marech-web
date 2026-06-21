import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "How It Works — BlockMe",
  description: "See exactly how BlockMe detects and blocks AI scrapers from your website.",
};

export default function HowItWorksPage() {
  return (
    <div className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3" style={{ fontFamily: "var(--font-syne)" }}>Under the hood</span>
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>How BlockMe Works</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every request to your website goes through BlockMe's detection engine. Here's what happens in milliseconds.
          </p>
        </div>

        {/* Flow */}
        <div className="mb-20 space-y-3">
          {FLOW.map((step, i) => (
            <div key={step.label} className="flex gap-5 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step.color}`} style={{ fontFamily: "var(--font-syne)" }}>
                  {i + 1}
                </div>
                {i < FLOW.length - 1 && <div className="w-px flex-1 bg-white/10 my-2 h-6" />}
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex-1 mb-2">
                <div className="font-semibold text-white mb-1" style={{ fontFamily: "var(--font-syne)" }}>{step.label}</div>
                <div className="text-sm text-white/60">{step.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Detection methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: "var(--font-syne)" }}>How we detect AI bots</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {DETECTION.map((d, i) => (
              <div key={d.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <span className="text-4xl font-bold text-accent/25 block mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>{d.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Policy control */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>You're in control</h2>
          <p className="text-white/60 mb-8">Policies let you decide exactly what gets blocked. No one-size-fits-all rules.</p>
          <div className="space-y-3">
            {POLICY_EXAMPLES.map((ex) => (
              <div key={ex.label} className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-sm">
                  {ex.icon}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{ex.label}</div>
                  <div className="text-xs text-white/50">{ex.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>See it blocking bots live</h2>
          <p className="text-white/60 mb-6">Start your free trial and watch the real-time feed fill up.</p>
          <Link href="/signup">
            <Button variant="accent" size="lg">Start Free Trial</Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

const FLOW = [
  { label: "Visitor arrives at your website", body: "Your BlockMe snippet loads invisibly on page load.", color: "bg-white/10 text-white" },
  { label: "Is it an AI bot?", body: "BlockMe checks user agent, headers, IP reputation, and behavior patterns in real time.", color: "bg-accent/20 text-accent" },
  { label: "Decision: Block or Allow", body: "Based on your policies, the bot is blocked (403) or allowed through.", color: "bg-warning/20 text-warning" },
  { label: "Logged in your dashboard", body: "Every decision is recorded — bot type, IP, path, confidence score, and action taken.", color: "bg-success/20 text-success" },
];

const DETECTION = [
  { title: "Known Bot Database", body: "We maintain a constantly-updated list of 20+ known scrapers — GPTBot, ClaudeBot, CCBot, Amazonbot, PerplexityBot, and more." },
  { title: "Behavior Analysis", body: "Detect headless browsers and bots pretending to be humans by analyzing missing headers, timing patterns, and JavaScript execution." },
  { title: "Datacenter IP Detection", body: "Real users browse from home and mobile networks. AI scrapers come from cloud datacenters. We flag datacenter IPs automatically." },
];

const POLICY_EXAMPLES = [
  { icon: "🚫", label: "Block all AI scrapers", body: "The default. Zero AI bots get through — GPTBot, Claude, and 20+ others." },
  { icon: "⏰", label: "Block during business hours only", body: "Let archive bots in at night while protecting during peak traffic." },
  { icon: "🔒", label: "Block on specific paths", body: "Protect /admin, /api, or /checkout while leaving /blog open." },
];
