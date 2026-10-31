export interface SpiderPeople {
  id: number;
  slug: string;
  name: string;
  alias: string;
  universe: string;
  universeKey: string;
  color: string;
  accentColor: string;
  powers: string[];
  description: string;
  firstAppearance: string;
  portraitSvg: string;
  stats: {
    strength: number;
    speed: number;
    intelligence: number;
    durability: number;
  };
}

function createPortraitSvg(
  mainColor: string,
  accentColor: string,
  eyeShape: string,
  pattern: string,
  emblem: string
): string {
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg-${mainColor.replace('#','')}" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${mainColor}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#0a0a0c" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="mask-${mainColor.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${mainColor}"/>
        <stop offset="100%" stop-color="${accentColor}"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="url(#bg-${mainColor.replace('#','')})"/>
    ${pattern}
    <g transform="translate(100,90)">
      <ellipse cx="0" cy="0" rx="50" ry="55" fill="${mainColor}" opacity="0.9"/>
      <ellipse cx="0" cy="0" rx="48" ry="53" fill="url(#mask-${mainColor.replace('#','')})" opacity="0.3"/>
      ${eyeShape}
    </g>
    ${emblem}
  </svg>`;
}

export const spiderPeople: SpiderPeople[] = [
  {
    id: 1,
    slug: "miles-morales",
    name: "Miles Morales",
    alias: "Spider-Man",
    universe: "Earth-1610",
    universeKey: "earth-1610",
    color: "#ec407a",
    accentColor: "#ff1744",
    powers: ["Venom Strike", "Camouflage", "Spider-Sense", "Wall-Crawling", "Bio-Electricity"],
    description: "A teenager from Brooklyn who took up the mantle of Spider-Man after the death of Peter Parker in his universe. Miles brings a fresh voice and bio-electric venom powers to the Spider-Verse. With his unique combination of invisibility and venom strike, he stands as one of the most powerful Spider-People across all dimensions.",
    firstAppearance: "Ultimate Fallout #4 (2011)",
    stats: { strength: 75, speed: 80, intelligence: 70, durability: 65 },
    portraitSvg: createPortraitSvg(
      "#ec407a", "#ff1744",
      `<ellipse cx="-15" cy="-8" rx="14" ry="10" fill="#fff" opacity="0.95"/>
       <ellipse cx="15" cy="-8" rx="14" ry="10" fill="#fff" opacity="0.95"/>
       <path d="M-29 -8 Q-15 -22 -1 -8" fill="none" stroke="#1a1a1a" stroke-width="2"/>
       <path d="M1 -8 Q15 -22 29 -8" fill="none" stroke="#1a1a1a" stroke-width="2"/>`,
      `<line x1="60" y1="40" x2="140" y2="160" stroke="#ec407a" stroke-width="0.5" opacity="0.3"/>
       <line x1="140" y1="40" x2="60" y2="160" stroke="#ec407a" stroke-width="0.5" opacity="0.3"/>
       <line x1="100" y1="30" x2="100" y2="170" stroke="#ec407a" stroke-width="0.5" opacity="0.2"/>
       <circle cx="100" cy="100" r="70" fill="none" stroke="#ec407a" stroke-width="0.5" opacity="0.15"/>`,
      `<path d="M92 155 L100 145 L108 155 L100 165 Z" fill="#ec407a" opacity="0.6"/>
       <circle cx="100" cy="155" r="3" fill="#fff" opacity="0.4"/>`
    ),
  },
  {
    id: 2,
    slug: "gwen-stacy",
    name: "Gwen Stacy",
    alias: "Spider-Gwen",
    universe: "Earth-65",
    universeKey: "earth-65",
    color: "#00bcd4",
    accentColor: "#e91e63",
    powers: ["Enhanced Agility", "Spider-Sense", "Wall-Crawling", "Web-Slinging", "Acrobatics"],
    description: "Gwen Stacy was bitten by a radioactive spider instead of Peter Parker. As Spider-Woman, she protects New York while balancing life as a drummer in the Mary Janes band. Her unique ballet-like fighting style and distinctive white suit with cyan and magenta accents make her instantly recognizable across the multiverse.",
    firstAppearance: "Edge of Spider-Verse #2 (2014)",
    stats: { strength: 65, speed: 90, intelligence: 80, durability: 60 },
    portraitSvg: createPortraitSvg(
      "#ffffff", "#00bcd4",
      `<ellipse cx="-15" cy="-8" rx="12" ry="14" fill="#00bcd4" opacity="0.9"/>
       <ellipse cx="15" cy="-8" rx="12" ry="14" fill="#e91e63" opacity="0.9"/>
       <circle cx="-15" cy="-8" r="4" fill="#000"/>
       <circle cx="15" cy="-8" r="4" fill="#000"/>`,
      `<circle cx="100" cy="100" r="75" fill="none" stroke="#00bcd4" stroke-width="0.5" opacity="0.2"/>
       <circle cx="100" cy="100" r="55" fill="none" stroke="#e91e63" stroke-width="0.5" opacity="0.2"/>
       <circle cx="100" cy="100" r="35" fill="none" stroke="#00bcd4" stroke-width="0.5" opacity="0.15"/>`,
      `<path d="M85 160 Q100 150 115 160" fill="none" stroke="#00bcd4" stroke-width="2" opacity="0.5"/>`
    ),
  },
  {
    id: 3,
    slug: "peter-b-parker",
    name: "Peter B. Parker",
    alias: "Spider-Man",
    universe: "Earth-616B",
    universeKey: "earth-616b",
    color: "#e53935",
    accentColor: "#1565c0",
    powers: ["Super Strength", "Spider-Sense", "Wall-Crawling", "Web-Slinging", "20+ Years Experience"],
    description: "A seasoned, slightly jaded Spider-Man who's seen it all. Peter B. Parker mentors the next generation while figuring out his own life, one web-swing at a time. He may be past his prime, but his decades of experience make him one of the most formidable Spider-People in the multiverse.",
    firstAppearance: "Spider-Man: Into the Spider-Verse (2018)",
    stats: { strength: 80, speed: 70, intelligence: 85, durability: 75 },
    portraitSvg: createPortraitSvg(
      "#e53935", "#1565c0",
      `<ellipse cx="-15" cy="-8" rx="14" ry="10" fill="#fff" opacity="0.95"/>
       <ellipse cx="15" cy="-8" rx="14" ry="10" fill="#fff" opacity="0.95"/>
       <path d="M-29 -8 Q-15 -20 -1 -8" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
       <path d="M1 -8 Q15 -20 29 -8" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>`,
      `<line x1="50" y1="50" x2="150" y2="50" stroke="#e53935" stroke-width="0.5" opacity="0.2"/>
       <line x1="50" y1="100" x2="150" y2="100" stroke="#1565c0" stroke-width="0.5" opacity="0.2"/>
       <line x1="50" y1="150" x2="150" y2="150" stroke="#e53935" stroke-width="0.5" opacity="0.2"/>`,
      `<path d="M90 160 L100 150 L110 160" fill="none" stroke="#e53935" stroke-width="2" opacity="0.5"/>`
    ),
  },
  {
    id: 4,
    slug: "miguel-ohara",
    name: "Miguel O'Hara",
    alias: "Spider-Man 2099",
    universe: "Earth-928",
    universeKey: "earth-928",
    color: "#9c27b0",
    accentColor: "#e53935",
    powers: ["Enhanced Vision", "Retractable Talons", "Enhanced Strength", "Genius-Level Intellect", "Organic Webbing"],
    description: "The leader of the Spider-Society, Miguel protects the multiverse from canon disruptions and collapses. Fierce, uncompromising, and from the futuristic Nueva York of 2099, he carries the weight of every universe on his shoulders. His advanced suit and genetic modifications make him one of the most powerful Spider-People.",
    firstAppearance: "Spider-Man 2099 #1 (1992)",
    stats: { strength: 90, speed: 85, intelligence: 95, durability: 80 },
    portraitSvg: createPortraitSvg(
      "#9c27b0", "#e53935",
      `<path d="M-25 -12 L-15 -2 L-5 -12 Z" fill="#e53935" opacity="0.95"/>
       <path d="M5 -12 L15 -2 L25 -12 Z" fill="#e53935" opacity="0.95"/>
       <line x1="-25" y1="-12" x2="-5" y2="-12" stroke="#fff" stroke-width="1" opacity="0.6"/>
       <line x1="5" y1="-12" x2="25" y2="-12" stroke="#fff" stroke-width="1" opacity="0.6"/>`,
      `<rect x="40" y="40" width="120" height="120" fill="none" stroke="#9c27b0" stroke-width="0.5" opacity="0.15" rx="5"/>
       <rect x="55" y="55" width="90" height="90" fill="none" stroke="#e53935" stroke-width="0.5" opacity="0.15" rx="3"/>
       <rect x="70" y="70" width="60" height="60" fill="none" stroke="#9c27b0" stroke-width="0.5" opacity="0.1" rx="2"/>`,
      `<path d="M85 165 L100 155 L115 165" fill="none" stroke="#e53935" stroke-width="2" opacity="0.5"/>
       <circle cx="100" cy="158" r="2" fill="#e53935" opacity="0.6"/>`
    ),
  },
  {
    id: 5,
    slug: "spider-man-noir",
    name: "Spider-Man Noir",
    alias: "The Spider",
    universe: "Earth-90214",
    universeKey: "earth-90214",
    color: "#37474f",
    accentColor: "#78909c",
    powers: ["Stealth", "Marksmanship", "Wall-Crawling", "Detective Skills", "Hand-to-Hand Combat"],
    description: "A noir detective from a 1930s depression-era universe. He speaks in metaphors, wears a fedora and trench coat, and operates in the shadows where light is a rare commodity. His world knows only black and white, and in that stark contrast, he finds the truth.",
    firstAppearance: "Spider-Man Noir #1 (2009)",
    stats: { strength: 65, speed: 60, intelligence: 80, durability: 70 },
    portraitSvg: createPortraitSvg(
      "#37474f", "#78909c",
      `<circle cx="-14" cy="-8" r="8" fill="#cfd8dc" opacity="0.8"/>
       <circle cx="14" cy="-8" r="8" fill="#cfd8dc" opacity="0.8"/>
       <circle cx="-14" cy="-8" r="4" fill="#263238"/>
       <circle cx="14" cy="-8" r="4" fill="#263238"/>`,
      `<line x1="30" y1="170" x2="170" y2="30" stroke="#78909c" stroke-width="0.5" opacity="0.1"/>
       <line x1="40" y1="170" x2="170" y2="40" stroke="#78909c" stroke-width="0.5" opacity="0.08"/>
       <line x1="50" y1="170" x2="170" y2="50" stroke="#78909c" stroke-width="0.5" opacity="0.06"/>
       <line x1="30" y1="160" x2="160" y2="30" stroke="#78909c" stroke-width="0.5" opacity="0.06"/>`,
      `<path d="M75 25 L100 15 L125 25 L120 35 L80 35 Z" fill="#37474f" opacity="0.6"/>
       <path d="M85 35 L115 35" stroke="#78909c" stroke-width="1" opacity="0.4"/>`
    ),
  },
  {
    id: 6,
    slug: "peni-parker",
    name: "Peni Parker",
    alias: "SP//dr",
    universe: "Earth-14512",
    universeKey: "earth-14512",
    color: "#ff9800",
    accentColor: "#e91e63",
    powers: ["Mech Piloting", "Neural Link", "Spider-Sense", "Engineering", "Psychic Spider Bond"],
    description: "Peni pilots SP//dr, a bio-mechanical suit powered by a radioactive spider that shares a psychic link with her. She's the youngest of the Spider-People, with a heart as big as her mech. Her anime-inspired universe is full of color, emotion, and high-tech gadgetry.",
    firstAppearance: "Edge of Spider-Verse #5 (2014)",
    stats: { strength: 95, speed: 60, intelligence: 90, durability: 95 },
    portraitSvg: createPortraitSvg(
      "#ff9800", "#e91e63",
      `<circle cx="-14" cy="-6" r="10" fill="#fff" opacity="0.95"/>
       <circle cx="14" cy="-6" r="10" fill="#fff" opacity="0.95"/>
       <circle cx="-12" cy="-5" r="5" fill="#e91e63"/>
       <circle cx="16" cy="-5" r="5" fill="#e91e63"/>
       <circle cx="-11" cy="-6" r="2" fill="#fff" opacity="0.6"/>
       <circle cx="17" cy="-6" r="2" fill="#fff" opacity="0.6"/>`,
      `<circle cx="100" cy="100" r="60" fill="none" stroke="#ff9800" stroke-width="1" stroke-dasharray="4 8" opacity="0.2"/>
       <circle cx="100" cy="100" r="80" fill="none" stroke="#e91e63" stroke-width="0.5" stroke-dasharray="2 6" opacity="0.15"/>`,
      `<rect x="88" y="155" width="24" height="15" rx="3" fill="#ff9800" opacity="0.4"/>
       <rect x="92" y="158" width="16" height="9" rx="2" fill="#e91e63" opacity="0.3"/>`
    ),
  },
  {
    id: 7,
    slug: "spider-ham",
    name: "Peter Porker",
    alias: "Spider-Ham",
    universe: "Earth-8311",
    universeKey: "earth-8311",
    color: "#f06292",
    accentColor: "#42a5f5",
    powers: ["Toon Physics", "Wall-Crawling", "Web-Slinging", "Cartoon Invulnerability", "Mallet Summoning"],
    description: "A pig who was bitten by a radioactive spider-pig. Peter Porker brings Looney Tunes energy to the multiverse with his mallet and an endless supply of puns. In his cartoon universe, the laws of physics are merely suggestions, giving him powers no other Spider-Person can match.",
    firstAppearance: "Marvel Tails #1 (1983)",
    stats: { strength: 50, speed: 70, intelligence: 60, durability: 99 },
    portraitSvg: createPortraitSvg(
      "#f06292", "#42a5f5",
      `<circle cx="-12" cy="-8" r="8" fill="#fff" opacity="0.95"/>
       <circle cx="12" cy="-8" r="8" fill="#fff" opacity="0.95"/>
       <circle cx="-10" cy="-7" r="4" fill="#000"/>
       <circle cx="14" cy="-7" r="4" fill="#000"/>
       <circle cx="-9" cy="-8" r="1.5" fill="#fff" opacity="0.8"/>
       <circle cx="15" cy="-8" r="1.5" fill="#fff" opacity="0.8"/>
       <ellipse cx="0" cy="8" rx="8" ry="5" fill="#f8bbd0" opacity="0.8"/>`,
      `<path d="M30 100 Q100 60 170 100" fill="none" stroke="#f06292" stroke-width="1" stroke-dasharray="6 4" opacity="0.15"/>
       <path d="M30 120 Q100 80 170 120" fill="none" stroke="#42a5f5" stroke-width="1" stroke-dasharray="6 4" opacity="0.15"/>`,
      `<text x="100" y="175" text-anchor="middle" font-size="16" fill="#f06292" opacity="0.5">✦</text>`
    ),
  },
  {
    id: 8,
    slug: "spider-punk",
    name: "Hobart Brown",
    alias: "Spider-Punk",
    universe: "Earth-138",
    universeKey: "earth-138",
    color: "#d32f2f",
    accentColor: "#fdd835",
    powers: ["Guitar-Shredding", "Anarchy", "Wall-Crawling", "Rebellion", "Sonic Blasts"],
    description: "Hobart Brown fights the man with a guitar and a smirk. Spider-Punk is the rebellious voice of Earth-138, smashing fascism with every power chord. His universe is a punk rock fever dream where the revolution never ends and the music never stops.",
    firstAppearance: "Amazing Spider-Man Vol 3 #10 (2014)",
    stats: { strength: 70, speed: 75, intelligence: 65, durability: 70 },
    portraitSvg: createPortraitSvg(
      "#d32f2f", "#fdd835",
      `<ellipse cx="-15" cy="-8" rx="13" ry="9" fill="#fff" opacity="0.95"/>
       <ellipse cx="15" cy="-8" rx="13" ry="9" fill="#fff" opacity="0.95"/>
       <path d="M-28 -14 L-15 -2" stroke="#1a1a1a" stroke-width="2"/>
       <path d="M28 -14 L15 -2" stroke="#1a1a1a" stroke-width="2"/>`,
      `<path d="M50 40 L60 50 L50 60 L60 70 L50 80" fill="none" stroke="#fdd835" stroke-width="1.5" opacity="0.2"/>
       <path d="M150 40 L140 50 L150 60 L140 70 L150 80" fill="none" stroke="#d32f2f" stroke-width="1.5" opacity="0.2"/>
       <path d="M40 150 L50 140 L60 150 L70 140 L80 150" fill="none" stroke="#fdd835" stroke-width="1" opacity="0.15"/>`,
      `<path d="M80 20 L90 40 L85 40 L85 55 L95 55 L95 40 L90 40" fill="#fdd835" opacity="0.4"/>
       <line x1="82" y1="50" x2="93" y2="50" stroke="#d32f2f" stroke-width="0.5" opacity="0.6"/>
       <line x1="82" y1="53" x2="93" y2="53" stroke="#d32f2f" stroke-width="0.5" opacity="0.6"/>`
    ),
  },
  {
    id: 9,
    slug: "pavitr-prabhakar",
    name: "Pavitr Prabhakar",
    alias: "Spider-Man India",
    universe: "Earth-50101",
    universeKey: "earth-50101",
    color: "#e53935",
    accentColor: "#ff8f00",
    powers: ["Enhanced Agility", "Spider-Sense", "Wall-Crawling", "Web-Slinging", "Dhoti Combat Style"],
    description: "From Mumbai, Pavitr protects his city with the same great power and responsibility as every Spider-Person, but with the vibrant spirit and rich culture of India behind him. His acrobatic fighting style incorporates elements of Kalaripayattu, and his suit features traditional Indian design motifs.",
    firstAppearance: "Spider-Man: India #1 (2004)",
    stats: { strength: 70, speed: 85, intelligence: 75, durability: 65 },
    portraitSvg: createPortraitSvg(
      "#e53935", "#ff8f00",
      `<ellipse cx="-15" cy="-8" rx="14" ry="10" fill="#fff" opacity="0.95"/>
       <ellipse cx="15" cy="-8" rx="14" ry="10" fill="#fff" opacity="0.95"/>
       <path d="M-29 -8 Q-15 -20 -1 -8" fill="none" stroke="#ff8f00" stroke-width="2"/>
       <path d="M1 -8 Q15 -20 29 -8" fill="none" stroke="#ff8f00" stroke-width="2"/>`,
      `<path d="M100 30 L120 50 L140 30" fill="none" stroke="#ff8f00" stroke-width="0.8" opacity="0.2"/>
       <path d="M60 30 L80 50 L100 30" fill="none" stroke="#e53935" stroke-width="0.8" opacity="0.2"/>
       <circle cx="100" cy="100" r="65" fill="none" stroke="#ff8f00" stroke-width="0.5" opacity="0.12"/>
       <path d="M100 35 L100 165" stroke="#e53935" stroke-width="0.3" opacity="0.1"/>`,
      `<circle cx="100" cy="160" r="6" fill="none" stroke="#ff8f00" stroke-width="1.5" opacity="0.4"/>
       <circle cx="100" cy="160" r="2" fill="#ff8f00" opacity="0.5"/>`
    ),
  },
  {
    id: 10,
    slug: "jessica-drew",
    name: "Jessica Drew",
    alias: "Spider-Woman",
    universe: "Earth-616",
    universeKey: "earth-616",
    color: "#1976d2",
    accentColor: "#fdd835",
    powers: ["Venom Blast", "Pheromone Control", "Flight", "Enhanced Strength", "Espionage"],
    description: "A highly trained S.H.I.E.L.D. agent and Avenger, Jessica Drew brings expertise, leadership, and devastating venom blasts to every mission she leads. Her experience as a spy and superhero gives her a tactical edge few Spider-People can match.",
    firstAppearance: "Marvel Spotlight #32 (1977)",
    stats: { strength: 75, speed: 75, intelligence: 85, durability: 70 },
    portraitSvg: createPortraitSvg(
      "#1976d2", "#fdd835",
      `<ellipse cx="-15" cy="-8" rx="13" ry="10" fill="#fff" opacity="0.95"/>
       <ellipse cx="15" cy="-8" rx="13" ry="10" fill="#fff" opacity="0.95"/>
       <ellipse cx="-15" cy="-8" rx="6" ry="5" fill="#1976d2" opacity="0.6"/>
       <ellipse cx="15" cy="-8" rx="6" ry="5" fill="#1976d2" opacity="0.6"/>`,
      `<path d="M40 100 L60 80 L80 100 L100 80 L120 100 L140 80 L160 100" fill="none" stroke="#fdd835" stroke-width="0.5" opacity="0.15"/>
       <path d="M40 120 L60 100 L80 120 L100 100 L120 120 L140 100 L160 120" fill="none" stroke="#1976d2" stroke-width="0.5" opacity="0.12"/>`,
      `<polygon points="100,150 106,160 118,162 109,170 112,182 100,175 88,182 91,170 82,162 94,160" fill="#fdd835" opacity="0.3"/>`
    ),
  },
];