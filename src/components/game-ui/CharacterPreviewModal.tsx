"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { MULTIVERSE_STATIONS } from "@/data/multiverse-stations";
import { CHARACTER_MODELS } from "@/data/character-models";
import { gameStore, type PlayableCharacterId } from "../game/GameState";
import { Zap, X, Shield } from "lucide-react";

interface CharacterPreviewModalProps {
  stationSlug: string;
  onClose: () => void;
}

export function CharacterPreviewModal({ stationSlug, onClose }: CharacterPreviewModalProps) {
  const station = MULTIVERSE_STATIONS.find((s) => s.slug === stationSlug);
  const modelConfig = CHARACTER_MODELS[stationSlug];
  const transformButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the Transform button for keyboard navigation
  useEffect(() => {
    transformButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!station) return null;

  const handleConfirmTransform = () => {
    // 1. Lock input
    gameStore.state.inputLocked = true;
    onClose();

    // 2. Play transformation effect on player
    gameStore.setIsTransforming(true);

    // 3. Swap playable avatar at same position and facing
    setTimeout(() => {
      gameStore.setActiveAvatar(station.slug as PlayableCharacterId);
      gameStore.setIsTransforming(false);
      gameStore.state.inputLocked = false;
    }, 450);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-up"
    >
      <div
        className="relative w-full max-w-lg bg-[#0c0c16] border-2 rounded-2xl p-5 sm:p-6 shadow-[10px_10px_0px_#000] overflow-hidden"
        style={{ borderColor: station.accentColor }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#181826] text-gray-300 hover:text-white border border-[#303046] transition-colors"
          aria-label="Cancel preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Character Standee Artwork Thumbnail */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-black bg-black flex-shrink-0 shadow-[4px_4px_0px_#000]">
            <Image
              src={station.standeeImage}
              alt={station.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                {station.universeLabel}
              </span>
              <span className="text-xs text-gray-400 font-bold">{station.alias}</span>
              {modelConfig?.modelStatus === "rigged-glb" ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                  RIGGED GLB
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  VERIFIED TEMPORARY
                </span>
              )}
            </div>

            <h2
              id="preview-title"
              className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white"
            >
              {station.name}
            </h2>

            <p className="text-xs text-gray-300 mt-1.5 leading-relaxed line-clamp-3">
              {station.interactionDescription}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-[#1e1e2e] flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-gray-300 bg-[#161622] hover:bg-[#202030] border border-[#2a2a3e] transition-colors"
          >
            Cancel (Esc)
          </button>

          <button
            ref={transformButtonRef}
            onClick={handleConfirmTransform}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: station.accentColor }}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Transform Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
