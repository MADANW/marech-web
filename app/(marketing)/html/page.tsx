import Link from "next/link";
import { CopyableCode } from "@/components/marketing/CopyableCode";
import {
  DocHero,
  TableOfContents,
  DocSection,
  NumberedSteps,
  Callout,
  Checklist,
  FeatureGrid,
  FaqList,
  NextSteps,
  DocCTA,
} from "@/components/marketing/DocsKit";

export const metadata = {
  title: "Marech for Custom & HTML Sites — Monitor & Block AI Scrapers",
  description:
    "Add one script tag to monitor AI-scraper traffic on any static or custom-built HTML site — and, because you control your own hosting, turn on real edge blocking too.",
};

const SNIPPET_PLACEHOLDER = `<script src="https://cdn.marech.tech/YOUR_SNIPPET_ID.js"></script>`;

const AI_PROMPTS = [
  {
    label: "Basic HTML file",
    prompt: `I have a static HTML website and I want to add this script tag to every page:

${SNIPPET_PLACEHOLDER}

My main page is called index.html. Please show me exactly where to paste it in my HTML file, and show me what the <head> section should look like before and after.`,
  },
  {
    label: "Multiple pages / shared layout",
    prompt: `I have a multi-page HTML site and I want to add this script to every page:

${SNIPPET_PLACEHOLDER}

Walk me through the most efficient way to do this. If I have a shared header file or template (like _header.html or layout.html), show me where to paste it there. If I don't have one, show me how to add it to each page quickly.`,
  },
  {
    label: "Static site generator (Jekyll, Hugo, 11ty…)",
    prompt: `I use a static site generator (e.g. Jekyll / Hugo / Eleventy) and I want to inject this script into the <head> of every generated page:

${SNIPPET_PLACEHOLDER}

Show me exactly which layout or partial file to edit and where to paste it so it appears on all pages after I build the site.`,
  },
  {
    label: "GitHub Pages / Netlify / Vercel static deploy",
    prompt: `I host a static HTML site on GitHub Pages / Netlify / Vercel and want to add this script tag to every page:

${SNIPPET_PLACEHOLDER}

Walk me through: (1) which file to edit, (2) where exactly to paste the snippet, (3) how to commit and redeploy so the change goes live.`,
  },
];

const STEPS = [
  {
    title: "Copy your Marech snippet",
    body: 'After signing up, open your Marech dashboard and click "Get Snippet Code". Copy the one-line script tag.',
  },
  {
    title: "Open your HTML files",
    body: "Open the HTML files for your site in your code editor of choice.",
  },
  {
    title: "Paste inside the <head> tag",
    body: "Paste the Marech snippet anywhere inside the <head> element, before the closing </head> tag.",
  },
  {
    title: "Repeat for every page (or use a shared layout)",
    body: "If your site uses a shared header template or layout file, paste it there once — all pages will be covered automatically.",
  },
  {
    title: "Upload and deploy",
    body: "Save your files and redeploy your site. Marech immediately starts monitoring traffic in your dashboard.",
  },
];

const BLOCKING_STEPS = [
  {
    title: "Create an API key and a block policy",
    body: "In the Marech dashboard, create an API key (shown once — copy it) and add a block policy (e.g. bot types scraper and ai_tool).",
  },
  {
    title: "Pick the integration that matches your hosting",
    body: "nginx reverse proxy for a VPS/EC2/Docker origin, a Cloudflare Worker for a Cloudflare-fronted site, or Vercel/Next.js middleware for a site on Vercel. All three call the same enforcement endpoint.",
  },
  {
    title: "Configure it with your API URL and key",
    body: "Set BLOCKME_API_URL (https://api.marech.tech) and your bm_ key, then deploy it in front of your site. Each request is checked before your origin serves any HTML; scrapers get a 403 and it fails open on any outage.",
  },
];

const WHY = [
  {
    title: "Training data harvesting",
    body: "AI companies scrape raw HTML pages to build training datasets. Your prose, your research, your creative work — fed into models without permission or compensation.",
  },
  {
    title: "Prompt injection via scraped content",
    body: 'Attackers embed hidden instructions in page text (e.g. "Ignore previous instructions…") that get lifted by AI scrapers and injected into AI pipelines downstream. Marech stops the scraper before it reads anything.',
  },
  {
    title: "Content duplication by AI agents",
    body: "Autonomous AI agents crawl HTML sites to summarize, rewrite, and republish your content — stripping traffic and SEO value. Marech fingerprints and blocks known agent user-agents in real time.",
  },
  {
    title: "Competitor intelligence bots",
    body: "Businesses deploy AI crawlers to harvest pricing, copy, and product data from competitor HTML sites. Marech detects non-human request patterns and returns a 403 before any data is read.",
  },
];

