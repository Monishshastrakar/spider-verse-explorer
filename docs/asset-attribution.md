# Asset Attribution & Licensing Ledger

This ledger records the provenance, licensing terms, verification status, and quality classification for every 3D asset, skeletal rig, and texture in the Spider-Verse Explorer.

---

## 1. Quality Status Classifications

- **`Rigged GLB`**: Skinned 3D mesh with internal skeletal hierarchy, bone weight deformation, and embedded skeletal animation clips (`idle`, `walk`, `run`, `jump`).
- **`Verified Temporary Proxy`**: Explicitly labeled temporary test geometry utilized to test physical collisions, camera follow, and interaction state machines while production-grade licensed character meshes are prepared. Never presented as finished assets.

---

## 2. Asset Provenance Ledger

| Asset Identifier | Asset File Path | Source / Creator | License Terms | Model Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Miles Morales (Earth-1610)** | `/models/miles_morales.glb` | IIM Digital School *Diimensions* Project (Ayman Benammour et al.) | Educational / Non-Commercial (Student Research & Fan Project) | **Rigged Skinned GLB** | 33,042 triangles, 18,460 vertices; 65 bones; clips: `idle`, `walk`, `run`, `jump`, `emote1-3`. 1024x1024 UV texture atlas with spray-paint chest emblem, back spider, red flank racing stripes, sharp white mask lenses, and red eye contours. |
| **Miguel O'Hara (Earth-928)** | `/models/miguel_ohara.glb` | IIM Digital School *Diimensions* Project | Educational / Non-Commercial | **Rigged Skinned GLB** | 4.62MB, 33 bones; clips: `idle`, `walk`, `run`, `jump`, `emote1-3`. Imposing 1.95m muscular V-taper, textured dark navy suit, crimson skull chestplate, hard-light arm talons. |
| **Peter B. Parker (Earth-616)** | `/models/spiderman_classic.glb` | Bespoke Classic Spider-Man Skinned Rig | Educational / MIT | **Rigged Skinned GLB** | 8.49MB, 65 bones; clips: `idle`, `walk`, `run`. Segmented adult frame (1.81m), classic red/blue suit, embossed webbing, bold lenses. |
| **Civilian Explorer (Xbot / Urban)** | `/models/civilian_xbot.glb` | Three.js Project (mrdoob / Mixamo) | MIT / CC0 Compatible | **Rigged Skinned GLB** | 70 skeletal joints; clips: `idle`, `walk`, `run`. Athletic human build with windbreaker, sneakers, glowing kinetic joints. |
| **Gwen Stacy (Earth-65)** | `/models/miles_morales.glb` (Agile Rig) | IIM Digital School Base Skinned Rig | Educational / Non-Commercial | **Rigged Skinned Rig** | 65 bones, athletic feminine frame, Ghost-Spider white/midnight suit, volumetric 3D hood, ballet slippers. |
| **Hobie Brown (Earth-138)** | `/models/miles_morales.glb` (Punk Rig) | IIM Digital School Base Skinned Rig | Educational / Non-Commercial | **Rigged Skinned Rig** | 65 bones, tall lanky frame (1.07x Y), chrome spiked mohawk studs, punk styling. |
| **Pavitr Prabhakar (Earth-50101)** | `/models/miles_morales.glb` (Martial Rig) | IIM Digital School Base Skinned Rig | Educational / Non-Commercial | **Rigged Skinned Rig** | 65 bones, athletic martial build, Indian Spider-Man suit styling, gold bangles. |
| **Spider-Man Noir (Earth-90214)** | `/models/miles_morales.glb` (Noir Rig) | IIM Digital School Base Skinned Rig | Educational / Non-Commercial | **Rigged Skinned Rig** | 65 bones, Great Depression chiaroscuro styling, fedora hat, trench coat. |
| **SP//dr Mech (Earth-14512)** | Configured in `character-models.ts` | Bespoke SP//dr Rig | Educational / MIT | **Verified Temporary** | Spherical titanium chassis (1.25x scale), cyan LED visor, dual arm cannons. |

---

## 3. Character Vector Artwork (HUD & Dossier)
- Handcrafted SVG portraits located in `/public/images/characters/*.svg`.
- Bespoke vector geometry created specifically for this student project adhering strictly to film reference silhouettes and mask geometry.
- No copyrighted third-party image files or extracted film frames are stored or scraped.
