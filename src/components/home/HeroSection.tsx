"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedWeb } from "@/components/graphics/AnimatedWeb";
import { MultiversePortalFallback } from "@/components/graphics/MultiversePortal3D";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { CHARACTERS } from "@/data/characters";

// Dynamically load 3D Multiverse Portal to optimize initial load time
const MultiversePortal3D = dynamic(
  () => import("@/components/graphics/MultiversePortal3D"),
  {
    ssr: false,
    loading: () => <MultiversePortalFallback className="absolute inset-0 z-0" />,
  }
);

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const previewCharacters = [CHARACTERS[0], CHARACTERS[2], CHARACTERS[3]]; // Miles, Gwen, Miguel

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 px-4"
      aria-label="Hero section: One Multiverse. Infinite Spider-People."
    >
      {/* 3D Multiverse Portal (Dynamic Three.js layer) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-70">
        <MultiversePortal3D className="w-full h-full" />
      </div>

      {/* Background Interactive Spider Web Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <AnimatedWeb particleColor="#ff1361" lineColor="#00e5ff" interactive={true} />
      </div>

      {/* Radial Comic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07070a]/60 to-[#07070a] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff1361]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[450px] h-[450px] bg-[#00e5ff]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="container mx-auto relative z-10 text-center max-w-5xl">
        {/* Animated Comic Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e0e16] border-2 border-black text-[#00e5ff] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#ff1361] mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ff1361] animate-spin" style={{ animationDuration: "6s" }} />
          <span>The Web of Life & Destiny</span>
        </motion.div>

        {/* Main Editorial Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.95] mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
        >
          One <span className="text-[#00e5ff]">Multiverse.</span>
          <br />
          Infinite <span className="text-[#ff1361]">Spider-People.</span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
        >
          Traverse dimensional rifts, track canonical anomalies across the Spider-Society, and meet the heroes anchoring every reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 relative z-20"
        >
          <Link
            href="/explore"
            className="w-full sm:w-auto px-8 py-4 bg-[#ff1361] text-white text-sm font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#00e5ff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 focus-visible:outline-2 focus-visible:outline-[#00e5ff]"
          >
            <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Enter the Spider-Verse</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <a
            href="#featured"
            className="w-full sm:w-auto px-7 py-4 bg-[#0e0e16] text-white text-sm font-bold uppercase tracking-wider rounded-xl border-2 border-[#232338] hover:border-white shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span>Meet Featured Heroes</span>
          </a>
        </motion.div>

        {/* Layered Floating Comic Preview Panels with Custom Focal Point */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-3xl mx-auto mt-4 pt-2 z-10"
        >
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {previewCharacters.map((char, index) => {
              const offsets = ["md:-rotate-2", "md:rotate-0", "md:rotate-2"];
              return (
                <Link
                  key={char.id}
                  href={`/characters/${char.slug}`}
                  className={`group relative bg-[#0e0e16] border-2 border-[#1f1f2e] hover:border-[#00e5ff] rounded-2xl p-3 md:p-4 shadow-[4px_4px_0px_#000] transition-all transform hover:-translate-y-2 ${offsets[index]}`}
                  style={{
                    boxShadow: `4px 4px 0px ${char.accentColor}`,
                  }}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#07070a] border border-white/10 mb-2.5">
                    <img
                      src={char.image}
                      alt={char.imageAlt}
                      width={180}
                      height={180}
                      loading="lazy"
                      style={{ objectPosition: char.objectPosition || "center 35%" }}
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase text-[#00e5ff] block truncate">
                      {char.universeLabel}
                    </span>
                    <h4 className="text-xs md:text-sm font-black text-white uppercase truncate">
                      {char.name}
                    </h4>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="text-xs font-mono text-gray-500 mt-6 uppercase tracking-wider">
            ✦ Real-time Multiverse Synchronizer Active • 8 Core Universes Tracked ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
}
