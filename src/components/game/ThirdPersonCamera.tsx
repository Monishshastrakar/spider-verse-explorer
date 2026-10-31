"use client";

import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gameStore } from "./GameState";

interface ThirdPersonCameraProps {
  playerPos: THREE.Vector3;
  playerYaw: number;
}

export function ThirdPersonCamera({ playerPos }: ThirdPersonCameraProps) {
  const { camera, gl } = useThree();

  const yaw = useRef(0);
  const pitch = useRef(0.35); // Initial comfortable overhead angle
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  const currentCamPos = useRef(new THREE.Vector3(0, 4, 8));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  // Mouse drag listeners on the canvas
  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e: MouseEvent) => {
      // Left click or middle click drag to rotate camera
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

      const sensitivity = 0.005;
      yaw.current -= dx * sensitivity;
      pitch.current = THREE.MathUtils.clamp(
        pitch.current + dy * sensitivity,
        0.05, // Minimum pitch (don't clip through ground)
        1.15  // Maximum pitch (comfortable high overhead angle)
      );

      gameStore.state.cameraYaw = yaw.current;
      gameStore.state.cameraPitch = pitch.current;
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Touch orbit listeners (when touching right half of screen)
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

          const touchSensitivity = 0.007;
          yaw.current -= dx * touchSensitivity;
          pitch.current = THREE.MathUtils.clamp(
            pitch.current + dy * touchSensitivity,
            0.05,
            1.15
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
    // Camera offset behind player based on yaw & pitch
    const distance = 5.6;
    const height = Math.sin(pitch.current) * distance;
    const horizontalDist = Math.cos(pitch.current) * distance;

    const targetLookAt = new THREE.Vector3(
      playerPos.x,
      playerPos.y + 1.25, // aim at player chest/head
      playerPos.z
    );

    const targetCamPos = new THREE.Vector3(
      playerPos.x - Math.sin(yaw.current) * horizontalDist,
      playerPos.y + height + 0.8,
      playerPos.z - Math.cos(yaw.current) * horizontalDist
    );

    // Smooth lerp
    const lerpFactor = THREE.MathUtils.clamp(delta * 8, 0, 1);
    currentCamPos.current.lerp(targetCamPos, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
