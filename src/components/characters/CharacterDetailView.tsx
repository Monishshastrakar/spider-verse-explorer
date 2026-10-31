"use client";

import React from "react";
import Link from "next/link";
import { Character } from "@/types/character";
import { AnimatedWeb } from "@/components/graphics/AnimatedWeb";
import { MultiverseJumpLink } from "@/components/motion/MultiverseTransition";
import {
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Activity,
  Globe,
  Quote,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

interface CharacterDetailViewProps {
  character: Character;
  relatedCharacters: Character[];
  returnQueryString?: string;
}

export function CharacterDetailView({
  character,
  relatedCharacters,
  returnQueryString = "",
}: CharacterDetailViewProps) {
  const returnUrl = `/explore${returnQueryString ? `?${returnQueryString}` : ""}`;

  return (
    <div className="relative min-h-screen bg-[#07070a] pt-32 md:pt-36 pb-24 overflow-hidden">
      {/* Background Spider Web Canvas */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <AnimatedWeb
          particleColor={character.accentColor}
          lineColor={character.secondaryColor}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={returnUrl}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0e0e16] text-gray-300 text-xs font-bold uppercase tracking-wider rounded-lg border-2 border-[#1f1f2e] hover:border-[#00e5ff] hover:text-white shadow-[3px_3px_0px_#000] transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#ff1361]" />
            <span>Back to Explore Registry</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500">
            <span>COORDINATES:</span>
            <span className="text-[#00e5ff] font-bold">{character.universeId.toUpperCase()}</span>
          </div>
        </div>

        {/* Main Character Hero Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Portrait & Stats (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Comic Frame Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#0e0e16] border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000] overflow-hidden"
              style={{
                boxShadow: `8px 8px 0px ${character.accentColor}`,
              }}
            >
              <div className="absolute inset-0 comic-halftone opacity-25 pointer-events-none" />

              <div className="relative z-10 w-full aspect-square max-w-[340px] mx-auto rounded-2xl overflow-hidden border-2 border-white/10 bg-[#07070a] flex items-center justify-center">
                <img
                  src={character.image}
                  alt={character.imageAlt}
                  width={340}
                  height={340}
                  loading="eager"
                  style={{ objectPosition: character.objectPosition || "center 35%" }}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Character Quote Box */}
              {character.quote && (
                <div className="relative mt-6 p-4 bg-[#141420] border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
                  <Quote className="w-5 h-5 text-[#ff1361] mb-1 opacity-70" />
                  <p className="text-xs md:text-sm italic text-gray-200 leading-relaxed font-serif">
                    "{character.quote}"
                  </p>
                </div>
              )}
            </motion.div>

            {/* Combat & Physiological Attributes Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[#0e0e16] border-2 border-[#1f1f2e] rounded-2xl p-6 shadow-[4px_4px_0px_#000]"
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-[#00e5ff] mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>Dimensional Combat Analysis</span>
              </h3>

              <div className="space-y-3.5">
                {[
                  { label: "Strength", value: character.stats.strength, color: "#ff1361" },
                  { label: "Agility & Speed", value: character.stats.speed, color: "#00e5ff" },
                  { label: "Tactical Intelligence", value: character.stats.intelligence, color: "#ffe600" },
                  { label: "Durability", value: character.stats.durability, color: "#00e676" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                      <span>{stat.label}</span>
                      <span className="font-mono">{stat.value} / 100</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#161622] rounded-full border border-black/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: stat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Lore, Powers, Traits, & Related (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Header / Identity Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white border-2 border-black shadow-[2px_2px_0px_#000]"
                  style={{ backgroundColor: character.accentColor }}
                >
                  {character.universeLabel}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>First Debut: {character.firstAppearance}</span>
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
                {character.name}
              </h1>
              <p
                className="text-lg md:text-xl font-bold tracking-wide uppercase mt-2 italic"
                style={{ color: character.accentColor }}
              >
                {character.alias}
              </p>
            </div>

            {/* Biography & Canonical History */}
            <div className="bg-[#0e0e16] border-2 border-[#1f1f2e] rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_#000]">
              <h2 className="text-sm font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff1361]" />
                <span>Canonical Dossier & Origin</span>
              </h2>
              <p className="text-base text-gray-300 leading-relaxed font-normal">
                {character.biography}
              </p>
            </div>

            {/* Powers and Abilities */}
            <div className="bg-[#0e0e16] border-2 border-[#1f1f2e] rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_#000]">
              <h2 className="text-sm font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ffe600]" />
                <span>Powers & Combat Mastery</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {character.powers.map((power) => (
                  <div
                    key={power}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#141420] border border-[#262638] text-sm text-gray-200"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: character.accentColor }}
                    />
                    <span className="font-semibold">{power}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinctive Traits & Quirks */}
            <div className="bg-[#0e0e16] border-2 border-[#1f1f2e] rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_#000]">
              <h2 className="text-sm font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00e5ff]" />
                <span>Distinctive Visual Traits & Technology</span>
              </h2>

              <ul className="space-y-2.5">
                {character.traits.map((trait) => (
                  <li key={trait} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5ff] flex-shrink-0 mt-0.5" />
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Spider-People Links */}
            {relatedCharacters.length > 0 && (
              <div className="bg-[#0e0e16] border-2 border-[#1f1f2e] rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_#000]">
                <h2 className="text-sm font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#ff1361]" />
                  <span>Multiversal Network (Related Characters)</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCharacters.map((rel) => (
                    <MultiverseJumpLink
                      key={rel.id}
                      character={rel}
                      targetUrl={`/characters/${rel.slug}${
                        returnQueryString ? `?${returnQueryString}` : ""
                      }`}
                      className="group p-3.5 rounded-xl bg-[#141420] border-2 border-[#262638] hover:border-[#00e5ff] flex flex-col justify-between transition-all shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#00e5ff]"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#00e5ff]">
                          {rel.universeLabel}
                        </span>
                        <h4 className="text-sm font-black text-white uppercase group-hover:text-[#00e5ff] transition-colors leading-tight mt-0.5">
                          {rel.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 group-hover:text-white mt-3 inline-flex items-center gap-1">
                        Jump to Dossier →
                      </span>
                    </MultiverseJumpLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
