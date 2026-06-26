"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/marketing/Logo";

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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const statusBanner = (() => {
    if (!user) return null;
    if (user.status === "suspended")
      return (
        <div className="bg-danger text-white px-4 py-3 text-sm flex items-center justify-between">
          <span>🛑 Account Suspended — update payment to restore protection</span>
          <Link href="/billing" className="underline font-medium ml-4">Update Payment</Link>
        </div>
      );
    if (user.status === "payment_failed")
      return (
        <div className="bg-danger text-white px-4 py-3 text-sm flex items-center justify-between">
          <span>⚠️ Payment Failed — protection stops soon</span>
          <Link href="/billing" className="underline font-medium ml-4">Update Payment</Link>
        </div>
      );
    if (user.status === "trial")
      return (
        <div className="bg-accent text-white px-4 py-3 text-sm flex items-center justify-between">
          <span>🎁 Free Trial — {user.trialDaysLeft} days left</span>
          <Link href="/billing" className="underline font-medium ml-4">Add Payment Method</Link>
        </div>
      );
    return null;
  })();

  const SidebarContent = () => (
    <nav className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-white/10">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>
      <div className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              pathname === href
                ? "bg-accent text-white"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </div>
      <div className="px-4 py-4 border-t border-white/10 text-xs text-white/40 truncate">
        {user?.email}
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#c44a1a" }}>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-[#0d0704] border-r border-white/10 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 h-full bg-[#0d0704] shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-[#0d0704] border-b border-white/10 px-4 h-14 flex items-center justify-between shrink-0">
          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <div className="w-7 h-7 rounded-full bg-accent text-white font-bold flex items-center justify-center text-xs">
                {user?.email?.[0]?.toUpperCase() ?? "U"}
              </div>
              <svg className="w-4 h-4 text-white/40" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-44 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-lg py-1 z-20">
                  <Link href="/account" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5" onClick={() => setDropdownOpen(false)}>Settings</Link>
                  <Link href="/billing" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5" onClick={() => setDropdownOpen(false)}>Billing</Link>
                  <hr className="my-1 border-white/10" />
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-white/5">Log out</button>
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
