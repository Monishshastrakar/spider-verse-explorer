"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Character } from "@/types/character";

interface MultiverseTransitionContextType {
  isJumping: boolean;
  activeCharacter: Character | null;
  triggerJump: (character: Character, targetUrl: string) => void;
}

const MultiverseTransitionContext = createContext<MultiverseTransitionContextType>({
  isJumping: false,
  activeCharacter: null,
  triggerJump: () => {},
});

export function useMultiverseTransition() {
  return useContext(MultiverseTransitionContext);
}

export function MultiverseTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [isJumping, setIsJumping] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const isNavigatingRef = useRef(false);

  // When pathname changes (navigation complete), smoothly dismiss the portal
  useEffect(() => {
    if (isJumping) {
      const dismissTimer = setTimeout(() => {
        setIsJumping(false);
        setActiveCharacter(null);
        isNavigatingRef.current = false;
      }, 150);
      return () => clearTimeout(dismissTimer);
    }
  }, [pathname, isJumping]);

  const triggerJump = useCallback(
    (character: Character, targetUrl: string) => {
      // Prevent repeated trigger while animating
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      setActiveCharacter(character);
      setIsJumping(true);

      if (reducedMotion) {
        // Direct clean navigation for reduced motion users
        router.push(targetUrl);
        setTimeout(() => {
          setIsJumping(false);
          setActiveCharacter(null);
          isNavigatingRef.current = false;
        }, 100);
        return;
      }

      // Step 1: Expand portal (380ms) and navigate
      const navTimer = setTimeout(() => {
        router.push(targetUrl);
      }, 380);

      // Safety fallback in case pathname doesn't change (e.g. error or same page)
      const safetyTimer = setTimeout(() => {
        setIsJumping(false);
        setActiveCharacter(null);
        isNavigatingRef.current = false;
      }, 1200);

      return () => {
        clearTimeout(navTimer);
        clearTimeout(safetyTimer);
      };
    },
    [router, reducedMotion]
  );

  return (
    <MultiverseTransitionContext.Provider value={{ isJumping, activeCharacter, triggerJump }}>
      {children}
      <AnimatePresence mode="wait">
        {isJumping && activeCharacter && (
          <MultiversePortalOverlay character={activeCharacter} reducedMotion={!!reducedMotion} />
        )}
      </AnimatePresence>
    </MultiverseTransitionContext.Provider>
  );
}

function MultiversePortalOverlay({
  character,
  reducedMotion,
}: {
  character: Character;
  reducedMotion: boolean;
}) {
  const color = character.accentColor || "#ec407a";
  const secColor = character.secondaryColor || "#00bcd4";

  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[999] bg-[#07070a] flex items-center justify-center pointer-events-none"
      >
        <div className="text-center font-bold text-lg text-white">
          Entering {character.universeLabel}...
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center overflow-hidden pointer-events-auto"
      role="dialog"
      aria-label={`Multiverse jump to ${character.universeLabel}`}
    >
      {/* Background Halftone Flash */}
      <div className="absolute inset-0 comic-halftone opacity-30" />

      {/* Chromatic Aberration Glitch Bars */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "0%", "100%"] }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-[#ff1361]/25 to-transparent mix-blend-screen pointer-events-none"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: ["100%", "0%", "-100%"] }}
        transition={{ duration: 0.45, delay: 0.05, ease: "easeInOut" }}
        className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-[#00e5ff]/25 to-transparent mix-blend-screen pointer-events-none"
      />

      {/* Expanding Comic Portal Vortex */}
      <motion.div
        initial={{ scale: 0.1, rotate: -45 }}
        animate={{ scale: [0.1, 1.2, 25], rotate: [0, 180, 540] }}
        transition={{ duration: 0.85, times: [0, 0.5, 1], ease: [0.16, 1, 0.3, 1] }}
        className="relative w-80 h-80 rounded-full flex items-center justify-center border-4 border-dashed"
        style={{
          borderColor: color,
          boxShadow: `0 0 80px ${color}, inset 0 0 60px ${secColor}`,
          background: `radial-gradient(circle, ${color} 0%, #000000 70%)`,
        }}
      >
        {/* Inner Web Webbing Rings */}
        <div
          className="absolute inset-4 rounded-full border-2 border-dotted animate-spin"
          style={{ borderColor: secColor, animationDuration: "3s" }}
        />
        <div
          className="absolute inset-12 rounded-full border border-white/40 animate-ping"
          style={{ animationDuration: "1.5s" }}
        />
      </motion.div>

      {/* Comic Text HUD Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="absolute z-10 text-center px-6"
      >
        <div className="inline-block px-3 py-1 bg-black/80 border border-white/20 rounded text-[11px] font-mono tracking-widest text-[#00e5ff] uppercase mb-2 shadow-[2px_2px_0px_#000]">
          Quantum Jump Detected
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          {character.name}
        </h2>
        <div
          className="text-lg md:text-xl font-bold tracking-wider uppercase mt-1"
          style={{ color: color }}
        >
          {character.universeLabel}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MultiverseJumpLink({
  character,
  targetUrl,
  className,
  style,
  children,
  onClick,
}: {
  character: Character;
  targetUrl: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const { triggerJump, isJumping } = useMultiverseTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if user held modifier key (Cmd/Ctrl/Shift/Alt) or middle clicked
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) {
      // Allow browser default (open in new tab / new window)
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    if (!isJumping) {
      triggerJump(character, targetUrl);
    }
  };

  return (
    <a href={targetUrl} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}
