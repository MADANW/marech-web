import Link from "next/link";
import { CopyableCode } from "@/components/marketing/CopyableCode";
import {
  DocHero,
  TableOfContents,
  DocSection,
  NumberedSteps,
  Callout,
  Checklist,
  FaqList,
  NextSteps,
  DocCTA,
  type Step,
  type Faq,
  type MetaItem,
} from "@/components/marketing/DocsKit";

export interface BlockingInfo {
  /**
   * Whether real server-side blocking of non-JS scrapers (curl, GPTBot…) is
   * possible on this platform. Hosted builders that own the whole request path
   * (Wix, Squarespace) can only ever monitor.
   */
  canBlock: boolean;
  /** Short label for the enforcement method, e.g. "Cloudflare Worker". */
  method: string;
  /** One or two sentences on the blocking story for this specific platform. */
  summary: string;
  /** Enforcement setup steps, shown when {@link canBlock} is true. */
  steps?: Step[];
  /** Where to read the full integration guide (defaults to /docs). */
  docsHref?: string;
  /** Optional command to prove blocking works, plus what to expect. */
  verify?: { cmd: string; expect: string };
}

export interface PlatformPageProps {
  name: string;
  headline: string;
  subheadline: string;
  /** Category chip, e.g. "Hosted site builder", "Self-hosted CMS", "Framework". */
  category: string;
  /** Rough setup time for the monitoring snippet, e.g. "~2 minutes". */
  setupTime: string;
  /** One or two sentences on how Marech fits this specific platform. */
  overview: React.ReactNode;
  /** Where the platform hides its "paste into <head>" field (mono path). */
  snippetPlacement: string;
  /** Steps to install the monitoring snippet (advisory mode). */
  steps: Step[];
  /** How to confirm monitoring is live. Sensible default provided. */
  verifyMonitoring?: React.ReactNode;
  /** What — or whether — this platform can do real server-side blocking. */
  blocking: BlockingInfo;
  /** Platform-specific questions. A couple of shared ones are appended. */
  faq?: Faq[];
  /** Extra prerequisites beyond the shared defaults. */
  extraPrerequisites?: React.ReactNode[];
}

