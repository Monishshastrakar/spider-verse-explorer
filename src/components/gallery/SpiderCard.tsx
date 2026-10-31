"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SpiderPeople } from "@/data/spider-people";
import { getUniverseColor } from "@/lib/utils";

interface SpiderCardProps {
  person: SpiderPeople;
  isSelected?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function SpiderCard({ person, isSelected }: SpiderCardProps) {
  const color = getUniverseColor(person.universeKey);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "group relative bg-surface border border-border rounded-2xl overflow-hidden transition-all hover:border-accent-cyan/50 cursor-pointer",
        isSelected ? "border-accent-magenta shadow-[0_0_20px_rgba(236,64,122,0.3)]" : ""
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-32 h-32 rounded-full flex items-center justify-center mx-auto border-4 border-border group-hover:border-accent-cyan transition-colors"
            style={{ backgroundColor: person.color }}
          >
            <div
              className="absolute inset-0"
              dangerouslySetInnerHTML={{ __html: person.portraitSvg }}
            />
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-accent-magenta to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className={cn(
            "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
            "bg-black/60 backdrop-blur text-white border border-white/20"
          )}>
            {person.universe}
          </span>
        </div>
      </div>

      <div className="p-6">
        <motion.h3
          whileHover={{ color: color }}
          transition={{ duration: 0.2 }}
          className="text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors"
        >
          {person.name}
        </motion.h3>
        <p className="text-sm text-gray-400 mb-4 font-light italic">
          {person.alias}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {person.powers.map((power) => (
            <span
              key={power}
              className="px-2.5 py-1 rounded text-xs font-medium border border-border/50 bg-black/30 text-gray-300"
            >
              {power}
            </span>
          ))}
        </div>

        <Link
          href={`/spider-people/${person.slug}`}
          className="flex items-center justify-between w-full"
        >
          <span className="text-sm font-medium text-accent-magenta">
            Open Multiverse →
          </span>
          <div className="w-6 h-6 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs flex items-center justify-center group-hover:bg-accent-cyan group-hover:text-black transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5L6 15" />
            </svg>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}