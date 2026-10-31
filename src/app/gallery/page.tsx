import { Metadata } from "next";
import { Suspense } from "react";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Spider-People Gallery | Spider-Verse Explorer",
  description: "Explore the multiverse and meet the Spider-People across dimensions.",
};

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-accent-cyan">Loading multiverse data...</div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}