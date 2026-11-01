"use client";

import React from "react";
import { PlayerAvatar } from "./PlayerAvatar";
import type { PlayableCharacterId } from "./GameState";

interface SkinnedModelAvatarProps {
  avatarId: string;
  isMoving: boolean;
  isRunning: boolean;
  isGrounded: boolean;
  abilityActive: boolean;
  moveSpeed?: number;
}

export function SkinnedModelAvatar({
  avatarId,
  isMoving,
  isRunning,
  isGrounded,
  abilityActive
}: SkinnedModelAvatarProps) {
  return (
    <group position={[0, 0, 0]}>
      <PlayerAvatar
        avatarId={avatarId as PlayableCharacterId}
        isMoving={isMoving}
        isRunning={isRunning}
        isGrounded={isGrounded}
        abilityActive={abilityActive}
      />
    </group>
  );
}
