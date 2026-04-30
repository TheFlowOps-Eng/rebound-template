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

## Responsive breakpoints

The site uses three tiers, hand-rolled in inline `<style>` blocks per section:

- Desktop: default
- Tablet: `max-width: 960px`
- Phone: `max-width: 720px` or `max-width: 520px` (varies by section)
