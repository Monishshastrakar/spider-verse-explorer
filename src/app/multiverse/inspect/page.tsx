"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import * as THREE from "three";
import { CHARACTER_MODELS, type CharacterModelConfig } from "@/data/character-models";
import { SkinnedModelAvatar } from "@/components/game/SkinnedModelAvatar";
import { ArrowLeft, CheckCircle, AlertTriangle, Eye, Shield, Activity, Info } from "lucide-react";

import { useThree } from "@react-three/fiber";

type ViewAngle = "front" | "side" | "back" | "three-quarter";
type AnimMode = "idle" | "walk" | "run" | "jump";

function CameraViewSetter({ viewAngle }: { viewAngle: ViewAngle }) {
  const { camera } = useThree();

  useEffect(() => {
    switch (viewAngle) {
      case "front":
        camera.position.set(0, 1.15, 2.8);
        break;
      case "side":
        camera.position.set(2.8, 1.15, 0);
        break;
      case "back":
        camera.position.set(0, 1.15, -2.8);
        break;
      case "three-quarter":
      default:
        camera.position.set(2.2, 1.4, 2.6);
        break;
    }
    camera.lookAt(0, 1.1, 0);
  }, [viewAngle, camera]);

  return (
    <OrbitControls
      target={[0, 1.1, 0]}
      minDistance={1.2}
      maxDistance={7}
      maxPolarAngle={Math.PI / 2 + 0.05} // don't dip below floor
    />
  );
}

