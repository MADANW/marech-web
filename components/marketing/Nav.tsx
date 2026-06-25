"use client";
import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0d0704] border-b border-white/8">
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-14 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-base shrink-0"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <img src="/logos/blockme-icon-color.svg" className="w-5 h-5" alt="" />
          block.me
        </Link>

        {/* Desktop nav — center */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {[
            { label: "Pricing", href: "/pricing" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Blog", href: "/blog" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-medium tracking-widest uppercase text-white/50 hover:text-white/90 transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <Link
            href="/login"
            className="text-xs font-medium tracking-widest uppercase text-white/50 hover:text-white/90 transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-xs font-bold tracking-widest uppercase bg-[#c44a1a] hover:bg-[#d45520] text-white px-4 py-2 rounded transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Start Free →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/8 bg-[#0d0704] px-6 py-5 flex flex-col gap-5">
          {[
            { label: "Pricing", href: "/pricing" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Blog", href: "/blog" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-medium tracking-widest uppercase text-white/50"
              style={{ fontFamily: "var(--font-mono)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-white/8" />
          <Link
            href="/login"
            className="text-xs font-medium tracking-widest uppercase text-white/50"
            style={{ fontFamily: "var(--font-mono)" }}
            onClick={() => setOpen(false)}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-xs font-bold tracking-widest uppercase bg-[#c44a1a] text-white px-4 py-2.5 rounded text-center"
            style={{ fontFamily: "var(--font-mono)" }}
            onClick={() => setOpen(false)}
          >
            Start Free →
          </Link>
        </div>
      )}
    </header>
  );
}
