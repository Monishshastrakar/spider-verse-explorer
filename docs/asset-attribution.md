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
| **Civilian Explorer (Xbot)** | `/models/civilian_xbot.glb` | Three.js Project (mrdoob / Mixamo) | MIT / CC0 Compatible | **Rigged GLB** | 70 skeletal joints; clips: `idle`, `walk`, `run`, `agree`, `headShake`. Used as the authoritative civilian avatar. |
| **Tactical Vanguard (Soldier)** | `/models/soldier.glb` | Three.js Project (mrdoob / Mixamo) | MIT / CC0 Compatible | **Rigged GLB** | 68 skeletal joints; clips: `Idle`, `Walk`, `Run`, `TPose`. Used for skeletal animation validation. |
| **Miles Morales (Earth-1610)** | `/models/miles_morales.glb` | Stylized Bespoke Skinned Rig (Three.js pipeline) | Educational / MIT | **Rigged GLB** | Scaled to 1.73m; black compression suit with spray-paint chest emblem and red side-stripe accents. |
| **Peter B. Parker (Earth-616)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Classic red/blue suit palette; awaiting final production GLB import. |
| **Gwen Stacy (Earth-65)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | White hood, teal inner lining, magenta side bands, ballet slippers. |
| **Miguel O'Hara (Earth-928)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Imposing muscular silhouette (1.15x scale), crimson skull chestplate, hard-light arm talons. |
| **Hobie Brown (Earth-138)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Spiked chrome mohawk studs, denim punk vest, Gibson guitar mount. |
| **Pavitr Prabhakar (Earth-50101)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Flowing dark hair, film-accurate blue draped dhoti, gold bangles. |
| **SP//dr Mech (Earth-14512)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | Spherical titanium chassis (1.25x scale), cyan LED visor, dual arm cannons. |
| **Spider-Man Noir (Earth-90214)** | Configured in `character-models.ts` | Stylized Bespoke Rig | Educational / MIT | **Verified Temporary** | 1933 Great Depression detective trench coat, fedora, aviator goggles. |

---

## 3. Character Vector Artwork (HUD & Dossier)
- Handcrafted SVG portraits located in `/public/images/characters/*.svg`.
- Bespoke vector geometry created specifically for this student project adhering strictly to film reference silhouettes and mask geometry.
- No copyrighted third-party image files or extracted film frames are stored or scraped.
