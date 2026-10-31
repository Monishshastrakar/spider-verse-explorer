"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MULTIVERSE_STATIONS, type MultiverseStationConfig } from "@/data/multiverse-stations";
import { gameStore } from "./GameState";

export function HeadquartersScene() {
  const [nearbySlug, setNearbySlug] = useState<string | null>(gameStore.state.nearbyStationSlug);

  useEffect(() => {
    return gameStore.subscribe(() => {
      setNearbySlug(gameStore.state.nearbyStationSlug);
    });
  }, []);

  return (
    <group>
      {/* 1. Walkable Floor Surface (Radius 14m) */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[14, 14.5, 0.1, 48]} />
        <meshStandardMaterial color="#08080f" roughness={0.8} metalness={0.4} />
      </mesh>

      {/* Outer Boundary Barrier Energy Rail */}
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[13.5, 0.08, 16, 64]} />
        <meshStandardMaterial color="#ff1361" emissive="#ff1361" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[13.5, 0.04, 16, 64]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Radial Pathway Lines to Each Station */}
      <RadialPaths />

      {/* 2. Central Go-Home Machine Terminal */}
      <CentralCore />

      {/* 3. Civilian Spawning Pad */}
      <CivilianSpawnPad />

      {/* 4. Eight Character Stations */}
      {MULTIVERSE_STATIONS.map((station) => (
        <StationDisplay
          key={station.id}
          station={station}
          isNearby={nearbySlug === station.slug}
        />
      ))}
    </group>
  );
}

// ==========================================
// Central Quantum Core (Obstacle)
// ==========================================
function CentralCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Solid Console Barrier (Radius 1.8m) */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.75, 1.9, 0.7, 32]} />
        <meshStandardMaterial color="#12121e" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Neon Concentric Rings */}
      <mesh position={[0, 0.71, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} />
      </mesh>

      {/* Suspended Rotating Quantum Energy Crystal */}
      <group ref={coreRef} position={[0, 2.0, 0]}>
        <mesh>
          <octahedronGeometry args={[0.65, 0]} />
          <meshBasicMaterial color="#00e5ff" wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ff1361" emissive="#ff1361" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Kinetic Ring */}
      <mesh ref={ringRef} position={[0, 2.0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.1, 0.03, 16, 48]} />
        <meshBasicMaterial color="#ffe600" />
      </mesh>

      <pointLight position={[0, 2.2, 0]} intensity={3} color="#00e5ff" distance={12} />
    </group>
  );
}

// ==========================================
// Civilian Spawn & Return Pad
// ==========================================
function CivilianSpawnPad() {
  return (
    <group position={[0, 0.01, 3]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.25, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 32]} />
        <meshStandardMaterial color="#141424" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ==========================================
// Radial Pathway Energy Lines
// ==========================================
function RadialPaths() {
  const lineObjects = useMemo(() => {
    return MULTIVERSE_STATIONS.map((station) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0.02, 0),
        new THREE.Vector3(...station.position)
      ]);
      const material = new THREE.LineBasicMaterial({
        color: station.accentColor,
        transparent: true,
        opacity: 0.35
      });
      return new THREE.Line(geometry, material);
    });
  }, []);

  return (
    <group>
      {lineObjects.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}
    </group>
  );
}

// ==========================================
// Character Station Display & Proximity Trigger
// ==========================================
function StationDisplay({
  station,
  isNearby
}: {
  station: MultiverseStationConfig;
  isNearby: boolean;
}) {
  const portalRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(station.standeeImage, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });
  }, [station.standeeImage]);

  useFrame((_, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * (isNearby ? 1.5 : 0.3);
    }
  });

  return (
    <group position={station.position} rotation={station.rotation}>
      {/* Pedestal Base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.2, 1.35, 0.4, 24]} />
        <meshStandardMaterial color="#10101a" roughness={0.6} metalness={0.6} />
      </mesh>

      {/* Proximity Glowing Ring on Floor */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 2.15, 32]} />
        <meshBasicMaterial
          color={isNearby ? station.accentColor : "#252538"}
          transparent
          opacity={isNearby ? 0.9 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Holographic Portal Arch */}
      <mesh ref={portalRef} position={[0, 1.8, 0]}>
        <torusGeometry args={[1.35, 0.05, 16, 48]} />
        <meshStandardMaterial
          color={station.accentColor}
          emissive={station.accentColor}
          emissiveIntensity={isNearby ? 3.5 : 1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Stationary NPC Standee */}
      <group position={[0, 0.4, 0]}>
        <mesh position={[0, 1.35, 0]}>
          <planeGeometry args={[1.6, 2.0]} />
          {texture ? (
            <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} alphaTest={0.05} />
          ) : (
            <meshStandardMaterial color={station.accentColor} wireframe />
          )}
        </mesh>
      </group>

      {/* Station Light */}
      <pointLight
        position={[0, 2.0, 0.5]}
        intensity={isNearby ? 4.0 : 1.5}
        color={station.accentColor}
        distance={6}
      />
    </group>
  );
}
