"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { CHARACTER_MODELS, type CharacterModelConfig } from "@/data/character-models";
import { PlayerAvatar } from "./PlayerAvatar";

interface SkinnedModelAvatarProps {
  avatarId: string;
  isMoving: boolean;
  isRunning: boolean;
  isGrounded: boolean;
  abilityActive: boolean;
  moveSpeed?: number;
}

export function SkinnedModelAvatar({
  avatarId,
  isMoving,
  isRunning,
  isGrounded,
  abilityActive,
  moveSpeed = 0
}: SkinnedModelAvatarProps) {
  const config: CharacterModelConfig =
    CHARACTER_MODELS[avatarId] || CHARACTER_MODELS.civilian;

  // If model is a rigged GLB, load and render via SkinnedMeshRenderer with instant fallback
  if (config.modelStatus === "rigged-glb" && config.modelUrl) {
    return (
      <React.Suspense
        fallback={
          <PlayerAvatar
            avatarId={avatarId as any}
            isMoving={isMoving}
            isRunning={isRunning}
            isGrounded={isGrounded}
            abilityActive={abilityActive}
          />
        }
      >
        <SkinnedMeshRenderer
          config={config}
          avatarId={avatarId}
          isMoving={isMoving}
          isRunning={isRunning}
          isGrounded={isGrounded}
          abilityActive={abilityActive}
          moveSpeed={moveSpeed}
        />
      </React.Suspense>
    );
  }

  // Otherwise, render honest stylized temporary representation
  return (
    <group position={[0, 0, 0]}>
      <PlayerAvatar
        avatarId={avatarId as any}
        isMoving={isMoving}
        isRunning={isRunning}
        isGrounded={isGrounded}
        abilityActive={abilityActive}
      />
    </group>
  );
}

