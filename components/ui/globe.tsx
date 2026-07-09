"use client";
/**
 * Magic UI Globe (https://magicui.design/docs/components/globe), adapted to
 * the mars theme (dark sphere, ember markers) and to the cobe v2 API — v2
 * dropped the per-frame `onRender` callback, so rotation is driven by our own
 * requestAnimationFrame loop calling `globe.update()`.
 *
 * Markers sit on major cloud-datacenter regions — the places scraper traffic
 * actually originates from (see the datacenter-IP heuristic in the backend).
 */
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.6,
  mapSamples: 16000,
  mapBrightness: 2.2,
  baseColor: [0.32, 0.25, 0.22],
  // mars-ember #ff8a5b
  markerColor: [1, 0.54, 0.36],
  glowColor: [0.25, 0.12, 0.07],
  markers: [
    // Major cloud/datacenter regions — where scraper traffic comes from.
    { location: [39.0, -77.5], size: 0.1 }, // N. Virginia (us-east-1)
    { location: [45.84, -119.7], size: 0.07 }, // Oregon (us-west-2)
    { location: [51.51, -0.13], size: 0.08 }, // London
    { location: [50.11, 8.68], size: 0.08 }, // Frankfurt
    { location: [-23.55, -46.63], size: 0.07 }, // São Paulo
    { location: [19.08, 72.88], size: 0.08 }, // Mumbai
    { location: [1.35, 103.82], size: 0.08 }, // Singapore
    { location: [35.68, 139.69], size: 0.08 }, // Tokyo
    { location: [-33.87, 151.21], size: 0.06 }, // Sydney
    { location: [53.34, -6.26], size: 0.06 }, // Dublin
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;
    const onResize = () => {
      width = canvas.offsetWidth;
      globe.update({ width: width * 2, height: width * 2 });
    };

    const globe = createGlobe(canvas, {
      ...config,
      width: width * 2,
      height: width * 2,
    });
    window.addEventListener("resize", onResize);

    // cobe v2 has no onRender hook: drive rotation with our own rAF loop.
    let phi = 0;
    let raf = 0;
    const frame = () => {
      if (pointerInteracting.current === null) phi += 0.005;
      globe.update({ phi: phi + rs.get() });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const t = setTimeout(() => {
      canvas.style.opacity = "1";
    }, 0);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