export function PlatformPage({
  name,
  headline,
  subheadline,
  category,
  setupTime,
  overview,
  snippetPlacement,
  steps,
  verifyMonitoring,
  blocking,
  faq = [],
  extraPrerequisites = [],
}: PlatformPageProps) {
  const docsHref = blocking.docsHref ?? "/docs";

  const meta: MetaItem[] = [
    { label: "Platform", value: category },
    { label: "Setup", value: setupTime },
    {
      label: "Blocking",
      value: blocking.canBlock ? "Supported" : "Monitor only",
      tone: blocking.canBlock ? "ember" : "muted",
    },
  ];

  const toc = [
    { href: "#overview", label: "Overview" },
    { href: "#before", label: "Before you begin" },
    { href: "#monitor", label: "Install the monitoring snippet" },
    { href: "#blocking", label: blocking.canBlock ? "Turn on blocking" : "Blocking on " + name },
    { href: "#faq", label: "Troubleshooting & FAQ" },
  ];

  const prerequisites: React.ReactNode[] = [
    <>
      A Marech account — <Link href="/signup" className="text-accent hover:underline">start a free trial</Link>{" "}
      (no credit card).
    </>,
    <>Access to edit your {name} site&apos;s theme, settings, or code.</>,
    ...extraPrerequisites,
  ];

  // The two shared questions every guide should answer, appended after the
  // platform-specific ones.
  const sharedFaq: Faq[] = [
    {
      q: "Does the snippet slow down my site?",
      a: "No. The script is tiny and loads asynchronously, so it never blocks your page from rendering. Server-side blocking adds a single fast check in front of your origin and fails open, so it can't slow down or take down your site.",
    },
    {
      q: "Will it block real visitors or hurt SEO?",
      a: (
        <>
          No. Marech targets automated scrapers, not people, and search engines you care about are
          allowed by default — you decide exactly what gets blocked with{" "}
          <Link href="/policies" className="text-accent hover:underline">policies</Link>. See{" "}
          <Link href="/how-it-works" className="text-accent hover:underline">how detection works</Link>.
        </>
      ),
    },
  ];

  const allFaq = [...faq, ...sharedFaq];

  return (
    <div className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <DocHero
          eyebrow={`${name} guide · ${category}`}
          title={headline}
          lede={subheadline}
          meta={meta}
        />

        <TableOfContents items={toc} />

        {/* Overview */}
        <DocSection
          id="overview"
          title={`How Marech protects a ${name} site`}
          lede={overview}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="mars-card--marketing rounded-2xl p-6">
              <span className="text-eyebrow text-white/25 block mb-3">Mode 1</span>
              <h3 className="font-semibold text-white mb-2">Monitoring — the snippet</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                One line of JavaScript in your <code>&lt;head&gt;</code>. It reports scraper traffic
                to your dashboard and overlays JS-running bots. Works on {name} in {setupTime}.
              </p>
            </div>
            <div className="mars-card--marketing rounded-2xl p-6">
              <span className="text-eyebrow text-white/25 block mb-3">Mode 2</span>
              <h3 className="font-semibold text-white mb-2">Blocking — the edge check</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                {blocking.canBlock ? (
                  <>
                    A server-side check ({blocking.method}) returns a 403 to scrapers{" "}
                    <em>before</em> your content is served — the only thing that stops non-JS
                    scrapers.
                  </>
                ) : (
                  <>
                    Requires a checkpoint in front of your server. {name} owns the whole request
                    path, so this mode isn&apos;t available here — monitoring only.
                  </>
                )}
              </p>
            </div>
          </div>
        </DocSection>

        {/* Before you begin */}
        <DocSection
          id="before"
          title="Before you begin"
          lede="You'll need a couple of things ready. The monitoring step needs only the first two."
        >
          <div className="mars-card--marketing rounded-xl p-6">
            <Checklist items={prerequisites} />
          </div>
        </DocSection>

        {/* Monitoring */}
        <DocSection
          id="monitor"
          step={1}
          title="Install the monitoring snippet"
          lede={
            <>
              One line of JavaScript that reports scraper traffic to your dashboard. Works on every{" "}
              {name} plan and takes about {setupTime}.
            </>
          }
        >
          <div className="mars-card--marketing rounded-lg px-4 py-3 text-xs text-white/50 font-mono mb-5">
            {name} → {snippetPlacement}
          </div>
          <NumberedSteps steps={steps} />

          <div className="mt-5">
            <Callout tone="tip" title="Verify monitoring is live">
              {verifyMonitoring ?? (
                <>
                  Open your site in a normal browser, then check the{" "}
                  <Link href="/dashboard" className="text-accent hover:underline">dashboard</Link> —
                  your own visit should appear in the traffic feed within a few seconds. If nothing
                  shows up, confirm the snippet is inside <code>&lt;head&gt;</code> on a public
                  (logged-out) page.
                </>
              )}
            </Callout>
          </div>
        </DocSection>

        {/* Monitoring vs blocking honesty callout */}
        <div className="mb-14">
          <Callout tone="info" title="Monitoring vs. blocking — the honest version">
            The snippet above reports traffic and overlays JS-running bots — but non-JS scrapers
            (curl, python-requests, GPTBot…) download your HTML directly and never run it, so it{" "}
            <span className="text-white/80">can&apos;t block those</span>. {blocking.summary}{" "}
            {blocking.canBlock ? (
              <>
                Full details in the{" "}
                <Link href={docsHref} className="text-accent hover:underline">integration guide</Link>.
              </>
            ) : (
              <>
                See how the two modes differ in the{" "}
                <Link href="/docs" className="text-accent hover:underline">docs</Link>.
              </>
            )}
          </Callout>
        </div>

        {/* Blocking */}
        {blocking.canBlock && blocking.steps && blocking.steps.length > 0 ? (
          <DocSection
            id="blocking"
            step={2}
            title="Turn on real blocking (optional)"
            lede={
              <>
                Stops non-JS scrapers before your content is served, using {blocking.method}. Needs a
                Marech <Link href="/keys" className="text-accent hover:underline">API key</Link> and a{" "}
                <Link href="/policies" className="text-accent hover:underline">block policy</Link>.
              </>
            }
          >
            <NumberedSteps steps={blocking.steps} tone="ember" />
            {blocking.verify && (
              <div className="mt-5 space-y-3">
                <p className="text-sm text-white/55">
                  <span className="font-semibold text-white">Verify it&apos;s blocking.</span>{" "}
                  {blocking.verify.expect}
                </p>
                <CopyableCode code={blocking.verify.cmd} label="verify blocking" />
              </div>
            )}
          </DocSection>
        ) : (
          <DocSection
            id="blocking"
            title={`Blocking on ${name}`}
            lede={blocking.summary}
          >
            <Callout tone="warn" title="Monitoring only — and why">
              {name} owns the entire request path — server, domain, and TLS — so there&apos;s no way
              to insert an edge proxy or worker that runs <em>before</em> your page is served.
              Marech still monitors traffic and overlays JS-running bots here, but non-JS scrapers
              can&apos;t be blocked. If real blocking matters, host your site somewhere you control
              the edge (a custom domain via Cloudflare, or a self-hosted setup) — see the{" "}
              <Link href="/docs" className="text-accent hover:underline">platform guides</Link>.
            </Callout>
          </DocSection>
        )}

        {/* FAQ */}
        <DocSection id="faq" title="Troubleshooting & FAQ">
          <FaqList items={allFaq} />
        </DocSection>

        {/* Next steps */}
        <DocSection title="Next steps">
          <NextSteps
            items={[
              { href: "/how-it-works", title: "How detection works", body: "The signals Marech uses to tell scrapers from real visitors." },
              { href: "/docs", title: "All platform guides", body: "Compare setup and blocking support across every platform." },
              { href: "/policies", title: "Write a block policy", body: "Decide exactly which bots get stopped and where." },
              { href: "/pricing", title: "Plans & pricing", body: "Free 7-day trial, then pick the plan that fits your traffic." },
            ]}
          />
        </DocSection>

        <DocCTA
          title={`Ready to protect your ${name} site?`}
          body="Free 7-day trial. No credit card required."
          cta="Get Started Free"
        />
      </div>
    </div>
  );
}
