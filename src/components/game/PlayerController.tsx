"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gameStore } from "./GameState";
import { PlayerAvatar } from "./PlayerAvatar";
import { MULTIVERSE_STATIONS } from "@/data/multiverse-stations";

interface PlayerControllerProps {
  onPositionUpdate?: (pos: THREE.Vector3, yaw: number) => void;
}

export function PlayerController({ onPositionUpdate }: PlayerControllerProps) {
  const playerGroupRef = useRef<THREE.Group>(null);

  // Position, velocity, and facing
  const pos = useRef(new THREE.Vector3(0, 0, 3));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  const facingYaw = useRef(0);

  // Movement animation states
  const [isMoving, setIsMoving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isGrounded, setIsGrounded] = useState(true);

  // Store subscription
  const [activeAvatar, setActiveAvatar] = useState(gameStore.state.activeAvatar);
  const [isTransforming, setIsTransforming] = useState(gameStore.state.isTransforming);
  const [abilityActive, setAbilityActive] = useState(gameStore.state.abilityActive);

  // Keyboard input tracking
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
    interact: false
  });

  // Sync with GameStore
  useEffect(() => {
    return gameStore.subscribe(() => {
      setActiveAvatar(gameStore.state.activeAvatar);
      setIsTransforming(gameStore.state.isTransforming);
      setAbilityActive(gameStore.state.abilityActive);
    });
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        keys.current.forward = true;
        e.preventDefault();
      } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
        keys.current.backward = true;
        e.preventDefault();
      } else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        keys.current.left = true;
        e.preventDefault();
      } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        keys.current.right = true;
        e.preventDefault();
      } else if (e.key === "Shift") {
        keys.current.sprint = true;
      } else if (e.key === " " || e.code === "Space") {
        keys.current.jump = true;
        e.preventDefault();
      } else if (e.key === "e" || e.key === "E") {
        // Interact key pressed
        if (gameStore.state.nearbyStationSlug && !gameStore.state.previewStationSlug) {
          gameStore.setPreviewStationSlug(gameStore.state.nearbyStationSlug);
        }
      } else if (e.key === "q" || e.key === "Q" || e.key === "f" || e.key === "F") {
        // Trigger character ability
        gameStore.triggerAbility();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") keys.current.forward = false;
      if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") keys.current.backward = false;
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") keys.current.left = false;
      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") keys.current.right = false;
      if (e.key === "Shift") keys.current.sprint = false;
      if (e.key === " " || e.code === "Space") keys.current.jump = false;
    };

    const handleBlur = () => {
      // Clear held keys on blur to prevent stuck movement
      keys.current = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        sprint: false,
        jump: false,
        interact: false
      };
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Frame update
  useFrame((_, delta) => {
    // Tick cooldowns
    gameStore.tickCooldown(delta);

    // If movement is locked (e.g. preview modal open or transforming), freeze velocity
    if (gameStore.state.inputLocked || gameStore.state.isTransforming) {
      vel.current.x = 0;
      vel.current.z = 0;
      setIsMoving(false);
      return;
    }

    // Direction input vector from Keyboard OR Mobile Joystick
    let inputX = 0;
    let inputZ = 0;

    if (keys.current.forward) inputZ -= 1;
    if (keys.current.backward) inputZ += 1;
    if (keys.current.left) inputX -= 1;
    if (keys.current.right) inputX += 1;

    // Merge mobile joystick input
    const mobVec = gameStore.state.mobileMoveVector;
    if (Math.abs(mobVec.x) > 0.1 || Math.abs(mobVec.y) > 0.1) {
      inputX = mobVec.x;
      inputZ = -mobVec.y;
    }

    const inputLen = Math.sqrt(inputX * inputX + inputZ * inputZ);
    const moving = inputLen > 0.1;
    const running = (keys.current.sprint || gameStore.state.mobileSprintActive) && moving;

    setIsMoving(moving);
    setIsRunning(running);

    // Calculate movement aligned to camera horizontal yaw
    const cameraYaw = gameStore.state.cameraYaw;
    const moveSpeed = running ? 7.5 : 4.0;

    if (moving) {
      const normX = inputX / (inputLen || 1);
      const normZ = inputZ / (inputLen || 1);

      // Rotate input by camera yaw
      const worldMoveX = normX * Math.cos(cameraYaw) + normZ * Math.sin(cameraYaw);
      const worldMoveZ = -normX * Math.sin(cameraYaw) + normZ * Math.cos(cameraYaw);

      vel.current.x = THREE.MathUtils.lerp(vel.current.x, worldMoveX * moveSpeed, delta * 12);
      vel.current.z = THREE.MathUtils.lerp(vel.current.z, worldMoveZ * moveSpeed, delta * 12);

      // Smoothly rotate character towards movement direction
      const targetAngle = Math.atan2(worldMoveX, worldMoveZ);
      let diff = targetAngle - facingYaw.current;
      // Normalize angle diff to [-pi, pi]
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      facingYaw.current += diff * Math.min(1, delta * 14);
    } else {
      vel.current.x = THREE.MathUtils.lerp(vel.current.x, 0, delta * 14);
      vel.current.z = THREE.MathUtils.lerp(vel.current.z, 0, delta * 14);
    }

    // Gravity & Ground detection
    const gravity = -20;
    const jumpForce = 7.0;

    const wantsJump = keys.current.jump || gameStore.state.mobileJumpRequested;
    if (wantsJump && isGrounded) {
      vel.current.y = jumpForce;
      setIsGrounded(false);
      gameStore.setMobileJumpRequested(false);
    }

    vel.current.y += gravity * delta;
    pos.current.y += vel.current.y * delta;

    // Ground floor collision at y = 0
    if (pos.current.y <= 0) {
      pos.current.y = 0;
      vel.current.y = 0;
      setIsGrounded(true);
    }

    // Apply horizontal velocity
    pos.current.x += vel.current.x * delta;
    pos.current.z += vel.current.z * delta;

    // ==========================================
    // Collision Obstacles & Boundaries
    // ==========================================
    // 1. Central Quantum Console (cylindrical obstacle at origin with radius 1.9m)
    const distToCenter = Math.sqrt(pos.current.x * pos.current.x + pos.current.z * pos.current.z);
    if (distToCenter < 1.9) {
      const angle = Math.atan2(pos.current.z, pos.current.x);
      pos.current.x = Math.cos(angle) * 1.9;
      pos.current.z = Math.sin(angle) * 1.9;
    }

    // 2. Station Pedestal Collisions (radius 1.2m at each station)
    MULTIVERSE_STATIONS.forEach((station) => {
      const dx = pos.current.x - station.position[0];
      const dz = pos.current.z - station.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 1.25) {
        const angle = Math.atan2(dz, dx);
        pos.current.x = station.position[0] + Math.cos(angle) * 1.25;
        pos.current.z = station.position[2] + Math.sin(angle) * 1.25;
      }
    });

    // 3. Citadel Outer Boundary Perimeter (Radius 13.5m)
    const maxRadius = 13.5;
    if (distToCenter > maxRadius) {
      const angle = Math.atan2(pos.current.z, pos.current.x);
      pos.current.x = Math.cos(angle) * maxRadius;
      pos.current.z = Math.sin(angle) * maxRadius;
    }

    // Safe respawn if player somehow leaves playable area
    if (pos.current.y < -4 || distToCenter > 20) {
      pos.current.set(0, 0, 3);
      vel.current.set(0, 0, 0);
    }

    // Update 3D mesh position & rotation
    if (playerGroupRef.current) {
      playerGroupRef.current.position.copy(pos.current);
      playerGroupRef.current.rotation.y = facingYaw.current;
    }

    // Notify Camera of player position
    if (onPositionUpdate) {
      onPositionUpdate(pos.current, facingYaw.current);
    }

    // ==========================================
    // Proximity Detection to Stations (with hysteresis)
    // ==========================================
    let closestStation: string | null = null;
    let minDistance = 999;

    MULTIVERSE_STATIONS.forEach((station) => {
      const dx = pos.current.x - station.position[0];
      const dz = pos.current.z - station.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDistance) {
        minDistance = dist;
        if (dist <= 2.6) {
          closestStation = station.slug;
        }
      }
    });

    // Hysteresis: keep active station until distance exceeds 3.2m
    if (gameStore.state.nearbyStationSlug) {
      const currentStation = MULTIVERSE_STATIONS.find(
        (s) => s.slug === gameStore.state.nearbyStationSlug
      );
      if (currentStation) {
        const dx = pos.current.x - currentStation.position[0];
        const dz = pos.current.z - currentStation.position[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist > 3.2) {
          gameStore.setNearbyStationSlug(closestStation);
        }
      } else {
        gameStore.setNearbyStationSlug(closestStation);
      }
    } else {
      gameStore.setNearbyStationSlug(closestStation);
    }
  });

  return (
    <group ref={playerGroupRef} position={[0, 0, 3]}>
      {/* Transformation VFX Shield around Player */}
      {isTransforming && (
        <group position={[0, 0.9, 0]}>
          <mesh>
            <sphereGeometry args={[1.7, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.8} />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.5, 0.04, 16, 32]} />
            <meshBasicMaterial color="#ff1361" />
          </mesh>
        </group>
      )}

      {/* The Active Controllable Avatar Mesh */}
      <PlayerAvatar
        avatarId={activeAvatar}
        isMoving={isMoving}
        isRunning={isRunning}
        isGrounded={isGrounded}
        abilityActive={abilityActive}
      />
    </group>
  );
}
