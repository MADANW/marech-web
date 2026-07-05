"use client";

/**
 * CSS-only Mars planet with orbit rings — the reduced-motion / no-WebGL
 * fallback for MarsSetPiece (extracted from the dashboard hero band).
 */
export function MarsPlanetStatic() {
  return (
    <div className="relative hidden h-40 w-40 shrink-0 sm:block" aria-hidden>
      <div className="mars-orbit-ring mars-orbit-spin absolute inset-0">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mars-cyan shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]" />
      </div>
      <div className="mars-orbit-ring absolute inset-[20px] opacity-50" />
      <div className="mars-planet absolute inset-[38px]" />
    </div>
  );
}
