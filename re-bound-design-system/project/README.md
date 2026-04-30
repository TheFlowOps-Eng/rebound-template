# Re:Bound Design System

A design system for **Re:Bound** — a Lagree / Megaformer fitness studio that positions itself as _"discipline meets softness."_ Warm materials, soft light, quiet intensity.

## The brand in one paragraph

Re:Bound is a boutique Lagree studio (inferred location: Kuala Lumpur, per founder copy). The founder left the loud, competitive fitness scene looking for something slower, quieter, more considered — and couldn't find a Lagree studio in KL, so she built one. The visual system reflects the method: slow, restrained, warm. Think arched mirrors, wood, diffused lighting, cream walls. The tagline is **"Discipline meets softness. Always."**

Three class formats share one intention: **Foundation** (beginners), **Sculpt** (targeted fatigue), **Restore** (flexibility + mobility).

## Sources given

- **Figma file**: `Re_Bound Website.fig` (mounted read-only). 1 page, 63 top-level frames. Key frames: `Group-92` (home full-page), `Group-91` (classes list), `Group-90` (instructors), `Group-75` (founder letter), `Group-80` (waitlist/contact form).
- **Logo upload**: `uploads/Rebound.png` → `assets/rebound-wordmark.png`
- **Starter repo referenced**: `ohhwells/ohhwells-starter` (not imported — the file name and copyright line in the Figma footer still read "OhhWells", but every in-page headline, founder copy, and imagery is labelled **Re:Bound**. Treating Re:Bound as the active brand.)

## Index

```
README.md                   ← you are here
colors_and_type.css         ← CSS variables (color palette + type scale + spacing)
SKILL.md                    ← Claude Code / Agent Skill entrypoint
assets/                     ← logos, imagery, icons
  rebound-logo-full.png     ← primary logo (script R + RE:BOUND wordmark, on transparent)
  rebound-wordmark.png      ← compact wordmark
  studio-interior.jpg       ← the arched-mirror Lagree room — hero imagery
  hero-banner.jpg           ← foot-straps hero (beige, cinematic)
  instructors-banner.jpg    ← three women in earthy tones — editorial motion blur
  class-tile.jpg            ← close-up on Megaformer reformer
  foundation-class.png      ← founder editorial
  founder.png               ← clipboard "founder's note" composition
  founder-detail.jpg        ← polaroid inset
  icons/                    ← social + arrows (SVG, copied from Figma)
preview/                    ← design-system tab cards
ui_kits/
  website/                  ← high-fidelity click-through of the Re:Bound marketing site
```

---

## CONTENT FUNDAMENTALS

**Voice:** calm, direct, earned. The copy sounds like someone who has been in the industry and is now tired of the industry. It trusts the reader and never hypes.

**Tense & perspective:** second person ("you'll leave knowing you earned it"), occasionally first person from the founder ("I'd spent years in KL's fitness scene…"). Never third-person brand voice ("Re:Bound is committed to…"). No corporate we.

**Casing rules (strict):**
- **All-caps labels** for navigation, CTAs, eyebrows, section kickers — tracked **0.13em** (labels/buttons) or **0.20em** (eyebrows). `HOME · ABOUT · CLASSES · PRICING · STUDIO · INSTRUCTORS · CONTACT`, `BOOK NOW`, `JOIN THE WAITLIST. ITS FREE`, `GET READY TO TRANSFORM`.
- **Sentence case** for headlines — the display serif is never shouted. `Discipline meets softness.`  `Let's make a plan.`  `Three formats. One intention.`
- **Title Case** does not appear in the headline system.
- **Em-dash over colon** for thought-pairing. _"Fifty minutes dedicated to glutes, hamstrings, quads, and calves — deep lunges, slow carriage work, and holds that build the kind of strength you feel when you walk up stairs the next day."_
- **Periods for emphasis.** Short clauses. Full stops. _"Not Pilates. Not yoga."_  _"Always."_

**Punctuation fingerprints:**
- Colon in the brand name: **Re:Bound**. Treat the colon as a typographic hinge; never lose it.
- The smart em-dash is used for rhythmic asides.
- Triple noun-verb rhythms: "Warm. Quiet. Considered."

**Words the brand uses:** slow, considered, warm, quiet, deliberate, restore, sculpt, foundation, intention, tension, shake, fatigue, precision, form, softness.

**Words the brand avoids:** crush, burn, grind, beast, shred, hustle, unleash, transform (except in one archival CTA), optimize, community (used sparingly).

**Emoji / unicode:** never. No emoji appear in Figma. The only non-alphabetic glyph in use is `→` in inline CTAs (`BOOK SCULPT →`) and the colon `:` in the wordmark.

**Example copy** (verbatim from Figma, to calibrate new work):
- Hero: "50-minute, full-body workouts on the Megaformer. Low-impact enough to protect your joints. Intense enough to reshape your body."
- Studio: "Arched ceilings. Warm textured walls. Diffused lighting that softens as you settle in. Every detail was considered, from the temperature of the towels to the curve of the doorways."
- Method: "Not Pilates. Not yoga. Something that borrows from both — and outworks them."
- Philosophy: "The slower you go, the harder it gets."

