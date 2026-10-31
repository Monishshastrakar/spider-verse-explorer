"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MULTIVERSE_STATIONS,
  getStationBySlug,
  type MultiverseStationConfig
} from "@/data/multiverse-stations";
import type { HubSceneState } from "@/components/multiverse/SpiderVerseHub3D";
import { HubOverlayUI } from "@/components/multiverse/HubOverlayUI";
import { ActiveCharacterHUD } from "@/components/multiverse/ActiveCharacterHUD";
import { MultiverseFallback } from "@/components/multiverse/MultiverseFallback";

// Dynamically import 3D Canvas with ssr: false
const SpiderVerseHub3D = dynamic(
  () =>
    import("@/components/multiverse/SpiderVerseHub3D").then(
      (mod) => mod.SpiderVerseHub3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#050508] text-white">
        <div className="w-12 h-12 border-4 border-[#ff1361] border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#00e5ff]">
          Initializing Go-Home Machine 3D Quantum Matrix...
        </span>
      </div>
    )
  }
);

function MultiverseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sceneState, setSceneState] = useState<HubSceneState>("hub");
  const [selectedStation, setSelectedStation] = useState<MultiverseStationConfig | null>(null);
  const [powerActive, setPowerActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
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

  // Listen to prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Sync initial URL params: ?character=miles-morales&mode=preview|active
  useEffect(() => {
    const characterSlug = searchParams.get("character");
    const mode = searchParams.get("mode");

    if (characterSlug) {
      const station = getStationBySlug(characterSlug);
      if (station) {
        setSelectedStation(station);
        if (mode === "active") {
          setSceneState("character-active");
        } else {
          setSceneState("character-preview");
        }
        return;
      }
    }
    // Default to hub
    setSelectedStation(null);
    setSceneState("hub");
  }, [searchParams]);

  // Update URL params without pushing extra browser history entries
  const updateUrl = useCallback(
    (station: MultiverseStationConfig | null, mode?: "preview" | "active") => {
      if (station && mode) {
        router.replace(`/multiverse?character=${station.slug}&mode=${mode}`, {
          scroll: false
        });
      } else {
        router.replace("/multiverse", { scroll: false });
      }
    },
    [router]
  );

  // Station selection handler
  const handleSelectStation = useCallback(
    (station: MultiverseStationConfig | null) => {
      if (!station) {
        setSelectedStation(null);
        setSceneState("hub");
        updateUrl(null);
        return;
      }
      setSelectedStation(station);
      setSceneState("approaching-character");
      updateUrl(station, "preview");

      const timer = setTimeout(() => {
        setSceneState("character-preview");
      }, 700);
      return () => clearTimeout(timer);
    },
    [updateUrl]
  );

  // Transformation flow: "Become this Spider"
  const handleBecomeCharacter = useCallback(() => {
    if (!selectedStation) return;
    setSceneState("transforming");

    // Brief 300ms portal suit-up transformation
    const timer = setTimeout(() => {
      setSceneState("character-active");
      updateUrl(selectedStation, "active");
    }, 350);

    return () => clearTimeout(timer);
  }, [selectedStation, updateUrl]);

  // Return to central hub orbit
  const handleReturnToHub = useCallback(() => {
    setSceneState("returning-to-hub");
    const timer = setTimeout(() => {
      setSelectedStation(null);
      setSceneState("hub");
      updateUrl(null);
    }, 400);

    return () => clearTimeout(timer);
  }, [updateUrl]);

  // Trigger interactive character superpower
  const handleTriggerPower = useCallback(() => {
    setPowerActive(true);
    const timer = setTimeout(() => {
      setPowerActive(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedStation) handleReturnToHub();
      } else if (e.key === "ArrowRight") {
        const currIdx = selectedStation
          ? MULTIVERSE_STATIONS.findIndex((s) => s.id === selectedStation.id)
          : -1;
        const nextIdx = (currIdx + 1) % MULTIVERSE_STATIONS.length;
        handleSelectStation(MULTIVERSE_STATIONS[nextIdx]);
      } else if (e.key === "ArrowLeft") {
        const currIdx = selectedStation
          ? MULTIVERSE_STATIONS.findIndex((s) => s.id === selectedStation.id)
          : 0;
        const prevIdx = (currIdx - 1 + MULTIVERSE_STATIONS.length) % MULTIVERSE_STATIONS.length;
        handleSelectStation(MULTIVERSE_STATIONS[prevIdx]);
      } else if (e.key === "Enter" || e.key === "b" || e.key === "B") {
        if (selectedStation && sceneState === "character-preview") {
          handleBecomeCharacter();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStation, sceneState, handleReturnToHub, handleSelectStation, handleBecomeCharacter]);

  // Fallback if WebGL is unavailable
  if (webglSupported === false) {
    return <MultiverseFallback onSelectStation={handleSelectStation} />;
  }

  return (
    <main className="w-full h-screen fixed inset-0 overflow-hidden bg-[#050508] select-none">
      {/* 3D WebGL Canvas Layer */}
      <SpiderVerseHub3D
        sceneState={sceneState}
        selectedStation={selectedStation}
        onSelectStation={handleSelectStation}
        reducedMotion={reducedMotion}
        powerEffectActive={powerActive}
      />

      {/* HTML Overlay UI */}
      {sceneState === "character-active" && selectedStation ? (
        <ActiveCharacterHUD
          character={selectedStation}
          onTriggerPower={handleTriggerPower}
          powerActive={powerActive}
          onReturnToHub={handleReturnToHub}
          onOpenStationPicker={() => setSceneState("hub")}
        />
      ) : (
        <HubOverlayUI
          sceneState={sceneState}
          selectedStation={selectedStation}
          onSelectStation={handleSelectStation}
          onBecomeCharacter={handleBecomeCharacter}
          onReturnToHub={handleReturnToHub}
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
