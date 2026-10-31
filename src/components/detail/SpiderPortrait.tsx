"use client";

import { motion } from "framer-motion";

interface SpiderPortraitProps {
  svg: string;
  color: string;
  className?: string;
}

export function SpiderPortrait({ svg, color, className }: SpiderPortraitProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative w-48 h-48 rounded-full flex items-center justify-center mx-auto border-4 border-white/10 shadow-2xl",
        className
      )}
      style={{ backgroundColor: color }}
    >
      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-magenta to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 w-40 h-40 rounded-full flex items-center justify-center overflow-hidden border border-white/20">
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}