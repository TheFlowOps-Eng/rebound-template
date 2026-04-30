---
name: rebound-design
description: Use this skill to generate well-branded interfaces and assets for Re:Bound, a Lagree/Megaformer wellness studio, either for production or throwaway prototypes, mocks, decks and social assets. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files:

- `README.md` — brand overview, content fundamentals, visual foundations, iconography, index
- `colors_and_type.css` — CSS custom properties for colors + typography (import this into any HTML artifact)
- `fonts/` — self-hosted webfonts (Instrument Serif, Red Hat Display variable)
- `assets/` — logos, photography, social icons
- `preview/` — small HTML preview cards, one concept per card
- `ui_kits/website/` — high-fidelity React recreation of the marketing site

If creating visual artifacts (slides, mocks, throwaway prototypes, social tiles, pitch decks, etc), copy assets out of `assets/` and create static HTML files for the user to view. Start from `colors_and_type.css` for tokens and the `ui_kits/website/components.jsx` file for buttons, nav, inputs and footer patterns. If working on production code, read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design (marketing page, instructor bio card, class schedule, launch email, IG carousel, pitch deck), ask a handful of sharp questions (audience, surface, scope, 1 vs 3 variations), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Non-negotiables for this brand

- Cream (`--bone #EBECDD`) and umber (`--umber #6A3921`) are the anchors. No accent color beyond that.
- Type pairing is **Instrument Serif display (Regular + Italic)** + **Red Hat Display** for both labels (700, uppercase, tracked) and body (400, sentence case, no tracking). Don't swap for Inter/Roboto/Montserrat.
- Corners are square. No rounded cards.
- Photography is warm, cinematic, architectural — never clinical or stock-cheerful.
- Copy is short, second-person, em-dash-heavy, zero hype, zero emoji.
- Hero type is big — 120–150px display on desktop. Do not shrink it.
