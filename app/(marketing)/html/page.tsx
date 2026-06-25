"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const SNIPPET_PLACEHOLDER = `<script src="https://cdn.blockme.io/blockme.js" data-key="YOUR_KEY"></script>`;

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
    title: "Copy your block.me snippet",
    body: 'After signing up, open your block.me dashboard and click "Get Snippet Code". Copy the one-line script tag.',
  },
  {
    title: "Open your HTML files",
    body: "Open the HTML files for your site in your code editor of choice.",
  },
  {
    title: "Paste inside the <head> tag",
    body: "Paste the block.me snippet anywhere inside the <head> element, before the closing </head> tag.",
  },
  {
    title: "Repeat for every page (or use a shared layout)",
    body: "If your site uses a shared header template or layout file, paste it there once — all pages will be covered automatically.",
  },
  {
    title: "Upload and deploy",
    body: "Save your files and redeploy your site. block.me starts blocking AI scrapers immediately.",
  },
];

export default function HtmlPage() {
  return (
    <div className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center">
          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3" style={{ fontFamily: "var(--font-syne)" }}>
            HTML Guide
          </span>
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            block.me for Any HTML Site
          </h1>
          <p className="text-white/60 text-lg">
            Running a custom-built or static HTML site? block.me works anywhere you can add a script tag.
          </p>
        </div>

        {/* Steps */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            Step-by-step instructions
          </h2>
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                <div
                  className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold flex items-center justify-center shrink-0 text-sm"
                  style={{ fontFamily: "var(--font-syne)" }}
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
        </section>

        {/* AI Prompting section */}
        <section>
          <div className="mb-6">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-2" style={{ fontFamily: "var(--font-syne)" }}>
              Not a developer?
            </span>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Let AI add it for you
            </h2>
            <p className="text-white/50 text-sm mt-2">
              Copy a prompt below and paste it into ChatGPT, Claude, or any AI assistant. It will walk you through adding block.me to your exact setup.
            </p>
          </div>
          <div className="space-y-4">
            {AI_PROMPTS.map((p) => (
              <PromptCard key={p.label} label={p.label} prompt={p.prompt} />
            ))}
          </div>
        </section>

        {/* Prompt injection defense section */}
        <section>
          <div className="mb-6">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-2" style={{ fontFamily: "var(--font-syne)" }}>
              Why it matters for HTML sites
            </span>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              HTML sites are high-value AI targets
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Training data harvesting",
                body: "AI companies scrape raw HTML pages to build training datasets. Your prose, your research, your creative work — fed into models without permission or compensation.",
              },
              {
                title: "Prompt injection via scraped content",
                body: "Attackers embed hidden instructions in page text (e.g. \"Ignore previous instructions…\") that get lifted by AI scrapers and injected into AI pipelines downstream. block.me stops the scraper before it reads anything.",
              },
              {
                title: "Content duplication by AI agents",
                body: "Autonomous AI agents crawl HTML sites to summarize, rewrite, and republish your content — stripping traffic and SEO value. block.me fingerprints and blocks known agent user-agents in real time.",
              },
              {
                title: "Competitor intelligence bots",
                body: "Businesses deploy AI crawlers to harvest pricing, copy, and product data from competitor HTML sites. block.me detects non-human request patterns and returns a 403 before any data is read.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                <div className="font-semibold text-white mb-2">{card.title}</div>
                <p className="text-sm text-white/55 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video placeholder */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl aspect-video flex items-center justify-center">
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
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to protect your HTML site?
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

function PromptCard({ label, prompt }: { label: string; prompt: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <span className="text-sm font-semibold text-white">{label}</span>
        <button
          onClick={copy}
          className="text-xs font-medium text-accent hover:text-white transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy prompt
            </>
          )}
        </button>
      </div>
      <pre className="px-5 py-4 text-xs text-white/55 leading-relaxed whitespace-pre-wrap font-mono">{prompt}</pre>
    </div>
  );
}
