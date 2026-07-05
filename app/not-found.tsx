import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LiquidMarechIconLazy } from "@/components/gfx/lazy";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 mars-scape" />
        <div className="absolute inset-0 mars-starfield opacity-70" />
        <div className="mars-horizon" />
        <div className="grain" />
      </div>

      <div className="relative text-center">
        <div className="flex justify-center mb-8">
          <LiquidMarechIconLazy size={64} />
        </div>
        <div className="text-eyebrow text-mars-ember mb-4">Signal lost — 404</div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          This sector is uncharted.
        </h1>
        <p className="text-white/50 max-w-sm mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for drifted out of orbit — or never existed.
        </p>
        <Link href="/">
          <Button variant="accent" size="md">Return to base →</Button>
        </Link>
      </div>
    </div>
  );
}
