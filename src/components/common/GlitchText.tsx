"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlitchText({ children, className, delay = 0 }: GlitchTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(
        "relative inline-block",
        className
      )}
    >
      <span className="absolute inset-0 text-accent-magenta opacity-0 animate-[chromatic-shift_0.5s_infinite] pointer-events-none" />
      <span className="absolute inset-0 text-accent-cyan opacity-0 animate-[chromatic-shift_0.5s_infinite] pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );
}

function cn(...classes: (string | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}