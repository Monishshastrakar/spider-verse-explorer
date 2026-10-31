"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { spiderPeople } from "@/data/spider-people";
import { useState } from "react";

const UNIVERSES = [...new Set(spiderPeople.map((p) => p.universeKey))];

interface UniverseFilterProps {
  className?: string;
}

export function UniverseFilter({ className }: UniverseFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selected = searchParams.get("universe") || "all";

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (universe: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (universe === "all") {
      params.delete("universe");
    } else {
      params.set("universe", universe);
    }
    router.push(`${pathname}?${params.toString()}`);
    setDropdownOpen(false);
  };

  const universeLabel = (key: string) => {
    const p = spiderPeople.find((sp) => sp.universeKey === key);
    return p?.universe || key;
  };

  return (
    <div className={className}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-gray-300 hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>{selected === "all" ? "All Universes" : universeLabel(selected)}</span>
        <X className="w-3 h-3 opacity-50" />
      </motion.button>

      {dropdownOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="absolute z-50 mt-2 w-48 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 py-3 border-b border-border bg-black/40"
            >
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Filter by Universe</p>
            </motion.div>
            <div className="max-h-60 overflow-y-auto">
              <button
                onClick={() => handleSelect("all")}
                className={cn(
                  "w-full px-4 py-3 text-left text-sm transition-colors hover:bg-accent-magenta/10",
                  selected === "all" ? "bg-accent-magenta/20 text-accent-magenta font-bold" : "text-gray-300 hover:text-white"
                )}
              >
                All Universes
              </button>
              {UNIVERSES.map((key) => (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={cn(
                    "w-full px-4 py-3 text-left text-sm transition-colors hover:bg-accent-magenta/10",
                    selected === key ? "bg-accent-magenta/20 text-accent-magenta font-bold" : "text-gray-300 hover:text-white"
                  )}
                >
                  {universeLabel(key)}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function cn(...classes: (string | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}