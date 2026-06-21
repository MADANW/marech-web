"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white text-xl tracking-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <img src="/logos/blockme-icon-color.svg" className="w-7 h-7" alt="" />
          BlockMe
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Pricing", href: "/pricing" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Blog", href: "/blog" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost-dark" size="sm">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button variant="accent" size="sm">Start Free Trial →</Button>
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
        <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-xl px-4 py-4 flex flex-col gap-4">
          <Link href="/pricing" className="text-sm font-medium text-white/70" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-white/70" onClick={() => setOpen(false)}>How It Works</Link>
          <Link href="/blog" className="text-sm font-medium text-white/70" onClick={() => setOpen(false)}>Blog</Link>
          <hr className="border-white/10" />
          <Link href="/login" onClick={() => setOpen(false)}>
            <Button variant="ghost-dark" size="sm" className="w-full">Log in</Button>
          </Link>
          <Link href="/signup" onClick={() => setOpen(false)}>
            <Button variant="accent" size="sm" className="w-full">Start Free Trial →</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
