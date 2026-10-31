"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";

interface SortControlProps {
  className?: string;
}

export function SortControl({ className }: SortControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sort = searchParams.get("sort") || "name";

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort === "name" ? "name-desc" : "name");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      onClick={handleSort}
      className={cn(
        "px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-gray-300 hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors flex items-center gap-2",
        className
      )}
    >
      <ArrowUpDown className="w-4 h-4" />
      <span>{sort === "name" ? "Sort: A-Z" : "Sort: Z-A"}</span>
    </motion.button>
  );
}

function cn(...classes: (string | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}