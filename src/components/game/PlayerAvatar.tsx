"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PlayableCharacterId } from "./GameState";

interface PlayerAvatarProps {
  avatarId: PlayableCharacterId;
  isMoving: boolean;
  isRunning: boolean;
  isGrounded: boolean;
  abilityActive: boolean;
}

export function PlayerAvatar({
  avatarId,
  isMoving,
  isRunning,
  isGrounded,
  abilityActive
}: PlayerAvatarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const animTime = useRef(0);

  useFrame((_, delta) => {
    const speedMultiplier = isRunning ? 16 : 9;
    if (isMoving && isGrounded) {
      animTime.current += delta * speedMultiplier;
    } else {
      animTime.current += delta * 2; // subtle idle breathing
    }

    const t = animTime.current;

    if (!isGrounded) {
      // Airborne jumping/falling pose
      if (leftLegRef.current) leftLegRef.current.rotation.x = -0.4;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0.5;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -1.2;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -1.2;
      if (torsoRef.current) torsoRef.current.position.y = 0.05;
    } else if (isMoving) {
      // Walking / running swing
      const legAmplitude = isRunning ? 0.75 : 0.45;
      const armAmplitude = isRunning ? 0.85 : 0.45;

      const legSwing = Math.sin(t) * legAmplitude;
      const armSwing = Math.sin(t) * armAmplitude;

      if (leftLegRef.current) leftLegRef.current.rotation.x = legSwing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -legSwing;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -armSwing;
      if (rightArmRef.current) rightArmRef.current.rotation.x = armSwing;

      // Vertical bounce
      if (torsoRef.current) {
        torsoRef.current.position.y = Math.abs(Math.sin(t)) * (isRunning ? 0.1 : 0.05);
      }
    } else {
      // Idle breathing
      const breath = Math.sin(t) * 0.03;
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftArmRef.current) leftArmRef.current.rotation.x = breath;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -breath;
      if (torsoRef.current) torsoRef.current.position.y = breath;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Ability Shockwave / Aura when active */}
      {abilityActive && (
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[1.6, 16, 16]} />
          <meshBasicMaterial
            color={
              avatarId === "miles-morales"
                ? "#ffe600"
                : avatarId === "miguel-ohara"
                ? "#d50000"
                : avatarId === "hobie-brown"
                ? "#ff1361"
                : "#00e5ff"
            }
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>
      )}

      {/* Render Character Specific Procedural Articulated Mesh */}
      {avatarId === "civilian" && (
        <CivilianMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
        />
      )}

      {avatarId === "miles-morales" && (
        <SpiderHeroMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          primaryColor="#111116"
          secondaryColor="#ff1361"
          emblemColor="#ff1361"
          eyeColor="#ffffff"
          accentDetails="miles"
        />
      )}

      {avatarId === "peter-parker" && (
        <SpiderHeroMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          primaryColor="#d50000"
          secondaryColor="#1565c0"
          emblemColor="#000000"
          eyeColor="#ffffff"
          accentDetails="peter"
        />
      )}

      {avatarId === "gwen-stacy" && (
        <SpiderHeroMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          primaryColor="#f5f5f7"
          secondaryColor="#12121c"
          emblemColor="#00e5ff"
          eyeColor="#ff4081"
          accentDetails="gwen"
        />
      )}

      {avatarId === "miguel-ohara" && (
        <SpiderHeroMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          primaryColor="#0d1b2a"
          secondaryColor="#d50000"
          emblemColor="#d50000"
          eyeColor="#d50000"
          scale={[1.15, 1.15, 1.15]}
          accentDetails="miguel"
        />
      )}

      {avatarId === "hobie-brown" && (
        <SpiderHeroMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          primaryColor="#c62828"
          secondaryColor="#1e3a8a"
          emblemColor="#ffe600"
          eyeColor="#ffffff"
          accentDetails="hobie"
        />
      )}

      {avatarId === "pavitr-prabhakar" && (
        <SpiderHeroMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          primaryColor="#d50000"
          secondaryColor="#00acc1"
          emblemColor="#ffd700"
          eyeColor="#ffffff"
          accentDetails="pavitr"
        />
      )}

      {avatarId === "peni-parker" && (
        <SpdrMechMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
        />
      )}

      {avatarId === "spider-man-noir" && (
        <SpiderHeroMesh
          torsoRef={torsoRef}
          leftLegRef={leftLegRef}
          rightLegRef={rightLegRef}
          leftArmRef={leftArmRef}
          rightArmRef={rightArmRef}
          primaryColor="#1a1a1e"
          secondaryColor="#101014"
          emblemColor="#ffffff"
          eyeColor="#ffb300"
          accentDetails="noir"
        />
      )}
    </group>
  );
}

