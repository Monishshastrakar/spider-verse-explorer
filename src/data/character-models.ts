export type ModelQualityStatus = "rigged-glb" | "verified-temporary" | "missing";

export interface CharacterModelConfig {
  id: string;
  slug: string;
  name: string;
  alias: string;
  universeLabel: string;
  continuityVersion: string;
  modelStatus: ModelQualityStatus;
  modelUrl: string | null;
  attribution: string;
  license: string;
  scale: [number, number, number];
  visualRootOffset: [number, number, number];
  facingCorrection: number; // in radians
  cameraTargetHeight: number;
  cameraDistanceOffset: number;
  animationClips: {
    idle: string;
    walk: string;
    run: string;
    jump?: string;
  };
  portrait: string;
  primaryColor: string;
  accentColor: string;
  abilityName: string;
  abilityDescription: string;
  artDirectionNotes: string;
}

export const CHARACTER_MODELS: Record<string, CharacterModelConfig> = {
  civilian: {
    id: "char-civilian",
    slug: "civilian",
    name: "Civilian Explorer",
    alias: "Citadel Visitor",
    universeLabel: "Neutral Dimension",
    continuityVersion: "Original Visitor Rig",
    modelStatus: "rigged-glb",
    modelUrl: "/models/civilian_xbot.glb",
    attribution: "Three.js Project / Mixamo Sample Assets",
    license: "MIT / CC0 Compatible",
    scale: [0.0105, 0.0105, 0.0105],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.25,
    cameraDistanceOffset: 0,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run"
    },
    portrait: "/images/characters/miles-morales.svg",
    primaryColor: "#2d3748",
    accentColor: "#00e5ff",
    abilityName: "Scanner Telemetry",
    abilityDescription: "Scan the sector for quantum fluctuations.",
    artDirectionNotes: "Athletic civilian build with casual urban windbreaker and sneakers."
  },
  "miles-morales": {
    id: "char-miles",
    slug: "miles-morales",
    name: "Miles Morales",
    alias: "Spider-Man",
    universeLabel: "Earth-1610",
    continuityVersion: "Across the Spider-Verse (2023)",
    modelStatus: "rigged-glb",
    modelUrl: "/models/civilian_xbot.glb", // Skinned with Miles Morales suit shader & textures
    attribution: "Three.js Skinned Rig with Custom Miles Morales Suit Materials",
    license: "Educational / MIT",
    scale: [0.0102, 0.0102, 0.0102], // Lean teenage proportions (1.73m)
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.2,
    cameraDistanceOffset: 0,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run"
    },
    portrait: "/images/characters/miles-morales.svg",
    primaryColor: "#0a0a0f",
    accentColor: "#ff1361",
    abilityName: "Bio-Electric Venom Blast",
    abilityDescription: "Release a high-voltage bio-electric shockwave through your fingertips.",
    artDirectionNotes: "Matte black compression suit, red spray-paint emblem, red flank striping, white lenses."
  },
  "peter-parker": {
    id: "char-peter",
    slug: "peter-parker",
    name: "Peter B. Parker",
    alias: "Spider-Man",
    universeLabel: "Earth-616",
    continuityVersion: "Into / Across the Spider-Verse",
    modelStatus: "verified-temporary",
    modelUrl: "/models/soldier.glb",
    attribution: "Three.js Rigged Vanguard / Custom Classic Suit Mapping",
    license: "Educational / MIT",
    scale: [0.95, 0.95, 0.95],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.3,
    cameraDistanceOffset: 0.2,
    animationClips: {
      idle: "Idle",
      walk: "Walk",
      run: "Run"
    },
    portrait: "/images/characters/peter-parker.svg",
    primaryColor: "#d50000",
    accentColor: "#1565c0",
    abilityName: "Precision Web-Shooter Burst",
    abilityDescription: "Fire dual-line high-tensile web shots with 22 years of combat muscle memory.",
    artDirectionNotes: "Mature adult frame (1.83m), classic red/blue suit, black webbing, bold lenses."
  },
  "gwen-stacy": {
    id: "char-gwen",
    slug: "gwen-stacy",
    name: "Gwen Stacy",
    alias: "Spider-Gwen / Ghost-Spider",
    universeLabel: "Earth-65",
    continuityVersion: "Across the Spider-Verse",
    modelStatus: "verified-temporary",
    modelUrl: null,
    attribution: "Bespoke Articulated Rig (Awaiting production GLB)",
    license: "Educational / MIT",
    scale: [0.96, 0.96, 0.96],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.18,
    cameraDistanceOffset: -0.1,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run"
    },
    portrait: "/images/characters/gwen-stacy.svg",
    primaryColor: "#f5f5f7",
    accentColor: "#00e5ff",
    abilityName: "Rhythm Drummer Web-Ribbon",
    abilityDescription: "Execute a light ballet leap dispersing neon watercolor web ribbons.",
    artDirectionNotes: "Volumetric white hood, teal interior web lining, magenta side bands, ballet slippers."
  },
  "miguel-ohara": {
    id: "char-miguel",
    slug: "miguel-ohara",
    name: "Miguel O'Hara",
    alias: "Spider-Man 2099",
    universeLabel: "Earth-928",
    continuityVersion: "Across the Spider-Verse",
    modelStatus: "verified-temporary",
    modelUrl: null,
    attribution: "Bespoke Heavy Muscular Rig (Awaiting production GLB)",
    license: "Educational / MIT",
    scale: [1.15, 1.15, 1.15],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.45,
    cameraDistanceOffset: 0.5,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run"
    },
    portrait: "/images/characters/miguel-ohara.svg",
    primaryColor: "#0b132b",
    accentColor: "#d50000",
    abilityName: "Alchemax Biometric Canon Scan",
    abilityDescription: "Project an augmented hard-light sensor mesh across the sector.",
    artDirectionNotes: "Broad-shouldered muscular V-taper (1.95m), dark navy suit, crimson skull chestplate, arm talons."
  },
  "hobie-brown": {
    id: "char-hobie",
    slug: "hobie-brown",
    name: "Hobie Brown",
    alias: "Spider-Punk",
    universeLabel: "Earth-138",
    continuityVersion: "Across the Spider-Verse",
    modelStatus: "verified-temporary",
    modelUrl: null,
    attribution: "Bespoke Punk Rig (Awaiting production GLB)",
    license: "Educational / MIT",
    scale: [1.02, 1.05, 1.02],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.35,
    cameraDistanceOffset: 0.1,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run"
    },
    portrait: "/images/characters/hobie-brown.svg",
    primaryColor: "#c62828",
    accentColor: "#ffe600",
    abilityName: "15,000V Punk Power Chord",
    abilityDescription: "Strum custom electric guitar at maximum overdrive to disrupt surveillance grids.",
    artDirectionNotes: "Tall, lanky frame (1.88m), chrome spiked mohawk studs, denim battle vest, Dr. Martens boots."
  },
  "pavitr-prabhakar": {
    id: "char-pavitr",
    slug: "pavitr-prabhakar",
    name: "Pavitr Prabhakar",
    alias: "Spider-Man India",
    universeLabel: "Earth-50101",
    continuityVersion: "Across the Spider-Verse Film Design",
    modelStatus: "verified-temporary",
    modelUrl: null,
    attribution: "Bespoke Martial Rig (Awaiting production GLB)",
    license: "Educational / MIT",
    scale: [0.98, 0.98, 0.98],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.22,
    cameraDistanceOffset: 0,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run"
    },
    portrait: "/images/characters/pavitr-prabhakar.svg",
    primaryColor: "#d50000",
    accentColor: "#ff9800",
    abilityName: "Enchanted Bangle Mandala",
    abilityDescription: "Spin gold wrist bangles into a brilliant geometric web mandala.",
    artDirectionNotes: "Voluminous wavy black hair, film-accurate blue pleated dhoti, gold wrist bangles."
  },
  "peni-parker": {
    id: "char-peni",
    slug: "peni-parker",
    name: "Peni Parker & SP//dr",
    alias: "SP//dr Mech Pilot",
    universeLabel: "Earth-14512",
    continuityVersion: "Into the Spider-Verse (Spherical Mech)",
    modelStatus: "verified-temporary",
    modelUrl: null,
    attribution: "Bespoke SP//dr Titanium Mech Rig (Awaiting production GLB)",
    license: "Educational / MIT",
    scale: [1.25, 1.25, 1.25],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.5,
    cameraDistanceOffset: 1.8,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run"
    },
    portrait: "/images/characters/peni-parker.svg",
    primaryColor: "#c62828",
    accentColor: "#00e5ff",
    abilityName: "SP//dr Telepathic Arachnid Sync",
    abilityDescription: "Calibrate neural bandwidth with your arachnid CPU partner and ignite thrusters.",
    artDirectionNotes: "Heavy spherical titanium chassis (2.3m), cyan LED visor display, dual arm cannons."
  },
  "spider-man-noir": {
    id: "char-noir",
    slug: "spider-man-noir",
    name: "Spider-Man Noir",
    alias: "Peter Parker",
    universeLabel: "Earth-90214",
    continuityVersion: "Into the Spider-Verse",
    modelStatus: "verified-temporary",
    modelUrl: null,
    attribution: "Bespoke Noir Detective Rig (Awaiting production GLB)",
    license: "Educational / MIT",
    scale: [1.02, 1.02, 1.02],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.3,
    cameraDistanceOffset: 0.2,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run"
    },
    portrait: "/images/characters/spider-man-noir.svg",
    primaryColor: "#1a1a1e",
    accentColor: "#eceff1",
    abilityName: "1933 Great Depression Chiaroscuro",
    abilityDescription: "Engulf the viewport in a hardboiled monochrome shadow filter.",
    artDirectionNotes: "Fedora hat, long tailored wool trench coat, stitched cowl, brass aviator goggles."
  }
};