---

## VISUAL FOUNDATIONS

### Colour

A small, restrained palette. All warm. No blue, no green, no purple.

| Token | Hex | Role |
|-------|-----|------|
| `--bone` | `#EBECDD` | **Primary surface.** Every long-scroll page sits on this cream. |
| `--umber` | `#6A3921` | **Primary accent + buttons.** The one saturated colour. |
| `--umber-deep` | `#200C02` | Deepest brown — dark hero sections, photography shadows. |
| `--espresso` | `#3D312B` | Primary text on cream. |
| `--clove` | `#3E2D2D` | Secondary text / inputs. |
| `--ivory` | `#FEFFF0` | Lightest surface (paper, card). |
| `--sand` | `#F3F3F0` | Secondary / inverted button fill. |
| `--clay` | `#A89B83` | Muted taupe — tertiary cards (e.g., class tiles). |
| `--stone` | `#D0D0C5` | Divider / low-contrast line. |
| `--ink` | `#000000` | 1px hairlines + small-caps in dense areas. |

**Rule of thumb:** cream is the page, umber is the button, espresso is the type, clay is the photograph-adjacent card. Never combine umber-brown with clay-taupe without a cream between them.

### Type

- **Display: _Instrument Serif_ Regular.** Serif, narrow, slightly archaic. Used _sentence-cased_, tracked tight (−0.01em to −0.03em). Sizes from 50px (tile) to 147px (hero). Italic is reserved for accent words inside a display phrase (e.g. _discipline_ meets softness). Client-provided — shipping in `fonts/`.ant Garamond Light** here — flagged below.
- **Label: _Red Hat Display_ Bold / ExtraBold / Black.** Sans-serif. Always UPPERCASE, tracked 0.13em (labels/CTAs) or 0.20em (eyebrows). Sizes 11–17px. Red Hat Display is available on Google Fonts (free) so this is a true match.
- **Body: _Red Hat Display_ Regular (400).** The same family as the labels, just at a softer weight so it reads as body copy instead of a caption. 14–20px, tracking 0 (labels are the only place we open up the tracking). Client-provided variable font, self-hosted in `fonts/`.

**Hierarchy signature:** Eyebrow (small caps, tracked) → Display serif headline (big, quiet) → Body sans (long-form). The eyebrow always announces the section.

### Backgrounds & Layers

- **Solid cream (`--bone`)** is the dominant background. Sections do not use alternating colours; rhythm comes from **full-bleed imagery** breaking the cream.
- **Photography is full-bleed.** No rounded corners on hero images, no shadows, no frames. The image _is_ the layout device.
- **No gradients.** Anywhere. Photography provides the tonal gradient; the layout stays flat.
- **No patterns or textures.** The warmth comes from photography + typography, not decorative motifs.
- **The `Re:Bound` wordmark** appears as extruded multi-stroke lettering on dark photographic sections (see the 7-layer "Vector" stack across the `studio-interior.jpg` band in Group-91/92).

### Animation

- **Fades** for section reveals. 300–600ms, `cubic-bezier(0.22, 1, 0.36, 1)` (soft-out, matches the "slow movement" ethos).
- **No bounces, no springs, no elastic.** The brand explicitly sells "slow controlled movements under constant tension" — animation must match.
- **Cross-fades** for carousel/image swaps. Never slide-swipe with hard edges.
- **Hover** reveals are _very slight_ (opacity 0.68, background colour shift by ~8%) — no scaling, no lifts.

### Hover & press states

- **Primary button** (`umber` fill, `bone` text): hover → `umber-deep` fill, same text. Press → reduce opacity to 0.9.
- **Inverted button** (`bone` fill, `umber` text): hover → `sand` fill. Press → `stone` fill.
- **Navigation link** (uppercase, cream on dark hero): hover → opacity 0.68. No underline appears.
- **Inline CTA** (underlined `BOOK FOUNDATION →`): hover → text shifts to `bone` (from `white`) or nudges the arrow 4px right.
- **Press** generally = opacity 0.9. Never a shrink-down animation.

### Borders

- **1px solid black** is the canonical hairline — used under inputs, on form dividers, around icon-only arrow buttons. `rgb(0,0,0)` flat, never soft grey.
- **2px solid umber** on class-tile photography (`Frame1618873248` wraps a brown border around `class-tile.jpg`).
- **3px solid espresso** for decorative horizontal rules above classes/sections (see Group-91 top-left).
- **Soft borders** (`rgba(0,0,0,0.12)`) are used only in denser UI like form groupings in admin-style contexts, which the marketing site does not currently have.

### Shadows & elevation

The brand **almost never uses shadows.** The only shadow in the Figma file is a subtle drop behind page chrome (`rgba(0,0,0,0.25)`). Rely on colour contrast and whitespace instead.

