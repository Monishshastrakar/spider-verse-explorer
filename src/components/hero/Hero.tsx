"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Sparkles } from "lucide-react";
import { WebCanvas } from "./WebCanvas";
import { SpiderWeb3D } from "../bonus/SpiderWeb3D";
import { GlitchText } from "../common/GlitchText";
import { cn } from "@/lib/utils";

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <WebCanvas className="inset-0 w-full h-full" />
      <SpiderWeb3D className="inset-0 w-full h-full -z-10" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <GlitchText className="text-xs font-geist tracking-widest text-accent-cyan uppercase mb-4 animate-[pulse-glow_3s_ease-in-out_infinite]">
            Spider-Verse Explorer
          </GlitchText>
        </motion.div>

        <motion.h1
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-tight mb-8"
        >
          Travel Across the<span className="text-accent-magenta"> Multiverse</span>
        </motion.h1>

        <motion.p
          variants={heroVariants}
          initial="hidden"
          animate={lineVariants.visible(0)}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light"
        >
          Meet the Spider-People across dimensions. Filter, explore, and jump into
          their worlds.
        </motion.p>

        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate={lineVariants.visible(1)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/gallery"
            className="group relative px-8 py-4 bg-accent-magenta text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(236,64,122,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore the Gallery <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-accent-cyan/20 group-hover:bg-accent-cyan/40 transition-all" />
          </Link>

          <Link
            href="#about"
            className="px-8 py-4 bg-surface text-white font-bold rounded-full border border-border transition-all hover:bg-surface/80 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              About
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate={lineVariants.visible(2)}
        className="relative z-10 mt-16 animate-bounce"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-12 rounded-full border border-border flex items-center justify-center">
            <div className="w-1.5 h-3 rounded-full bg-accent-cyan" />
          </div>
          <span className="text-xs font-geist text-gray-500 tracking-widest uppercase">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
}