// ==========================================
// Civilian Starting Avatar
// ==========================================
function CivilianMesh({
  torsoRef,
  leftLegRef,
  rightLegRef,
  leftArmRef,
  rightArmRef
}: {
  torsoRef: React.RefObject<THREE.Group | null>;
  leftLegRef: React.RefObject<THREE.Group | null>;
  rightLegRef: React.RefObject<THREE.Group | null>;
  leftArmRef: React.RefObject<THREE.Group | null>;
  rightArmRef: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group position={[0, 0, 0]}>
      {/* Torso & Head */}
      <group ref={torsoRef} position={[0, 0.85, 0]}>
        {/* Athletic Windbreaker / Hoodie */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.44, 0.54, 0.24]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>

        {/* Jacket Zipper Strip */}
        <mesh position={[0, 0.25, 0.122]}>
          <planeGeometry args={[0.03, 0.52]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Folded Hood on Back */}
        <mesh position={[0, 0.45, -0.12]}>
          <boxGeometry args={[0.26, 0.14, 0.12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.165, 20, 20]} />
          <meshStandardMaterial color="#d49b6a" roughness={0.5} />
        </mesh>

        {/* Sunglasses / Eyes */}
        <mesh position={[0, 0.66, 0.14]}>
          <boxGeometry args={[0.18, 0.05, 0.06]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Textured Volumetric Hair */}
        <mesh position={[0, 0.74, -0.02]}>
          <boxGeometry args={[0.24, 0.14, 0.26]} />
          <meshStandardMaterial color="#090d16" roughness={0.9} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.29, 0.46, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.07, 0.36, 4, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.44, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#d49b6a" />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.29, 0.46, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.07, 0.36, 4, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.44, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#d49b6a" />
          </mesh>
        </group>
      </group>

      {/* Left Leg (Dark Denim + Two-Tone Sneakers) */}
      <group ref={leftLegRef} position={[-0.13, 0.72, 0]}>
        <mesh position={[0, -0.38, 0]}>
          <capsuleGeometry args={[0.08, 0.48, 4, 8]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.8} />
        </mesh>
        {/* Sneaker Upper */}
        <mesh position={[0, -0.65, 0.04]}>
          <boxGeometry args={[0.11, 0.08, 0.22]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Sneaker Sole */}
        <mesh position={[0, -0.7, 0.04]}>
          <boxGeometry args={[0.12, 0.03, 0.23]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.13, 0.72, 0]}>
        <mesh position={[0, -0.38, 0]}>
          <capsuleGeometry args={[0.08, 0.48, 4, 8]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.8} />
        </mesh>
        {/* Sneaker Upper */}
        <mesh position={[0, -0.65, 0.04]}>
          <boxGeometry args={[0.11, 0.08, 0.22]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Sneaker Sole */}
        <mesh position={[0, -0.7, 0.04]}>
          <boxGeometry args={[0.12, 0.03, 0.23]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

// ==========================================
// Spider-Hero Playable Avatar
// ==========================================
function SpiderHeroMesh({
  torsoRef,
  leftLegRef,
  rightLegRef,
  leftArmRef,
  rightArmRef,
  primaryColor,
  secondaryColor,
  emblemColor,
  eyeColor,
  scale = [1, 1, 1],
  accentDetails
}: {
  torsoRef: React.RefObject<THREE.Group | null>;
  leftLegRef: React.RefObject<THREE.Group | null>;
  rightLegRef: React.RefObject<THREE.Group | null>;
  leftArmRef: React.RefObject<THREE.Group | null>;
  rightArmRef: React.RefObject<THREE.Group | null>;
  primaryColor: string;
  secondaryColor: string;
  emblemColor: string;
  eyeColor: string;
  scale?: [number, number, number];
  accentDetails: "miles" | "peter" | "gwen" | "miguel" | "hobie" | "pavitr" | "noir";
}) {
  return (
    <group scale={scale}>
      {/* Torso & Head */}
      <group ref={torsoRef} position={[0, 0.85, 0]}>
        {/* Chest & Body */}
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.42, 0.54, 0.24]} />
          <meshStandardMaterial color={primaryColor} roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Chest Emblem Badge */}
        <mesh position={[0, 0.32, 0.125]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color={emblemColor} side={THREE.DoubleSide} />
        </mesh>

        {/* Mask Head */}
        <mesh position={[0, 0.66, 0]}>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial color={primaryColor} roughness={0.3} />
        </mesh>

        {/* Expressive Lenses */}
        <mesh position={[-0.065, 0.67, 0.14]} rotation={[0, 0.1, 0]}>
          <planeGeometry args={[0.07, 0.05]} />
          <meshBasicMaterial color={eyeColor} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.065, 0.67, 0.14]} rotation={[0, -0.1, 0]}>
          <planeGeometry args={[0.07, 0.05]} />
          <meshBasicMaterial color={eyeColor} side={THREE.DoubleSide} />
        </mesh>

        {/* Gwen Hood */}
        {accentDetails === "gwen" && (
          <mesh position={[0, 0.66, -0.04]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#f5f5f7" roughness={0.6} side={THREE.BackSide} />
          </mesh>
        )}

        {/* Hobie Spiked Mohawk */}
        {accentDetails === "hobie" && (
          <group position={[0, 0.83, 0]}>
            <mesh position={[0, 0, -0.06]}><coneGeometry args={[0.03, 0.1, 8]} /><meshStandardMaterial color="#e0e0e0" /></mesh>
            <mesh position={[0, 0, 0]}><coneGeometry args={[0.04, 0.12, 8]} /><meshStandardMaterial color="#e0e0e0" /></mesh>
            <mesh position={[0, 0, 0.06]}><coneGeometry args={[0.03, 0.1, 8]} /><meshStandardMaterial color="#e0e0e0" /></mesh>
          </group>
        )}

        {/* Noir Fedora & Trench Collar */}
        {accentDetails === "noir" && (
          <group position={[0, 0.82, 0]}>
            <mesh><cylinderGeometry args={[0.3, 0.3, 0.02, 16]} /><meshStandardMaterial color="#1a1a1e" /></mesh>
            <mesh position={[0, 0.07, 0]}><cylinderGeometry args={[0.18, 0.19, 0.12, 16]} /><meshStandardMaterial color="#1a1a1e" /></mesh>
          </group>
        )}

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.28, 0.46, 0]}>
          <mesh position={[0, -0.25, 0]}>
            <capsuleGeometry args={[0.065, 0.38, 4, 8]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.4} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.28, 0.46, 0]}>
          <mesh position={[0, -0.25, 0]}>
            <capsuleGeometry args={[0.065, 0.38, 4, 8]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.12, 0.72, 0]}>
        <mesh position={[0, -0.38, 0]}>
          <capsuleGeometry args={[0.075, 0.5, 4, 8]} />
          <meshStandardMaterial color={primaryColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.67, 0.05]}>
          <boxGeometry args={[0.1, 0.08, 0.22]} />
          <meshStandardMaterial color={secondaryColor} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.12, 0.72, 0]}>
        <mesh position={[0, -0.38, 0]}>
          <capsuleGeometry args={[0.075, 0.5, 4, 8]} />
          <meshStandardMaterial color={primaryColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.67, 0.05]}>
          <boxGeometry args={[0.1, 0.08, 0.22]} />
          <meshStandardMaterial color={secondaryColor} />
        </mesh>
      </group>
    </group>
  );
}

