import { MarsScape } from "@/components/gfx/MarsScape";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarsScape />
      <main className="relative flex-1" style={{ zIndex: 1 }}>{children}</main>
    </div>
  );
}
