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

        if (mesh.material) {
          const rawMat = mesh.material as THREE.MeshStandardMaterial;
          const mat = rawMat.clone() as THREE.MeshStandardMaterial;
          mesh.material = mat;

          if (avatarId === "miles-morales") {
            // Miles Morales: Authentic UV textured suit with spray-paint chest spider
            if (mat.name === "HEAD") {
              mat.roughness = 0.42;
              mat.metalness = 0.06;
              if (mat.map) {
                mat.map.colorSpace = THREE.SRGBColorSpace;
                mat.map.needsUpdate = true;
              }
            } else if (mat.name === "HEAD.001") {
              mat.color.set("#ff1361");
              mat.roughness = 0.28;
              mat.emissive.set("#ff1361");
              mat.emissiveIntensity = 0.35;
            } else if (mat.name === "material_0") {
              mat.color.set("#ffffff");
              mat.roughness = 0.16;
              mat.metalness = 0.05;
            }
          } else if (avatarId === "gwen-stacy") {
            // Gwen Stacy: Ghost-Spider white upper bodice, dark midnight tights, magenta & cyan accents
            if (mat.name === "HEAD") {
              mat.color.set("#f5f5f7");
              mat.roughness = 0.4;
              mat.metalness = 0.05;
            } else if (mat.name === "HEAD.001") {
              mat.color.set("#ff4081");
              mat.roughness = 0.25;
              mat.emissive.set("#ff4081");
              mat.emissiveIntensity = 0.35;
            } else if (mat.name === "material_0") {
              mat.color.set("#00e5ff");
              mat.roughness = 0.15;
              mat.emissive.set("#00e5ff");
              mat.emissiveIntensity = 0.15;
            }
          } else if (avatarId === "miguel-ohara") {
            // Miguel O'Hara: Spider-Man 2099 textured skull chestplate & arm talons
            if (mat.name.includes("band")) {
              mat.color.set("#d50000");
              mat.roughness = 0.2;
              mat.metalness = 0.2;
              mat.emissive.set("#d50000");
              mat.emissiveIntensity = 0.45;
            } else {
              mat.roughness = 0.38;
              mat.metalness = 0.08;
              if (mat.map) {
                mat.map.colorSpace = THREE.SRGBColorSpace;
                mat.map.needsUpdate = true;
              }
            }
          } else if (avatarId === "peter-parker") {
            // Peter B. Parker: Classic red & blue suit
            if (mesh.name === "Object_10" || mesh.name === "Object_11" || mesh.name === "Object_14") {
              mat.color.set("#d50000"); // Red mask, gloves, boots
              mat.roughness = 0.45;
            } else if (mesh.name === "Object_12") {
              mat.color.set("#1565c0"); // Blue legs
              mat.roughness = 0.5;
            } else if (mesh.name === "Object_13") {
              mat.color.set("#d50000"); // Red torso
              mat.roughness = 0.45;
            } else if (mesh.name === "Object_16" || mesh.name === "Object_17" || mesh.name === "Object_4" || mesh.name === "Object_6") {
              mat.color.set("#0a0a0f"); // Black webbing & chest emblem
              mat.roughness = 0.8;
            } else if (mesh.name === "Object_8") {
              mat.color.set("#ffffff"); // White eye lenses
              mat.roughness = 0.15;
            }
          } else if (avatarId === "civilian") {
            // Contemporary urban athletic windbreaker & glowing kinetic joints
            if (mesh.name === "Beta_Joints") {
              mat.color.set("#00e5ff");
              mat.roughness = 0.25;
              mat.metalness = 0.8;
              mat.emissive.set("#00e5ff");
              mat.emissiveIntensity = 0.3;
            } else {
              mat.color.set("#1e293b");
              mat.roughness = 0.6;
              mat.metalness = 0.15;
            }
          } else if (avatarId === "hobie-brown") {
            // Hobie Brown: Punk red/navy with yellow emblem
            if (mat.name === "HEAD") {
              mat.color.set("#c62828");
              mat.roughness = 0.5;
            } else if (mat.name === "HEAD.001") {
              mat.color.set("#ffe600");
              mat.emissive.set("#ffe600");
              mat.emissiveIntensity = 0.3;
            } else if (mat.name === "material_0") {
              mat.color.set("#ffffff");
              mat.roughness = 0.15;
            }
          } else if (avatarId === "pavitr-prabhakar") {
            // Pavitr Prabhakar: Red suit, gold bangles
            if (mat.name === "HEAD") {
              mat.color.set("#d50000");
              mat.roughness = 0.45;
            } else if (mat.name === "HEAD.001") {
              mat.color.set("#ffd700");
              mat.metalness = 0.8;
              mat.roughness = 0.2;
            } else if (mat.name === "material_0") {
              mat.color.set("#ffffff");
              mat.roughness = 0.15;
            }
          } else if (avatarId === "spider-man-noir") {
            // Spider-Man Noir: Monochrome chiaroscuro
            if (mat.name === "HEAD") {
              mat.color.set("#1a1a1e");
              mat.roughness = 0.7;
            } else if (mat.name === "HEAD.001") {
              mat.color.set("#374151");
            } else if (mat.name === "material_0") {
              mat.color.set("#ffb300");
              mat.roughness = 0.2;
              mat.emissive.set("#ffb300");
              mat.emissiveIntensity = 0.2;
            }
          }

          mat.transparent = false;
          mat.depthWrite = true;
          mat.side = THREE.FrontSide;
          mat.needsUpdate = true;
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
      {/* Gwen Volumetric 3D Hood */}
      {avatarId === "gwen-stacy" && (
        <group position={[0, 1.48, -0.04]}>
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

      {/* Spider-Man Noir Fedora & Trench Collar */}
      {avatarId === "spider-man-noir" && (
        <group position={[0, 1.63, 0]}>
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

      {/* Hobie Brown Chrome Spiked Mohawk */}
      {avatarId === "hobie-brown" && (
        <group position={[0, 1.63, 0]}>
          {[-0.08, -0.04, 0, 0.04, 0.08].map((z, idx) => (
            <mesh key={idx} position={[0, 0.04, z]}>
              <coneGeometry args={[0.025, 0.08, 12]} />
              <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </group>
      )}

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

// Preload all rigged GLB models
useGLTF.preload("/models/miles_morales.glb");
useGLTF.preload("/models/miguel_ohara.glb");
useGLTF.preload("/models/spiderman_classic.glb");
useGLTF.preload("/models/civilian_xbot.glb");
useGLTF.preload("/models/soldier.glb");
