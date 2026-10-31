export type StationInteractionType =
  | "venom-pulse"
  | "classic-thwip"
  | "web-ribbon"
  | "scan-interface"
  | "punk-chord"
  | "mandala-spin"
  | "cockpit-sync"
  | "noir-monochrome";

export interface MultiverseStationConfig {
  id: string;
  slug: string;
  name: string;
  alias: string;
  universeLabel: string;
  accentColor: string;
  secondaryColor: string;
  glowColor: string;
  position: [number, number, number];
  rotation: [number, number, number];
  cameraApproachPos: [number, number, number];
  cameraApproachTarget: [number, number, number];
  cameraAvatarPos: [number, number, number];
  cameraAvatarTarget: [number, number, number];
  interactionType: StationInteractionType;
  interactionName: string;
  interactionDescription: string;
  modelAssetStatus: "procedural-stylized" | "production-glb";
  modelGlbPath?: string;
  standeeImage: string;
  ambientTrackNote: string;
}

// 8 character stations arranged radially around the Spider-Verse Citadel central hub
const RADIUS = 8.5;
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (deg * Math.PI) / 180);

export const MULTIVERSE_STATIONS: MultiverseStationConfig[] = [
  {
    id: "station-miles",
    slug: "miles-morales",
    name: "Miles Morales",
    alias: "Spider-Man",
    universeLabel: "Earth-1610",
    accentColor: "#ff1361",
    secondaryColor: "#00e5ff",
    glowColor: "#ff1361",
    position: [
      Math.sin(ANGLES[0]) * RADIUS,
      0,
      -Math.cos(ANGLES[0]) * RADIUS
    ], // [0, 0, -8.5]
    rotation: [0, 0, 0],
    cameraApproachPos: [0, 1.8, -5.2],
    cameraApproachTarget: [0, 1.3, -8.5],
    cameraAvatarPos: [0, 1.4, -6.5],
    cameraAvatarTarget: [0, 1.2, -8.5],
    interactionType: "venom-pulse",
    interactionName: "Bio-Electric Venom Blast",
    interactionDescription: "Release a high-voltage bio-electric shockwave through your fingertips to short-circuit nearby threats.",
    modelAssetStatus: "procedural-stylized",
    standeeImage: "/images/characters/miles-morales.svg",
    ambientTrackNote: "Brooklyn 808s and vinyl scratch"
  },
  {
    id: "station-peter",
    slug: "peter-parker",
    name: "Peter B. Parker",
    alias: "Spider-Man",
    universeLabel: "Earth-616",
    accentColor: "#e52521",
    secondaryColor: "#1e88e5",
    glowColor: "#e52521",
    position: [
      Math.sin(ANGLES[1]) * RADIUS,
      0,
      -Math.cos(ANGLES[1]) * RADIUS
    ], // [6.01, 0, -6.01]
    rotation: [0, -Math.PI / 4, 0],
    cameraApproachPos: [4.2, 1.8, -4.2],
    cameraApproachTarget: [6.01, 1.3, -6.01],
    cameraAvatarPos: [4.9, 1.4, -4.9],
    cameraAvatarTarget: [6.01, 1.2, -6.01],
    interactionType: "classic-thwip",
    interactionName: "Precision Web-Shooter Burst",
    interactionDescription: "Fire rapid dual-fluid web lines with 22 years of combat-refined muscle memory.",
    modelAssetStatus: "procedural-stylized",
    standeeImage: "/images/characters/peter-parker.svg",
    ambientTrackNote: "Silver Age orchestral brass"
  },
  {
    id: "station-gwen",
    slug: "gwen-stacy",
    name: "Gwen Stacy",
    alias: "Spider-Gwen / Ghost-Spider",
    universeLabel: "Earth-65",
    accentColor: "#00e5ff",
    secondaryColor: "#ff4081",
    glowColor: "#00e5ff",
    position: [
      Math.sin(ANGLES[2]) * RADIUS,
      0,
      -Math.cos(ANGLES[2]) * RADIUS
    ], // [8.5, 0, 0]
    rotation: [0, -Math.PI / 2, 0],
    cameraApproachPos: [5.2, 1.8, 0],
    cameraApproachTarget: [8.5, 1.3, 0],
    cameraAvatarPos: [6.5, 1.4, 0],
    cameraAvatarTarget: [8.5, 1.2, 0],
    interactionType: "web-ribbon",
    interactionName: "Rhythm Drummer Web-Ribbon",
    interactionDescription: "Execute a fluid ballet leap while dispersing neon watercolor web ribbons in tempo.",
    modelAssetStatus: "procedural-stylized",
    standeeImage: "/images/characters/gwen-stacy.svg",
    ambientTrackNote: "Indie rock drums and watercolor synth"
  },
  {
    id: "station-miguel",
    slug: "miguel-ohara",
    name: "Miguel O'Hara",
    alias: "Spider-Man 2099",
    universeLabel: "Earth-928",
    accentColor: "#d50000",
    secondaryColor: "#00e5ff",
    glowColor: "#d50000",
    position: [
      Math.sin(ANGLES[3]) * RADIUS,
      0,
      -Math.cos(ANGLES[3]) * RADIUS
    ], // [6.01, 0, 6.01]
    rotation: [0, (-3 * Math.PI) / 4, 0],
    cameraApproachPos: [4.2, 1.8, 4.2],
    cameraApproachTarget: [6.01, 1.3, 6.01],
    cameraAvatarPos: [4.9, 1.4, 4.9],
    cameraAvatarTarget: [6.01, 1.2, 6.01],
    interactionType: "scan-interface",
    interactionName: "Alchemax Biometric Canon Scan",
    interactionDescription: "Project an augmented hard-light sensor mesh across the sector to detect multiversal anomalies.",
    modelAssetStatus: "procedural-stylized",
    standeeImage: "/images/characters/miguel-ohara.svg",
    ambientTrackNote: "Cyber-dystopian industrial drone"
  },
  {
    id: "station-hobie",
    slug: "hobie-brown",
    name: "Hobie Brown",
    alias: "Spider-Punk",
    universeLabel: "Earth-138",
    accentColor: "#ffe600",
    secondaryColor: "#ff1361",
    glowColor: "#ffe600",
    position: [
      Math.sin(ANGLES[4]) * RADIUS,
      0,
      -Math.cos(ANGLES[4]) * RADIUS
    ], // [0, 0, 8.5]
    rotation: [0, Math.PI, 0],
    cameraApproachPos: [0, 1.8, 5.2],
    cameraApproachTarget: [0, 1.3, 8.5],
    cameraAvatarPos: [0, 1.4, 6.5],
    cameraAvatarTarget: [0, 1.2, 8.5],
    interactionType: "punk-chord",
    interactionName: "15,000V Punk Power Chord",
    interactionDescription: "Strum your custom Gibson guitar at maximum overdrive to shatter authoritarian surveillance grids.",
    modelAssetStatus: "procedural-stylized",
    standeeImage: "/images/characters/hobie-brown.svg",
    ambientTrackNote: "Camden fuzz-distortion power chords"
  },
  {
    id: "station-pavitr",
    slug: "pavitr-prabhakar",
    name: "Pavitr Prabhakar",
    alias: "Spider-Man India",
    universeLabel: "Earth-50101",
    accentColor: "#ff9800",
    secondaryColor: "#00e5ff",
    glowColor: "#ff9800",
    position: [
      Math.sin(ANGLES[5]) * RADIUS,
      0,
      -Math.cos(ANGLES[5]) * RADIUS
    ], // [-6.01, 0, 6.01]
    rotation: [0, (3 * Math.PI) / 4, 0],
    cameraApproachPos: [-4.2, 1.8, 4.2],
    cameraApproachTarget: [-6.01, 1.3, 6.01],
    cameraAvatarPos: [-4.9, 1.4, 4.9],
    cameraAvatarTarget: [-6.01, 1.2, 6.01],
    interactionType: "mandala-spin",
    interactionName: "Enchanted Bangle Mandala",
    interactionDescription: "Spin your gold wrist bangles into a brilliant geometric web mandala with Kalaripayattu agility.",
    modelAssetStatus: "procedural-stylized",
    standeeImage: "/images/characters/pavitr-prabhakar.svg",
    ambientTrackNote: "Bhangra percussion and sitar rhythm"
  },
  {
    id: "station-peni",
    slug: "peni-parker",
    name: "Peni Parker & SP//dr",
    alias: "SP//dr",
    universeLabel: "Earth-14512",
    accentColor: "#00e5ff",
    secondaryColor: "#ff1744",
    glowColor: "#00e5ff",
    position: [
      Math.sin(ANGLES[6]) * RADIUS,
      0,
      -Math.cos(ANGLES[6]) * RADIUS
    ], // [-8.5, 0, 0]
    rotation: [0, Math.PI / 2, 0],
    cameraApproachPos: [-5.2, 1.8, 0],
    cameraApproachTarget: [-8.5, 1.3, 0],
    cameraAvatarPos: [-6.5, 1.4, 0],
    cameraAvatarTarget: [-8.5, 1.2, 0],
    interactionType: "cockpit-sync",
    interactionName: "SP//dr Telepathic Arachnid Sync",
    interactionDescription: "Calibrate neural bandwidth with your arachnid CPU partner and fire high-frequency plasma micro-missiles.",
    modelAssetStatus: "procedural-stylized",
    standeeImage: "/images/characters/peni-parker.svg",
    ambientTrackNote: "Chiptune anime synth and mecha servos"
  },
  {
    id: "station-noir",
    slug: "spider-man-noir",
    name: "Spider-Man Noir",
    alias: "Peter Parker",
    universeLabel: "Earth-90214",
    accentColor: "#f5f5f5",
    secondaryColor: "#ffb300",
    glowColor: "#f5f5f5",
    position: [
      Math.sin(ANGLES[7]) * RADIUS,
      0,
      -Math.cos(ANGLES[7]) * RADIUS
    ], // [-6.01, 0, -6.01]
    rotation: [0, Math.PI / 4, 0],
    cameraApproachPos: [-4.2, 1.8, -4.2],
    cameraApproachTarget: [-6.01, 1.3, -6.01],
    cameraAvatarPos: [-4.9, 1.4, -4.9],
    cameraAvatarTarget: [-6.01, 1.2, -6.01],
    interactionType: "noir-monochrome",
    interactionName: "1933 Great Depression Chiaroscuro",
    interactionDescription: "Engulf the viewport in a hardboiled monochrome shadow filter, letting the wind smell like rain.",
    modelAssetStatus: "procedural-stylized",
    standeeImage: "/images/characters/spider-man-noir.svg",
    ambientTrackNote: "1930s melancholic jazz trumpet and rain"
  }
];

export function getStationBySlug(slug: string): MultiverseStationConfig | undefined {
  return MULTIVERSE_STATIONS.find((s) => s.slug === slug);
}
