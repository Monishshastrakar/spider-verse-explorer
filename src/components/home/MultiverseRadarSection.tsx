"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CHARACTERS } from "@/data/characters";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MultiverseJumpLink } from "@/components/motion/MultiverseTransition";
import { Globe, Radio, Shield, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MultiverseRadarSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeChar = CHARACTERS[selectedIdx];

  return (
    <section id="lore" className="py-24 bg-[#07070a] border-t-2 border-[#1f1f2e] relative overflow-hidden">
      {/* Background Halftone */}
      <div className="absolute inset-0 comic-halftone opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe600]/15 border border-[#ffe600]/40 text-[#ffe600] text-xs font-black uppercase tracking-widest mb-3 shadow-[2px_2px_0px_#000]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Dimension Scanner</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              Multiverse <span className="text-[#00e5ff]">Nexus Lore</span>
            </h2>
            <p className="text-sm md:text-base text-gray-400 mt-2 leading-relaxed">
              Select any Earth coordinate to scan its quantum frequency, canonical guardian, and dimensional attributes.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Dimension Selector Bar */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 max-w-4xl mx-auto">
            {CHARACTERS.map((char, index) => {
              const isSelected = selectedIdx === index;
              return (
                <button
                  key={char.id}
                  onClick={() => setSelectedIdx(index)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer shadow-[3px_3px_0px_#000] ${
                    isSelected
                      ? "bg-[#ff1361] text-white border-black shadow-[4px_4px_0px_#00e5ff] -translate-y-0.5"
                      : "bg-[#0e0e16] text-gray-400 border-[#1f1f2e] hover:text-white hover:border-[#00e5ff]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {char.universeLabel}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Universe Quantum Scanner Card */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto bg-[#0e0e16] border-4 border-black rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_#000] relative overflow-hidden"
            style={{
              borderColor: "#1f1f2e",
              boxShadow: `6px 6px 0px ${activeChar.accentColor}`,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Side: Avatar Illustration */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="w-52 h-52 rounded-2xl overflow-hidden bg-[#07070a] border-2 border-white/10 shadow-[4px_4px_0px_#000] p-2 flex items-center justify-center">
                  <img
                    src={activeChar.image}
                    alt={activeChar.imageAlt}
                    width={208}
                    height={208}
                    loading="lazy"
                    style={{ objectPosition: activeChar.objectPosition || "center 35%" }}
                    className="w-full h-full object-cover rounded-xl transform transition-transform hover:scale-105"
                  />
                </div>
                <span
                  className="mt-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white border border-black shadow-[2px_2px_0px_#000]"
                  style={{ backgroundColor: activeChar.accentColor }}
                >
                  {activeChar.universeLabel}
                </span>
              </div>

              {/* Right Side: Data Breakdown */}
              <div className="md:col-span-7 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00e5ff] uppercase tracking-widest mb-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Resonance Scan: VERIFIED CANON</span>
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                    {activeChar.name}
                  </h3>
                  <p className="text-sm font-bold text-gray-400 uppercase italic mb-3">
                    {activeChar.alias}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {activeChar.shortDescription}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141420] border border-[#232338]">
                  <div className="text-[11px] font-mono text-gray-400 uppercase mb-1">
                    Signature Abilities
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeChar.powers.slice(0, 3).map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#1b1b2a] text-gray-200 border border-[#2c2c42]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <MultiverseJumpLink
                    character={activeChar}
                    targetUrl={`/characters/${activeChar.slug}`}
                    className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#00e5ff] flex items-center gap-2 transition-all"
                    style={{ backgroundColor: activeChar.accentColor }}
                  >
                    <span>Jump to {activeChar.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </MultiverseJumpLink>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
