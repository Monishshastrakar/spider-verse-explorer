import { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";

export const metadata: Metadata = {
  title: "Spider-Verse Explorer | Travel Across the Multiverse",
  description: "Explore the Spider-Verse and meet Spider-People across dimensions.",
};

export default function LandingPage() {
  return <Hero />;
}
