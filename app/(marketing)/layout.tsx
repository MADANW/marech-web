import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed background — works in iframes unlike background-attachment:fixed */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          zIndex: 0,
        }}
      />
      <div className="fixed inset-0 bg-black/55 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="relative flex flex-col flex-1" style={{ zIndex: 2 }}>
        <ScrollProgress className="h-0.5 from-black via-[#f97316] to-white" />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
