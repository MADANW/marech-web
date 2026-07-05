import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { MarsScape } from "@/components/gfx/MarsScape";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarsScape />
      <div className="relative flex flex-col flex-1" style={{ zIndex: 1 }}>
        <ScrollProgress className="h-0.5 from-mars-rust-dim via-mars-rust to-mars-ember" />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
