"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  MULTIVERSE_STATIONS,
  type MultiverseStationConfig
} from "@/data/multiverse-stations";

export type HubSceneState =
  | "loading"
  | "hub"
  | "approaching-character"
  | "character-preview"
  | "transforming"
  | "character-active"
  | "returning-to-hub"
  | "error";

interface SpiderVerseHub3DProps {
  sceneState: HubSceneState;
  selectedStation: MultiverseStationConfig | null;
  onSelectStation: (station: MultiverseStationConfig) => void;
  reducedMotion: boolean;
  powerEffectActive: boolean;
}

// ==========================================
// Central Platform & Quantum Go-Home Machine
// ==========================================
function CentralPlatform() {
  const coreRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Base platform */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <cylinderGeometry args={[5.2, 5.8, 0.6, 32]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.7} metalness={0.8} />
      </mesh>

      {/* Outer energy track ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5.1, 64]} />
        <meshBasicMaterial color="#ff1361" side={THREE.DoubleSide} />
      </mesh>

      {/* Inner cyan ring */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.4, 64]} />
        <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} />
      </mesh>

      {/* Spider-Society central emblem on floor */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 32]} />
        <meshStandardMaterial color="#141422" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Rotating Quantum Core suspended at center */}
      <group ref={coreRef} position={[0, 2.2, 0]}>
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial color="#00e5ff" wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color="#ff1361"
            emissive="#ff1361"
            emissiveIntensity={2}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Kinetic Ring 1 */}
      <mesh ref={ringRef1} position={[0, 2.2, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Kinetic Ring 2 */}
      <mesh ref={ringRef2} position={[0, 2.2, 0]} rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 16, 64]} />
        <meshBasicMaterial color="#ffe600" />
      </mesh>

      <pointLight position={[0, 2.5, 0]} intensity={3} color="#00e5ff" distance={15} />
    </group>
  );
}

// ==========================================
// Web Bridges Connecting Center to Stations
// ==========================================
function WebBridges() {
  const lineObjects = useMemo(() => {
    return MULTIVERSE_STATIONS.map((station) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0.05, 0),
        new THREE.Vector3(...station.position)
      ]);
      const material = new THREE.LineBasicMaterial({
        color: station.accentColor,
        transparent: true,
        opacity: 0.45
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
// Floating Comic Polyhedral Shards
// ==========================================
function ComicFragments() {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => {
    const list = [];
    const colors = ["#ff1361", "#00e5ff", "#ffe600", "#ffffff"];
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.2;
      const dist = 11 + Math.random() * 6;
      list.push({
        position: [
          Math.sin(angle) * dist,
          1 + Math.random() * 6,
          Math.cos(angle) * dist
        ] as [number, number, number],
        scale: 0.3 + Math.random() * 0.4,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        color: colors[i % colors.length]
      });
    }
    return list;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, idx) => (
        <mesh key={idx} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={shard.color}
            roughness={0.4}
            metalness={0.7}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  );
}

// ==========================================
// Individual Character Station Pedestal
// ==========================================
function StationPedestal({
  station,
  isSelected,
  isHovered,
  onPointerOver,
  onPointerOut,
  onClick
}: {
  station: MultiverseStationConfig;
  isSelected: boolean;
  isHovered: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
}) {
  const portalRingRef = useRef<THREE.Mesh>(null);
  const standeeGroupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load character SVG texture onto standee plane
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      station.standeeImage,
      (loaded) => {
        loaded.colorSpace = THREE.SRGBColorSpace;
        setTexture(loaded);
      },
      undefined,
      (err) => console.warn(`Could not load standee texture for ${station.slug}:`, err)
    );
  }, [station.standeeImage, station.slug]);

  useFrame((_, delta) => {
    if (portalRingRef.current) {
      portalRingRef.current.rotation.z += delta * (isSelected ? 1.5 : 0.4);
    }
    if (standeeGroupRef.current) {
      // Subtle hovering bobbing
      const targetY = isSelected ? 0.35 : isHovered ? 0.2 : 0;
      standeeGroupRef.current.position.y = THREE.MathUtils.lerp(
        standeeGroupRef.current.position.y,
        targetY,
        delta * 6
      );
    }
  });

  const baseColor = isSelected ? station.accentColor : isHovered ? station.secondaryColor : "#14141f";
  const glowIntensity = isSelected ? 4.5 : isHovered ? 2.5 : 0.8;

  return (
    <group
      position={station.position}
      rotation={station.rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver();
      }}
      onPointerOut={onPointerOut}
    >
      {/* Base Pedestal */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.8, 0.4, 16]} />
        <meshStandardMaterial color="#09090f" roughness={0.8} metalness={0.6} />
      </mesh>

      {/* Station Outer Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.45, 32]} />
        <meshBasicMaterial color={baseColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Holographic Portal Arch */}
      <mesh ref={portalRingRef} position={[0, 1.6, 0]}>
        <torusGeometry args={[1.4, 0.05, 16, 64]} />
        <meshStandardMaterial
          color={station.accentColor}
          emissive={station.accentColor}
          emissiveIntensity={isSelected ? 3 : 1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Floating Standee Group */}
      <group ref={standeeGroupRef} position={[0, 0, 0]}>
        {/* Character Holographic Billboard */}
        <mesh position={[0, 1.4, 0]}>
          <planeGeometry args={[1.7, 2.1]} />
          {texture ? (
            <meshBasicMaterial
              map={texture}
              transparent
              side={THREE.DoubleSide}
              alphaTest={0.05}
            />
          ) : (
            <meshStandardMaterial
              color={station.accentColor}
              wireframe
              transparent
              opacity={0.7}
            />
          )}
        </mesh>

        {/* Backing Silhouette Plane for Dimensionality */}
        <mesh position={[0, 1.4, -0.05]}>
          <planeGeometry args={[1.75, 2.15]} />
          <meshBasicMaterial
            color={station.accentColor}
            transparent
            opacity={isSelected ? 0.35 : 0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Floating Indicator Beacon */}
        <mesh position={[0, 2.9, 0]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshBasicMaterial color={station.accentColor} />
        </mesh>
      </group>

      {/* Station Accent Light */}
      <pointLight
        position={[0, 1.8, 0.5]}
        intensity={glowIntensity}
        color={station.accentColor}
        distance={7}
      />
    </group>
  );
}

