import { create } from "zustand";

export type PlayableCharacterId =
  | "civilian"
  | "miles-morales"
  | "peter-parker"
  | "gwen-stacy"
  | "miguel-ohara"
  | "hobie-brown"
  | "pavitr-prabhakar"
  | "peni-parker"
  | "spider-man-noir";

export interface GameState {
  // Current active player form
  activeAvatar: PlayableCharacterId;
  setActiveAvatar: (avatar: PlayableCharacterId) => void;

  // Station proximity state
  nearbyStationSlug: string | null;
  setNearbyStationSlug: (slug: string | null) => void;

  // Preview modal state
  previewStationSlug: string | null;
  setPreviewStationSlug: (slug: string | null) => void;

  // Transformation in progress
  isTransforming: boolean;
  setIsTransforming: (transforming: boolean) => void;

  // Player ability state
  abilityActive: boolean;
  abilityCooldown: number; // in seconds
  triggerAbility: () => void;
  tickAbilityCooldown: (delta: number) => void;

  // Controls & UI state
  controlsHelpOpen: boolean;
  setControlsHelpOpen: (open: boolean) => void;

  // Input lock (e.g. while preview modal is open)
  inputLocked: boolean;
  setInputLocked: (locked: boolean) => void;

  // Camera orbit angles
  cameraYaw: number;
  cameraPitch: number;
  setCameraAngles: (yaw: number, pitch: number) => void;

  // Virtual mobile joystick vector
  mobileMoveVector: { x: number; y: number };
  setMobileMoveVector: (vec: { x: number; y: number }) => void;
  mobileJumpRequested: boolean;
  setMobileJumpRequested: (req: boolean) => void;
  mobileSprintActive: boolean;
  setMobileSprintActive: (sprint: boolean) => void;
}

// Lightweight vanilla state store for frame-rate independence and clean decoupling
class GameStore {
  private listeners = new Set<() => void>();
  public state = {
    activeAvatar: "civilian" as PlayableCharacterId,
    nearbyStationSlug: null as string | null,
    previewStationSlug: null as string | null,
    isTransforming: false,
    abilityActive: false,
    abilityCooldown: 0,
    controlsHelpOpen: false,
    inputLocked: false,
    cameraYaw: 0,
    cameraPitch: 0.35,
    mobileMoveVector: { x: 0, y: 0 },
    mobileJumpRequested: false,
    mobileSprintActive: false
  };

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

  setActiveAvatar(avatar: PlayableCharacterId) {
    this.state.activeAvatar = avatar;
    this.notify();
  }

  setNearbyStationSlug(slug: string | null) {
    if (this.state.nearbyStationSlug !== slug) {
      this.state.nearbyStationSlug = slug;
      this.notify();
    }
  }

  setPreviewStationSlug(slug: string | null) {
    this.state.previewStationSlug = slug;
    this.state.inputLocked = slug !== null;
    this.notify();
  }

  setIsTransforming(isTransforming: boolean) {
    this.state.isTransforming = isTransforming;
    this.notify();
  }

  triggerAbility() {
    if (this.state.abilityCooldown > 0 || this.state.activeAvatar === "civilian") return;
    this.state.abilityActive = true;
    this.state.abilityCooldown = 4.0; // 4 seconds cooldown
    this.notify();

    setTimeout(() => {
      this.state.abilityActive = false;
      this.notify();
    }, 1200);
  }

  tickCooldown(delta: number) {
    if (this.state.abilityCooldown > 0) {
      this.state.abilityCooldown = Math.max(0, this.state.abilityCooldown - delta);
      this.notify();
    }
  }

  setControlsHelpOpen(open: boolean) {
    this.state.controlsHelpOpen = open;
    this.notify();
  }

  setMobileMoveVector(vec: { x: number; y: number }) {
    this.state.mobileMoveVector = vec;
  }

  setMobileJumpRequested(req: boolean) {
    this.state.mobileJumpRequested = req;
    this.notify();
  }

  setMobileSprintActive(sprint: boolean) {
    this.state.mobileSprintActive = sprint;
    this.notify();
  }
}

export const gameStore = new GameStore();
