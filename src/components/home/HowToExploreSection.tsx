"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Compass, Filter, Zap, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function HowToExploreSection() {
  const steps = [
    {
      step: "01",
      icon: Filter,
      title: "Dial Universe Frequencies",
      description:
        "Filter between Earth-1610, Earth-65, Earth-138, and beyond. Every filter choice instantly updates and syncs to your browser URL for easy bookmarking and sharing.",
      color: "#ff1361",
    },
    {
      step: "02",
      icon: Zap,
      title: "Sort Canonical Anomalies",
      description:
        "Organize the Spider-Society directory alphabetically. Your sorting state remains intact through browser refresh and back/forward navigation.",
      color: "#00e5ff",
    },
    {
      step: "03",
      icon: Compass,
      title: "Initiate Multiverse Jumps",
      description:
        "Click any character to trigger an expanding radial comic portal with chromatic glitch accents, safely transporting you to that Spider-Hero's dimension.",
      color: "#ffe600",
    },
    {
      step: "04",
      icon: ShieldCheck,
      title: "Analyze Classified Dossiers",
      description:
        "Inspect in-depth comic biographies, physiological combat analysis stats, powers breakdown, and related multiversal relationships.",
      color: "#00e676",
    },
  ];

  return (
    <section id="how-to-explore" className="py-24 bg-[#0a0a10] border-t-2 border-[#1f1f2e] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff] text-xs font-black uppercase tracking-widest mb-3 shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guide to the Multiverse</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              How to Explore the <span className="text-[#ff1361]">Spider-Verse</span>
            </h2>
            <p className="text-sm md:text-base text-gray-400 mt-2 leading-relaxed">
              Equip yourself with the tools of the Spider-Society to navigate through infinite dimensions without causing a canon disruption.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Comic Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div
                  className="group relative h-full bg-[#0e0e16] border-2 border-[#1f1f2e] hover:border-[#00e5ff] rounded-2xl p-6 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all hover:-translate-y-1 flex flex-col justify-between"
                  style={{
                    borderColor: "#1f1f2e",
                  }}
                >
                  <div>
                    {/* Step Number and Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="text-2xl font-black font-mono tracking-tighter"
                        style={{ color: item.color }}
                      >
                        {item.step}
                      </span>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000]"
                        style={{ backgroundColor: `${item.color}25`, borderColor: item.color }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1a1a28] flex items-center gap-1.5 text-xs font-mono text-gray-500 group-hover:text-[#00e5ff] transition-colors">
                    <span>STATUS: READY</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Action Link to Explore */}
        <ScrollReveal delay={0.4}>
          <div className="mt-14 text-center">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ff1361] text-white text-xs font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#00e5ff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <span>Launch Gallery Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
