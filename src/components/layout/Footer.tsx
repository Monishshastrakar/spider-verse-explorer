"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Heart, ShieldAlert, Sparkles } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Hide the footer on full-screen 3D experiences (such as the 3D Multiverse Hub)
  if (pathname?.startsWith("/multiverse")) {
    return null;
  }

  return (
    <footer className="border-t-2 border-[#1f1f2e] bg-[#07070a] pt-10 pb-8 text-gray-400 relative overflow-hidden" role="contentinfo">
      {/* Subtle halftone background */}
      <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Project */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#ff1361] border-2 border-black rounded flex items-center justify-center shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                SPIDER<span className="text-[#ff1361]">VERSE</span> EXPLORER
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mt-1">
              A 2nd-year student engineering and motion design project exploring Next.js, Framer Motion, and comic-book graphic aesthetics. Built to showcase multiversal filtering, quantum portal jumps, and accessible interactive animation.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mt-2">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
              <span>Dimensional Quantum Stabilizer: ONLINE</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4 border-b border-[#2a2a3e] pb-2">
              Dimensions & Routes
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-[#00e5ff] transition-colors">
                  Multiverse Nexus (Home)
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#00e5ff] transition-colors">
                  Spider-Society Gallery (/explore)
                </Link>
              </li>
              <li>
                <Link href="/characters/miles-morales" className="hover:text-[#00e5ff] transition-colors">
                  Miles Morales Dossier
                </Link>
              </li>
              <li>
                <Link href="/characters/gwen-stacy" className="hover:text-[#00e5ff] transition-colors">
                  Spider-Gwen Dossier
                </Link>
              </li>
              <li>
                <Link href="/characters/miguel-ohara" className="hover:text-[#00e5ff] transition-colors">
                  Spider-Man 2099 Dossier
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Stack & Attribution */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4 border-b border-[#2a2a3e] pb-2">
              Architecture & Credits
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5">
                <span className="text-[#ff1361]">✦</span> Next.js 16 (App Router)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#00e5ff]">✦</span> Tailwind CSS + Motion
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#ffe600]">✦</span> Custom SVG Character Art
              </li>
              <li>
                <a
                  href="https://github.com/Monishshastrakar/spider-verse-explorer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#00e5ff] transition-colors font-bold mt-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Lore Attribution Notice */}
        <div className="border-t border-[#1a1a28] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            Spider-Man and all associated characters are trademarks of Marvel Characters, Inc. Built strictly as an educational student project.
          </p>
          <p className="flex items-center gap-1 text-gray-400">
            Crafted for Second-Year Web Development Showcase
          </p>
        </div>
      </div>
    </footer>
  );
}