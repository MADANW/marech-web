import { MarsBackdropLazy } from "./lazy";

/**
 * The shared page backdrop: server-rendered CSS layers (so the composition
 * paints with the very first HTML) plus the client-only shader canvas that
 * fades in on devices that earn it. Mount once per route-group layout.
 */
export function MarsScape() {
  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 mars-scape" />
      <div className="absolute inset-0 mars-starfield opacity-70" />
      <MarsBackdropLazy />
      <div className="mars-horizon" />
      <div className="grain" />
    </div>
  );
}
