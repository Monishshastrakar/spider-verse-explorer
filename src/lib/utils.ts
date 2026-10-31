import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "")
    .replace(/^-+/, "");
}

export function getUniverseColor(universe: string): string {
  const colors: Record<string, string> = {
    "earth-1610": "#ec407a",   // magenta - Miles
    "earth-65": "#00bcd4",     // cyan - Gwen
    "earth-616b": "#ffeb3b",   // yellow - Peter B
    "earth-928": "#9c27b0",    // purple - Miguel
    "earth-90214": "#303030",  // dark - Noir
    "earth-14512": "#ff9800",  // orange - Peni
    "earth-8311": "#795548",   // brown - Spider-Ham
    "earth-138": "#d32f2f",    // red - Spider-Punk
    "earth-50101": "#4caf50",  // green - Pavitr
    "earth-616": "#1976d2",    // blue - Jessica
  };
  return colors[universe] || "#ec407a";
}