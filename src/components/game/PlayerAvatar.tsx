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
// ==========================================
// Civilian Starting Avatar (Anatomical Humanoid)
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
      <group ref={torsoRef} position={[0, 0.88, 0]}>
        {/* Anatomical Upper Rib Cage & Pectoral Contour */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.22, 0.18, 0.34, 24]} />
          <meshStandardMaterial color="#1e293b" roughness={0.65} />
        </mesh>

        {/* Athletic Waist Taper */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.18, 0.19, 0.2, 24]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>

        {/* Pelvis & Hip Structure */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.19, 0.16, 0.14, 24]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.8} />
        </mesh>

        {/* Athletic Clavicle & Folded Hood Collar */}
        <mesh position={[0, 0.44, -0.06]}>
          <torusGeometry args={[0.14, 0.05, 16, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>

        {/* Natural Neck Column */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.075, 0.085, 0.12, 16]} />
          <meshStandardMaterial color="#d49b6a" roughness={0.5} />
        </mesh>

        {/* Anatomical Contoured Head & Jaw */}
        <mesh position={[0, 0.66, 0]}>
          <sphereGeometry args={[0.155, 24, 24]} />
          <meshStandardMaterial color="#d49b6a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.6, 0.03]} rotation={[-0.2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.07, 0.12, 16]} />
          <meshStandardMaterial color="#d49b6a" roughness={0.5} />
        </mesh>

        {/* Sculpted Urban Eyewear */}
        <mesh position={[0, 0.67, 0.13]}>
          <torusGeometry args={[0.11, 0.02, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Textured Volumetric Hair */}
        <mesh position={[0, 0.73, -0.01]}>
          <sphereGeometry args={[0.165, 20, 20]} />
          <meshStandardMaterial color="#090d16" roughness={0.9} />
        </mesh>

        {/* Left Arm: Deltoid + Tapered Arm + Articulated Hand */}
        <group ref={leftArmRef} position={[-0.26, 0.44, 0]}>
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <capsuleGeometry args={[0.06, 0.32, 6, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, -0.42, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#d49b6a" />
          </mesh>
        </group>

        {/* Right Arm: Deltoid + Tapered Arm + Articulated Hand */}
        <group ref={rightArmRef} position={[0.26, 0.44, 0]}>
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <capsuleGeometry args={[0.06, 0.32, 6, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, -0.42, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#d49b6a" />
          </mesh>
        </group>
      </group>

      {/* Left Leg: Thigh + Calf + Athletic Sneaker */}
      <group ref={leftLegRef} position={[-0.12, 0.74, 0]}>
        <mesh position={[0, -0.18, 0]}>
          <capsuleGeometry args={[0.075, 0.28, 6, 16]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.44, 0]}>
          <capsuleGeometry args={[0.065, 0.26, 6, 16]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.8} />
        </mesh>
        {/* Athletic Sneaker */}
        <group position={[0, -0.68, 0.04]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.055, 0.16, 6, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[0.11, 0.025, 0.22]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>

      {/* Right Leg: Thigh + Calf + Athletic Sneaker */}
      <group ref={rightLegRef} position={[0.12, 0.74, 0]}>
        <mesh position={[0, -0.18, 0]}>
          <capsuleGeometry args={[0.075, 0.28, 6, 16]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.44, 0]}>
          <capsuleGeometry args={[0.065, 0.26, 6, 16]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.8} />
        </mesh>
        {/* Athletic Sneaker */}
        <group position={[0, -0.68, 0.04]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.055, 0.16, 6, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[0.11, 0.025, 0.22]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ==========================================
// Spider-Hero Playable Avatar (Anatomical Humanoid)
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
      <group ref={torsoRef} position={[0, 0.88, 0]}>
        {/* Anatomical Upper Rib Cage & Pectoral Silhouette */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.22, 0.175, 0.34, 24]} />
          <meshStandardMaterial color={primaryColor} roughness={0.42} metalness={0.08} />
        </mesh>

        {/* Tapered Athletic Waist & Abdominal Core */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.175, 0.185, 0.2, 24]} />
          <meshStandardMaterial color={primaryColor} roughness={0.42} metalness={0.08} />
        </mesh>

        {/* Articulated Pelvis & Groin */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.185, 0.16, 0.14, 24]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.45} />
        </mesh>

        {/* Natural Neck Column */}
        <mesh position={[0, 0.49, 0]}>
          <cylinderGeometry args={[0.075, 0.085, 0.11, 16]} />
          <meshStandardMaterial color={primaryColor} roughness={0.4} />
        </mesh>

        {/* Mask Head: Anatomical Cranium & Sculpted Jaw */}
        <mesh position={[0, 0.66, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color={primaryColor} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.59, 0.03]} rotation={[-0.2, 0, 0]}>
          <cylinderGeometry args={[0.125, 0.065, 0.13, 20]} />
          <meshStandardMaterial color={primaryColor} roughness={0.35} />
        </mesh>

        {/* Angled Spider-Verse 3D Lenses with Outer Bezel Frames */}
        <group position={[0, 0.66, 0.13]}>
          {/* Left Lens: Frame + Reflective Lens */}
          <mesh position={[-0.065, 0, 0]} rotation={[0, 0.18, -0.08]}>
            <ringGeometry args={[0.04, 0.06, 16]} />
            <meshBasicMaterial color={accentDetails === "miles" ? "#ff1361" : "#000000"} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-0.065, 0, 0.005]} rotation={[0, 0.18, -0.08]}>
            <circleGeometry args={[0.045, 16]} />
            <meshStandardMaterial color={eyeColor} roughness={0.15} metalness={0.1} />
          </mesh>

          {/* Right Lens: Frame + Reflective Lens */}
          <mesh position={[0.065, 0, 0]} rotation={[0, -0.18, 0.08]}>
            <ringGeometry args={[0.04, 0.06, 16]} />
            <meshBasicMaterial color={accentDetails === "miles" ? "#ff1361" : "#000000"} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.065, 0, 0.005]} rotation={[0, -0.18, 0.08]}>
            <circleGeometry args={[0.045, 16]} />
            <meshStandardMaterial color={eyeColor} roughness={0.15} metalness={0.1} />
          </mesh>
        </group>

        {/* Gwen Volumetric 3D Hood */}
        {accentDetails === "gwen" && (
          <group position={[0, 0.68, -0.04]}>
            <mesh>
              <sphereGeometry args={[0.24, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
              <meshStandardMaterial color="#f5f5f7" roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.04, 0.04]} rotation={[0.25, 0, 0]}>
              <torusGeometry args={[0.22, 0.035, 16, 32]} />
              <meshStandardMaterial color="#00e5ff" roughness={0.3} emissive="#00e5ff" emissiveIntensity={0.2} />
            </mesh>
          </group>
        )}

        {/* Hobie Spiked Mohawk */}
        {accentDetails === "hobie" && (
          <group position={[0, 0.83, 0]}>
            {[-0.08, -0.04, 0, 0.04, 0.08].map((z, idx) => (
              <mesh key={idx} position={[0, 0.03, z]}>
                <coneGeometry args={[0.025, 0.09, 12]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
          </group>
        )}

        {/* Noir Fedora & Trench Collar */}
        {accentDetails === "noir" && (
          <group position={[0, 0.82, 0]}>
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.02, 24]} />
              <meshStandardMaterial color="#1a1a1e" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.18, 0.2, 0.14, 24]} />
              <meshStandardMaterial color="#1a1a1e" roughness={0.8} />
            </mesh>
          </group>
        )}

        {/* Left Arm: Deltoid + Bicep + Forearm + Hand */}
        <group ref={leftArmRef} position={[-0.26, 0.44, 0]}>
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={secondaryColor} />
          </mesh>
          <mesh position={[0, -0.19, 0]}>
            <capsuleGeometry args={[0.055, 0.3, 6, 16]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <sphereGeometry args={[0.048, 12, 12]} />
            <meshStandardMaterial color={secondaryColor} />
          </mesh>
        </group>

        {/* Right Arm: Deltoid + Bicep + Forearm + Hand */}
        <group ref={rightArmRef} position={[0.26, 0.44, 0]}>
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={secondaryColor} />
          </mesh>
          <mesh position={[0, -0.19, 0]}>
            <capsuleGeometry args={[0.055, 0.3, 6, 16]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <sphereGeometry args={[0.048, 12, 12]} />
            <meshStandardMaterial color={secondaryColor} />
          </mesh>
        </group>
      </group>

      {/* Left Leg: Thigh + Calf + Footwear */}
      <group ref={leftLegRef} position={[-0.12, 0.74, 0]}>
        <mesh position={[0, -0.18, 0]}>
          <capsuleGeometry args={[0.07, 0.28, 6, 16]} />
          <meshStandardMaterial color={primaryColor} roughness={0.45} />
        </mesh>
        <mesh position={[0, -0.44, 0]}>
          <capsuleGeometry args={[0.06, 0.26, 6, 16]} />
          <meshStandardMaterial color={primaryColor} roughness={0.45} />
        </mesh>
        <group position={[0, -0.68, 0.04]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.05, 0.16, 6, 12]} />
            <meshStandardMaterial color={secondaryColor} />
          </mesh>
        </group>
      </group>

      {/* Right Leg: Thigh + Calf + Footwear */}
      <group ref={rightLegRef} position={[0.12, 0.74, 0]}>
        <mesh position={[0, -0.18, 0]}>
          <capsuleGeometry args={[0.07, 0.28, 6, 16]} />
          <meshStandardMaterial color={primaryColor} roughness={0.45} />
        </mesh>
        <mesh position={[0, -0.44, 0]}>
          <capsuleGeometry args={[0.06, 0.26, 6, 16]} />
          <meshStandardMaterial color={primaryColor} roughness={0.45} />
        </mesh>
        <group position={[0, -0.68, 0.04]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.05, 0.16, 6, 12]} />
            <meshStandardMaterial color={secondaryColor} />
          </mesh>
        </group>
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
