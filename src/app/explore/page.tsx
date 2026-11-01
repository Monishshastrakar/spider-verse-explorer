import React, { Suspense } from "react";
import { Metadata } from "next";
import { CharacterGrid } from "@/components/characters/CharacterGrid";
import { AnimatedWeb } from "@/components/graphics/AnimatedWeb";
import { Sparkles, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Multiverse Gallery | Spider-Verse Explorer",
  description:
    "Explore the canonical Spider-Society directory across all dimensions. Filter by Earth universe designation and sort by hero identity.",
};

export default function ExplorePage() {
  return (
    <div className="relative min-h-screen bg-[#07070a] pt-32 md:pt-40 pb-16 overflow-hidden">
      {/* Background Interactive Spider Web Canvas */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <AnimatedWeb particleColor="#ff1361" lineColor="#00e5ff" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff1361]/15 border border-[#ff1361]/40 text-[#ff1361] text-xs font-black uppercase tracking-widest mb-4 shadow-[2px_2px_0px_#000]">
            <Compass className="w-3.5 h-3.5" />
            <span>Spider-Society Dimensional Index</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            Meet the <span className="text-[#ff1361]">Spider-People</span>
          </h1>
          <p className="text-base text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Every universe holds a hero who answered the call of great responsibility. Dial into any frequency or jump directly into their quantum dossier.
          </p>
        </div>

        {/* Character Grid with Suspense for SearchParams */}
        <Suspense
          fallback={
            <div className="p-16 text-center text-gray-400 font-mono text-sm">
              <div className="w-10 h-10 border-4 border-[#ff1361] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Scanning Multiverse Dimensions...
            </div>
          }
        >
          <CharacterGrid />
        </Suspense>
      </div>
    </div>
  );
}
