import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#14141a",
        border: "#2a2a33",
        "accent-magenta": "#ec407a",
        "accent-cyan": "#00bcd4",
        "accent-yellow": "#ffeb3b",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        geist: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "web-drift": "web-drift 8s ease-in-out infinite",
        "portal-spin": "portal-spin 2s linear infinite",
        "chromatic-shift": "chromatic-shift 0.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(236, 64, 122, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(236, 64, 122, 0.6)" },
        },
        "web-drift": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(10px, -10px) rotate(120deg)" },
          "66%": { transform: "translate(-10px, 10px) rotate(240deg)" },
          "100%": { transform: "translate(0, 0) rotate(360deg)" },
        },
        "portal-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "chromatic-shift": {
          "0%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
          "20%": { clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" },
          "40%": { clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)" },
          "60%": { clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0 90%)" },
          "80%": { clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)" },
          "100%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;