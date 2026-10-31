import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { HowToExploreSection } from "@/components/home/HowToExploreSection";
import { MultiverseRadarSection } from "@/components/home/MultiverseRadarSection";

export const metadata: Metadata = {
  title: "Spider-Verse Explorer | One Multiverse. Infinite Spider-People.",
  description:
    "An animated multi-page explorer where visitors travel across the multiverse, filter dimensional frequencies, and meet the Spider-People.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <FeaturedSection />
      <HowToExploreSection />
      <MultiverseRadarSection />
    </div>
  );
}
