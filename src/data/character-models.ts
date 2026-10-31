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
    attribution: "Three.js Project / Mixamo Authoritative Human Rig",
    license: "MIT / CC0 Compatible",
    scale: [1, 1, 1],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.3,
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
    modelUrl: "/models/miles_morales.glb",
    attribution: "IIM Digital School Diimensions Project (Ayman Benammour et al.) / Authentic Skinned Rig",
    license: "Educational / Non-Commercial",
    scale: [1, 1, 1], // Height: 1.644m, exact 1:1 film proportions
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.2,
    cameraDistanceOffset: 0,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run",
      jump: "jump"
    },
    portrait: "/images/characters/miles-morales.svg",
    primaryColor: "#0d0d12",
    accentColor: "#ff1361",
    abilityName: "Bio-Electric Venom Blast",
    abilityDescription: "Release a high-voltage bio-electric shockwave through your fingertips.",
    artDirectionNotes: "Matte black compression suit with spray-paint chest spider, red back emblem, red flank racing stripes, sharp white mask lenses, and red eye contours."
  },
  "peter-parker": {
    id: "char-peter",
    slug: "peter-parker",
    name: "Peter B. Parker",
    alias: "Spider-Man",
    universeLabel: "Earth-616",
    continuityVersion: "Into / Across the Spider-Verse",
    modelStatus: "rigged-glb",
    modelUrl: "/models/spiderman_classic.glb",
    attribution: "Bespoke Classic Spider-Man Rig with Segmented Costume Meshes",
    license: "Educational / MIT",
    scale: [1, 1, 1],
    visualRootOffset: [0, 0, 1.65],
    facingCorrection: 0,
    cameraTargetHeight: 1.3,
    cameraDistanceOffset: 0.2,
    animationClips: {
      idle: "Armature.002|mixamo.com|Layer0",
      walk: "mixamo.com.002",
      run: "mixamo.com"
    },
    portrait: "/images/characters/peter-parker.svg",
    primaryColor: "#d50000",
    accentColor: "#1565c0",
    abilityName: "Precision Web-Shooter Burst",
    abilityDescription: "Fire dual-line high-tensile web shots with 22 years of combat muscle memory.",
    artDirectionNotes: "Mature adult frame (1.81m), classic red/blue suit, embossed webbing, bold lenses."
  },
  "gwen-stacy": {
    id: "char-gwen",
    slug: "gwen-stacy",
    name: "Gwen Stacy",
    alias: "Spider-Gwen / Ghost-Spider",
    universeLabel: "Earth-65",
    continuityVersion: "Across the Spider-Verse",
    modelStatus: "rigged-glb",
    modelUrl: "/models/miles_morales.glb", // Skinned to agile 65-bone athletic rig with Ghost-Spider suit
    attribution: "IIM Digital School Base Skinned Rig / Custom Ghost-Spider Suit & Volumetric Hood",
    license: "Educational / Non-Commercial",
    scale: [0.94, 0.96, 0.94],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.18,
    cameraDistanceOffset: -0.1,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run",
      jump: "jump"
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
    modelStatus: "rigged-glb",
    modelUrl: "/models/miguel_ohara.glb",
    attribution: "IIM Digital School Diimensions Project / Spider-Man 2099 Skinned Rig",
    license: "Educational / Non-Commercial",
    scale: [1, 1, 1], // Height: 1.95m, imposing athletic muscular frame
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.45,
    cameraDistanceOffset: 0.3,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run",
      jump: "jump"
    },
    portrait: "/images/characters/miguel-ohara.svg",
    primaryColor: "#0d1b2a",
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
    modelStatus: "rigged-glb",
    modelUrl: "/models/miles_morales.glb",
    attribution: "IIM Digital School Base Skinned Rig / Punk Styling",
    license: "Educational / Non-Commercial",
    scale: [1.02, 1.07, 1.02], // Tall, lanky frame
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.35,
    cameraDistanceOffset: 0.1,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run",
      jump: "jump"
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
    modelStatus: "rigged-glb",
    modelUrl: "/models/miles_morales.glb",
    attribution: "IIM Digital School Base Skinned Rig / Indian Suit Styling",
    license: "Educational / Non-Commercial",
    scale: [0.97, 0.98, 0.97],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.22,
    cameraDistanceOffset: 0,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run",
      jump: "jump"
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
    attribution: "Bespoke SP//dr Titanium Mech Rig",
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
    modelStatus: "rigged-glb",
    modelUrl: "/models/miles_morales.glb",
    attribution: "IIM Digital School Base Skinned Rig / Noir Chiaroscuro Styling",
    license: "Educational / Non-Commercial",
    scale: [1.02, 1.02, 1.02],
    visualRootOffset: [0, 0, 0],
    facingCorrection: 0,
    cameraTargetHeight: 1.3,
    cameraDistanceOffset: 0.2,
    animationClips: {
      idle: "idle",
      walk: "walk",
      run: "run",
      jump: "jump"
    },
    portrait: "/images/characters/spider-man-noir.svg",
    primaryColor: "#1a1a1e",
    accentColor: "#eceff1",
    abilityName: "1933 Great Depression Chiaroscuro",
    abilityDescription: "Engulf the viewport in a hardboiled monochrome shadow filter.",
    artDirectionNotes: "Fedora hat, long tailored wool trench coat, stitched cowl, brass aviator goggles."
  }
};
