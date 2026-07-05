"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGfxTier } from "./useGfxTier";
import { MarsPlanetStatic } from "./MarsPlanetStatic";

/**
 * The portal's one real-time 3D set-piece: a slowly rotating Mars with two
 * tilted orbital rings and patrol satellites. Rendered only on the
 * dashboard hero; every other portal page stays canvas-free. Devices that
 * don't earn WebGL (useGfxTier) get the CSS planet instead.
 */
export default function MarsSetPiece() {
  const tier = useGfxTier();
  if (tier !== "full") return <MarsPlanetStatic />;

  return (
    <div className="relative hidden h-40 w-40 shrink-0 sm:block" aria-hidden>
      <Canvas
        dpr={1}
        camera={{ position: [0, 0.6, 3.4], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[-2.5, 2.5, 2]} intensity={1.7} color="#ffd9c0" />
        <directionalLight position={[3, -1, -2]} intensity={0.25} color="#22d3ee" />
        <Mars />
        <OrbitRing radius={1.55} tilt={0.5} speed={0.25} satellites={2} />
        <OrbitRing radius={1.9} tilt={-0.35} speed={-0.16} satellites={1} />
      </Canvas>
    </div>
  );
}

function Mars() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.08;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 48, 48]} />
      {/* Rust body; the warm key light supplies the ember terminator. */}
      <meshStandardMaterial color="#a63d12" roughness={0.85} metalness={0.08} />
    </mesh>
  );
}

function OrbitRing({
  radius,
  tilt,
  speed,
  satellites,
}: {
  radius: number;
  tilt: number;
  speed: number;
  satellites: number;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * speed;
  });

  const ringGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={group}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <lineLoop geometry={ringGeometry}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.16} />
        </lineLoop>
        {Array.from({ length: satellites }).map((_, i) => {
          const a = (i / satellites) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#22d3ee" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
