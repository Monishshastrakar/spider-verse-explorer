"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Sparkles } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/#featured", label: "Featured" },
    { href: "/#lore", label: "Multiverse Lore" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/explore") return pathname === "/explore" || pathname === "/gallery";
    return false;
  };

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#1f1f2e] bg-[#07070a]/90 backdrop-blur-md"
        role="banner"
      >
        <div className="container mx-auto px-4 h-18 flex items-center justify-between">
          {/* Comic Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#00e5ff]"
            aria-label="Spider-Verse Explorer Home"
          >
            <div className="relative w-10 h-10 bg-[#ff1361] border-2 border-black rounded-lg flex items-center justify-center shadow-[3px_3px_0px_#000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#000] transition-all">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white leading-none">
                SPIDER<span className="text-[#ff1361]">VERSE</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#00e5ff] uppercase">
                Multiverse Explorer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold tracking-wide uppercase transition-colors py-1 relative ${
                    active
                      ? "text-[#00e5ff]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]"
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/explore"
              className="group relative px-5 py-2.5 bg-[#ff1361] text-white text-xs font-black uppercase tracking-wider rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#00e5ff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              <span>Explore All</span>
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white bg-[#14141f] border border-[#2a2a3e] rounded-lg focus-visible:outline-2 focus-visible:outline-[#00e5ff]"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6 text-[#ff1361]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-b border-[#2a2a3e] bg-[#0c0c14] overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-bold py-2 px-3 rounded-lg border transition-colors ${
                      isActive(link.href)
                        ? "bg-[#ff1361]/15 text-[#ff1361] border-[#ff1361]/30"
                        : "text-gray-200 border-transparent hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/explore"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 w-full py-3 bg-[#ff1361] text-white text-center font-black uppercase text-sm rounded-lg border-2 border-black shadow-[3px_3px_0px_#000]"
                >
                  Enter the Spider-Verse
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}