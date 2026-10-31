# Spider-Verse Explorer — Character Model & Pipeline Audit

**Audit Date**: November 2026  
**Auditor**: Antigravity Technical Art & Graphics Engineering Team  
**Continuity Target**: Sony Pictures Animation *Spider-Verse* Series (*Into the Spider-Verse* & *Across the Spider-Verse*)

---

## 1. Executive Summary & Root Cause Analysis

The user reported that existing characters appeared "blocky and toy-like." An exhaustive inspection of the source geometry, rigging, material pipelines, and rendering passes revealed the following primary root causes:

1. **Primitive-Based Construction in Avatar Fallback**:
   - `PlayerAvatar.tsx` utilized unskinned primitive shapes (`<boxGeometry args={[0.42, 0.54, 0.24]}>` for torsos, `<sphereGeometry>` for heads, and `<capsuleGeometry>` for limbs).
   - These discrete geometric primitives lacked anatomical rib-cage contour, pelvis taper, clavicle slope, and articulated joints, causing visible intersection gaps and a toy-mannequin aesthetic.
2. **Material Overwrite Bug on Skinned Meshes**:
   - In `SkinnedModelAvatar.tsx`, whenever a GLB model was loaded, all mesh children were traversed and their materials were forcibly replaced with a generic monochrome `MeshStandardMaterial` (`#0d0d12`).
   - This stripped out embedded texture atlases, normal maps, specular maps, and eye-lens separations, turning potentially detailed models into featureless matte silhouettes.
3. **Double-Armature Scale Bug on Standard Rigs**:
   - The Three.js Xbot model contains an internal `Armature` node scaled to `0.01` while joint positions are authored in centimeters (`mixamorigHips.y = 104`).
   - Applying an external `0.01` scale multiplier collapsed the model to $0.0001$ ($0.18\text{mm}$), rendering it invisible and forcing the application back to primitive boxes.
4. **Missing Eye-Lens Contours & Chest Graphic Separation**:
   - Mask eye lenses were drawn as flat boxes or spheres without the iconic Spider-Verse angular black/red rim geometry.
   - The chest spider emblem was rendered as a floating `PlaneGeometry` quad hovering $12\text{cm}$ in front of the chest, which clipped during walk/run forward leaning.

---

## 2. Character Model Audit Matrix

| Character | Source Asset | Attribution & Terms | Triangles | Materials | Textures | Skeleton & Joints | Animation Clips | Proportions & Silhouette | Quality Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Miles Morales (Earth-1610)** | `/models/miles_morales.glb` | IIM Digital School *Diimensions* Project (Ayman Benammour et al.); Educational / Non-Commercial | **33,042** | **3 PBR Materials** (`HEAD`, `HEAD.001`, `material_0`) | **1024×1024 sRGB PNG** (30KB UV atlas with spray-paint chest emblem, back spider, racing stripes) | **65-joint Mixamo Armature** with individual fingers (Thumb, Index, Middle, Ring, Pinky 1–4) | Embedded clips: `idle` (3.08s), `walk` (1.05s), `run` (0.65s), `jump` (2.38s), `emote1-3` | Lean athletic teenage build ($1.644\text{m}$ height, grounded at $Y=0.00\text{m}$, narrow waist, agile runner limbs) | **Rigged Skinned GLB (Production Quality)** |
| **Civilian Explorer** | `/models/civilian_xbot.glb` + Bespoke Urban Rig | Three.js Project (mrdoob / Mixamo); MIT / CC0 Compatible | 2,800 (mesh) | 2 Materials | Vertex colors / PBR | 70 joints | `idle`, `walk`, `run` | Contemporary urban windbreaker, athletic build ($1.72\text{m}$) | **Articulated Mesh / Skinned GLB** |
| **Peter B. Parker (Earth-616)** | `/models/soldier.glb` (Proxy) | Three.js Project (mrdoob); MIT | 6,400 | 2 Materials | Visor PBR | 68 joints | `Idle`, `Walk`, `Run` | Tactical proxy frame; awaiting dedicated classic red/blue adult rig | **Verified Temporary Proxy** |
| **Gwen Stacy (Earth-65)** | Configured in `character-models.ts` | Bespoke Procedural Rig | ~2,400 | 2 Materials | Untextured | Articulated hierarchy | Procedural swing | Volumetric hood, ballet slippers ($1.62\text{m}$); awaiting production GLB | **Verified Temporary Proxy** |
| **Miguel O'Hara (Earth-928)** | Configured in `character-models.ts` | Bespoke Muscular Rig | ~3,200 | 2 Materials | Untextured | Articulated hierarchy | Procedural heavy | Heavy muscular V-taper ($1.95\text{m}$, 1.15x scale); awaiting production GLB | **Verified Temporary Proxy** |
| **Hobie Brown (Earth-138)** | Configured in `character-models.ts` | Bespoke Punk Rig | ~2,800 | 3 Materials | Untextured | Articulated hierarchy | Procedural energetic | Tall lanky frame ($1.88\text{m}$), spiked mohawk studs; awaiting production GLB | **Verified Temporary Proxy** |
| **Pavitr Prabhakar (Earth-50101)**| Configured in `character-models.ts` | Bespoke Martial Rig | ~2,600 | 2 Materials | Untextured | Articulated hierarchy | Procedural agile | Flowing dark hair, blue pleated dhoti, gold bangles; awaiting production GLB | **Verified Temporary Proxy** |
| **SP//dr Mech (Earth-14512)** | Configured in `character-models.ts` | Bespoke SP//dr Rig | ~3,600 | 3 Materials | Untextured | Articulated mech joints | Procedural mechanical | Spherical titanium chassis ($2.3\text{m}$, 1.25x scale); awaiting production GLB | **Verified Temporary Proxy** |
| **Spider-Man Noir (Earth-90214)** | Configured in `character-models.ts` | Bespoke Noir Detective Rig | ~3,100 | 2 Materials | Untextured | Articulated hierarchy | Procedural deliberate | Fedora hat, 1933 Great Depression trench coat, brass goggles; awaiting production GLB | **Verified Temporary Proxy** |

