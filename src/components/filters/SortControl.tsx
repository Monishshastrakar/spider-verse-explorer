"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

interface SortControlProps {
  className?: string;
}

export function SortControl({ className = "" }: SortControlProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "name-asc";

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "name-asc") {
      params.set("sort", "name-asc");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const toggleQuickSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    const nextSort = currentSort === "name-asc" ? "name-desc" : "name-asc";
    params.set("sort", nextSort);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <button
        type="button"
        onClick={toggleQuickSort}
        className="w-full md:w-auto px-4 py-2.5 bg-[#0e0e16] text-white text-xs font-bold uppercase tracking-wider rounded-lg border-2 border-[#1f1f2e] hover:border-[#00e5ff] focus:border-[#00e5ff] focus:outline-none shadow-[3px_3px_0px_#000] flex items-center gap-2 transition-colors cursor-pointer"
        aria-label={`Toggle name sort order. Current order: ${currentSort === "name-asc" ? "A to Z" : "Z to A"}`}
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-[#00e5ff]" />
        <span>Sort: {currentSort === "name-asc" ? "Name (A → Z)" : "Name (Z → A)"}</span>
      </button>
    </div>
  );
}
