"use client";

import React from "react";
import Link from "next/link";
import { CHARACTERS } from "@/data/characters";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

export function FeaturedSection() {
  // Highlight Miles, Gwen, and Miguel as primary featured anchors
  const featuredCharacters = [CHARACTERS[0], CHARACTERS[2], CHARACTERS[3]];

  return (
    <section id="featured" className="py-24 bg-[#07070a] relative overflow-hidden">
      {/* Background Halftone subtle pattern */}
      <div className="absolute inset-0 comic-halftone opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff1361]/15 border border-[#ff1361]/40 text-[#ff1361] text-xs font-black uppercase tracking-widest mb-3 shadow-[2px_2px_0px_#000]">
                <Flame className="w-3.5 h-3.5" />
                <span>Core Dimensional Anchors</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                Featured <span className="text-[#00e5ff]">Spider-Heroes</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 mt-2 max-w-lg leading-relaxed">
                Key figures across the multiverse who crossed dimensional boundaries and changed the course of destiny.
              </p>
            </div>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0e0e16] text-[#00e5ff] text-xs font-black uppercase tracking-wider rounded-lg border-2 border-[#1f1f2e] hover:border-[#00e5ff] hover:text-white shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#00e5ff] transition-all self-start md:self-auto"
            >
              <span>View Full Registry (8+ Heroes)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCharacters.map((char, index) => (
            <ScrollReveal key={char.id} delay={index * 0.12}>
              <CharacterCard character={char} featured={true} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
