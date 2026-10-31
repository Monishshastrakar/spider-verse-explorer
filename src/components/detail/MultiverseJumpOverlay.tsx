"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MultiverseJumpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  color: string;
}

export function MultiverseJumpOverlay({ isOpen, onClose, color }: MultiverseJumpOverlayProps) {
  const reducedMotion = useReducedMotion();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    // Glitch effect during the jump
    const interval = setInterval(() => {
      setGlitch((prev) => !prev);
    }, 50);
    setTimeout(() => clearInterval(interval), 600);
  }, [isOpen]);

  const overlayVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "circOut" },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.4, ease: "circIn" },
    },
  };

  if (!isOpen && !glitch) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      onClick={onClose}
    >
      {/* Chromatic aberration glitch layers */}
      {glitch && !reducedMotion && (
        <>
          <div className="absolute inset-0 bg-red-500/20 mix-blend-screen animate-[chromatic-shift_0.3s_infinite]" />
          <div className="absolute inset-0 bg-cyan-500/20 mix-blend-screen animate-[chromatic-shift_0.3s_infinite]" style={{ animationDelay: "0.15s" }} />
        </>
      )}

      {/* Portal ring */}
      <motion.div
        animate={{
          rotate: [0, 360],
          transition: { repeat: Infinity, duration: 3, ease: "linear" },
        }}
        className="relative w-64 h-64 border-2 border-accent-magenta/50 rounded-full flex items-center justify-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          className="w-48 h-48 border-2 border-accent-cyan/50 rounded-full flex items-center justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-black/80 border border-accent-magenta/30 flex items-center justify-center overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {!reducedMotion && (
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(236,64,122,0.15)_0%,transparent_70%)] animate-[portal-spin_4s_linear_infinite]" />
      )}
    </motion.div>
  );
}