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
| **Miles Morales (Earth-1610)** | `/models/miles_morales.glb` | IIM Digital School *Diimensions* Project (Ayman Benammour, Maxime Baron, Enas El Mershati, Mylène M'Zali, Yann Decelle) | Educational / Non-Commercial (Student Research & Fan Project) | **Rigged Skinned GLB** | 33,042 triangles, 18,460 vertices; 65 bones; clips: `idle`, `walk`, `run`, `jump`, `emote1-3`. 1024x1024 UV texture atlas with spray-paint chest emblem, back spider, red flank racing stripes, sharp white mask lenses, and red eye contours. Fully audited in `docs/character-model-audit.md`. |
| **Civilian Explorer (Xbot / Urban)** | `/models/civilian_xbot.glb` / Procedural Urban Rig | Three.js Project (mrdoob / Mixamo) + Bespoke Urban Rig | MIT / CC0 Compatible | **Rigged Skinned Avatar** | 70 skeletal joints; clips: `idle`, `walk`, `run`. Athletic civilian build with windbreaker, hood, sneakers. |
| **Tactical Vanguard (Soldier)** | `/models/soldier.glb` | Three.js Project (mrdoob / Mixamo) | MIT / CC0 Compatible | **Rigged GLB** | 68 skeletal joints; clips: `Idle`, `Walk`, `Run`, `TPose`. Used for skeletal animation validation. |
| **Peter B. Parker (Earth-616)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Classic red/blue suit palette; awaiting final production GLB import. |
| **Gwen Stacy (Earth-65)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | White hood, teal inner lining, magenta side bands, ballet slippers; awaiting final production GLB import. |
| **Miguel O'Hara (Earth-928)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Imposing muscular silhouette (1.15x scale), crimson skull chestplate, hard-light arm talons; awaiting final production GLB import. |
| **Hobie Brown (Earth-138)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Spiked chrome mohawk studs, denim punk vest, Gibson guitar mount; awaiting final production GLB import. |
| **Pavitr Prabhakar (Earth-50101)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Flowing dark hair, film-accurate blue draped dhoti, gold bangles; awaiting final production GLB import. |
| **SP//dr Mech (Earth-14512)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Spherical titanium chassis (1.25x scale), cyan LED visor, dual arm cannons; awaiting final production GLB import. |
| **Spider-Man Noir (Earth-90214)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | 1933 Great Depression detective trench coat, fedora, aviator goggles; awaiting final production GLB import. |

---

## 3. Character Vector Artwork (HUD & Dossier)
- Handcrafted SVG portraits located in `/public/images/characters/*.svg`.
- Bespoke vector geometry created specifically for this student project adhering strictly to film reference silhouettes and mask geometry.
- No copyrighted third-party image files or extracted film frames are stored or scraped.
