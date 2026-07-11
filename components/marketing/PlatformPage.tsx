import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface Step {
  title: string;
  body: string;
}

interface BlockingInfo {
  /**
   * Whether real server-side blocking of non-JS scrapers (curl, GPTBot…) is
   * possible on this platform. Hosted builders that own the whole request path
   * (Wix, Squarespace) can only ever monitor.
   */
  canBlock: boolean;
  /** One or two sentences on the blocking story for this specific platform. */
  summary: string;
  /** Optional enforcement setup steps, shown when {@link canBlock} is true. */
  steps?: Step[];
  /** Where to read the full integration guide (defaults to /docs). */
  docsHref?: string;
}

interface PlatformPageProps {
  name: string;
  headline: string;
  subheadline: string;
  /** Steps to install the monitoring snippet (advisory mode). */
  steps: Step[];
  /** How — or whether — this platform can do real server-side blocking. */
  blocking: BlockingInfo;
}

function StepList({ steps, tone = "accent" }: { steps: Step[]; tone?: "accent" | "ember" }) {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i} className="mars-card--marketing flex gap-4 rounded-xl p-5">
          <div
            className={`w-8 h-8 rounded-full font-bold flex items-center justify-center shrink-0 text-sm ${
              tone === "ember"
                ? "bg-mars-ember/15 border border-mars-ember/30 text-mars-ember"
                : "bg-accent/20 border border-accent/30 text-accent"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {i + 1}
          </div>
          <div>
            <div className="font-semibold text-white mb-1">{step.title}</div>
            <div className="text-sm text-white/60">{step.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PlatformPage({ name, headline, subheadline, steps, blocking }: PlatformPageProps) {
  const docsHref = blocking.docsHref ?? "/docs";

  return (
    <div className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-14">
          <span className="text-eyebrow text-mars-ember block mb-3">
            {name} Guide
          </span>
          <h1 className="text-5xl font-bold text-white tracking-[-0.02em] mb-4" style={{ fontFamily: "var(--font-display)" }}>{headline}</h1>
          <p className="text-white/60 text-lg">{subheadline}</p>
        </div>

        {/* Step 1 — install the monitoring snippet */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white tracking-[-0.02em] mb-2" style={{ fontFamily: "var(--font-display)" }}>
            1 · Install the monitoring snippet
          </h2>
          <p className="text-sm text-white/50 mb-6">
            One line of JavaScript that reports scraper traffic to your dashboard. Takes a minute — works on {name}.
          </p>
          <StepList steps={steps} />
        </div>

        {/* Honesty callout: the snippet monitors; real blocking is server-side. */}
        <div className="mars-card--marketing rounded-xl p-5 mb-8 text-sm text-white/60 border-l-2 border-mars-ember/50">
          <span className="font-semibold text-white">Monitoring vs. blocking:</span> the snippet
          above reports traffic and overlays JS-running bots — but non-JS scrapers (curl, GPTBot…)
          download your HTML directly and never run it, so it can&apos;t block those. {blocking.summary}{" "}
          {blocking.canBlock ? (
            <>Full details in the <Link href={docsHref} className="text-accent hover:underline">integration guides</Link>.</>
          ) : (
            <>See how the two modes differ in the <Link href={docsHref} className="text-accent hover:underline">docs</Link>.</>
          )}
        </div>

        {/* Step 2 — turn on real blocking (only where the platform allows it) */}
        {blocking.canBlock && blocking.steps && blocking.steps.length > 0 && (
          <div className="mb-14">
            <h2 className="text-xl font-bold text-white tracking-[-0.02em] mb-2" style={{ fontFamily: "var(--font-display)" }}>
              2 · Turn on real blocking <span className="text-mars-ember text-base align-middle">(optional)</span>
            </h2>
            <p className="text-sm text-white/50 mb-6">
              Stops non-JS scrapers before your content is served. Needs a Marech{" "}
              <Link href="/keys" className="text-accent hover:underline">API key</Link> and a{" "}
              <Link href="/policies" className="text-accent hover:underline">block policy</Link>.
            </p>
            <StepList steps={blocking.steps} tone="ember" />
          </div>
        )}

        {/* Video placeholder */}
        <div className="mars-card--marketing rounded-2xl aspect-video flex items-center justify-center mb-14">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-white/40 text-sm">30-second video tutorial coming soon</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mars-card--marketing rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Ready to protect your {name} site?
          </h2>
          <p className="text-white/60 mb-6">Free 7-day trial. No credit card required.</p>
          <Link href="/signup">
            <Button variant="accent" size="lg">Get Started Free</Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
