"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

interface SpiderWeb3DProps {
  className?: string;
}

function WebParticles({ count = 150 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const reducedMotion = useReducedMotion();

  useFrame(() => {
    if (reducedMotion || !ref.current) return;
    const time = performance.now() * 0.001;
    ref.current.rotation.y = time * 0.1;
    ref.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    const positions = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < positions.count; i++) {
      const z = positions.getZ(i);
      positions.setZ(i, z + Math.sin(time + i) * 0.01);
    }
    positions.needsUpdate = true;
  });

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const magenta = new THREE.Color("#ec407a");
    const cyan = new THREE.Color("#00bcd4");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const color = i % 2 === 0 ? magenta : cyan;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    ref.current = particles;
  }, [count]);

  if (!ref.current) return null;
  return <primitive object={ref.current} />;
}

function WebLines() {
  const linesRef = useRef<THREE.Line[]>([]);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useFrame(() => {
    if (reducedMotion || !ready) return;
    const time = performance.now() * 0.001;
    linesRef.current.forEach((line, i) => {
      line.rotation.y = time * (0.1 + i * 0.05);
      line.rotation.x = Math.sin(time * 0.5 + i) * 0.3;
    });
  });

  useEffect(() => {
    const group = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const points = [];
      for (let j = 0; j < 20; j++) {
        const t = j / 19;
        const angle = t * Math.PI * 4 + i;
        const radius = 2 + Math.sin(t * Math.PI * 2) * 1;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          (t - 0.5) * 8,
          Math.sin(angle) * radius
        ));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? "#ec407a" : "#00bcd4",
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(geometry, material);
      group.add(line);
      linesRef.current.push(line);
    }
    setReady(true);
    return () => {
      linesRef.current.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, []);

  if (!ready) return null;
  return <group>{linesRef.current.map((line, i) => <primitive key={i} object={line} />)}</group>;
}

export function SpiderWeb3D({ className }: SpiderWeb3DProps) {
  const [webglAvailable, setWebglAvailable] = useState(true);

  return (
    <div className={className}>
      {webglAvailable ? (
        <Canvas
          className="absolute inset-0 w-full h-full"
          shadows
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          onCreated={() => setWebglAvailable(true)}
          onError={() => setWebglAvailable(false)}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#ec407a" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00bcd4" />
          <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
          <WebParticles count={150} />
          <WebLines />
        </Canvas>
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-accent-magenta rounded-full flex items-center justify-center mx-auto mb-4 animate-[portal-spin_2s_linear_infinite]">
              <svg className="w-8 h-8 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className="text-xs text-gray-500 font-geist">3D Web unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}