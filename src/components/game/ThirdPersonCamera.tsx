"use client";

import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gameStore } from "./GameState";
import { CAMERA_CONFIG } from "@/data/movement-config";
import { CHARACTER_MODELS } from "@/data/character-models";

interface ThirdPersonCameraProps {
  playerPos: THREE.Vector3;
  playerYaw: number;
}

export function ThirdPersonCamera({ playerPos }: ThirdPersonCameraProps) {
  const { camera, gl } = useThree();

  const [activeAvatar, setActiveAvatar] = useState(gameStore.state.activeAvatar);

  const yaw = useRef(0);
  const pitch = useRef(0.32); // Initial comfortable third-person angle
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  const currentCamPos = useRef(new THREE.Vector3(0, 4, 8));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.25, 0));

  // Sync active avatar for character-specific camera framing
  useEffect(() => {
    return gameStore.subscribe(() => {
      setActiveAvatar(gameStore.state.activeAvatar);
    });
  }, []);

  // Mouse drag listeners on the canvas
  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 2) {
        isDragging.current = true;
        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouseX.current;
      const dy = e.clientY - lastMouseY.current;

      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;

      yaw.current -= dx * CAMERA_CONFIG.sensitivity;
      pitch.current = THREE.MathUtils.clamp(
        pitch.current + dy * CAMERA_CONFIG.sensitivity,
        CAMERA_CONFIG.minPitch,
        CAMERA_CONFIG.maxPitch
      );

      gameStore.state.cameraYaw = yaw.current;
      gameStore.state.cameraPitch = pitch.current;
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Mobile touch orbit listeners (touches on right half of screen)
    let touchId: number | null = null;
    let lastTouchX = 0;
    let lastTouchY = 0;

    const onTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.clientX > window.innerWidth * 0.35 && touchId === null) {
          touchId = touch.identifier;
          lastTouchX = touch.clientX;
          lastTouchY = touch.clientY;
          break;
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchId === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === touchId) {
          const dx = touch.clientX - lastTouchX;
          const dy = touch.clientY - lastTouchY;
          lastTouchX = touch.clientX;
          lastTouchY = touch.clientY;

          const touchSensitivity = CAMERA_CONFIG.sensitivity * 1.4;
          yaw.current -= dx * touchSensitivity;
          pitch.current = THREE.MathUtils.clamp(
            pitch.current + dy * touchSensitivity,
            CAMERA_CONFIG.minPitch,
            CAMERA_CONFIG.maxPitch
          );

          gameStore.state.cameraYaw = yaw.current;
          gameStore.state.cameraPitch = pitch.current;
          break;
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchId) {
          touchId = null;
          break;
        }
      }
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [gl.domElement]);

  // Frame update: smooth follow camera
  useFrame((_, delta) => {
    // Determine character specific framing
    const isMech = activeAvatar === "peni-parker";
    const targetDistance = isMech ? CAMERA_CONFIG.mechDistance : CAMERA_CONFIG.defaultDistance;
    const heightOffset = isMech ? 1.6 : CAMERA_CONFIG.heightOffset;

    const height = Math.sin(pitch.current) * targetDistance;
    const horizontalDist = Math.cos(pitch.current) * targetDistance;

    const targetLookAt = new THREE.Vector3(
      playerPos.x,
      playerPos.y + heightOffset,
      playerPos.z
    );

    const targetCamPos = new THREE.Vector3(
      playerPos.x - Math.sin(yaw.current) * horizontalDist,
      playerPos.y + height + 0.6,
      playerPos.z - Math.cos(yaw.current) * horizontalDist
    );

    // Smooth camera interpolation
    const lerpFactor = THREE.MathUtils.clamp(delta * 9, 0, 1);
    currentCamPos.current.lerp(targetCamPos, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
