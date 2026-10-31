"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MULTIVERSE_STATIONS, type MultiverseStationConfig } from "@/data/multiverse-stations";
import { Compass, Shield, ArrowRight } from "lucide-react";

interface MultiverseFallbackProps {
  onSelectStation?: (station: MultiverseStationConfig) => void;
  error?: string;
}

export function MultiverseFallback({ onSelectStation, error }: MultiverseFallbackProps) {
  return (
    <div className="w-full min-h-screen bg-[#07070c] py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff1361]/20 border border-[#ff1361]/40 rounded-full text-[#ff1361] text-xs font-mono mb-6">
          <Compass className="w-3.5 h-3.5" />
          <span>2D Accessible Multiverse Fallback Mode</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
          Spider-Society Citadel
        </h1>
        <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
          {error ||
            "Your browser is running in high-accessibility or non-WebGL mode. You can still navigate and inspect all eight Spider-People stations below."}
        </p>

        {/* 8 Station Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {MULTIVERSE_STATIONS.map((station) => (
            <div
              key={station.id}
              className="bg-[#0f0f18] border-2 rounded-xl p-4 flex flex-col justify-between hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000]"
              style={{ borderColor: station.accentColor }}
            >
              <div>
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-black mb-3 bg-black">
                  <Image
                    src={station.standeeImage}
                    alt={station.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                  {station.universeLabel}
                </span>
                <h2 className="text-base font-black text-white uppercase mt-1">
                  {station.name}
                </h2>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {station.interactionDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1e1e2c] flex items-center justify-between">
                {onSelectStation ? (
                  <button
                    onClick={() => onSelectStation(station)}
                    className="text-xs font-bold text-white hover:underline flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href={`/characters/${station.slug}`}
                    className="text-xs font-bold text-white hover:underline flex items-center gap-1"
                  >
                    <span>Full Dossier</span>
                    <Shield className="w-3.5 h-3.5 text-[#00e5ff]" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff1361] text-white text-xs font-black uppercase rounded-xl border-2 border-black shadow-[4px_4px_0px_#000]"
          >
            <span>Browse Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
