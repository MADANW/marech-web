"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/marketing/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

/**
 * Mission bar: transparent over the hero scape, condensing to glass with a
 * hairline once the page scrolls. Active route gets the rust rail (the
 * horizontal twin of the portal sidebar's indicator).
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("overflow-hidden");
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  // Close the drawer on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const barStyle = { transition: "all 250ms var(--ease-mission)" };

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        scrolled || open
          ? "bg-black/70 backdrop-blur-xl border-b border-white/8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent"
      )}
      style={barStyle}
    >
      <nav
        className={cn(
          "max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between gap-8",
          scrolled ? "h-14" : "h-16"
        )}
        style={barStyle}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav — center */}
        <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} active={pathname === l.href}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop right: status chip + CTAs */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <NavLink href="/login" active={pathname === "/login"}>
            Log In
          </NavLink>
          <Link href="/signup">
            <Button variant="accent" size="sm">Start Free →</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors duration-150"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden bg-black/85 backdrop-blur-xl",
          open ? "max-h-[70vh] border-t border-white/8" : "max-h-0"
        )}
        style={{ transition: "max-height 250ms var(--ease-mission)" }}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "relative rounded-lg px-3 py-3 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-150",
                  active ? "text-white bg-white/5" : "text-white/50 hover:text-white/90"
                )}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r bg-accent" />
                )}
                {l.label}
              </Link>
            );
          })}
          <hr className="my-4 border-white/8" />
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="px-3 pb-4 text-xs font-medium tracking-[0.14em] uppercase text-white/50 hover:text-white/90 transition-colors duration-150"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Log In
          </Link>
          <Link href="/signup" onClick={() => setOpen(false)} className="block">
            <Button variant="accent" size="md" className="w-full">Start Free →</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

/** Mono eyebrow link with a rust rail (active) or scale-in underline (hover). */
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative py-1 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-150",
        "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-accent",
        "after:origin-left after:transition-transform after:duration-150",
        active
          ? "text-white after:scale-x-100"
          : "text-white/50 hover:text-white/90 after:scale-x-0 hover:after:scale-x-100 hover:after:bg-white/25"
      )}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </Link>
  );
}
