import type { Character } from "../types/character.ts";

function createComicMaskSvg(
  characterSlug: string,
  primaryColor: string,
  accentColor: string,
  eyeMarkup: string,
  accessoryMarkup: string = ""
): string {
  const maskId = `mask-${characterSlug}`;
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" role="img" aria-label="${characterSlug} comic illustration">
    <defs>
      <radialGradient id="${maskId}-bg" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.35"/>
        <stop offset="70%" stop-color="#0c0c14" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#050508" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="${maskId}-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryColor}"/>
        <stop offset="50%" stop-color="#14141d"/>
        <stop offset="100%" stop-color="${accentColor}"/>
      </linearGradient>
      <pattern id="${maskId}-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="1.5" fill="${accentColor}" opacity="0.18"/>
      </pattern>
      <filter id="${maskId}-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <!-- Background Frame with Comic Halftone -->
    <rect width="320" height="320" fill="url(#${maskId}-bg)" rx="24"/>
    <rect width="320" height="320" fill="url(#${maskId}-dots)" rx="24"/>

    <!-- Subtle Web Lines in Background -->
    <g stroke="${accentColor}" stroke-width="1" opacity="0.2">
      <path d="M160 30 L160 290" />
      <path d="M30 160 L290 160" />
      <path d="M68 68 L252 252" />
      <path d="M68 252 L252 68" />
      <circle cx="160" cy="160" r="45" fill="none" />
      <circle cx="160" cy="160" r="95" fill="none" stroke-dasharray="4 4" />
      <circle cx="160" cy="160" r="135" fill="none" opacity="0.5" />
    </g>

    <!-- Comic Vignette Offset Shadow -->
    <ellipse cx="164" cy="166" rx="84" ry="104" fill="#000000" opacity="0.6"/>

    <!-- Main Head / Mask Base -->
    <g transform="translate(0, -6)">
      <ellipse cx="160" cy="160" rx="80" ry="100" fill="url(#${maskId}-grad)" stroke="#111118" stroke-width="5"/>

      <!-- Contour / Jaw shading -->
      <path d="M100 165 C100 230, 130 255, 160 258 C190 255, 220 230, 220 165 Z" fill="#0a0a0f" opacity="0.35"/>
      <path d="M160 62 C185 62, 218 85, 230 130 C205 105, 180 95, 160 95 C140 95, 115 105, 90 130 C102 85, 135 62, 160 62 Z" fill="${accentColor}" opacity="0.12"/>

      <!-- Webbing Texture on Face -->
      <g stroke="#000000" stroke-width="1.8" opacity="0.45" fill="none">
        <path d="M160 70 L160 250"/>
        <path d="M160 145 Q125 140 100 130"/>
        <path d="M160 145 Q195 140 220 130"/>
        <path d="M160 175 Q125 180 105 195"/>
        <path d="M160 175 Q195 180 215 195"/>
        <path d="M160 215 Q135 220 120 235"/>
        <path d="M160 215 Q185 220 200 235"/>
      </g>

      <!-- Custom Eyes -->
      <g filter="url(#${maskId}-glow)">
        ${eyeMarkup}
      </g>

      <!-- Accessories / Traits (Hood, Spikes, Goggles, Mech Elements) -->
      ${accessoryMarkup}
    </g>

    <!-- Outer Comic Frame Border -->
    <rect x="10" y="10" width="300" height="300" rx="16" fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.3"/>
    <rect x="6" y="6" width="308" height="308" rx="20" fill="none" stroke="#000000" stroke-width="2"/>
  </svg>`;
}

export const CHARACTERS: Character[] = [
  {
    id: "miles-morales",
    slug: "miles-morales",
    name: "Miles Morales",
    alias: "Spider-Man",
    universeId: "earth-1610",
    universeLabel: "Earth-1610",
    powers: [
      "Bio-Electric Venom Blast",
      "Camouflage (Invisibility)",
      "Wall-Crawling",
      "Spider-Sense",
      "Superhuman Agility & Reflexes"
    ],
    shortDescription: "Brooklyn's own Spider-Man balancing high school, graffiti art, and universe-shattering multiversal responsibilities.",
    biography: "Bitten by a genetically modified Alchemax spider, Brooklyn teenager Miles Morales stepped up to take the mantle after the tragic fall of his world's Peter Parker. Guiding his path with his own unique beat, custom spray-painted suit, and devastating electric Venom blasts, Miles discovered that anyone can wear the mask—it's how you wear it that makes you a hero.",
    traits: [
      "Spray-painted custom suit with red webbing",
      "Bio-electric electricity conduction",
      "Active invisibility camouflage",
      "Intuitive leap of faith technique"
    ],
    image: createComicMaskSvg(
      "miles-morales",
      "#e52521",
      "#ff1361",
      `<!-- Miles Signature Angular Lenses with Red Rim -->
       <path d="M110 140 C110 120, 130 115, 148 132 C146 154, 132 170, 114 168 C110 162, 110 150, 110 140 Z" fill="#ffffff" stroke="#e52521" stroke-width="5"/>
       <path d="M210 140 C210 120, 190 115, 172 132 C174 154, 188 170, 206 168 C210 162, 210 150, 210 140 Z" fill="#ffffff" stroke="#e52521" stroke-width="5"/>
       <path d="M120 142 L142 136" stroke="#00e5ff" stroke-width="2" opacity="0.6"/>
       <path d="M200 142 L178 136" stroke="#00e5ff" stroke-width="2" opacity="0.6"/>`,
      `<!-- Spray Paint Drips & Electric Sparks -->
       <path d="M152 230 L160 248 L168 230" fill="#e52521" opacity="0.9"/>
       <circle cx="160" cy="254" r="3" fill="#e52521"/>
       <path d="M85 100 L95 115 L88 120 L102 140" fill="none" stroke="#ffe600" stroke-width="2" opacity="0.75"/>
       <path d="M235 100 L225 115 L232 120 L218 140" fill="none" stroke="#ffe600" stroke-width="2" opacity="0.75"/>`
    ),
    imageAlt: "Miles Morales in black and red mask with bio-electric highlights",
    accentColor: "#ff1361",
    secondaryColor: "#00e5ff",
    quote: "Anyone can wear the mask. You could wear the mask.",
    firstAppearance: "Ultimate Comics: Fallout #4 (2011)",
    stats: {
      strength: 78,
      speed: 88,
      intelligence: 82,
      durability: 80
    },
    relatedCharacterSlugs: ["gwen-stacy", "peter-parker", "miguel-ohara"]
  },
  {
    id: "peter-parker",
    slug: "peter-parker",
    name: "Peter B. Parker",
    alias: "Spider-Man",
    universeId: "earth-616",
    universeLabel: "Earth-616",
    powers: [
      "Proportional Spider Strength",
      "Precognitive Spider-Sense",
      "Master Web-Shooter Combat",
      "Wall-Crawling",
      "Veteran Improvisational Tactics"
    ],
    shortDescription: "The world-weary veteran Spider-Man who found renewed purpose, fatherhood, and mentorship in the multiverse.",
    biography: "Twenty-two years of fighting villains, eating pizza in sweatpants, and bearing the relentless weight of responsibility left Peter B. Parker jaded and fatigued. Sucked into Earth-1610 through Kingpin's super-collider, he unexpectedly became a mentor to Miles Morales. That experience reignited his heroic spirit and reminded him why he became Spider-Man in the first place.",
    traits: [
      "Classic dual-tone crimson and deep navy suit",
      "Battle-tested improvisational mastery",
      "Pink robe / dad pouch utility",
      "Unmatched combat resilience"
    ],
    image: createComicMaskSvg(
      "peter-parker",
      "#b71c1c",
      "#1565c0",
      `<!-- Classic Wide Peter Parker Lenses with Thick Black Outline -->
       <path d="M105 135 C108 112, 134 110, 150 130 C146 158, 128 174, 110 166 C105 158, 104 146, 105 135 Z" fill="#ffffff" stroke="#000000" stroke-width="7"/>
       <path d="M215 135 C212 112, 186 110, 170 130 C174 158, 192 174, 210 166 C215 158, 216 146, 215 135 Z" fill="#ffffff" stroke="#000000" stroke-width="7"/>
       <path d="M112 140 Q130 130 144 136" stroke="#b0bec5" stroke-width="2" opacity="0.7"/>
       <path d="M208 140 Q190 130 176 136" stroke="#b0bec5" stroke-width="2" opacity="0.7"/>`,
      `<!-- Slight Vintage Webbing Detailing -->
       <path d="M160 115 L160 145 M150 130 Q160 135 170 130" stroke="#000000" stroke-width="2"/>`
    ),
    imageAlt: "Peter B. Parker classic red and blue mask with iconic comic eyes",
    accentColor: "#e52521",
    secondaryColor: "#1e88e5",
    quote: "No matter how many times you get hit, you always get back up.",
    firstAppearance: "Amazing Fantasy #15 (1962)",
    stats: {
      strength: 84,
      speed: 80,
      intelligence: 90,
      durability: 86
    },
    relatedCharacterSlugs: ["miles-morales", "gwen-stacy", "spider-man-noir"]
  },
  {
    id: "gwen-stacy",
    slug: "gwen-stacy",
    name: "Gwen Stacy",
    alias: "Spider-Gwen / Ghost-Spider",
    universeId: "earth-65",
    universeLabel: "Earth-65",
    powers: [
      "Acrobatic Drummer Rhythm Combat",
      "Web-Shooter Precision",
      "Spider-Sense",
      "Wall-Crawling",
      "Dimension Hopping via Web-Watch"
    ],
    shortDescription: "A fiercely independent drummer whose world moves in watercolor emotion and sleek aerodynamic grace.",
    biography: "In Earth-65, Gwen Stacy was bitten by the radioactive spider instead of Peter Parker. When Peter tragically died trying to gain powers of his own, Gwen was blamed by the police—led by her own father, Captain George Stacy. Channelling her grief and love of music into heroics, she protects New York with unparalleled fluidity and an iconic white hooded suit.",
    traits: [
      "White silk-lined hood with teal web interior",
      "Ballet-inspired combat acrobatics",
      "Drummer-timed kinetic movement",
      "Multiverse travel wrist gauntlet"
    ],
    image: createComicMaskSvg(
      "gwen-stacy",
      "#ffffff",
      "#ff4081",
      `<!-- Gwen Sleek Angular Teal & Pink Lenses -->
       <path d="M112 145 C116 128, 134 125, 148 138 C144 156, 130 166, 116 164 Z" fill="#ffffff" stroke="#ff4081" stroke-width="5"/>
       <path d="M208 145 C204 128, 186 125, 172 138 C176 156, 190 166, 204 164 Z" fill="#ffffff" stroke="#ff4081" stroke-width="5"/>
       <path d="M116 142 L142 140" stroke="#00e5ff" stroke-width="2"/>
       <path d="M204 142 L178 140" stroke="#00e5ff" stroke-width="2"/>`,
      `<!-- Iconic Gwen Stacy White & Magenta Hood -->
       <path d="M78 160 C75 90, 110 50, 160 48 C210 50, 245 90, 242 160 C242 220, 225 265, 215 275 C205 285, 185 270, 160 270 C135 270, 115 285, 105 275 C95 265, 78 220, 78 160 Z" fill="none" stroke="#ffffff" stroke-width="7"/>
       <path d="M92 155 C90 105, 120 70, 160 68 C200 70, 230 105, 228 155" fill="none" stroke="#00bcd4" stroke-width="2.5" opacity="0.6"/>
       <path d="M86 165 C88 225, 120 260, 160 262 C200 260, 232 225, 234 165" fill="none" stroke="#ff4081" stroke-width="2" opacity="0.5"/>`
    ),
    imageAlt: "Gwen Stacy masked profile with white hood and neon magenta-teal accents",
    accentColor: "#00e5ff",
    secondaryColor: "#ff4081",
    quote: "I thought I couldn't have friends. But you guys showed me that wasn't true.",
    firstAppearance: "Edge of Spider-Verse #2 (2014)",
    stats: {
      strength: 75,
      speed: 92,
      intelligence: 85,
      durability: 76
    },
    relatedCharacterSlugs: ["miles-morales", "hobie-brown", "peter-parker"]
  },
  {
    id: "miguel-ohara",
    slug: "miguel-ohara",
    name: "Miguel O'Hara",
    alias: "Spider-Man 2099",
    universeId: "earth-928",
    universeLabel: "Earth-928",
    powers: [
      "Talons & Paralytic Fangs",
      "Accelerated Vision & Telepathy",
      "Hard-Light Plasma Webbing",
      "Superhuman Durability",
      "Multiversal Gizmo & Day-Watch Creation"
    ],
    shortDescription: "The grim futuristic leader of the Spider-Society, maintaining the stability of canon events across all realities.",
    biography: "In the cyber-dystopian future of Nueva York, brilliant geneticist Miguel O'Hara had his DNA spliced with spider genes during an Alchemax experiment gone wrong. Unlike other Spiders, Miguel has no precognitive Spider-Sense; instead, he relies on hyper-accelerated vision, razor talons, and a hard-light cape. Haunted by an anomaly he caused in another universe, he formed the Spider-Society to safeguard the canon.",
    traits: [
      "Day-watch multiversal portal generator",
      "Razor-sharp retractable talons and fangs",
      "Hard-light interactive plasma cape",
      "Zero spider-sense; hyper-reactive sensory cortex"
    ],
    image: createComicMaskSvg(
      "miguel-ohara",
      "#0d47a1",
      "#d50000",
      `<!-- Miguel Fanged Red Visor / Skull Motif Eyes -->
       <path d="M102 138 L146 130 L138 152 L120 156 L108 150 Z" fill="#d50000" stroke="#ff1744" stroke-width="3"/>
       <path d="M218 138 L174 130 L182 152 L200 156 L212 150 Z" fill="#d50000" stroke="#ff1744" stroke-width="3"/>
       <!-- Center Skull Bridge Lines -->
       <path d="M148 135 L160 148 L172 135" stroke="#d50000" stroke-width="3" fill="none"/>
       <polygon points="160,154 154,168 166,168" fill="#d50000"/>`,
      `<!-- Cyber Skull Facial Markings & Claws Overlay -->
       <path d="M110 168 L95 210 L108 215" fill="none" stroke="#d50000" stroke-width="3.5"/>
       <path d="M210 168 L225 210 L212 215" fill="none" stroke="#d50000" stroke-width="3.5"/>
       <path d="M140 225 L160 250 L180 225" fill="none" stroke="#00e5ff" stroke-width="2" opacity="0.6"/>`
    ),
    imageAlt: "Miguel O'Hara masked portrait with aggressive futuristic crimson skull emblem",
    accentColor: "#d50000",
    secondaryColor: "#00e5ff",
    quote: "Being Spider-Man is a sacrifice. That's the job.",
    firstAppearance: "Spider-Man 2099 #1 (1992)",
    stats: {
      strength: 96,
      speed: 90,
      intelligence: 95,
      durability: 94
    },
    relatedCharacterSlugs: ["miles-morales", "gwen-stacy", "pavitr-prabhakar"]
  },
  {
    id: "hobie-brown",
    slug: "hobie-brown",
    name: "Hobie Brown",
    alias: "Spider-Punk",
    universeId: "earth-138",
    universeLabel: "Earth-138",
    powers: [
      "Electric Guitar Sonic Blasts",
      "Anarchy & Unpredictability",
      "Wall-Crawling",
      "Spider-Sense",
      "Anti-Establishment Combat Improvisation"
    ],
    shortDescription: "A chaotic British punk-rock rebel who doesn't believe in consistency, authority, or staying inside the margins.",
    biography: "Hailing from a totalitarian Earth where Norman Osborn's V.E.N.O.M. regime controlled the media and streets, Hobart 'Hobie' Brown weaponized punk rock, safety pins, and 15,000 watts of raw guitar punk power to liberate London. Living outside conventional reality, Hobie shifts art styles frame by frame and refuses to answer to anyone.",
    traits: [
      "Spiked mohawk mask studs",
      "Custom Gibson electric guitar weapon",
      "Screen-printed denim battle vest",
      "Constantly shifting visual animation framerate"
    ],
    image: createComicMaskSvg(
      "hobie-brown",
      "#d50000",
      "#ffe600",
      `<!-- Asymmetric Punk Eyes with Jagged Edges -->
       <path d="M106 142 L132 125 L146 145 L124 165 Z" fill="#ffffff" stroke="#111111" stroke-width="4"/>
       <path d="M214 142 L188 125 L174 145 L196 165 Z" fill="#ffffff" stroke="#111111" stroke-width="4"/>
       <line x1="102" y1="130" x2="150" y2="155" stroke="#ffe600" stroke-width="2"/>
       <line x1="218" y1="130" x2="170" y2="155" stroke="#00e5ff" stroke-width="2"/>`,
      `<!-- Spiked Mohawk along Center Ridge -->
       <g fill="#ffe600" stroke="#000000" stroke-width="2">
         <polygon points="160,25 152,55 168,55"/>
         <polygon points="160,50 150,75 170,75"/>
         <polygon points="160,75 152,95 168,95"/>
         <polygon points="160,95 153,115 167,115"/>
       </g>
       <!-- Safety Pins Accent -->
       <rect x="90" y="210" width="22" height="6" rx="3" fill="#cfd8dc" stroke="#000" stroke-width="1.5" transform="rotate(-25 90 210)"/>
       <rect x="210" y="210" width="22" height="6" rx="3" fill="#cfd8dc" stroke="#000" stroke-width="1.5" transform="rotate(25 210 210)"/>`
    ),
    imageAlt: "Hobie Brown masked head with golden spiked mohawk and raw punk energy",
    accentColor: "#ffe600",
    secondaryColor: "#d50000",
    quote: "I don't believe in consistency. Or labels. Or capitalism.",
    firstAppearance: "Amazing Spider-Man Vol. 3 #10 (2014)",
    stats: {
      strength: 78,
      speed: 84,
      intelligence: 80,
      durability: 82
    },
    relatedCharacterSlugs: ["gwen-stacy", "miles-morales", "pavitr-prabhakar"]
  },
  {
    id: "pavitr-prabhakar",
    slug: "pavitr-prabhakar",
    name: "Pavitr Prabhakar",
    alias: "Spider-Man India",
    universeId: "earth-50101",
    universeLabel: "Earth-50101",
    powers: [
      "Kalaripayattu Martial Arts",
      "Enchanted Bangle Web-Throwing",
      "Superhuman Agility",
      "Spider-Sense",
      "Wall-Crawling"
    ],
    shortDescription: "Mumbattan's cheerful protector fighting crime with traditional martial arts, effortless swagger, and fantastic hair.",
    biography: "Living in the dizzying metropolis of Mumbattan, Pavitr Prabhakar received mystical spider abilities from an ancient yogi. Protecting his city while acing exams and dating Gayatri Kamath, Pavitr makes superheroics look easy, blending ancient Indian martial art footwork with acrobatic web-spinning—and fiercely defending Chai against people who call it 'Chai tea'.",
    traits: [
      "Custom dhoti and gold-trimmed suit",
      "Bangle-guided tensile web cords",
      "Mumbattan skyscraper free-running style",
      "Proud guardian of authentic Chai terminology"
    ],
    image: createComicMaskSvg(
      "pavitr-prabhakar",
      "#d32f2f",
      "#ff9800",
      `<!-- Pavitr Ornate Curved Eyes with Gold Filigree Rim -->
       <path d="M108 140 C112 120, 136 116, 148 135 C142 155, 126 166, 114 162 Z" fill="#ffffff" stroke="#ff9800" stroke-width="4"/>
       <path d="M212 140 C208 120, 184 116, 172 135 C178 155, 194 166, 206 162 Z" fill="#ffffff" stroke="#ff9800" stroke-width="4"/>
       <path d="M102 135 Q130 115 152 130" stroke="#ffd54f" stroke-width="2" fill="none"/>
       <path d="M218 135 Q190 115 168 130" stroke="#ffd54f" stroke-width="2" fill="none"/>`,
      `<!-- Flowing Hair Tufts & Gold Bangle Web Motifs -->
       <path d="M120 52 C135 25, 170 20, 195 40 C205 32, 218 35, 225 50" fill="none" stroke="#212121" stroke-width="12" stroke-linecap="round"/>
       <path d="M125 54 C140 30, 172 25, 195 42" fill="none" stroke="#424242" stroke-width="4" stroke-linecap="round"/>
       <circle cx="160" cy="245" r="8" fill="none" stroke="#ffd54f" stroke-width="3"/>`
    ),
    imageAlt: "Pavitr Prabhakar mask with ornate gold trims and stylish black hair curls",
    accentColor: "#ff9800",
    secondaryColor: "#00e5ff",
    quote: "Chai means tea, bro! You are saying tea tea!",
    firstAppearance: "Spider-Man: India #1 (2004)",
    stats: {
      strength: 76,
      speed: 94,
      intelligence: 82,
      durability: 74
    },
    relatedCharacterSlugs: ["miles-morales", "hobie-brown", "gwen-stacy"]
  },
  {
    id: "peni-parker",
    slug: "peni-parker",
    name: "Peni Parker & SP//dr",
    alias: "SP//dr",
    universeId: "earth-14512",
    universeLabel: "Earth-14512",
    powers: [
      "Psychic Spider-Bond Mech Pilot",
      "High-Tech Plasma Cannons",
      "Cybernetic Web Synthesizers",
      "Heavy Armor & Thruster Mobility",
      "Advanced Tactical Computing"
    ],
    shortDescription: "A high-school anime prodigy who pilots a massive biomechanical spider-mech powered by a radioactive arachnid co-pilot.",
    biography: "After her father passed away in the line of duty, nine-year-old Peni Parker was chosen as the only compatible genetic pilot for the SP//dr suit. Letting a radioactive spider bite her to form a telepathic CPU bond, Peni operates the iconic red-and-white spherical mech through Tokyo-39, defending her world with hyper-kinetic anime flair and cybernetic computing.",
    traits: [
      "Telepathic arachnid cockpit interface",
      "Manga/anime visual expression overlays",
      "High-density titanium spider chassis",
      "Energy web grapples and thruster leaps"
    ],
    image: createComicMaskSvg(
      "peni-parker",
      "#c62828",
      "#00e5ff",
      `<!-- SP//dr Mech Digital Pixel Eye Visor -->
       <circle cx="128" cy="142" r="18" fill="#ffffff" stroke="#00e5ff" stroke-width="4"/>
       <circle cx="192" cy="142" r="18" fill="#ffffff" stroke="#00e5ff" stroke-width="4"/>
       <circle cx="128" cy="142" r="8" fill="#00e5ff"/>
       <circle cx="192" cy="142" r="8" fill="#00e5ff"/>
       <line x1="120" y1="135" x2="136" y2="135" stroke="#ffffff" stroke-width="2"/>
       <line x1="184" y1="135" x2="200" y2="135" stroke="#ffffff" stroke-width="2"/>`,
      `<!-- Mech Cockpit Seams and Neon Antennae -->
       <path d="M160 50 L160 100" stroke="#ffffff" stroke-width="3"/>
       <circle cx="160" cy="46" r="5" fill="#ff1744"/>
       <path d="M100 190 L160 220 L220 190" fill="none" stroke="#ffffff" stroke-width="4"/>
       <circle cx="160" cy="220" r="4" fill="#00e5ff"/>`
    ),
    imageAlt: "Peni Parker and SP//dr robot faceplate with glowing cybernetic blue eyes",
    accentColor: "#00e5ff",
    secondaryColor: "#ff1744",
    quote: "My suit is powered by a radioactive spider that I share a psychic link with!",
    firstAppearance: "Edge of Spider-Verse #5 (2014)",
    stats: {
      strength: 92,
      speed: 78,
      intelligence: 96,
      durability: 95
    },
    relatedCharacterSlugs: ["miles-morales", "peter-parker", "spider-man-noir"]
  },
  {
    id: "spider-man-noir",
    slug: "spider-man-noir",
    name: "Peter Parker",
    alias: "Spider-Man Noir",
    universeId: "earth-90214",
    universeLabel: "Earth-90214",
    powers: [
      "Shadow Stealth & Infiltration",
      "Organic Shadow Webbing",
      "Pugilist Street Fighting",
      "Hardboiled Detective Instincts",
      "Spider-Sense"
    ],
    shortDescription: "A gritty 1933 Great Depression vigilante who punches Nazis, drinks egg creams, and cannot see colors.",
    biography: "In a black-and-white 1933 New York gripped by the Great Depression, idealistic reporter Peter Parker was bitten by an ancient spider that emerged from a smashed idol of the Spider-God. Armed with a trench coat, fedora, aviator goggles, and twin revolvers, he wages a merciless war against mob bosses, corrupt syndicates, and Nazi sympathizers in the shadows.",
    traits: [
      "Vintage fedora and tailored trench coat",
      "Brass-rimmed pilot aviator goggles",
      "Complete monochromatic color vision",
      "Hard-hitting 1930s detective noir monologues"
    ],
    image: createComicMaskSvg(
      "spider-man-noir",
      "#263238",
      "#eceff1",
      `<!-- Noir Aviator Brass Goggles with Stitched Leather Strap -->
       <ellipse cx="125" cy="142" rx="22" ry="20" fill="#cfd8dc" stroke="#ffb300" stroke-width="5"/>
       <ellipse cx="195" cy="142" rx="22" ry="20" fill="#cfd8dc" stroke="#ffb300" stroke-width="5"/>
       <line x1="147" y1="142" x2="173" y2="142" stroke="#ffb300" stroke-width="6"/>
       <!-- Glass reflection lines -->
       <line x1="115" y1="134" x2="135" y2="150" stroke="#ffffff" stroke-width="3" opacity="0.8"/>
       <line x1="185" y1="134" x2="205" y2="150" stroke="#ffffff" stroke-width="3" opacity="0.8"/>`,
      `<!-- Fedora Brim & Upturned Trench Collar -->
       <path d="M60 100 Q160 70 260 100 Q160 50 60 100 Z" fill="#182024" stroke="#000000" stroke-width="4"/>
       <path d="M80 88 C90 35, 140 28, 160 30 C180 28, 230 35, 240 88 Z" fill="#101416" stroke="#000000" stroke-width="3"/>
       <!-- Collar points -->
       <polygon points="90,220 120,255 105,275" fill="#182024" stroke="#000" stroke-width="2"/>
       <polygon points="230,220 200,255 215,275" fill="#182024" stroke="#000" stroke-width="2"/>`
    ),
    imageAlt: "Spider-Man Noir wearing fedora hat and pilot goggles in dramatic 1930s shadows",
    accentColor: "#eceff1",
    secondaryColor: "#ffb300",
    quote: "Wherever I go, the wind follows. And the wind, it smells like rain.",
    firstAppearance: "Spider-Man Noir #1 (2009)",
    stats: {
      strength: 80,
      speed: 76,
      intelligence: 88,
      durability: 84
    },
    relatedCharacterSlugs: ["peter-parker", "peni-parker", "miles-morales"]
  }
];

export const UNIVERSES = [
  { id: "all", label: "All Universes" },
  { id: "earth-1610", label: "Earth-1610 (Miles Morales)" },
  { id: "earth-616", label: "Earth-616 (Peter B. Parker)" },
  { id: "earth-65", label: "Earth-65 (Gwen Stacy)" },
  { id: "earth-928", label: "Earth-928 (Spider-Man 2099)" },
  { id: "earth-138", label: "Earth-138 (Spider-Punk)" },
  { id: "earth-50101", label: "Earth-50101 (Spider-Man India)" },
  { id: "earth-14512", label: "Earth-14512 (Peni Parker)" },
  { id: "earth-90214", label: "Earth-90214 (Spider-Man Noir)" }
];

export function getCharacterBySlug(slug: string): Character | undefined {
  return CHARACTERS.find((c) => c.slug === slug);
}

export function getRelatedCharacters(slugs: string[]): Character[] {
  return CHARACTERS.filter((c) => slugs.includes(c.slug));
}