// ==========================================
// Camera Controller (Smooth State Interpolation)
// ==========================================
function CameraController({
  sceneState,
  selectedStation,
  reducedMotion
}: {
  sceneState: HubSceneState;
  selectedStation: MultiverseStationConfig | null;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 6, 15));
  const currentTarget = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame((_, delta) => {
    let destPos = new THREE.Vector3(0, 5.5, 14);
    let destTarget = new THREE.Vector3(0, 1.2, 0);

    if (selectedStation) {
      if (sceneState === "character-active") {
        destPos = new THREE.Vector3(...selectedStation.cameraAvatarPos);
        destTarget = new THREE.Vector3(...selectedStation.cameraAvatarTarget);
      } else if (
        sceneState === "approaching-character" ||
        sceneState === "character-preview" ||
        sceneState === "transforming"
      ) {
        destPos = new THREE.Vector3(...selectedStation.cameraApproachPos);
        destTarget = new THREE.Vector3(...selectedStation.cameraApproachTarget);
      }
    }

    if (reducedMotion) {
      // Instant cut for reduced motion users
      camera.position.copy(destPos);
      camera.lookAt(destTarget);
      currentPos.current.copy(destPos);
      currentTarget.current.copy(destTarget);
    } else {
      // Smooth frame-rate independent lerp
      const factor = THREE.MathUtils.clamp(delta * 3.5, 0, 1);
      currentPos.current.lerp(destPos, factor);
      currentTarget.current.lerp(destTarget, factor);

      camera.position.copy(currentPos.current);
      camera.lookAt(currentTarget.current);
    }
  });

  return null;
}

// ==========================================
// Main 3D Canvas Scene
// ==========================================
export function SpiderVerseHub3D({
  sceneState,
  selectedStation,
  onSelectStation,
  reducedMotion,
  powerEffectActive
}: SpiderVerseHub3DProps) {
  const [hoveredStationId, setHoveredStationId] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 6, 15], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
      >
        <color attach="background" args={["#050508"]} />
        <fog attach="fog" args={["#050508", 18, 42]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-10, 15, -10]} intensity={0.5} color="#00e5ff" />

        {/* Power Shockwave Burst when Active */}
        {powerEffectActive && selectedStation && (
          <pointLight
            position={selectedStation.position}
            intensity={12}
            color={selectedStation.accentColor}
            distance={20}
          />
        )}

        {/* Camera Lerp Controller */}
        <CameraController
          sceneState={sceneState}
          selectedStation={selectedStation}
          reducedMotion={reducedMotion}
        />

        {/* Multiverse Hub Structure */}
        <CentralPlatform />
        <WebBridges />
        <ComicFragments />

        {/* 8 Character Stations */}
        {MULTIVERSE_STATIONS.map((station) => (
          <StationPedestal
            key={station.id}
            station={station}
            isSelected={selectedStation?.id === station.id}
            isHovered={hoveredStationId === station.id}
            onPointerOver={() => setHoveredStationId(station.id)}
            onPointerOut={() => setHoveredStationId(null)}
            onClick={() => onSelectStation(station)}
          />
        ))}
      </Canvas>
    </div>
  );
}
