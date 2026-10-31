"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { gameStore, type PlayableCharacterId } from "../game/GameState";
import { MULTIVERSE_STATIONS } from "@/data/multiverse-stations";
import {
  Compass,
  RotateCcw,
  Zap,
  HelpCircle,
  ExternalLink,
  Keyboard,
  X
} from "lucide-react";

export function GameHUD() {
  const [activeAvatar, setActiveAvatar] = useState(gameStore.state.activeAvatar);
  const [nearbySlug, setNearbySlug] = useState(gameStore.state.nearbyStationSlug);
  const [cooldown, setCooldown] = useState(gameStore.state.abilityCooldown);
  const [abilityActive, setAbilityActive] = useState(gameStore.state.abilityActive);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    return gameStore.subscribe(() => {
      setActiveAvatar(gameStore.state.activeAvatar);
      setNearbySlug(gameStore.state.nearbyStationSlug);
      setCooldown(gameStore.state.abilityCooldown);
      setAbilityActive(gameStore.state.abilityActive);
    });
  }, []);

  const activeStation = MULTIVERSE_STATIONS.find((s) => s.slug === activeAvatar);
  const nearbyStation = MULTIVERSE_STATIONS.find((s) => s.slug === nearbySlug);

  const handleReturnToCivilian = () => {
    gameStore.setIsTransforming(true);
    setTimeout(() => {
      gameStore.setActiveAvatar("civilian");
      gameStore.setIsTransforming(false);
    }, 350);
  };

  const handleOpenPreview = () => {
    if (nearbySlug) {
      gameStore.setPreviewStationSlug(nearbySlug);
    }
  };

  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto w-full max-w-7xl mx-auto">
          {/* Active Identity Badge */}
          <div className="flex items-center gap-3 bg-[#0a0a12]/90 border border-[#2a2a3e] px-4 py-2 rounded-2xl backdrop-blur-md shadow-[4px_4px_0px_#000]">
            <div
              className="w-8 h-8 rounded-lg border border-black flex items-center justify-center text-white"
              style={{
                backgroundColor: activeStation ? activeStation.accentColor : "#4a5568"
              }}
            >
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-[#00e5ff] font-bold">
                  {activeAvatar === "civilian" ? "CIVILIAN VISITOR" : "ACTIVE SPIDER-HERO"}
                </span>
                {activeStation && (
                  <span className="text-[10px] font-mono text-gray-400">
                    {activeStation.universeLabel}
                  </span>
                )}
              </div>
              <h1 className="text-sm sm:text-base font-black uppercase text-white tracking-tight">
                {activeStation ? activeStation.name : "Civilian Explorer"}
              </h1>
            </div>
          </div>

          {/* Quick HUD Navigation Actions */}
          <div className="flex items-center gap-2">
            {/* Return to Civilian Form Button */}
            {activeAvatar !== "civilian" && (
              <button
                onClick={handleReturnToCivilian}
                className="px-3.5 py-2 bg-[#1c1c2c] hover:bg-[#28283e] text-white text-xs font-bold rounded-xl border border-[#3e3e56] shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-all"
                title="Revert back to Civilian avatar"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span className="hidden sm:inline">Civilian Form</span>
              </button>
            )}

            {/* Controls Guide Modal Button */}
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 sm:px-3 sm:py-2 bg-[#12121e] hover:bg-[#1e1e2e] text-gray-300 hover:text-white text-xs font-bold rounded-xl border border-[#2e2e42] shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
              aria-label="Controls Guide"
            >
              <HelpCircle className="w-4 h-4 text-[#ffe600]" />
              <span className="hidden sm:inline">Controls</span>
            </button>

            <Link
              href="/explore"
              className="px-3.5 py-2 bg-[#ff1361] hover:bg-[#e0004d] text-white text-xs font-black uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 hover:-translate-y-0.5 transition-all"
            >
              <span className="hidden sm:inline">Exit to Gallery</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Center-Bottom: Proximity Interaction Prompt */}
        {nearbyStation && (
          <div className="w-full max-w-md mx-auto pointer-events-auto animate-bounce-subtle">
            <button
              onClick={handleOpenPreview}
              className="w-full p-4 rounded-2xl bg-[#0c0c16]/95 border-2 text-white shadow-[6px_6px_0px_#000] backdrop-blur-xl flex items-center justify-between gap-3 hover:scale-102 transition-transform"
              style={{ borderColor: nearbyStation.accentColor }}
            >
              <div className="flex items-center gap-3 text-left">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-black border border-black shadow-[2px_2px_0px_#000]"
                  style={{ backgroundColor: nearbyStation.accentColor }}
                >
                  E
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">
                    Station Proximity Detected
                  </span>
                  <span className="text-sm font-black uppercase text-white">
                    Become {nearbyStation.name}
                  </span>
                </div>
              </div>

              <div
                className="px-3 py-1.5 rounded-lg text-xs font-black uppercase text-black"
                style={{ backgroundColor: nearbyStation.accentColor }}
              >
                Interact
              </div>
            </button>
          </div>
        )}

        {/* Bottom Bar: Ability Trigger (if transformed) + Desktop Keyboard Helper */}
        <div className="w-full max-w-7xl mx-auto flex items-end justify-between pointer-events-auto gap-4">
          {/* Desktop Controls Helper Bar */}
          <div className="hidden sm:flex items-center gap-3 bg-[#0a0a14]/85 border border-[#222234] px-4 py-2 rounded-xl backdrop-blur-md text-[11px] font-mono text-gray-300 shadow-[3px_3px_0px_#000]">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                W
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                A
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                S
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                D
              </kbd>
              Move
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                Shift
              </kbd>
              Run
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                Space
              </kbd>
              Jump
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#181826] text-white rounded border border-[#333348]">
                E
              </kbd>
              Interact
            </span>
          </div>

          {/* Character Ability Trigger Button */}
          {activeStation && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => gameStore.triggerAbility()}
                disabled={cooldown > 0 || abilityActive}
                className="px-5 py-3 rounded-xl border-2 border-black text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_#000] active:scale-95 transition-all"
                style={{
                  backgroundColor: activeStation.accentColor,
                  opacity: cooldown > 0 ? 0.6 : 1
                }}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>
                  {abilityActive
                    ? "Active!"
                    : cooldown > 0
                    ? `Cooldown: ${cooldown.toFixed(1)}s`
                    : `${activeStation.interactionName} [Q]`}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Controls Help Modal */}
      {showHelp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up"
        >
          <div className="relative w-full max-w-md bg-[#0d0d18] border-2 border-[#00e5ff] rounded-2xl p-6 shadow-[8px_8px_0px_#000]">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white"
              aria-label="Close Help"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-[#00e5ff]">
              <Keyboard className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-tight text-white">
                Playable Controls Guide
              </h2>
            </div>

            <div className="space-y-3 text-xs text-gray-300 font-mono">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="font-bold text-white">WASD or Arrow Keys</span>
                <span className="text-[#00e5ff]">Walk in any direction</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="font-bold text-white">Left Shift</span>
                <span className="text-[#00e5ff]">Sprint / Run</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="font-bold text-white">Spacebar</span>
                <span className="text-[#00e5ff]">Jump</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="font-bold text-white">E Key</span>
                <span className="text-[#00e5ff]">Interact with Station / Transform</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="font-bold text-white">Q or F Key</span>
                <span className="text-[#00e5ff]">Trigger Character Ability</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="font-bold text-white">Mouse Drag / Swipe</span>
                <span className="text-[#00e5ff]">Orbit 3D Camera</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-bold text-white">Mobile Touch</span>
                <span className="text-[#00e5ff]">Virtual Joystick & Action Cluster</span>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full py-2.5 bg-[#00e5ff] text-black font-black uppercase text-xs tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]"
            >
              Got It, Let&apos;s Play
            </button>
          </div>
        </div>
      )}
    </>
  );
}
