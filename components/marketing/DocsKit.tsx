import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

/**
 * DocsKit — shared, server-rendered building blocks for the documentation and
 * platform-guide pages, so every doc reads like one system. Presentational
 * only (no hooks); pair with <CopyableCode> where clipboard interaction is
 * needed.
 */

/* --------------------------------- Hero --------------------------------- */

export interface MetaItem {
  label: string;
  value: string;
  /** Optional accent for the value chip. */
  tone?: "default" | "ember" | "muted";
}

export function DocHero({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  meta?: MetaItem[];
}) {
  return (
    <header className="mb-12">
      <span className="text-eyebrow text-mars-ember block mb-3">{eyebrow}</span>
      <h1
        className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h1>
      <p className="text-white/60 text-lg max-w-2xl leading-relaxed">{lede}</p>
      {meta && meta.length > 0 && <MetaBar items={meta} />}
    </header>
  );
}

export function MetaBar({ items }: { items: MetaItem[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {items.map((m) => (
        <span
          key={m.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs"
        >
          <span className="text-white/40">{m.label}</span>
          <span
            className={
              m.tone === "ember"
                ? "text-mars-ember font-medium"
                : m.tone === "muted"
                ? "text-white/45"
                : "text-white/80 font-medium"
            }
          >
            {m.value}
          </span>
        </span>
      ))}
    </div>
  );
}

/* --------------------------- Table of contents --------------------------- */

export function TableOfContents({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav className="mars-card--marketing rounded-xl p-5 mb-12" aria-label="On this page">
      <span className="text-eyebrow text-white/35 block mb-3">On this page</span>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it.href}>
            <a
              href={it.href}
              className="text-sm text-white/55 hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <span className="text-white/20">#</span>
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------- Section -------------------------------- */

export function DocSection({
  id,
  step,
  title,
  lede,
  children,
}: {
  id?: string;
  step?: number;
  title: string;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <div className="flex items-center gap-3 mb-2">
        {step !== undefined && (
          <span
            className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/25 text-accent font-bold flex items-center justify-center shrink-0 text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {step}
          </span>
        )}
        <h2
          className="text-2xl font-bold text-white tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
      </div>
      {lede && <p className="text-white/55 mb-6 leading-relaxed">{lede}</p>}
      {!lede && <div className="mb-6" />}
      {children}
    </section>
  );
}

/* ---------------------------- Numbered steps ---------------------------- */

export interface Step {
  title: string;
  body: ReactNode;
}

export function NumberedSteps({ steps, tone = "accent" }: { steps: Step[]; tone?: "accent" | "ember" }) {
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
            <div className="text-sm text-white/60 leading-relaxed">{step.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- Callout ------------------------------- */

const CALLOUT_TONES: Record<string, string> = {
  info: "border-mars-ember/50",
  tip: "border-success/50",
  warn: "border-warning/50",
  danger: "border-red-500/50",
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "tip" | "warn" | "danger";
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mars-card--marketing rounded-xl p-5 text-sm text-white/60 border-l-2 ${CALLOUT_TONES[tone]}`}>
      {title && <div className="font-semibold text-white mb-1">{title}</div>}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

/* ----------------------------- Feature grid ----------------------------- */

export function FeatureGrid({
  items,
  columns = 2,
}: {
  items: { title: string; body: ReactNode; eyebrow?: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div className={`grid gap-4 ${columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
      {items.map((it, i) => (
        <div key={i} className="mars-card--marketing rounded-2xl p-6">
          {it.eyebrow && <span className="text-eyebrow text-white/25 block mb-3">{it.eyebrow}</span>}
          <h3 className="font-semibold text-white mb-2">{it.title}</h3>
          <p className="text-sm text-white/55 leading-relaxed">{it.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Checklist ------------------------------- */

export function Checklist({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-sm text-white/60 leading-relaxed">
          <svg className="w-4 h-4 text-success shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------- FAQ ---------------------------------- */

export interface Faq {
  q: string;
  a: ReactNode;
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={i} className="mars-card--marketing rounded-xl p-5 group">
          <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between gap-4">
            {f.q}
            <svg
              className="w-4 h-4 text-white/40 shrink-0 transition-transform group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="text-sm text-white/60 leading-relaxed mt-3">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------ Next steps ------------------------------ */

export function NextSteps({
  items,
}: {
  items: { href: string; title: string; body: string; external?: boolean }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {items.map((it) => {
        const inner = (
          <>
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              {it.title}
              {it.external && (
                <svg className="w-3.5 h-3.5 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
            </div>
            <div className="text-sm text-white/55 leading-relaxed">{it.body}</div>
          </>
        );
        const cls =
          "mars-card--marketing rounded-xl p-5 hover:border-white/20 transition-colors block";
        return it.external ? (
          <a key={it.href} href={it.href} className={cls} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <Link key={it.href} href={it.href} className={cls}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

/* --------------------------------- CTA ---------------------------------- */

export function DocCTA({
  title,
  body,
  cta = "Start Free Trial",
  href = "/signup",
}: {
  title: string;
  body: string;
  cta?: string;
  href?: string;
}) {
  return (
    <div className="mars-card--marketing rounded-2xl p-10 text-center">
      <h2
        className="text-2xl font-bold text-white tracking-[-0.02em] mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <p className="text-white/60 mb-6">{body}</p>
      <Link href={href}>
        <Button variant="accent" size="lg">{cta}</Button>
      </Link>
    </div>
  );
}
