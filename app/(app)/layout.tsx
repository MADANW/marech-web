"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { isMock, resendVerification } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/marketing/Logo";
import { OctagonAlertIcon, AlertTriangleIcon, GiftIcon } from "@/components/ui/icons";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: GridIcon },
  { href: "/logs", label: "Traffic Logs", icon: ListIcon },
  { href: "/policies", label: "Policies", icon: ShieldIcon },
  { href: "/snippet", label: "Get Snippet", icon: CodeIcon },
  { href: "/account", label: "Account", icon: UserIcon },
  { href: "/billing", label: "Billing", icon: CreditCardIcon },
];

function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleResend = async () => {
    if (!user?.email || resendState !== "idle") return;
    setResendState("sending");
    try {
      await resendVerification(user.email);
      setResendState("sent");
    } catch {
      setResendState("idle");
    }
  };

  const statusBanner = (() => {
    if (!user) return null;
    // Unverified outranks everything below: protection is fully inactive.
    if (user.emailVerified === false)
      return (
        <div className="border-b border-app-border bg-warning/10 text-warning px-6 py-2.5 text-[12px] flex items-center justify-between" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="flex items-center gap-2 uppercase tracking-[0.08em]"><AlertTriangleIcon className="h-4 w-4 shrink-0" /> Verify your email — protection is inactive until you click the link we sent</span>
          <button onClick={handleResend} disabled={resendState !== "idle"} className="font-medium ml-4 hover:underline disabled:opacity-60 disabled:no-underline">
            {resendState === "sent" ? "Sent — check your inbox" : resendState === "sending" ? "Sending…" : "Resend email"}
          </button>
        </div>
      );
    if (user.status === "suspended")
      return (
        <div className="border-b border-app-border bg-danger/10 text-red-300 px-6 py-2.5 text-[12px] flex items-center justify-between" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="flex items-center gap-2 uppercase tracking-[0.08em]"><OctagonAlertIcon className="h-4 w-4 shrink-0" /> Account suspended — update payment to restore protection</span>
          <Link href="/billing" className="font-medium ml-4 hover:underline">Update payment</Link>
        </div>
      );
    if (user.status === "payment_failed")
      return (
        <div className="border-b border-app-border bg-danger/10 text-red-300 px-6 py-2.5 text-[12px] flex items-center justify-between" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="flex items-center gap-2 uppercase tracking-[0.08em]"><AlertTriangleIcon className="h-4 w-4 shrink-0" /> Payment failed — protection stops soon</span>
          <Link href="/billing" className="font-medium ml-4 hover:underline">Update payment</Link>
        </div>
      );
    if (user.status === "trial") {
      // Hard expiry: the backend stops serving protection once the trial is up.
      if (user.trialDaysLeft <= 0)
        return (
          <div className="border-b border-app-border bg-danger/10 text-red-300 px-6 py-2.5 text-[12px] flex items-center justify-between" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="flex items-center gap-2 uppercase tracking-[0.08em]"><OctagonAlertIcon className="h-4 w-4 shrink-0" /> Trial expired — protection is inactive until you add a payment method</span>
            <Link href="/billing" className="font-medium ml-4 hover:underline">Add payment method</Link>
          </div>
        );
      return (
        <div className="border-b border-app-border bg-accent/10 text-accent px-6 py-2.5 text-[12px] flex items-center justify-between" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="flex items-center gap-2 uppercase tracking-[0.08em]"><GiftIcon className="h-4 w-4 shrink-0" /> Free trial — {user.trialDaysLeft} days left</span>
          <Link href="/billing" className="font-medium ml-4 hover:underline">Add payment method</Link>
        </div>
      );
    }
    return null;
  })();

  const SidebarContent = () => (
    <nav className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-app-border-faint">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-app-faint">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Systems nominal
        </div>
      </div>
      <div className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2 rounded-lg text-[11.5px] font-medium uppercase tracking-[0.12em] transition-colors",
                active
                  ? "bg-app-hover text-app-text"
                  : "text-app-muted hover:bg-app-hover hover:text-app-text"
              )}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {active && (
                <span className="absolute -left-3 top-1.5 bottom-1.5 w-[2.5px] rounded-r bg-accent" />
              )}
              <Icon className={cn("w-[17px] h-[17px] shrink-0", active ? "text-accent" : "")} />
              {label}
            </Link>
          );
        })}
      </div>
      <div className="px-5 py-4 border-t border-app-border text-xs text-app-faint truncate">
        {user?.email}
      </div>
    </nav>
  );

  return (
    <div className="relative flex h-screen overflow-hidden bg-app-bg">
      {/* Atmospheric horizon glow behind everything */}
      <div className="mars-horizon z-0" />

      {/* Desktop sidebar */}
      <aside className="relative z-10 hidden md:flex flex-col w-56 bg-app-sidebar border-r border-app-border shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 h-full bg-app-sidebar border-r border-app-border">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="relative z-10 flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-app-sidebar border-b border-app-border px-4 h-14 flex items-center justify-between shrink-0">
          <button
            className="md:hidden p-2 text-app-muted hover:text-app-text"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
          {isMock && (
            <span
              className="mr-3 inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-warning"
              style={{ fontFamily: "var(--font-mono)" }}
              title="This portal is showing demo data (NEXT_PUBLIC_MOCK=true), not your real traffic."
            >
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              Demo data
            </span>
          )}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-sm text-app-muted hover:text-app-text"
            >
              <div className="w-7 h-7 rounded-full bg-accent text-white font-semibold flex items-center justify-center text-xs">
                {user?.email?.[0]?.toUpperCase() ?? "U"}
              </div>
              <svg className="w-4 h-4 text-app-faint" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-44 mars-card rounded-lg shadow-2xl py-1 z-20">
                  <Link href="/account" className="block px-4 py-2 text-sm text-app-muted hover:bg-app-hover hover:text-app-text" onClick={() => setDropdownOpen(false)}>Settings</Link>
                  <Link href="/billing" className="block px-4 py-2 text-sm text-app-muted hover:bg-app-hover hover:text-app-text" onClick={() => setDropdownOpen(false)}>Billing</Link>
                  <hr className="my-1 border-app-border" />
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-app-hover">Log out</button>
                </div>
              </>
            )}
          </div>
        </header>

        {statusBanner}

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}

/* Icons */
function GridIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>;
}
function ListIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
}
function ShieldIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}
function CodeIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
}
function UserIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
}
function CreditCardIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
}
