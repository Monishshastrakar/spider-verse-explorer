"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { gameStore, type PlayableCharacterId } from "@/components/game/GameState";
import { GameHUD } from "@/components/game-ui/GameHUD";
import { CharacterPreviewModal } from "@/components/game-ui/CharacterPreviewModal";
import { MobileControls } from "@/components/game-ui/MobileControls";
import { MultiverseFallback } from "@/components/multiverse/MultiverseFallback";

// Dynamically load the playable 3D Game Experience with SSR disabled
const GameExperience = dynamic(
  () => import("@/components/game/GameExperience").then((mod) => mod.GameExperience),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#050508] text-white">
        <div className="w-12 h-12 border-4 border-[#ff1361] border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#00e5ff]">
          Deploying Spider-Society Citadel Simulation...
        </span>
      </div>
    )
  }
);

function MultiverseContent() {
  const searchParams = useSearchParams();
  const [previewStationSlug, setPreviewStationSlug] = useState<string | null>(
    gameStore.state.previewStationSlug
  );
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  // Detect WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl") ||
        canvas.getContext("webgl2");
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Listen to gameStore changes
  useEffect(() => {
    return gameStore.subscribe(() => {
      setPreviewStationSlug(gameStore.state.previewStationSlug);
    });
  }, []);

  // Support direct character query param: ?character=miles-morales
  useEffect(() => {
    const charParam = searchParams.get("character");
    if (charParam) {
      gameStore.setActiveAvatar(charParam as PlayableCharacterId);
    }
  }, [searchParams]);

  if (webglSupported === false) {
    return <MultiverseFallback />;
  }

  return (
    <main className="w-full h-screen fixed inset-0 overflow-hidden bg-[#050508] select-none">
      {/* 3D Playable WebGL Game Canvas */}
      <GameExperience />

      {/* Responsive Game HUD */}
      <GameHUD />

      {/* Mobile Touch Joystick and Action Cluster */}
      <MobileControls />

      {/* Character Transformation Preview Modal */}
      {previewStationSlug && (
        <CharacterPreviewModal
          stationSlug={previewStationSlug}
          onClose={() => gameStore.setPreviewStationSlug(null)}
        />
      )}
    </main>
  );
}

export default function MultiversePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-[#050508] text-white">
          <div className="w-10 h-10 border-4 border-[#ff1361] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <MultiverseContent />
    </Suspense>
  );
}
