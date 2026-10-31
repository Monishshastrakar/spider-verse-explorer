"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Character } from "@/types/character";
import { MultiverseJumpLink } from "@/components/motion/MultiverseTransition";
import { ArrowRight, ImageOff } from "lucide-react";

interface CharacterCardProps {
  character: Character;
  currentQueryString?: string;
  featured?: boolean;
}

export function CharacterCard({
  character,
  currentQueryString = "",
  featured = false,
}: CharacterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const canTiltRef = useRef(false);

  useEffect(() => {
    // Only enable 3D pointer tilt on devices with a fine pointer (desktop mouse)
    if (typeof window !== "undefined") {
      canTiltRef.current = window.matchMedia("(pointer: fine)").matches && !reducedMotion;
    }
  }, [reducedMotion]);

  // Pointer tilt without React state re-renders for 60fps performance
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTiltRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  const targetUrl = `/characters/${character.slug}${
    currentQueryString ? `?${currentQueryString}` : ""
  }`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between bg-[#0e0e16] border-2 rounded-2xl overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-[#00e5ff] will-change-transform ${
        isHovered
          ? "border-opacity-100 shadow-[6px_6px_0px_#000]"
          : "border-[#1c1c2b] shadow-[4px_4px_0px_#000]"
      }`}
      style={{
        borderColor: isHovered ? character.accentColor : "#1c1c2b",
        boxShadow: isHovered
          ? `6px 6px 0px ${character.accentColor}`
          : "4px 4px 0px #000000",
        transition: "transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Top Banner with Universe Label & Halftone Overlay */}
      <div className="relative p-5 pb-3">
        <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none" />

        <div className="relative flex items-center justify-between gap-2 z-10">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border text-white shadow-[2px_2px_0px_#000]"
            style={{
              backgroundColor: `${character.accentColor}25`,
              borderColor: character.accentColor,
              color: "#ffffff",
            }}
          >
            {character.universeLabel}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
            {character.alias}
          </span>
        </div>

        {/* Character Illustration Frame with Custom Focal Point */}
        <div className="relative mt-4 mb-2 mx-auto w-full aspect-square max-w-[240px] rounded-xl overflow-hidden border border-white/10 bg-[#07070a] flex items-center justify-center group-hover:border-white/30 transition-colors">
          {!imgError ? (
            <img
              src={character.image}
              alt={character.imageAlt}
              width={240}
              height={240}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: character.objectPosition || "center 35%" }}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 p-4 text-center">
              <ImageOff className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-xs font-mono">{character.name}</span>
            </div>
          )}

          {/* Glitch Scanline Effect on Hover */}
          {isHovered && !reducedMotion && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00e5ff]/15 to-transparent h-12 animate-[scan-line_1.5s_linear_infinite] pointer-events-none" />
          )}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="relative p-5 pt-1 flex-1 flex flex-col justify-between z-10">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase group-hover:text-[#00e5ff] transition-colors leading-tight">
            {character.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {character.shortDescription}
          </p>

          {/* Powers Summary Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {character.powers.slice(0, 3).map((power) => (
              <span
                key={power}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#141420] text-gray-300 border border-[#232338]"
              >
                {power}
              </span>
            ))}
            {character.powers.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-500 bg-[#141420]">
                +{character.powers.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Clear Action Button with Multiverse Transition */}
        <div className="mt-6 pt-4 border-t border-[#1a1a28]">
          <MultiverseJumpLink
            character={character}
            targetUrl={targetUrl}
            className="w-full py-2.5 px-4 rounded-lg font-black text-xs uppercase tracking-wider text-white border-2 border-black flex items-center justify-between transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 shadow-[3px_3px_0px_#000] focus:outline-none"
            style={{
              backgroundColor: character.accentColor,
            }}
          >
            <span>Open Multiverse Dossier</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </MultiverseJumpLink>
        </div>
      </div>
    </div>
  );
}