// ==========================================
// Peni Parker & SP//dr Biomechanical Armor Mech
// ==========================================
function SpdrMechMesh({
  torsoRef,
  leftLegRef,
  rightLegRef,
  leftArmRef,
  rightArmRef
}: {
  torsoRef: React.RefObject<THREE.Group | null>;
  leftLegRef: React.RefObject<THREE.Group | null>;
  rightLegRef: React.RefObject<THREE.Group | null>;
  leftArmRef: React.RefObject<THREE.Group | null>;
  rightArmRef: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group scale={[1.25, 1.25, 1.25]}>
      {/* Heavy Spherical Chassis */}
      <group ref={torsoRef} position={[0, 0.95, 0]}>
        <mesh>
          <sphereGeometry args={[0.48, 24, 24]} />
          <meshStandardMaterial color="#c62828" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Emotive LED Visor */}
        <mesh position={[0, 0.1, 0.44]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.42, 0.12, 0.08]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>

        {/* Left Arm Cannon */}
        <group ref={leftArmRef} position={[-0.55, 0.15, 0]}>
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 0.5, 12]} />
            <meshStandardMaterial color="#ffffff" metalness={0.8} />
          </mesh>
        </group>

        {/* Right Arm Cannon */}
        <group ref={rightArmRef} position={[0.55, 0.15, 0]}>
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 0.5, 12]} />
            <meshStandardMaterial color="#ffffff" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Heavy Mech Left Leg */}
      <group ref={leftLegRef} position={[-0.24, 0.72, 0]}>
        <mesh position={[0, -0.38, 0]}>
          <capsuleGeometry args={[0.12, 0.45, 6, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.7} />
        </mesh>
      </group>

      {/* Heavy Mech Right Leg */}
      <group ref={rightLegRef} position={[0.24, 0.72, 0]}>
        <mesh position={[0, -0.38, 0]}>
          <capsuleGeometry args={[0.12, 0.45, 6, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
