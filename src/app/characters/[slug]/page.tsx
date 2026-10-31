import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CHARACTERS, getCharacterBySlug, getRelatedCharacters } from "@/data/characters";
import { CharacterDetailView } from "@/components/characters/CharacterDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return CHARACTERS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    return {
      title: "Character Not Found | Spider-Verse Explorer",
      description: "Dimensional anomaly: The requested Spider-Hero does not exist.",
    };
  }

  return {
    title: `${character.name} (${character.universeLabel}) | Spider-Verse Explorer`,
    description: character.shortDescription,
    openGraph: {
      title: `${character.name} - ${character.universeLabel}`,
      description: character.shortDescription,
      type: "profile",
    },
  };
}

export default async function CharacterDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const character = getCharacterBySlug(slug);
  if (!character) {
    notFound();
  }

  const related = getRelatedCharacters(character.relatedCharacterSlugs);

  // Convert resolved search params to query string to preserve gallery filters
  const queryParams = new URLSearchParams();
  Object.entries(resolvedSearchParams).forEach(([key, val]) => {
    if (typeof val === "string") {
      queryParams.set(key, val);
    }
  });

  return (
    <CharacterDetailView
      character={character}
      relatedCharacters={related}
      returnQueryString={queryParams.toString()}
    />
  );
}
