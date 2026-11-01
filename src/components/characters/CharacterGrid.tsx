"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CHARACTERS } from "@/data/characters";
import { CharacterCard } from "./CharacterCard";
import { UniverseFilter } from "@/components/filters/UniverseFilter";
import { SortControl } from "@/components/filters/SortControl";
import { RotateCcw, SearchX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CharacterGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedUniverse = searchParams.get("universe") || "all";
  const selectedSort = searchParams.get("sort") || "name-asc";

  // Filter and sort characters
  const filteredAndSorted = useMemo(() => {
    let result = [...CHARACTERS];

    // Filter by universeId
    if (selectedUniverse && selectedUniverse !== "all") {
      result = result.filter(
        (c) => c.universeId.toLowerCase() === selectedUniverse.toLowerCase()
      );
    }

    // Sort by name
    if (selectedSort === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // Default: name-asc
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedUniverse, selectedSort]);

  const hasActiveFilters = selectedUniverse !== "all" || selectedSort !== "name-asc";

  const handleResetFilters = () => {
    // Preserve any unrelated query parameters if present, or clear universe & sort
    const params = new URLSearchParams(searchParams.toString());
    params.delete("universe");
    params.delete("sort");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="mb-6 p-4 md:p-5 bg-[#0c0c14] border-2 border-[#1f1f2e] rounded-2xl shadow-[4px_4px_0px_#000] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Results Count & Badges */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ff1361]/20 border border-[#ff1361] flex items-center justify-center text-[#ff1361]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase text-white tracking-wider">
              Multiverse Registry
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Displaying <span className="text-[#00e5ff] font-bold">{filteredAndSorted.length}</span> of{" "}
              {CHARACTERS.length} Spider-Heroes
            </p>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <UniverseFilter />
          <SortControl />

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-2.5 bg-[#1a1a26] text-gray-300 text-xs font-bold uppercase rounded-lg border border-[#2e2e42] hover:text-white hover:border-[#ff1361] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#ff1361]" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Characters */}
      {filteredAndSorted.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filteredAndSorted.map((character) => (
              <motion.div
                key={character.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <CharacterCard
                  character={character}
                  currentQueryString={searchParams.toString()}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="my-16 p-12 text-center bg-[#0c0c14] border-2 border-dashed border-[#262638] rounded-2xl max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#ff1361]/10 rounded-full flex items-center justify-center border border-[#ff1361]/30">
            <SearchX className="w-8 h-8 text-[#ff1361]" />
          </div>
          <h3 className="text-xl font-black uppercase text-white tracking-tight mb-2">
            No Canonical Anomalies Found
          </h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            No Spider-People were detected matching universe frequency{" "}
            <span className="text-[#00e5ff] font-mono">"{selectedUniverse}"</span>. Adjust your filter to recalibrate.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#ff1361] text-white text-xs font-black uppercase tracking-wider rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#00e5ff] transition-all cursor-pointer"
          >
            Reset Dimensional Filter
          </button>
        </div>
      )}
    </div>
  );
}
