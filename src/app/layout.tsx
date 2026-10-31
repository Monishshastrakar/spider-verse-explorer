import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MultiverseTransitionProvider } from "@/components/motion/MultiverseTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spider-Verse Explorer | One Multiverse. Infinite Spider-People.",
  description:
    "An animated, interactive multiverse experience where visitors travel across dimensions, explore canonical anomalies, and meet the Spider-Heroes anchoring the Web of Life and Destiny.",
  keywords: [
    "Spider-Verse",
    "Spider-Man",
    "Multiverse",
    "Miles Morales",
    "Spider-Gwen",
    "Spider-Man 2099",
    "Framer Motion",
    "Next.js",
    "Web Design"
  ],
  authors: [{ name: "Monish Shastrakar" }],
  openGraph: {
    title: "Spider-Verse Explorer | One Multiverse. Infinite Spider-People.",
    description: "Travel across the multiverse, filter dimensional frequencies, and meet the Spider-People.",
    type: "website",
    siteName: "Spider-Verse Explorer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#07070a] text-foreground noise-bg selection:bg-[#ff1361] selection:text-white">
        <MultiverseTransitionProvider>
          <Navbar />
          <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </MultiverseTransitionProvider>
      </body>
    </html>
  );
}
