import React from "react";
import Link from "next/link";
import { Compass, Home, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07070a] pt-32 pb-20 flex items-center justify-center relative overflow-hidden px-4">
      {/* Halftone texture */}
      <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center bg-[#0e0e16] border-4 border-black p-8 md:p-12 rounded-3xl shadow-[8px_8px_0px_#ff1361]">
        <div className="w-20 h-20 mx-auto mb-6 bg-[#ff1361]/15 border-2 border-[#ff1361] rounded-2xl flex items-center justify-center text-[#ff1361] shadow-[4px_4px_0px_#000]">
          <ShieldAlert className="w-10 h-10 animate-bounce" />
        </div>

        <div className="inline-block px-3 py-1 bg-black border border-[#00e5ff] rounded text-xs font-mono text-[#00e5ff] uppercase tracking-widest mb-3">
          Error 404: Canon Disruption
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
          Universe <span className="text-[#ff1361]">Not Found</span>
        </h1>

        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          The quantum coordinates you dialed do not match any known branch of the Web of Life and Destiny. This universe may have collapsed or experienced a fatal canon anomaly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/explore"
            className="w-full sm:w-auto px-6 py-3 bg-[#ff1361] text-white text-xs font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#00e5ff] flex items-center justify-center gap-2 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Spider-Society Registry</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#161622] text-white text-xs font-bold uppercase tracking-wider rounded-xl border-2 border-[#2b2b40] hover:border-white flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Nexus</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
