"use client";

import { SpiderCard } from "@/components/gallery/SpiderCard";
import { UniverseFilter } from "@/components/gallery/UniverseFilter";
import { SortControl } from "@/components/gallery/SortControl";
import { spiderPeople } from "@/data/spider-people";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/hero/ScrollReveal";
import { motion } from "framer-motion";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function GalleryContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const universeFilter = searchParams.get("universe") || "all";
  const sort = searchParams.get("sort") || "name";

  const filteredPeople = useMemo(() => {
    let list = [...spiderPeople];
    if (universeFilter !== "all") {
      list = list.filter((p) => p.universeKey === universeFilter);
    }
    if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
  }, [universeFilter, sort]);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent-magenta/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <Container>
        <ScrollReveal className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2"
              >
                Spider-People
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-400 text-sm"
              >
                {filteredPeople.length} Spider-People across the multiverse
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
              <UniverseFilter className="w-full md:w-auto" />
              <SortControl className="w-full md:w-auto" />
            </div>
          </div>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPeople.map((person) => (
            <SpiderCard key={person.slug} person={person} />
          ))}
        </div>

        {filteredPeople.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Spider-People found</h3>
            <p className="text-gray-400 text-sm mb-6">Try adjusting your filters to discover more dimensions.</p>
            <button
              onClick={() => router.push(pathname)}
              className="px-6 py-2 bg-accent-magenta text-white text-sm font-bold rounded-full hover:bg-pink-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}