- `--shadow-soft` exists for modals/dropdowns if needed: `0 2px 24px rgba(32,12,2,0.10)`.
- `--shadow-lift` reserved for floating action elements: `0 10px 40px rgba(32,12,2,0.14)`.

### Corner radii

- **Buttons, cards, image frames, inputs: square (`0`).** This is a strong brand signature — the square corner reads as architectural and deliberate.
- **Circular (`50%`) only for**: pagination dots, pagination arrow buttons (48px), and avatar crops.
- There is no "rounded-sm" or "rounded-md" in between. Square or circle.

### Transparency & blur

- Transparency appears only in photography (motion blur in the instructors banner) and input placeholders (`rgba(0,0,0,0.6)`).
- No backdrop-filter blur, no glass surfaces.

### Image treatment

- **Warm palette — zero exception.** Every photograph is warm (sand/cream/brown/skin). No cool tones, no blue sky.
- **Slight film grain** is acceptable where present in source.
- **Shallow depth of field.** Subjects emerge from warm backgrounds.
- **Motion blur** used once — editorial, never for UI feedback.
- **Cinematic aspect ratios.** Full-bleed 1440×374 bands; portrait tiles at ~480×616 for class cards.

### Layout rules

- **Container: 1280px max width, 64px gutter.**
- **Full-bleed hero bands** at 1440px wide (the design file is 1440-first; everything scales from there).
- **Navigation is fixed at top** — 92px tall, sitting over the hero image with cream nav links and a single umber "BOOK NOW" pill in the top-right corner (155×63, square).
- **Section rhythm is 80–160px** between major blocks.
- **Two-column editorial** (founder letter): ~505px image column + 685px text column, 60–80px gap.
- **Three-column class grid**: 480px each, no gap between (or ~24px), photograph-on-top, clay card underneath.

### Iconography at a glance

See **ICONOGRAPHY** below.

---

## ICONOGRAPHY

**Short version: there is almost no iconography.** Re:Bound is a typographic brand. What little exists:

- **Social icons**, 24×24, solid black: Facebook, Instagram, X (Twitter), LinkedIn, YouTube. Copied from Figma as SVG to `assets/icons/`. Keep them **black on cream** — do not colourise, do not convert to brand-brown.
- **Arrow glyphs** — `arrow_back` / `arrow_forward` 24×24, used inside 48px circular white buttons for carousel navigation. Glyph is black; button fill is white; 1px black hairline border.
- **`keyboard_arrow_down`** for filter selects (used in the classes filter row).
- **Inline `→`** (a literal Unicode right arrow) in text CTAs: `BOOK FOUNDATION →`. Not an icon asset — it's a character in the Red Hat Display label.
- **No emoji. No stroke-vs-fill icon pairs. No Heroicons/Lucide.** The brand is too restrained.

**If you need more icons than Figma provides** (e.g., for an app surface — booking calendar, profile, notifications), substitute **Lucide** (1.5px stroke, rounded joins) — flat black, 20–24px, no accent colour. **Flag the substitution** to the user.

---

## FONT SUBSTITUTIONS (needs client approval)

The Figma uses two commercial typefaces that aren't freely available. I've substituted the closest Google Fonts and **ask for the real files**:

| In design | Shipped here | License status |
|-----------|------------------|----------------|
| **Pensum Display** Light/Regular | **Instrument Serif** Regular + Italic | ✅ Client-provided — self-hosted in `fonts/` |
| **Avenir LT Std** 55 Roman / 65 Medium / 85 Heavy | **Red Hat Display** Regular (body role absorbed into the brand sans) | ✅ Client-provided — self-hosted variable font |
| Red Hat Display (labels) | Red Hat Display | ✅ Client-provided — self-hosted variable font |
| Pecita Book (rare handwriting accent) | _unused in system_ | Skipped |
| Wix Madefor Text | _unused in system_ | Skipped |
| Roboto (placeholder only) | _unused in system_ | Skipped |

**Action:** None — all brand fonts are now client-provided and self-hosted. Body copy is set in Red Hat Display 400 (the same family as the labels) rather than a separate humanist sans.

---

## Caveats flagged throughout

1. **Fonts** — all brand fonts are now client-provided (Instrument Serif + Red Hat Display). Body copy reuses Red Hat Display 400 instead of a separate humanist sans.
2. **Footer copy mismatch.** The footer in Figma still says `© 2026 OhhWells`, address `Level 18, 101 Collins Street, Melbourne VIC 3000`, and email `hello@meridianadvisory.com`. Re:Bound's own copy references Kuala Lumpur. I've used Re:Bound KL details as placeholders in the UI kit and flagged both for correction.
3. **Icon coverage is thin.** If we expand to app surfaces, we'll need a proper icon set.
4. **No tablet/mobile breakpoints** in source — the Figma is desktop-first at 1440px. I've mirrored that in the UI kit and not invented responsive behaviour.
