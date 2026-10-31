"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MULTIVERSE_STATIONS,
  type MultiverseStationConfig
} from "@/data/multiverse-stations";
import type { HubSceneState } from "./SpiderVerseHub3D";
import { Compass, Sparkles, ChevronLeft, ChevronRight, RotateCcw, Zap, ExternalLink, Shield } from "lucide-react";

interface HubOverlayUIProps {
  sceneState: HubSceneState;
  selectedStation: MultiverseStationConfig | null;
  onSelectStation: (station: MultiverseStationConfig | null) => void;
  onBecomeCharacter: () => void;
  onReturnToHub: () => void;
}

export function HubOverlayUI({
  sceneState,
  selectedStation,
  onSelectStation,
  onBecomeCharacter,
  onReturnToHub
}: HubOverlayUIProps) {
  const currentIndex = selectedStation
    ? MULTIVERSE_STATIONS.findIndex((s) => s.id === selectedStation.id)
    : -1;

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % MULTIVERSE_STATIONS.length;
    onSelectStation(MULTIVERSE_STATIONS[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + MULTIVERSE_STATIONS.length) % MULTIVERSE_STATIONS.length;
    onSelectStation(MULTIVERSE_STATIONS[prevIdx]);
  };

  const isPreviewing =
    (sceneState === "approaching-character" || sceneState === "character-preview") &&
    selectedStation !== null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      {/* Top Bar Navigation & Station Selector */}
      <header className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto w-full max-w-7xl mx-auto">
        {/* Hub Title and Status Badge */}
        <div className="flex items-center gap-3 bg-[#0a0a10]/85 border border-[#2a2a3e] px-4 py-2 rounded-xl backdrop-blur-md shadow-[3px_3px_0px_#000]">
          <div className="w-8 h-8 rounded-lg bg-[#ff1361] border border-black flex items-center justify-center text-white">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              Spider-Society Citadel
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40">
                {sceneState === "hub"
                  ? "HUB ORBIT"
                  : sceneState === "character-active"
                  ? "IDENTITY ACTIVE"
                  : "APPROACH"}
              </span>
            </h1>
            <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
              Go-Home Machine Dimensional Nexus
            </p>
          </div>
        </div>

        {/* Station Quick Selector Dropdown & Return Action */}
        <div className="flex items-center gap-2">
          {/* Accessible HTML Station Select Dropdown */}
          <div className="relative">
            <select
              aria-label="Select Spider-Person Station"
              className="bg-[#12121c]/90 text-white text-xs font-bold py-2 px-3 pr-8 rounded-lg border border-[#2e2e42] focus:border-[#00e5ff] focus:outline-none appearance-none cursor-pointer shadow-[2px_2px_0px_#000]"
              value={selectedStation?.slug || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  onReturnToHub();
                } else {
                  const target = MULTIVERSE_STATIONS.find((s) => s.slug === val);
                  if (target) onSelectStation(target);
                }
              }}
            >
              <option value="">Overview: Multiverse Hub</option>
              {MULTIVERSE_STATIONS.map((station) => (
                <option key={station.slug} value={station.slug}>
                  {station.name} ({station.universeLabel})
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              ▼
            </div>
          </div>

          {/* Persistent Return to Hub Button */}
          {selectedStation && (
            <button
              onClick={onReturnToHub}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a28] hover:bg-[#252538] text-white text-xs font-bold rounded-lg border border-[#3a3a50] transition-colors shadow-[2px_2px_0px_#000]"
              title="Return to Hub Orbit (Esc)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span className="hidden sm:inline">Hub View</span>
            </button>
          )}

          <Link
            href="/explore"
            className="flex items-center gap-1 px-3 py-2 bg-[#ff1361] hover:bg-[#e0004d] text-white text-xs font-black uppercase rounded-lg border-2 border-black transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0px_#000]"
          >
            <span className="hidden sm:inline">Gallery</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Middle Station Navigation Arrows (when in hub or preview) */}
      {sceneState !== "character-active" && (
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center pointer-events-none px-2">
          <button
            onClick={handlePrev}
            className="pointer-events-auto p-2.5 sm:p-3 bg-[#0c0c14]/85 hover:bg-[#ff1361] text-white rounded-full border border-[#2e2e42] hover:border-black backdrop-blur-md transition-all shadow-[3px_3px_0px_#000] hover:scale-105"
            aria-label="Previous Spider Station"
            title="Previous Station (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="pointer-events-auto p-2.5 sm:p-3 bg-[#0c0c14]/85 hover:bg-[#00e5ff] hover:text-black text-white rounded-full border border-[#2e2e42] hover:border-black backdrop-blur-md transition-all shadow-[3px_3px_0px_#000] hover:scale-105"
            aria-label="Next Spider Station"
            title="Next Station (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}

      {/* Bottom Area: Character Preview Panel (HTML Overlay) */}
      {isPreviewing && selectedStation && (
        <div className="w-full max-w-2xl mx-auto pointer-events-auto animate-fade-up">
          <div
            className="bg-[#0c0c16]/95 border-2 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-[8px_8px_0px_#000] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative overflow-hidden"
            style={{ borderColor: selectedStation.accentColor }}
          >
            {/* Top decorative badge */}
            <div
              className="absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black rounded-bl-lg"
              style={{ backgroundColor: selectedStation.accentColor }}
            >
              Station {currentIndex + 1} of 8
            </div>

            {/* Character Portrait */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-black flex-shrink-0 shadow-[4px_4px_0px_#000] bg-[#141420]">
              <Image
                src={selectedStation.standeeImage}
                alt={selectedStation.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            {/* Information & Action Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                  {selectedStation.universeLabel}
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  {selectedStation.alias}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                {selectedStation.name}
              </h2>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                {selectedStation.interactionDescription}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={onBecomeCharacter}
                  className="px-5 py-2.5 text-white font-black uppercase text-xs tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-2"
                  style={{ backgroundColor: selectedStation.accentColor }}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Become this Spider</span>
                </button>

                <Link
                  href={`/characters/${selectedStation.slug}`}
                  className="px-4 py-2 bg-[#1b1b28] hover:bg-[#252538] text-white text-xs font-bold rounded-xl border border-[#3e3e56] transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>Full Dossier</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Keyboard Shortcuts Helper (when in Hub) */}
      {!selectedStation && (
        <div className="w-full text-center pointer-events-auto">
          <div className="inline-flex items-center gap-4 bg-[#0a0a12]/80 border border-[#222234] px-4 py-2 rounded-full backdrop-blur-md text-[11px] font-mono text-gray-400 shadow-[2px_2px_0px_#000]">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                ←
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                →
              </kbd>
              Cycle Stations
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              Click any Pedestal to Approach
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