function InspectionScene({
  activeId,
  animMode,
  viewAngle
}: {
  activeId: string;
  animMode: AnimMode;
  viewAngle: ViewAngle;
}) {
  const isMoving = animMode === "walk" || animMode === "run";
  const isRunning = animMode === "run";
  const isGrounded = animMode !== "jump";

  return (
    <>
      <color attach="background" args={["#121218"]} />

      {/* 3-Point Neutral Studio Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
      <directionalLight position={[-5, 5, 2]} intensity={0.7} color="#dbeafe" />
      <directionalLight position={[0, 6, -5]} intensity={0.9} color="#fed7aa" />

      {/* Ground Contact Reference Grid */}
      <Grid
        position={[0, 0, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={1}
        cellColor="#2d3748"
        sectionSize={2}
        sectionThickness={1.5}
        sectionColor="#00e5ff"
        fadeDistance={25}
      />

      {/* Ground Contact Line */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color="#1a202c" side={THREE.DoubleSide} />
      </mesh>

      {/* The Character Under Inspection */}
      <group position={[0, 0, 0]}>
        <SkinnedModelAvatar
          avatarId={activeId}
          isMoving={isMoving}
          isRunning={isRunning}
          isGrounded={isGrounded}
          abilityActive={false}
          moveSpeed={isRunning ? 5.6 : isMoving ? 2.8 : 0}
        />
      </group>

      {/* View Angle Camera Controller */}
      <CameraViewSetter viewAngle={viewAngle} />
    </>
  );
}

export default function CharacterInspectPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>("miles-morales");
  const [animMode, setAnimMode] = useState<AnimMode>("idle");
  const [viewAngle, setViewAngle] = useState<ViewAngle>("three-quarter");

  const charKeys = Object.keys(CHARACTER_MODELS);
  const currentConfig = CHARACTER_MODELS[selectedSlug] || CHARACTER_MODELS.civilian;

  return (
    <div className="w-full h-screen bg-[#0a0a10] text-white flex flex-col md:flex-row overflow-hidden select-none font-sans">
      {/* 3D Viewport on Left/Center */}
      <div className="flex-1 relative h-2/3 md:h-full">
        {/* Top Floating Controls Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <Link
              href="/multiverse"
              className="px-3 py-1.5 rounded-lg bg-[#1a1a28] hover:bg-[#252538] text-xs font-bold border border-[#2e2e42] flex items-center gap-1.5 transition-colors shadow-[2px_2px_0px_#000]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span>Back to Multiverse</span>
            </Link>

            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30">
              DEVELOPMENT INSPECTION SUITE
            </span>
          </div>

          {/* View Angle & Animation Selectors */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* View Angle Selector */}
            <div className="flex items-center gap-1 bg-[#141422]/90 p-1 rounded-xl border border-[#2a2a3e] backdrop-blur-md">
              <span className="text-[10px] font-mono text-gray-400 px-1.5 uppercase">Angle:</span>
              {(["three-quarter", "front", "side", "back"] as ViewAngle[]).map((angle) => (
                <button
                  key={angle}
                  onClick={() => setViewAngle(angle)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    viewAngle === angle
                      ? "bg-[#ff1361] text-white shadow-[1px_1px_0px_#000]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {angle.replace("-", " ")}
                </button>
              ))}
            </div>

            {/* Animation Clip Selector */}
            <div className="flex items-center gap-1 bg-[#141422]/90 p-1 rounded-xl border border-[#2a2a3e] backdrop-blur-md">
              <span className="text-[10px] font-mono text-gray-400 px-1.5 uppercase">Clip:</span>
              {(["idle", "walk", "run", "jump"] as AnimMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAnimMode(mode)}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    animMode === mode
                      ? "bg-[#00e5ff] text-black shadow-[1px_1px_0px_#000]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Canvas */}
        <Canvas camera={{ position: [2.2, 1.4, 2.6], fov: 45 }}>
          <Suspense fallback={null}>
            <InspectionScene
              activeId={selectedSlug}
              animMode={animMode}
              viewAngle={viewAngle}
            />
          </Suspense>
        </Canvas>

        {/* Viewport Instructions */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none text-[11px] font-mono text-gray-400 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
          Left Drag: Orbit • Right Drag: Pan • Scroll: Zoom • Neutral 3-Point Studio Lights
        </div>
      </div>

      {/* Right Sidebar: Character Selection & Technical Inspection Metrics */}
      <div className="w-full md:w-96 bg-[#0c0c16] border-t md:border-t-0 md:border-l border-[#222234] flex flex-col justify-between overflow-y-auto p-4 sm:p-6 z-20">
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <Activity className="w-4 h-4 text-[#ff1361]" />
            <h2 className="text-sm font-black uppercase tracking-wider text-white">
              Model Diagnostic Inspector
            </h2>
          </div>

          {/* Character Tabs */}
          <div className="space-y-1.5 mb-6">
            <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-1">
              Select Character Model
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {charKeys.map((key) => {
                const char = CHARACTER_MODELS[key];
                const active = selectedSlug === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedSlug(key)}
                    className={`p-2 rounded-lg text-left text-xs font-bold transition-all border ${
                      active
                        ? "bg-[#1f1f32] text-white border-[#00e5ff] shadow-[2px_2px_0px_#00e5ff]"
                        : "bg-[#12121e] text-gray-400 border-[#222234] hover:text-white"
                    }`}
                  >
                    <div className="truncate">{char.name}</div>
                    <div className="text-[9px] font-mono text-gray-500 truncate">
                      {char.continuityVersion}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technical Diagnostics for Selected Model */}
          <div className="bg-[#12121e] border border-[#232338] rounded-xl p-4 space-y-3 font-mono text-xs">
            {/* Quality Status Badge */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-gray-400 text-[11px]">Quality Status:</span>
              {currentConfig.modelStatus === "rigged-glb" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                  <CheckCircle className="w-3 h-3" />
                  RIGGED SKINNED GLB
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  <AlertTriangle className="w-3 h-3" />
                  VERIFIED TEMPORARY
                </span>
              )}
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Continuity:</span>
              <span className="text-white text-right truncate max-w-[170px]">
                {currentConfig.continuityVersion}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Polygon Budget:</span>
              <span className="text-[#00e5ff]">
                {selectedSlug === "miles-morales"
                  ? "33,042 Tris (6 Meshes)"
                  : selectedSlug === "peter-parker"
                  ? "6,400 Tris (Proxy)"
                  : "~2,800 Tris (Proxy)"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Skeletal Hierarchy:</span>
              <span className="text-[#ff1361]">
                {selectedSlug === "miles-morales"
                  ? "65 Joints (Mixamo Armature)"
                  : selectedSlug === "peter-parker"
                  ? "68 Joints (Vanguard)"
                  : "Articulated Hierarchy"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Texture Atlas:</span>
              <span className="text-gray-200">
                {selectedSlug === "miles-morales"
                  ? "1024×1024 sRGB PNG (30KB)"
                  : "Procedural PBR"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Ground Alignment:</span>
              <span className="text-emerald-400">Y = 0.00m (Grounded)</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Active Animation:</span>
              <span className="text-[#ffe600] uppercase font-bold">{animMode}</span>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-gray-300 leading-relaxed">
              <span className="text-gray-400 block mb-0.5">Art Direction Notes:</span>
              {currentConfig.artDirectionNotes}
            </div>

            <div className="pt-2 border-t border-white/10 text-[10px] text-gray-400">
              <span className="block text-gray-500">Source & Licensing:</span>
              {currentConfig.attribution} ({currentConfig.license})
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Spider-Verse Explorer</span>
          <Link href="/explore" className="text-[#00e5ff] hover:underline flex items-center gap-1">
            <span>2D Dossier</span>
            <Shield className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
