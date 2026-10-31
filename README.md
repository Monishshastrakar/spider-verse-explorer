# 🕸️ Spider-Verse Explorer | Multiverse Navigator

> An animated, interactive multi-page web application inspired by the visual design and motion aesthetics of *Spider-Man: Into the Spider-Verse* and *Across the Spider-Verse*. Built as an advanced second-year student engineering and motion design showcase.

![Spider-Verse Explorer](public/favicon.ico)

---

## 🚀 Live Demo & Links

- **GitHub Repository**: [https://github.com/Monishshastrakar/spider-verse-explorer](https://github.com/Monishshastrakar/spider-verse-explorer)
- **Local Development URL**: `http://localhost:3000`

---

## ⚡ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with React 19 & TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with customized comic-book design tokens, halftone gradients, and offset border shadows
- **Motion & Animations**: [Framer Motion](https://www.framer.com/motion/) for quantum portal transitions, scroll-triggered reveals, and 3D pointer-tilt interactions
- **Interactive Graphics**: Canvas API with `requestAnimationFrame` for responsive web threads reacting to pointer repulsion and touch float
- **Typography**: Space Grotesk & Inter (Next/Font)

---

## 📖 Key Features

### 1. Landing Page (`/`)
- **Animated Hero Section**: Editorial heading *"One Multiverse. Infinite Spider-People."*, dynamic comic tags, and a prominent *"Enter the Spider-Verse"* CTA linking to `/explore`.
- **Responsive Interactive Graphic**: Live canvas spider-web with particle nodes connecting in real-time, subtly repelling from mouse position on desktop and oscillating on touch devices.
- **Layered Comic Preview Panels**: Floating preview cards of core dimensional anchors (Miles, Gwen, Miguel) with offset angles and drop shadows.
- **Featured Characters Showcase**: Highlighted spider-heroes with live 3D card tilt and portal transitions.
- **"How to Explore" Guide**: 4-step comic strip explaining dimensional dialing, canonical sorting, quantum jumps, and dossier analysis.
- **Interactive Multiverse Radar**: Live dimension selector scanning Earth frequencies and rendering instant hero profiles.

### 2. Gallery Registry (`/explore`)
- **Complete 8+ Character Roster**: Miles Morales, Peter B. Parker, Gwen Stacy, Miguel O'Hara, Hobie Brown, Pavitr Prabhakar, Peni Parker & SP//dr, and Spider-Man Noir.
- **Universe Filtering & Sorting**: Filter by Earth designation and sort by character name (A → Z or Z → A).
- **URL Parameter Persistence**: Selections are saved directly into URL search parameters (`/explore?universe=earth-65&sort=name-asc`).
  - Refreshing, bookmarking, and browser back/forward buttons automatically restore the exact filter and sort state.
  - Unrelated query parameters are preserved.
- **Dynamic Result Count & Reset Button**: Displays active matches and allows instant filter reset.
- **Empty Results State**: Comic-styled canonical disruption illustration when zero matches are found.

### 3. Character Detail Dossiers (`/characters/[slug]`)
- **Dedicated Dynamic Routes**: Direct URL routes for all heroes (e.g., `/characters/miles-morales`, `/characters/gwen-stacy`).
- **Rich Dossier Breakdown**:
  - High-detail custom original SVG character portrait.
  - Full superhero alias, canonical universe, and comic debut.
  - In-depth origin biography and canonical lore.
  - Powers & abilities list with glowing visual indicators.
  - Distinctive visual traits and equipment.
  - Dimensional Combat Analysis bars (Strength, Agility, Intelligence, Durability).
  - Related Multiversal Network links with one-click portal jumps.
- **State Preservation**: The *"Back to Explore Registry"* link preserves previous filter and sort query parameters.
- **Polished 404 Anomaly Page**: Unknown slugs route to a custom comic-styled *"404 Universe Not Found"* recovery screen.

### 4. Required "Multiverse Jump" Transition
- When opening any hero dossier from cards, featured banners, or related hero links:
  1. An expanding radial comic portal bursts open from the center.
  2. Chromatic aberration glitch bars slide across the screen.
  3. Quantum HUD callout announces target universe coordinates.
  4. Next.js router navigates to the target character route and smoothly dissolves into the detail view.
- Reusable `MultiverseTransitionProvider` context and `MultiverseJumpLink` component.
- Prevents repeated click activations while animating.
- Preserves native modifier clicks (`Cmd/Ctrl/Middle click` opens normally in new tabs).
- Respects `prefers-reduced-motion` with an instant subtle fade.

---

## 📂 Project Directory Structure

```text
spider-verse-explorer/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── characters/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Dynamic character detail route
│   │   ├── explore/
│   │   │   └── page.tsx            # /explore gallery page with Suspense
│   │   ├── globals.css             # Tailwind v4 import
│   │   ├── layout.tsx              # Root layout with MultiverseTransitionProvider
│   │   ├── not-found.tsx           # Custom 404 Canon Disruption page
│   │   └── page.tsx                # Landing page (/)
│   ├── components/
│   │   ├── characters/
│   │   │   ├── CharacterCard.tsx   # 3D tilting comic card with jump link
│   │   │   ├── CharacterDetailView.tsx # Full detail dossier UI
│   │   │   └── CharacterGrid.tsx   # Filtered grid with count badge & empty state
│   │   ├── filters/
│   │   │   ├── SortControl.tsx     # Toggle sort order (A-Z, Z-A)
│   │   │   └── UniverseFilter.tsx  # Universe select dropdown
│   │   ├── graphics/
│   │   │   └── AnimatedWeb.tsx     # Responsive canvas web graphic with pointer repulsion
│   │   ├── home/
│   │   │   ├── FeaturedSection.tsx # Featured heroes showcase
│   │   │   ├── HeroSection.tsx     # Animated hero section
│   │   │   ├── HowToExploreSection.tsx # Comic-strip guide
│   │   │   └── MultiverseRadarSection.tsx # Interactive dimension radar
│   │   ├── layout/
│   │   │   ├── Footer.tsx          # Project info & attribution links
│   │   │   └── Navbar.tsx          # Responsive navbar with accessible skip-link
│   │   └── motion/
│   │       ├── MultiverseTransition.tsx # Portal transition provider & hook
│   │       └── ScrollReveal.tsx    # Accessible scroll animation
│   ├── data/
│   │   └── characters.ts           # Typed local dataset with original SVG art
│   ├── styles/
│   │   └── globals.css             # Comic styles, halftone patterns & keyframes
│   └── types/
│       └── character.ts            # TypeScript interfaces
├── scripts/
│   └── test-filter-sort.mjs        # Unit test suite for dataset, filter, & sort
├── next.config.ts                  # Redirects & compiler options
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🛠️ Local Setup & Commands

### Prerequisites
- Node.js `18.x` or higher (tested on Node `v24.19.0`)
- npm `9.x` or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/Monishshastrakar/spider-verse-explorer.git
cd spider-verse-explorer

# Install dependencies
npm install
```

### Running Locally
```bash
# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Automated Tests
```bash
# Run unit test suite (dataset validation, filtering, sorting, slug lookups)
npm test
```

### Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server locally
npm start
```

---

## 🧩 How It Works

### How to Add a Character
1. Open `src/data/characters.ts`.
2. Add a new object to the `CHARACTERS` array adhering to the `Character` type:
```typescript
{
  id: "hobgoblin-2099",
  slug: "hobgoblin-2099",
  name: "Robin Borne",
  alias: "Hobgoblin 2099",
  universeId: "earth-928",
  universeLabel: "Earth-928",
  powers: ["Time Manipulation", "Sonic Disruptors", "Cybernetic Wings"],
  shortDescription: "A chrono-displaced warrior battling the Spider-Society across timelines.",
  biography: "Full character history...",
  traits: ["Chrono-displacement gauntlet", "Hard-light holographic gliders"],
  image: createComicMaskSvg("hobgoblin-2099", "#ff9800", "#7b1fa2", "...eyeMarkup"),
  imageAlt: "Hobgoblin 2099 portrait in cybernetic armor",
  accentColor: "#ff9800",
  secondaryColor: "#7b1fa2",
  quote: "Time is not a web. It is a noose.",
  firstAppearance: "Spider-Man 2099 #38 (1995)",
  stats: { strength: 80, speed: 85, intelligence: 92, durability: 78 },
  relatedCharacterSlugs: ["miguel-ohara"]
}
```
3. If this character introduces a new universe, add it to `UNIVERSES` in `src/data/characters.ts`.
4. The page `/characters/hobgoblin-2099` is automatically statically generated on the next build!

### How URL Filtering Works
- The `UniverseFilter` and `SortControl` components read state via Next.js `useSearchParams()` and push updates to `useRouter()`.
- Updating the universe filter or sort direction creates a clean `URLSearchParams` instance, preserves unrelated parameters, and pushes the new URL (e.g. `/explore?universe=earth-65&sort=name-asc`).
- `CharacterGrid` memoizes the filtered and sorted list using `useMemo([selectedUniverse, selectedSort])`.
- On browser back/forward or bookmark loading, Next.js re-renders with the matching query parameters.

### How the Multiverse Transition Works
- `MultiverseTransitionProvider` in `src/app/layout.tsx` manages global state (`isJumping`, `activeCharacter`).
- When a user clicks `MultiverseJumpLink`:
  - Standard clicks trigger `triggerJump(character, targetUrl)`.
  - An expanding radial portal overlay mounts with chromatic aberration glitch bars.
  - After 420ms, `router.push(targetUrl)` navigates to the character detail page.
  - After 850ms, the portal dissolves, revealing the newly loaded dossier.
  - If the user held `Cmd`/`Ctrl` or middle-clicked, native browser behavior opens the link in a new tab without blocking.

### Accessibility & Reduced Motion
- **Skip Link**: An accessible `"Skip to main content"` link appears at the top on keyboard focus (`Tab`).
- **Focus Indicators**: Visible cyan outlines (`:focus-visible`) for all interactive buttons, cards, and dropdowns.
- **Semantic HTML**: Proper heading hierarchy (`h1` → `h2` → `h3`), `<main id="main-content">`, `<header>`, `<footer>`, `<nav>`.
- **Keyboard Navigation**: Mobile navigation supports keyboard focus, closes on `Escape`, and traps scrolling.
- **Prefers Reduced Motion**:
  - `AnimatedWeb` renders a single static, lightweight web layout.
  - `MultiverseJumpLink` bypasses the expanding portal and executes a direct, subtle fade navigation.
  - 3D card tilt and glitch animations are disabled when reduced motion is preferred.

---

## 🎨 Asset Sources & Attribution

- **Original Character Vector Illustrations**: All mask and character illustrations were designed and coded specifically for this project as procedural SVGs. No copyrighted movie assets or unauthorized static downloads were used.
- **Icons**: [Lucide React](https://lucide.dev/) (ISC License).
- **Character Lore & Continuity**: Based on Marvel Comics canon designations (*Edge of Spider-Verse*, *Spider-Man: Across the Spider-Verse*). Spider-Man and related characters are trademarks of Marvel Characters, Inc. This application is an educational student project.

---

## 🚢 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub:
   ```bash
   git push origin master
   ```
2. Navigate to [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import the `spider-verse-explorer` repository.
4. Framework preset will automatically be detected as **Next.js**.
5. Click **Deploy**. Vercel will run `npm run build` and provision your live global CDN URL.

### Deploy to Netlify
1. Connect your repository in [Netlify Dashboard](https://app.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `.next`

---

## ✅ Requirement Completion Checklist

| Requirement | Status | Implementation Details |
|---|---|---|
| **Tech Stack** | ✅ COMPLETE | Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion |
| **Visual Direction** | ✅ COMPLETE | Comic panels, halftone patterns, offset borders, glitch accents, electric cyan/magenta/yellow |
| **Landing Page (`/`)** | ✅ COMPLETE | Hero *"One Multiverse. Infinite Spider-People."*, CTA button, featured section, how-to-explore, footer |
| **Gallery Page (`/explore`)** | ✅ COMPLETE | 8+ characters, name, universe, powers, image, detail link, result count badge, reset button, empty state |
| **URL Parameter Persistence** | ✅ COMPLETE | Filter (`?universe=...`) and sort (`?sort=...`) persisted, restored on refresh/back/forward |
| **Detail Pages (`/characters/[slug]`)**| ✅ COMPLETE | Real dynamic routes, large image, name/alias, universe, bio, powers, traits, combat stats, related heroes |
| **Return State Preservation** | ✅ COMPLETE | *"Back to Explore Registry"* preserves previous filter and sort query parameters |
| **Polished 404 Page** | ✅ COMPLETE | Custom comic-styled `not-found.tsx` for unknown character slugs with recovery navigation |
| **Multiverse Jump Transition** | ✅ COMPLETE | Radial comic portal, web rings, chromatic aberration, reusable provider, reduced-motion fallback |
| **Responsive Interactive Graphic**| ✅ COMPLETE | Canvas spider-web adapting to screen size, pointer repulsion, touch float, visibility pause, reduced motion |
| **Accessibility (a11y)** | ✅ COMPLETE | Skip-to-content link, focus-visible states, keyboard-closable mobile menu with Escape listener |
| **Automated Tests** | ✅ COMPLETE | `npm test` verifying schema integrity, filtering, sorting, and slug resolution |
| **Production Build** | ✅ COMPLETE | `npm run build` passes with zero errors; all 14 static and dynamic routes prerendered |
