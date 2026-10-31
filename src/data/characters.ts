import type { Character } from "../types/character.ts";

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
    image: "/images/characters/miles-morales.svg",
    imageAlt: "Miles Morales in black and red Spider-Man suit with red spray-paint emblem and venom sparks",
    objectPosition: "center 38%",
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
    image: "/images/characters/peter-parker.svg",
    imageAlt: "Peter B. Parker in classic red and blue Spider-Man suit with black webbing and bold lenses",
    objectPosition: "center 36%",
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
    image: "/images/characters/gwen-stacy.svg",
    imageAlt: "Gwen Stacy in signature white hooded Spider-Gwen suit with neon magenta and cyan lining",
    objectPosition: "center 35%",
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
    image: "/images/characters/miguel-ohara.svg",
    imageAlt: "Miguel O'Hara Spider-Man 2099 in dark blue suit with crimson fanged skull emblem and arm talons",
    objectPosition: "center 36%",
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
    image: "/images/characters/hobie-brown.svg",
    imageAlt: "Hobie Brown Spider-Punk with chrome spiked mohawk, denim vest, and anarchy badge",
    objectPosition: "center 34%",
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
    image: "/images/characters/pavitr-prabhakar.svg",
    imageAlt: "Pavitr Prabhakar Spider-Man India with stylized hair, gold filigree webbing, and red mask",
    objectPosition: "center 35%",
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
    image: "/images/characters/peni-parker.svg",
    imageAlt: "Peni Parker anime pilot alongside SP//dr biomechanical red spider-mech with cyan LED visor",
    objectPosition: "center 32%",
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
    image: "/images/characters/spider-man-noir.svg",
    imageAlt: "Spider-Man Noir in 1933 fedora hat, upturned trench coat, and brass aviator goggles",
    objectPosition: "center 34%",
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
