"use client";

import React, { useRef, useState, useEffect } from "react";
import { gameStore } from "../game/GameState";
import { Zap, ArrowUp, FastForward } from "lucide-react";

export function MobileControls() {
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [touchActive, setTouchActive] = useState(false);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [sprintActive, setSprintActive] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Only display touch controls on touch-enabled devices
    setIsMobileDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchActive(true);
    handleTouchMove(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!joystickBaseRef.current) return;
    const touch = e.touches[0];
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxRadius = 45;
    const dx = touch.clientX - centerX;
    const dy = touch.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(dist, maxRadius);

    const knobX = Math.cos(angle) * clampedDist;
    const knobY = Math.sin(angle) * clampedDist;

    setKnobPos({ x: knobX, y: knobY });

    // Normalize vector to [-1, 1]
    gameStore.setMobileMoveVector({
      x: knobX / maxRadius,
      y: -knobY / maxRadius
    });
  };

  const handleTouchEnd = () => {
    setTouchActive(false);
    setKnobPos({ x: 0, y: 0 });
    gameStore.setMobileMoveVector({ x: 0, y: 0 });
  };

  const toggleSprint = () => {
    const next = !sprintActive;
    setSprintActive(next);
    gameStore.setMobileSprintActive(next);
  };

  const handleJump = () => {
    gameStore.setMobileJumpRequested(true);
  };

  const handleAbility = () => {
    gameStore.triggerAbility();
  };

  if (!isMobileDevice) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex justify-between items-end p-4 pb-8 sm:hidden">
      {/* Virtual Joystick (Left) */}
      <div
        ref={joystickBaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="pointer-events-auto relative w-28 h-28 rounded-full bg-black/50 border-2 border-[#00e5ff]/40 flex items-center justify-center backdrop-blur-sm touch-none"
      >
        <div
          className="w-12 h-12 rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] transition-transform duration-75 flex items-center justify-center"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
          }}
        >
          <div className="w-4 h-4 rounded-full bg-black/60" />
        </div>
      </div>

      {/* Action Button Cluster (Right) */}
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {/* Sprint Toggle */}
        <button
          onClick={toggleSprint}
          className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-xs font-black shadow-[3px_3px_0px_#000] active:scale-95 ${
            sprintActive ? "bg-[#ffe600] text-black" : "bg-[#161622] text-white"
          }`}
          aria-label="Sprint Toggle"
        >
          <FastForward className="w-5 h-5" />
        </button>

        {/* Jump Button */}
        <button
          onClick={handleJump}
          className="w-16 h-16 rounded-full bg-[#ff1361] text-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] active:scale-95"
          aria-label="Jump"
        >
          <ArrowUp className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