---

## 3. Detailed Technical Audit: Masked Miles Morales (`/models/miles_morales.glb`)

### 3.1 Geometric Breakdown & Triangle Budget
- **Total Triangles**: `33,042`
- **Total Vertices**: `18,460`
- **Sub-Meshes**:
  1. `Object_15` (Mesh 2): **28,549 Triangles** — Continuous suited body including torso, neck, legs, boots, arms, and individual 5-digit hands.
  2. `Object_11` (Mesh 0): **640 Triangles** — Left mask eye-contour frame (raised crimson bezel).
  3. `Object_7` (Mesh 4): **640 Triangles** — Right mask eye-contour frame (raised crimson bezel).
  4. `Object_13` (Mesh 1): **392 Triangles** — Left reflective white eye lens.
  5. `Object_9` (Mesh 5): **392 Triangles** — Right reflective white eye lens.
  6. `Object_16` (Mesh 3): **2,429 Triangles** — Athletic sneaker sole trim and footwear accent geometry.

### 3.2 Anatomy, Proportions & Ground Alignment
- **Bounding Box Range**:
  - $X$: $[-0.514\text{m}, +0.514\text{m}]$ (T-pose arm span $\approx 1.03\text{m}$)
  - $Y$: $[-0.001\text{m}, +1.643\text{m}]$ ($1.644\text{m}$ total height, true to Miles' 15-year-old height in *Across the Spider-Verse*)
  - $Z$: $[-0.112\text{m}, +0.297\text{m}]$ (Chest and toe forward projection)
- **Ground Alignment**: Lowest vertex touches $Y = -0.00108\text{m}$, establishing exact ground plane contact at $Y = 0.00\text{m}$ without floating or floor penetration.
- **Facing Orientation**: Mask lenses located at $Z = [+0.045\text{m}, +0.108\text{m}]$ facing forward along $+Z$.

### 3.3 Texturing & PBR Material Channels
- **Body Material (`HEAD`)**:
  - Base Color Texture: `HEAD_baseColor` ($1024\times 1024$ PNG, 30KB compressed).
  - Encodes the hand-sprayed red chest spider emblem, large back spider emblem, red finger grip pads, and dual flank racing stripes.
  - Roughness: $0.42$ (matte compression fabric; avoids the wet/plastic toy shine).
  - Metalness: $0.06$ (fabric nonmetallic response).
  - Color Space: Explicitly mapped to `THREE.SRGBColorSpace`.
- **Eye Contour Frame (`HEAD.001`)**:
  - Base Color: `#ff1361` (Spider-Verse vibrant crimson).
  - Roughness: $0.28$, Metalness: $0.12$.
  - Emissive: `#ff1361` with intensity $0.35$ for stylized comic pop.
- **Inner Eye Lenses (`material_0`)**:
  - Base Color: `#ffffff` (sharp optical white).
  - Roughness: $0.16$, Metalness: $0.05$ (specular reflection without mirror distortion).

### 3.4 Skeletal Rigging & Animation Set
- **Bone Count**: 65 bones configured in a standard Mixamo hierarchy (`mixamorigHips` root).
- **Deformation Topology**: Fully weighted vertices on shoulders, elbows, hips, knees, neck, and fingers. No elbow spike collapsing or shoulder twisting.
- **Animation Suite**:
  1. `idle`: 3.08s loop with springy posture and breathing chest flexion.
  2. `walk`: 1.05s loop with agile forward momentum.
  3. `run`: 0.65s high-speed forward-leaning athletic sprint.
  4. `jump`: 2.38s athletic tuck leap.
  5. `emote1-3`: Expressive Spider-Verse poses (finger points, web-shooting stances).

---

## 4. Pipeline Feasibility & Next Extension Steps

As specified in the prompt's **Feasibility Rule**:
- **Workflow A** (Integration of licensed, authored rigged assets) has been successfully applied to **Miles Morales**.
- The remaining 7 characters are honestly categorized in the UI and documentation as **`Verified Temporary Proxies`** while equivalent production GLBs are being curated.
- Temporary proxies are never disguised as finished models; each carries an explicit diagnostic badge in the inspection view (`/multiverse/inspect`).