// ==========================================
// Skinned Mesh GLB Renderer with Real Bones
// ==========================================
function SkinnedMeshRenderer({
  config,
  avatarId,
  isMoving,
  isRunning,
  isGrounded,
  abilityActive,
  moveSpeed
}: {
  config: CharacterModelConfig;
  avatarId: string;
  isMoving: boolean;
  isRunning: boolean;
  isGrounded: boolean;
  abilityActive: boolean;
  moveSpeed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const activeActionName = useRef<string>("idle");

  // Load the GLTF asset
  const gltf = useGLTF(config.modelUrl!);

  // Clone scene with skeletons preserved
  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(gltf.scene) as THREE.Group;

    // Apply character specific materials to the skinned meshes
    clone.traverse((child) => {
      if ((child as THREE.SkinnedMesh).isSkinnedMesh) {
        const mesh = child as THREE.SkinnedMesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (avatarId === "miles-morales") {
          // Miles Morales: Preserve authentic UV textured suit and configure stylized PBR channels
          if (mesh.material) {
            const rawMat = mesh.material as THREE.MeshStandardMaterial;
            const mat = rawMat.clone() as THREE.MeshStandardMaterial;
            mesh.material = mat;

            if (mat.name === "HEAD") {
              // Main Suited Body with 1024x1024 texture atlas (chest spray spider, back spider, finger pads, side stripes)
              mat.roughness = 0.42;
              mat.metalness = 0.06;
              if (mat.map) {
                mat.map.colorSpace = THREE.SRGBColorSpace;
                mat.map.needsUpdate = true;
              }
              mat.transparent = false;
              mat.depthWrite = true;
              mat.side = THREE.FrontSide;
            } else if (mat.name === "HEAD.001") {
              // Mask eye contour bezels and footwear accents (Spider-Verse vibrant crimson)
              mat.color.set("#ff1361");
              mat.roughness = 0.28;
              mat.metalness = 0.12;
              mat.emissive.set("#ff1361");
              mat.emissiveIntensity = 0.35;
              mat.transparent = false;
              mat.depthWrite = true;
              mat.side = THREE.FrontSide;
            } else if (mat.name === "material_0") {
              // Inner eye lenses (sharp, non-toy optical white with specular response)
              mat.color.set("#ffffff");
              mat.roughness = 0.16;
              mat.metalness = 0.05;
              mat.transparent = false;
              mat.depthWrite = true;
              mat.side = THREE.FrontSide;
            }
            mat.needsUpdate = true;
          }
        } else if (avatarId === "civilian") {
          // Contemporary urban casual hoodie/windbreaker
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#2d3748"),
            roughness: 0.65,
            metalness: 0.2
          });
        }
      }
    });

    return clone;
  }, [gltf.scene, avatarId]);

  // Setup AnimationMixer & Actions
  useEffect(() => {
    if (!clonedScene || !gltf.animations || gltf.animations.length === 0) return;

    const mixer = new THREE.AnimationMixer(clonedScene);
    mixerRef.current = mixer;
    const actions: Record<string, THREE.AnimationAction> = {};

    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      actions[clip.name.toLowerCase()] = action;
    });
    actionsRef.current = actions;

    // Start with idle action
    const idleName = config.animationClips.idle.toLowerCase();
    const startAction = actions[idleName] || Object.values(actions)[0];
    if (startAction) {
      startAction.play();
      activeActionName.current = idleName;
    }

    return () => {
      mixer.stopAllAction();
    };
  }, [clonedScene, gltf.animations, config.animationClips.idle]);

  // Handle animation blending transitions
  useEffect(() => {
    const mixer = mixerRef.current;
    const actions = actionsRef.current;
    if (!mixer || !actions) return;

    let targetActionName = config.animationClips.idle.toLowerCase();

    if (!isGrounded) {
      const jumpClip = config.animationClips.jump ? config.animationClips.jump.toLowerCase() : "jump";
      targetActionName = actions[jumpClip] ? jumpClip : config.animationClips.run.toLowerCase();
    } else if (isMoving) {
      targetActionName = isRunning
        ? config.animationClips.run.toLowerCase()
        : config.animationClips.walk.toLowerCase();
    }

    if (targetActionName !== activeActionName.current) {
      const prevAction = actions[activeActionName.current];
      const nextAction = actions[targetActionName];

      if (nextAction) {
        nextAction.reset();
        nextAction.enabled = true;
        nextAction.setEffectiveTimeScale(1);
        nextAction.setEffectiveWeight(1);

        if (targetActionName === "jump") {
          nextAction.setLoop(THREE.LoopRepeat, Infinity);
        }

        if (prevAction) {
          nextAction.crossFadeFrom(prevAction, 0.18, true);
        }
        nextAction.play();
        activeActionName.current = targetActionName;
      }
    }
  }, [isMoving, isRunning, isGrounded, config.animationClips]);

  // Update animation mixer every frame
  useFrame((_, delta) => {
    if (mixerRef.current) {
      // Adjust locomotion playback speed to avoid foot sliding
      const currentAction = actionsRef.current[activeActionName.current];
      if (currentAction && isMoving && isGrounded) {
        const expectedSpeed = isRunning ? 5.6 : 2.8;
        const scale = moveSpeed > 0 ? (moveSpeed / expectedSpeed) * 1.1 : 1.0;
        currentAction.timeScale = THREE.MathUtils.clamp(scale, 0.6, 1.4);
      } else if (currentAction) {
        currentAction.timeScale = 1.0;
      }

      mixerRef.current.update(delta);
    }
  });

  return (
    <group ref={groupRef} position={config.visualRootOffset}>
      {/* Ability Shockwave Aura Ring */}
      {abilityActive && (
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[1.6, 16, 16]} />
          <meshBasicMaterial
            color={config.accentColor}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Cloned Skinned Mesh Primitive */}
      <primitive object={clonedScene} scale={config.scale} />
    </group>
  );
}

// Preload the rigged GLB models
useGLTF.preload("/models/miles_morales.glb");
useGLTF.preload("/models/civilian_xbot.glb");
useGLTF.preload("/models/soldier.glb");
