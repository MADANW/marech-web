import { AuthProvider } from "@/lib/auth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ backgroundImage: "url(/bg.jpg)", backgroundSize: "cover", backgroundPosition: "center top", zIndex: 0 }}
        />
        <div className="fixed inset-0 bg-black/55 pointer-events-none" style={{ zIndex: 1 }} />
        <main className="relative flex-1" style={{ zIndex: 2 }}>{children}</main>
      </div>
    </AuthProvider>
  );
}
