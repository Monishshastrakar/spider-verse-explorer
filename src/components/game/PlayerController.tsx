"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gameStore } from "./GameState";
import { SkinnedModelAvatar } from "./SkinnedModelAvatar";
import { MULTIVERSE_STATIONS } from "@/data/multiverse-stations";
import { MOVEMENT_CONFIG } from "@/data/movement-config";

interface PlayerControllerProps {
  onPositionUpdate?: (pos: THREE.Vector3, yaw: number) => void;
}

export function PlayerController({ onPositionUpdate }: PlayerControllerProps) {
  const playerGroupRef = useRef<THREE.Group>(null);

  // Authoritative physical state
  const pos = useRef(new THREE.Vector3(...MOVEMENT_CONFIG.respawnPosition));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  const facingYaw = useRef(0);

  // Jump buffer & coyote timers
  const jumpBufferTimer = useRef(0);
  const coyoteTimer = useRef(0);

  // Movement animation states
  const [isMoving, setIsMoving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isGrounded, setIsGrounded] = useState(true);
  const currentSpeed = useRef(0);

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
    jump: false
  });

  // Sync with GameStore
  useEffect(() => {
    return gameStore.subscribe(() => {
      setActiveAvatar(gameStore.state.activeAvatar);
      setIsTransforming(gameStore.state.isTransforming);
      setAbilityActive(gameStore.state.abilityActive);
    });
  }, []);

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in forms or search fields
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
        jumpBufferTimer.current = MOVEMENT_CONFIG.jumpBufferWindow;
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
      // Clear all held inputs on window blur to prevent sticky movement
      keys.current = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        sprint: false,
        jump: false
      };
      jumpBufferTimer.current = 0;
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

  // Authoritative physical simulation update
  useFrame((_, delta) => {
    // Tick ability cooldowns
    gameStore.tickCooldown(delta);

    // Decrement jump buffer timer
    if (jumpBufferTimer.current > 0) {
      jumpBufferTimer.current = Math.max(0, jumpBufferTimer.current - delta);
    }

    // Freeze motion if input is locked (preview modal open or transforming)
    if (gameStore.state.inputLocked || gameStore.state.isTransforming) {
      vel.current.x = 0;
      vel.current.z = 0;
      setIsMoving(false);
      currentSpeed.current = 0;
      return;
    }

    // Calculate normalized 2D input (Forward/Backward and Right/Left)
    let inputForward = 0;
    let inputRight = 0;

    if (keys.current.forward) inputForward += 1;
    if (keys.current.backward) inputForward -= 1;
    if (keys.current.right) inputRight += 1;
    if (keys.current.left) inputRight -= 1;

    // Mobile joystick integration
    const mobVec = gameStore.state.mobileMoveVector;
    if (Math.abs(mobVec.x) > 0.1 || Math.abs(mobVec.y) > 0.1) {
      inputRight += mobVec.x;
      inputForward += mobVec.y;
    }

    const inputLen = Math.sqrt(inputRight * inputRight + inputForward * inputForward);
    const moving = inputLen > 0.08;
    const running = (keys.current.sprint || gameStore.state.mobileSprintActive) && moving;

    setIsMoving(moving);
    setIsRunning(running);

    // Target locomotion speed from config
    const targetSpeed = running ? MOVEMENT_CONFIG.runSpeed : MOVEMENT_CONFIG.walkSpeed;

    // Smooth acceleration & deceleration
    if (moving) {
      const accelRate = delta / MOVEMENT_CONFIG.accelerationTime;
      currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, Math.min(1, accelRate * 6));

      const normRight = inputRight / (inputLen || 1);
      const normForward = inputForward / (inputLen || 1);

      // Rotate directional input by camera yaw:
      // Camera looks forward along (sin(yaw), cos(yaw)) and right along (cos(yaw), -sin(yaw))
      const cameraYaw = gameStore.state.cameraYaw;
      const worldMoveX = normForward * Math.sin(cameraYaw) + normRight * Math.cos(cameraYaw);
      const worldMoveZ = normForward * Math.cos(cameraYaw) - normRight * Math.sin(cameraYaw);

      vel.current.x = worldMoveX * currentSpeed.current;
      vel.current.z = worldMoveZ * currentSpeed.current;

      // Smoothly rotate character toward movement heading
      const targetAngle = Math.atan2(worldMoveX, worldMoveZ);
      let diff = targetAngle - facingYaw.current;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // normalize [-pi, pi]
      facingYaw.current += diff * Math.min(1, delta * MOVEMENT_CONFIG.rotationSpeed);
    } else {
      const decelRate = delta / MOVEMENT_CONFIG.decelerationTime;
      currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, 0, Math.min(1, decelRate * 8));
      vel.current.x = THREE.MathUtils.lerp(vel.current.x, 0, Math.min(1, decelRate * 8));
      vel.current.z = THREE.MathUtils.lerp(vel.current.z, 0, Math.min(1, decelRate * 8));
    }

    // Ground & Coyote Time Detection
    const groundedNow = pos.current.y <= 0.001;
    if (groundedNow) {
      coyoteTimer.current = MOVEMENT_CONFIG.coyoteTimeWindow;
      vel.current.y = 0;
      pos.current.y = 0;
      setIsGrounded(true);
    } else {
      coyoteTimer.current = Math.max(0, coyoteTimer.current - delta);
      setIsGrounded(false);
    }

    // Jump handling: Check jump buffer or active key alongside coyote window
    const hasJumpIntent = jumpBufferTimer.current > 0 || keys.current.jump || gameStore.state.mobileJumpRequested;
    const canJump = coyoteTimer.current > 0;

    if (hasJumpIntent && canJump) {
      vel.current.y = MOVEMENT_CONFIG.jumpForce;
      coyoteTimer.current = 0;
      jumpBufferTimer.current = 0;
      gameStore.setMobileJumpRequested(false);
      setIsGrounded(false);
    }

    // Apply Gravity
    vel.current.y -= MOVEMENT_CONFIG.gravity * delta;
    pos.current.y += vel.current.y * delta;

    // Ground floor clamp
    if (pos.current.y < 0) {
      pos.current.y = 0;
      vel.current.y = 0;
      setIsGrounded(true);
    }

    // Horizontal displacement
    pos.current.x += vel.current.x * delta;
    pos.current.z += vel.current.z * delta;

    // ==========================================
    // Collisions with World Elements
    // ==========================================
    // 1. Central Console (Cylinder obstacle at origin, radius 1.9m)
    const distToCenter = Math.sqrt(pos.current.x * pos.current.x + pos.current.z * pos.current.z);
    if (distToCenter < 1.9) {
      const angle = Math.atan2(pos.current.z, pos.current.x);
      pos.current.x = Math.cos(angle) * 1.9;
      pos.current.z = Math.sin(angle) * 1.9;
    }

    // 2. Station Pedestal Boundaries (radius 1.25m per pedestal)
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

    // 3. Citadel Outer Boundary
    if (distToCenter > MOVEMENT_CONFIG.boundsRadius) {
      const angle = Math.atan2(pos.current.z, pos.current.x);
      pos.current.x = Math.cos(angle) * MOVEMENT_CONFIG.boundsRadius;
      pos.current.z = Math.sin(angle) * MOVEMENT_CONFIG.boundsRadius;
    }

    // Safe out-of-bounds recovery
    if (pos.current.y < -4 || distToCenter > 22) {
      pos.current.set(...MOVEMENT_CONFIG.respawnPosition);
      vel.current.set(0, 0, 0);
    }

    // Sync group position and rotation
    if (playerGroupRef.current) {
      playerGroupRef.current.position.copy(pos.current);
      playerGroupRef.current.rotation.y = facingYaw.current;
    }

    // Notify Camera Controller
    if (onPositionUpdate) {
      onPositionUpdate(pos.current, facingYaw.current);
    }

    // ==========================================
    // Station Proximity with Hysteresis
    // ==========================================
    let closestStation: string | null = null;
    let minDistance = 999;

    MULTIVERSE_STATIONS.forEach((station) => {
      const dx = pos.current.x - station.position[0];
      const dz = pos.current.z - station.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDistance) {
        minDistance = dist;
        if (dist <= MOVEMENT_CONFIG.interactionDistance) {
          closestStation = station.slug;
        }
      }
    });

    // Hysteresis calculation: only clear prompt if player moves beyond threshold + hysteresis
    if (gameStore.state.nearbyStationSlug) {
      const currentStation = MULTIVERSE_STATIONS.find(
        (s) => s.slug === gameStore.state.nearbyStationSlug
      );
      if (currentStation) {
        const dx = pos.current.x - currentStation.position[0];
        const dz = pos.current.z - currentStation.position[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist > MOVEMENT_CONFIG.interactionDistance + MOVEMENT_CONFIG.interactionHysteresis) {
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
    <group ref={playerGroupRef} position={MOVEMENT_CONFIG.respawnPosition}>
      {/* Transformation Portal Shield (wraps around player without relocating them) */}
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

      {/* Render Active Skinned Avatar */}
      <SkinnedModelAvatar
        avatarId={activeAvatar}
        isMoving={isMoving}
        isRunning={isRunning}
        isGrounded={isGrounded}
        abilityActive={abilityActive}
        moveSpeed={currentSpeed.current}
      />
    </group>
  );
}
