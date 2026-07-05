"use client";
import { useEffect, useState } from "react";

export type GfxTier = "static" | "full";

/**
 * Decides whether a device earns the WebGL layer. Always returns "static"
 * on the first render (server and client alike) so SSR markup never
 * depends on client capabilities — canvases mount from effects only.
 */
export function useGfxTier(): GfxTier {
  const [tier, setTier] = useState<GfxTier>("static");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    if (nav.connection?.saveData) return;
    if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return;

    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    if (!gl) return;
    gl.getExtension("WEBGL_lose_context")?.loseContext();

    setTier("full");
  }, []);

  return tier;
}
