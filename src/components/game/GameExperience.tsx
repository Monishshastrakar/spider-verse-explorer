"use client";

import React, { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HeadquartersScene } from "./HeadquartersScene";
import { PlayerController } from "./PlayerController";
import { ThirdPersonCamera } from "./ThirdPersonCamera";

export function GameExperience() {
  const [playerPos, setPlayerPos] = useState(() => new THREE.Vector3(0, 0, 3));
  const [playerYaw, setPlayerYaw] = useState(0);

  const handlePositionUpdate = useCallback((pos: THREE.Vector3, yaw: number) => {
    // Throttled / direct clone to avoid excessive re-render churn
    setPlayerPos((prev) => {
      prev.copy(pos);
      return prev;
    });
    setPlayerYaw(yaw);
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 4, 9], fov: 50, near: 0.1, far: 80 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
      >
        <color attach="background" args={["#050508"]} />
        <fog attach="fog" args={["#050508", 15, 35]} />

        {/* Dynamic & Ambient Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-10, 15, -10]} intensity={0.6} color="#00e5ff" />

        {/* 3D World & Stations */}
        <HeadquartersScene />

        {/* Playable Player Controller */}
        <PlayerController onPositionUpdate={handlePositionUpdate} />

        {/* Third-Person Smooth Follow Camera */}
        <ThirdPersonCamera playerPos={playerPos} playerYaw={playerYaw} />
      </Canvas>
    </div>
  );
}
