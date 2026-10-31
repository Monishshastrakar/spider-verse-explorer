"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { MultiverseStationConfig } from "@/data/multiverse-stations";
import { Zap, RotateCcw, Shield, Users, Radio, Sparkles } from "lucide-react";

interface ActiveCharacterHUDProps {
  character: MultiverseStationConfig;
  onTriggerPower: () => void;
  powerActive: boolean;
  onReturnToHub: () => void;
  onOpenStationPicker: () => void;
}

export function ActiveCharacterHUD({
  character,
  onTriggerPower,
  powerActive,
  onReturnToHub,
  onOpenStationPicker
}: ActiveCharacterHUDProps) {
  const [pulseCount, setPulseCount] = useState(0);

  const handleActivatePower = () => {
    setPulseCount((prev) => prev + 1);
    onTriggerPower();
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      {/* Dynamic Screen Filter for Noir or Powers */}
      {character.slug === "spider-man-noir" && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color z-0 transition-opacity duration-700 bg-white"
          style={{ opacity: 0.92 }}
        />
      )}

      {/* Interactive Power Visual Overlay */}
      {powerActive && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center animate-glow-pulse">
          {character.interactionType === "venom-pulse" && (
            <div className="relative w-72 h-72 rounded-full border-4 border-[#ffe600] animate-ping opacity-75 shadow-[0_0_50px_#ffe600]" />
          )}

          {character.interactionType === "scan-interface" && (
            <div className="absolute inset-0 border-y-4 border-[#d50000] bg-[#d50000]/10 flex flex-col justify-center items-center">
              <div className="text-[#00e5ff] font-mono text-sm tracking-widest uppercase bg-black/80 px-4 py-1 border border-[#00e5ff]">
                ALCHEMAX CANON LOCK // ANOMALY SCAN 100%
              </div>
            </div>
          )}

          {character.interactionType === "punk-chord" && (
            <div className="absolute inset-0 flex items-center justify-center font-black text-6xl sm:text-8xl text-[#ffe600] uppercase tracking-tighter rotate-[-6deg] drop-shadow-[5px_5px_0px_#ff1361]">
              ANARCHY!!
            </div>
          )}

          {character.interactionType === "mandala-spin" && (
            <div className="w-80 h-80 rounded-full border-4 border-dashed border-[#ff9800] animate-spin-slow shadow-[0_0_60px_#ff9800]" />
          )}

          {character.interactionType === "cockpit-sync" && (
            <div className="absolute inset-6 border-2 border-[#00e5ff] rounded-3xl flex items-end p-4">
              <span className="font-mono text-xs text-[#00e5ff] bg-black/70 px-2 py-1">
                SP//dr TELEPATHIC SYNC RATE: 99.8% // COCKPIT ONLINE
              </span>
            </div>
          )}

          {character.interactionType === "web-ribbon" && (
            <div className="w-96 h-96 rounded-full border-2 border-[#00e5ff] animate-ping opacity-60 shadow-[0_0_80px_#ff4081]" />
          )}

          {character.interactionType === "classic-thwip" && (
            <div className="font-black text-5xl text-[#e52521] uppercase tracking-widest drop-shadow-[4px_4px_0px_#000]">
              *THWIP!*
            </div>
          )}
        </div>
      )}

      {/* Top HUD Identity Banner */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <div
          className="flex items-center gap-3 bg-[#0a0a14]/90 border-2 rounded-2xl px-4 py-2.5 backdrop-blur-xl shadow-[5px_5px_0px_#000]"
          style={{ borderColor: character.accentColor }}
        >
          {/* Avatar Thumbnail */}
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-black bg-black">
            <Image
              src={character.standeeImage}
              alt={character.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white/10 rounded text-gray-300">
                ACTIVE AVATAR
              </span>
              <span className="text-[10px] font-black uppercase text-gray-400">
                {character.universeLabel}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-none">
              {character.name}
            </h2>
          </div>
        </div>

        {/* Quick Nav Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStationPicker}
            className="px-3 py-2 bg-[#141422] hover:bg-[#202034] text-white text-xs font-bold rounded-xl border border-[#303048] flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
          >
            <Users className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span className="hidden sm:inline">Switch Spider</span>
          </button>

          <button
            onClick={onReturnToHub}
            className="px-3 py-2 bg-[#ff1361] hover:bg-[#d60047] text-white text-xs font-black uppercase rounded-xl border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Return to Hub</span>
          </button>
        </div>
      </div>

      {/* Bottom Character Action Bar & Power Trigger */}
      <div className="w-full max-w-xl mx-auto pointer-events-auto animate-fade-up">
        <div className="bg-[#0c0c16]/95 border-2 border-[#2a2a3e] rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-[8px_8px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#00e5ff] flex items-center justify-center sm:justify-start gap-1">
              <Radio className="w-3 h-3 text-[#ff1361] animate-pulse" />
              <span>Interactive Ability Ready</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
              {character.interactionName}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-1">
              {character.ambientTrackNote}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleActivatePower}
              disabled={powerActive}
              className="flex-1 sm:flex-initial px-5 py-3 text-white font-black uppercase text-xs tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-2 active:scale-95"
              style={{
                backgroundColor: character.accentColor,
                opacity: powerActive ? 0.7 : 1
              }}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{powerActive ? "Activating..." : "Execute Power"}</span>
            </button>

            <Link
              href={`/characters/${character.slug}`}
              className="px-3.5 py-3 bg-[#181826] hover:bg-[#252538] text-white text-xs font-bold rounded-xl border border-[#3e3e56] transition-colors flex items-center justify-center"
              title="Inspect Full Character Dossier"
            >
              <Shield className="w-4 h-4 text-[#00e5ff]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
