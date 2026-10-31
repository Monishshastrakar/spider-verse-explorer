"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { UNIVERSES } from "@/data/characters";
import { Globe, Filter } from "lucide-react";

interface UniverseFilterProps {
  className?: string;
}

export function UniverseFilter({ className = "" }: UniverseFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUniverse = searchParams.get("universe") || "all";

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete("universe");
    } else {
      params.set("universe", value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="absolute left-3.5 pointer-events-none text-[#ff1361]">
        <Filter className="w-4 h-4" />
      </div>

      <label htmlFor="universe-filter" className="sr-only">
        Filter Spider-People by Universe
      </label>
      <select
        id="universe-filter"
        value={currentUniverse}
        onChange={handleSelect}
        className="w-full md:w-auto pl-10 pr-9 py-2.5 bg-[#0e0e16] text-white text-xs font-bold uppercase tracking-wider rounded-lg border-2 border-[#1f1f2e] focus:border-[#00e5ff] focus:outline-none shadow-[3px_3px_0px_#000] cursor-pointer appearance-none transition-colors"
      >
        {UNIVERSES.map((u) => (
          <option key={u.id} value={u.id} className="bg-[#0e0e16] text-white">
            {u.label}
          </option>
        ))}
      </select>

      {/* Custom Dropdown Arrow */}
      <div className="absolute right-3.5 pointer-events-none text-gray-400">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