export default function HtmlPage() {
  return (
    <div className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <DocHero
          eyebrow="Custom & HTML guide · Self-hosted"
          title="Marech for Any HTML Site"
          lede="Running a custom-built or static HTML site? Paste one script tag to monitor AI-scraper traffic — and because you control your own hosting, you can turn on real edge blocking too."
          meta={[
            { label: "Platform", value: "Custom / self-hosted" },
            { label: "Setup", value: "~5 minutes" },
            { label: "Blocking", value: "Supported", tone: "ember" },
          ]}
        />

        <TableOfContents
          items={[
            { href: "#overview", label: "Overview" },
            { href: "#before", label: "Before you begin" },
            { href: "#monitor", label: "Install the monitoring snippet" },
            { href: "#blocking", label: "Turn on blocking" },
            { href: "#ai", label: "Let AI add it for you" },
            { href: "#why", label: "Why it matters for HTML sites" },
            { href: "#faq", label: "Troubleshooting & FAQ" },
          ]}
        />

        {/* Overview */}
        <DocSection
          id="overview"
          title="How Marech protects a custom HTML site"
          lede="A custom or static HTML site is the most flexible case: you own the hosting, so you can run both modes — monitor everywhere with the snippet, and block scrapers at your own edge."
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="mars-card--marketing rounded-2xl p-6">
              <span className="text-eyebrow text-white/25 block mb-3">Mode 1</span>
              <h3 className="font-semibold text-white mb-2">Monitoring — the snippet</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                One <code>&lt;script&gt;</code> tag in your <code>&lt;head&gt;</code>. Reports
                scraper traffic to your dashboard and overlays JS-running bots.
              </p>
            </div>
            <div className="mars-card--marketing rounded-2xl p-6">
              <span className="text-eyebrow text-white/25 block mb-3">Mode 2</span>
              <h3 className="font-semibold text-white mb-2">Blocking — the edge check</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                An nginx proxy, Cloudflare Worker, or Vercel middleware checks each request{" "}
                <em>before</em> your origin serves HTML, returning a 403 to scrapers.
              </p>
            </div>
          </div>
        </DocSection>

        {/* Before you begin */}
        <DocSection
          id="before"
          title="Before you begin"
          lede="Monitoring needs only the first two. Blocking adds the last two."
        >
          <div className="mars-card--marketing rounded-xl p-6">
            <Checklist
              items={[
                <>
                  A Marech account —{" "}
                  <Link href="/signup" className="text-accent hover:underline">start a free trial</Link>.
                </>,
                <>Access to your site&apos;s HTML files or shared layout/template.</>,
                <>For blocking: control of your hosting (a VPS, Cloudflare, or Vercel in front of your origin).</>,
                <>
                  For blocking: a Marech{" "}
                  <Link href="/keys" className="text-accent hover:underline">API key</Link> and a{" "}
                  <Link href="/policies" className="text-accent hover:underline">block policy</Link>.
                </>,
              ]}
            />
          </div>
        </DocSection>

        {/* Monitoring */}
        <DocSection
          id="monitor"
          step={1}
          title="Install the monitoring snippet"
          lede="Paste one line of JavaScript into the <head> of your pages — or once into a shared layout to cover the whole site."
        >
          <div className="mars-card--marketing rounded-lg px-4 py-3 text-xs text-white/50 font-mono mb-5">
            Paste inside &lt;head&gt;…&lt;/head&gt;
          </div>
          <NumberedSteps steps={STEPS} />
          <div className="mt-5">
            <Callout tone="tip" title="Verify monitoring is live">
              Deploy your change, open the site in a normal browser, and check the{" "}
              <Link href="/dashboard" className="text-accent hover:underline">dashboard</Link> — your
              visit should appear in the traffic feed within seconds. If it doesn&apos;t, view the
              page source and confirm the <code>&lt;script&gt;</code> tag is present inside{" "}
              <code>&lt;head&gt;</code>.
            </Callout>
          </div>
        </DocSection>

        {/* Monitoring vs blocking */}
        <div className="mb-14">
          <Callout tone="info" title="Monitoring vs. blocking — the honest version">
            The pasted snippet reports traffic and overlays JS-running bots, but non-JS scrapers
            never run it. To actually block them, add a server-side integration in front of your
            site — an <span className="text-white/80">nginx proxy</span>,{" "}
            <span className="text-white/80">Cloudflare Worker</span>, or{" "}
            <span className="text-white/80">Vercel middleware</span> that checks each request with a
            Marech API key.
          </Callout>
        </div>

        {/* Blocking */}
        <DocSection
          id="blocking"
          step={2}
          title="Turn on real blocking (optional)"
          lede={
            <>
              Because you control your own hosting, you can run the enforcement check at your edge.
              All three integrations call the same endpoint and fail open. Needs a Marech{" "}
              <Link href="/keys" className="text-accent hover:underline">API key</Link> and a{" "}
              <Link href="/policies" className="text-accent hover:underline">block policy</Link>.
            </>
          }
        >
          <NumberedSteps steps={BLOCKING_STEPS} tone="ember" />
          <div className="mt-5 space-y-3">
            <p className="text-sm text-white/55">
              <span className="font-semibold text-white">Verify it&apos;s blocking.</span> With the
              integration live, a fake scraper user-agent should get a 403 while a real browser loads
              the page:
            </p>
            <CopyableCode code={'curl -A "GPTBot/1.0" -I https://yoursite.com/'} label="verify blocking" />
            <p className="text-sm text-white/45">
              The exact source for each integration (nginx config, Cloudflare Worker, Vercel
              middleware) lives in the{" "}
              <a
                href="https://github.com/MADANW/marech-BD/tree/main/integrations"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                marech-BD integrations directory
              </a>
              , with setup instructions for each.
            </p>
          </div>
        </DocSection>

        {/* AI prompting */}
        <DocSection
          id="ai"
          title="Not a developer? Let AI add it for you"
          lede="Copy a prompt below and paste it into ChatGPT, Claude, or any AI assistant. It will walk you through adding Marech to your exact setup."
        >
          <div className="space-y-4">
            {AI_PROMPTS.map((p) => (
              <CopyableCode key={p.label} code={p.prompt} label={p.label} language="prompt" />
            ))}
          </div>
        </DocSection>

        {/* Why it matters */}
        <DocSection
          id="why"
          title="Why it matters for HTML sites"
          lede="Static and custom HTML sites are high-value AI targets — your content is right there in the markup."
        >
          <FeatureGrid items={WHY} />
        </DocSection>

        {/* FAQ */}
        <DocSection id="faq" title="Troubleshooting & FAQ">
          <FaqList
            items={[
              {
                q: "Which blocking integration should I use?",
                a: "Match it to your hosting: nginx reverse proxy if you run your own server (VPS/EC2/Docker), a Cloudflare Worker if your domain is fronted by Cloudflare, or Vercel/Next.js middleware if you deploy on Vercel. They're interchangeable clients of the same enforcement endpoint.",
              },
              {
                q: "Do I need both the snippet and the edge integration?",
                a: "The edge integration is what actually blocks non-JS scrapers. The snippet adds in-browser monitoring and a block overlay for JS-running bots. Running both gives you the fullest picture, but blocking works with just the integration.",
              },
              {
                q: "Will blocking ever take my site down?",
                a: "No. Every integration fails open — if the Marech API is unreachable or slow, your pages are served normally. Protection can never make your site unavailable.",
              },
            ]}
          />
        </DocSection>

        {/* Next steps */}
        <DocSection title="Next steps">
          <NextSteps
            items={[
              { href: "/how-it-works", title: "How detection works", body: "The signals Marech uses to tell scrapers from real visitors." },
              { href: "/docs", title: "All platform guides", body: "Compare setup and blocking support across every platform." },
              { href: "/keys", title: "Create an API key", body: "The bm_ key your edge integration authenticates with." },
              { href: "/pricing", title: "Plans & pricing", body: "Free 7-day trial, then pick the plan that fits your traffic." },
            ]}
          />
        </DocSection>

        <DocCTA
          title="Ready to protect your HTML site?"
          body="Free 7-day trial. No credit card required."
          cta="Get Started Free"
        />
      </div>
    </div>
  );
}
