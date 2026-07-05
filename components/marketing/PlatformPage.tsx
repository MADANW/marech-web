import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface Step {
  title: string;
  body: string;
}

interface PlatformPageProps {
  name: string;
  headline: string;
  subheadline: string;
  steps: Step[];
}

export function PlatformPage({ name, headline, subheadline, steps }: PlatformPageProps) {
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

        {/* Steps */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white tracking-[-0.02em] mb-6" style={{ fontFamily: "var(--font-display)" }}>Step-by-step instructions</h2>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="mars-card--marketing flex gap-4 rounded-xl p-5">
                <div
                  className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 text-mars-ember font-bold flex items-center justify-center shrink-0 text-sm"
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
        </div>

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
