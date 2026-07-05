"use client";
import { Component, ReactNode, useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { useGfxTier } from "./useGfxTier";

/**
 * WebGL layer of the shared Mars-scape backdrop. The always-present CSS
 * layers (.mars-scape, .mars-starfield, .grain) are server-rendered by the
 * layouts; this component only adds the animated shader gradient on top,
 * fading it in so there is never a flash or layout shift. Devices that
 * don't earn the canvas (useGfxTier) simply keep the CSS composition.
 */
export default function MarsBackdrop() {
  const tier = useGfxTier();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (tier !== "full") return;
    const t = setTimeout(() => setVisible(true), 350);
    return () => clearTimeout(t);
  }, [tier]);

  if (tier !== "full") return null;

  return (
    <CanvasBoundary>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: visible ? 0.55 : 0,
          transition: "opacity 600ms var(--ease-mission)",
        }}
      >
        <ShaderGradientCanvas
          lazyLoad
          pixelDensity={1}
          pointerEvents="none"
          powerPreference="low-power"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <ShaderGradient
            control="props"
            type="waterPlane"
            animate="on"
            uSpeed={0.12}
            uStrength={1.7}
            uDensity={1.1}
            uFrequency={2.4}
            uAmplitude={0}
            color1="#0a0908"
            color2="#c1440e"
            color3="#ff8a5b"
            grain="off"
            lightType="3d"
            brightness={1.1}
            reflection={0.1}
            cDistance={2.6}
            cPolarAngle={95}
            cAzimuthAngle={180}
            cameraZoom={1}
            positionX={0}
            positionY={-0.6}
            positionZ={0}
            rotationX={0}
            rotationY={0}
            rotationZ={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>
    </CanvasBoundary>
  );
}

/** If WebGL throws for any reason, silently keep the CSS scape. */
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
