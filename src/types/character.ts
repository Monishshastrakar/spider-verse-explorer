export interface CharacterStats {
  strength: number;
  speed: number;
  intelligence: number;
  durability: number;
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  alias: string;
  universeId: string;
  universeLabel: string;
  powers: string[];
  shortDescription: string;
  biography: string;
  traits: string[];
  image: string; // High-detail SVG asset path
  imageAlt: string;
  objectPosition?: string;
  accentColor: string;
  secondaryColor: string;
  quote: string;
  firstAppearance: string;
  stats: CharacterStats;
  relatedCharacterSlugs: string[];
}

export type SortOption = "name-asc" | "name-desc" | "universe-asc";
