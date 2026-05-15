# Re:Bound

Marketing site for **Re:Bound**, a Lagree studio in Bangsar, Kuala Lumpur. Built with Next.js (App Router) and TypeScript.

## Stack

- Next.js 15 / React 18 (App Router)
- TypeScript
- CSS variables driven by tokens in `src/content/brand.ts` (no Tailwind, no UI framework)
- `next/font/local` for self-hosted display + body fonts
- Lucide icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve build on :3000
npm run lint
```

## Project structure

```
src/
├── app/                 App Router pages, layout, sitemap, robots
│   ├── about/
│   ├── classes/
│   ├── contact/
│   ├── instructors/
│   ├── pricing/
│   ├── studio/
│   ├── error.tsx
│   ├── layout.tsx       Root layout (BrandProvider + TopNav + Footer)
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx         Home
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── layout/          BrandProvider, TopNav, Footer, PageHeader, Wordmark
│   ├── sections/        Per-page composed sections
│   │   ├── home/
│   │   ├── about/
│   │   ├── classes/
│   │   ├── instructors/
│   │   ├── pricing/
│   │   ├── studio/
│   │   └── contact/
│   └── ui/              Design primitives (Button, Eyebrow, Icon, InlineCTA, Input, …)
│
├── content/             Plain TS data — single source of truth for copy
│   ├── brand.ts         Colors, fonts, type scale, spacing, motion
│   ├── global.ts        Nav, footer, social links, book-CTA
│   ├── home.ts
│   ├── about.ts
│   ├── classes.ts
│   ├── instructors.ts
│   ├── pricing.ts
│   ├── studio.ts
│   └── contact.ts
│
├── lib/                 seo, fonts, utils, constants
├── styles/globals.css   Resets + base typography that consume brand tokens
└── types/content.ts     TS shapes for every content file
```

## Editing copy

All page copy and structured data live under `src/content/`. Edit those files to update the site — components stay typed against `src/types/content.ts` so renames propagate.

## Static assets

Images and the wordmark live in `public/assets/`. Reference them as absolute paths (e.g. `/assets/amara.jpg`).

## OhhWells editor integration

This template includes `src/components/layout/NavigationSync.tsx` — a small client component that posts the current pathname to the parent window via `postMessage` whenever the user navigates between pages.

It enables the **OhhWells canvas editor** (app.ohhwells.com) to keep its page dropdown in sync when a visitor clicks links inside the iframe preview. Without it, the dropdown would only update when the user explicitly selects a page from the menu.

**How it works:**

```
NavigationSync (client component)
  → usePathname() fires on every App Router navigation
  → window.parent.postMessage({ type: 'ow:navigation', path }, '*')

Canvas editor (parent window)
  → window.addEventListener('message', ...) picks it up
  → updates the page Select to match
```

The component renders nothing and has zero effect on normal visitors — `window.parent === window` when the site is opened directly, so the `postMessage` call is never reached.

**If you fork this template**, keep `NavigationSync` in `src/app/layout.tsx`. Removing it won't break anything functionally, but the page dropdown in the OhhWells editor will stop tracking in-iframe navigation.

## Responsive breakpoints

The site uses three tiers, hand-rolled in inline `<style>` blocks per section:

- Desktop: default
- Tablet: `max-width: 960px`
- Phone: `max-width: 720px` or `max-width: 520px` (varies by section)
