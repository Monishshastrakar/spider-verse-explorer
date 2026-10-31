import { Metadata } from "next";
import DetailContent from "./DetailContent";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  // We can't access the data here without the slug being known at build time,
  // so we return a default metadata. The client component will handle the actual content.
  return {
    title: "Spider-Person | Spider-Verse Explorer",
    description: "Explore a Spider-Person's universe and abilities.",
  };
}

export default function DetailPage({ params }: { params: { slug: string } }) {
  return <DetailContent slug={params.slug} />;
}