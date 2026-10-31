"use client";

import { motion } from "framer-motion";

interface PowerListProps {
  powers: string[];
  color: string;
}

export function PowerList({ powers, color }: PowerListProps) {
  return (
    <div className="space-y-3">
      {powers.map((power, i) => (
        <motion.div
          key={power}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 border border-white/5"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-gray-300 font-medium">{power}</span>
        </motion.div>
      ))}
    </div>
  );
}