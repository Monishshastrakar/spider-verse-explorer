"use client";

import { notFound } from "next/navigation";
import { spiderPeople } from "@/data/spider-people";
import { Container } from "@/components/common/Container";
import { SpiderPortrait } from "@/components/detail/SpiderPortrait";
import { PowerList } from "@/components/detail/PowerList";
import { ScrollReveal } from "@/components/hero/ScrollReveal";
import { WebCanvas } from "@/components/hero/WebCanvas";
import { SpiderWeb3D } from "@/components/bonus/SpiderWeb3D";
import { getUniverseColor } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DetailContent({ slug }: { slug: string }) {
  const person = spiderPeople.find((p) => p.slug === slug);
  if (!person) notFound();

  const color = getUniverseColor(person.universeKey);
  const [jumpComplete, setJumpComplete] = useState(false);

  useEffect(() => {
    // Simulate multiverse jump completion
    const timer = setTimeout(() => setJumpComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <WebCanvas className="inset-0 w-full h-full" />
      <SpiderWeb3D className="inset-0 w-full h-full -z-10" />

      <Container>
        <nav className="flex items-center gap-2 mb-12 mt-4">
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent-cyan transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>
        </nav>

        <ScrollReveal className="mb-16">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3 flex flex-col items-center">
              <SpiderPortrait svg={person.portraitSvg} color={color} />
              <div className="mt-6 px-4 py-2 rounded-full bg-surface border border-border inline-block">
                <span className="text-xs font-bold uppercase tracking-widest text-accent-magenta">
                  {person.universe}
                </span>
              </div>
            </div>

            <div className="lg:w-2/3 flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-none mb-4"
                  >
                    {person.name}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl text-accent-cyan font-medium italic mb-2"
                  >
                    {person.alias}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-2 text-xs text-gray-500 font-geist uppercase tracking-wider mb-8"
                  >
                    <Globe className="w-3 h-3" />
                    <span>First appeared: {person.firstAppearance}</span>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-6 border-t border-border"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-magenta" />
                  Powers & Abilities
                </h3>
                <PowerList powers={person.powers} color={color} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-6 border-t border-border"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  About
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg max-w-xl">
                  {person.description}
                </p>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      <footer className="border-t border-border bg-surface/80 backdrop-blur py-8">
        <Container>
          <p className="text-center text-xs text-gray-600 font-geist">
            Explore more dimensions →
          </p>
        </Container>
      </footer>
    </div>
  );
}