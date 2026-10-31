"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

interface MultiversePortal3DProps {
  className?: string;
}

// Check WebGL availability safely
function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Inner Portal Rings with chromatic shift and slow breathing
function PortalRings({ pointerRef }: { pointerRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const px = pointerRef.current.x * 0.25;
    const py = pointerRef.current.y * 0.25;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.08;
      outerRingRef.current.rotation.x = THREE.MathUtils.lerp(outerRingRef.current.rotation.x, py * 0.5, 0.05);
      outerRingRef.current.rotation.y = THREE.MathUtils.lerp(outerRingRef.current.rotation.y, px * 0.5, 0.05);
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.z = -time * 0.12;
      midRingRef.current.scale.setScalar(1 + Math.sin(time * 1.2) * 0.03);
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 0.16;
    }
  });

  return (
    <group ref={outerRingRef} position={[0, 0, -1]}>
      {/* Outer Hexagonal Ring (Magenta / Crimson) */}
      <mesh>
        <ringGeometry args={[2.5, 2.58, 6]} />
        <meshBasicMaterial color="#ff1361" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer Outer Dotted Web Ring */}
      <mesh>
        <ringGeometry args={[3.1, 3.14, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Middle Ring (Electric Cyan) */}
      <group ref={midRingRef}>
        <mesh>
          <ringGeometry args={[1.8, 1.87, 8]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.75} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Inner Vortex Ring (Yellow / Gold) */}
      <group ref={innerRingRef}>
        <mesh>
          <ringGeometry args={[1.1, 1.16, 6]} />
          <meshBasicMaterial color="#ffe600" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
        {/* Core Quantum Glow Disk */}
        <mesh position={[0, 0, -0.2]}>
          <circleGeometry args={[1.05, 32]} />
          <meshBasicMaterial color="#07070e" transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// Stylized Web Strands radiating through the portal
function DimensionalWebLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      // Inner portal point
      const rInner = 1.1;
      const x1 = Math.cos(angle) * rInner;
      const y1 = Math.sin(angle) * rInner;
      const z1 = -0.5;

      // Outer web point extending into depth
      const rOuter = 4.0;
      const x2 = Math.cos(angle + 0.2) * rOuter;
      const y2 = Math.sin(angle + 0.2) * rOuter;
      const z2 = -3.5;

      points.push(x1, y1, z1, x2, y2, z2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#00e5ff" transparent opacity={0.25} />
    </lineSegments>
  );
}

// Floating Comic Dimension Shards
function ComicShards({ pointerRef }: { pointerRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const shardsCount = 14;
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => {
    const colors = ["#ff1361", "#00e5ff", "#ffe600", "#ffffff"];
    return Array.from({ length: shardsCount }).map((_, i) => {
      const angle = (i / shardsCount) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 1.6 + Math.random() * 2.2;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        z: -0.5 - Math.random() * 2.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        rotSpeed: 0.3 + Math.random() * 0.6,
        scale: 0.12 + Math.random() * 0.16,
        color: colors[i % colors.length],
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const px = pointerRef.current.x * 0.3;
    const py = pointerRef.current.y * 0.3;

    groupRef.current.children.forEach((mesh, idx) => {
      const data = shards[idx];
      mesh.rotation.x = time * data.rotSpeed;
      mesh.rotation.y = time * data.rotSpeed * 0.8;
      mesh.position.x = data.x + Math.sin(time + idx) * 0.15 + px * 0.2;
      mesh.position.y = data.y + Math.cos(time * 0.9 + idx) * 0.15 + py * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, idx) => (
        <mesh key={idx} position={[s.x, s.y, s.z]} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={s.color} transparent opacity={0.65} wireframe={idx % 2 === 0} />
        </mesh>
      ))}
    </group>
  );
}

// Fallback when WebGL is unavailable or user prefers reduced motion
export function MultiversePortalFallback({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full flex items-center justify-center">
        {/* Outer Hexagonal Ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-[#ff1361]/40 border-dashed animate-[portal-spin_25s_linear_infinite]"
          style={{ boxShadow: "0 0 60px rgba(255, 19, 97, 0.15)" }}
        />
        {/* Middle Cyan Ring */}
        <div
          className="absolute inset-8 rounded-full border-2 border-[#00e5ff]/50 animate-[portal-spin_18s_linear_infinite_reverse]"
          style={{ boxShadow: "0 0 40px rgba(0, 229, 255, 0.2)" }}
        />
        {/* Inner Yellow Ring */}
        <div className="absolute inset-20 rounded-full border-2 border-[#ffe600]/60 animate-[pulse-glow_4s_ease-in-out_infinite]" />
        {/* Deep Core */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#ff1361]/30 via-[#07070e] to-[#00e5ff]/30 border border-white/20" />
      </div>
    </div>
  );
}

export default function MultiversePortal3D({ className = "" }: MultiversePortal3DProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());

    // Track mouse pointer for smooth lerp
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Pause rendering when tab is hidden or offscreen
    const onVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  // Use fallback if reduced motion, no WebGL, or during SSR
  if (reducedMotion || hasWebGL === false) {
    return <MultiversePortalFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {hasWebGL && !isPaused && (
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 48 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          className="absolute inset-0 block w-full h-full pointer-events-none"
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 2]} intensity={0.8} color="#ff1361" />
          <pointLight position={[-3, -3, 2]} intensity={0.8} color="#00e5ff" />
          <PortalRings pointerRef={pointerRef} />
          <DimensionalWebLines />
          <ComicShards pointerRef={pointerRef} />
        </Canvas>
      )}
    </div>
  );
}
