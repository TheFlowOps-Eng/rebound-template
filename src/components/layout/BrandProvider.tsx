import type { ReactNode } from "react";
import { brand } from "@/content/brand";

/**
 * BrandProvider — emits the Re:Bound design-token set as CSS custom
 * properties at :root. Server-rendered (no client JS). Components
 * reference these via `var(--color-bone)`, `var(--space-7)`, etc.
 *
 * To re-skin: edit src/content/brand.ts. No component code needs to
 * change.
 */

const cssVars = (() => {
  const lines: string[] = [];

  // Colors
  for (const [k, v] of Object.entries(brand.colors)) {
    lines.push(`--color-${kebab(k)}: ${v};`);
  }

  // Fonts — DELIBERATELY NOT EMITTED HERE.
  //
  // next/font/local (src/lib/fonts.ts) already defines `--font-display`
  // and `--font-body` on a className applied to <html>. Re-declaring
  // them at :root would create a self-referential cycle (an invalid
  // value, which falls back to Times). The brand.fonts object is
  // documentation of the intended families.
  //
  // We do alias --font-label → --font-body since the brand uses the
  // same Red Hat Display face for both body and labels:
  lines.push(`--font-label: var(--font-body);`);
  lines.push(`--font-heading: var(--font-display);`);

  // Type scale (numeric → px)
  for (const [k, v] of Object.entries(brand.type)) {
    lines.push(`--fs-${kebab(k)}: ${v}px;`);
  }

  // Tracking
  for (const [k, v] of Object.entries(brand.tracking)) {
    lines.push(`--tracking-${kebab(k)}: ${v};`);
  }

  // Line height
  for (const [k, v] of Object.entries(brand.lineHeight)) {
    lines.push(`--lh-${kebab(k)}: ${v};`);
  }

  // Spacing scale
  for (const [k, v] of Object.entries(brand.spacing)) {
    lines.push(`--space-${k}: ${v};`);
  }

  // Layout
  lines.push(`--container-max: ${brand.layout.containerMax};`);
  lines.push(`--page-gutter: ${brand.layout.pageGutter};`);
  lines.push(`--nav-h: ${brand.layout.navHeight};`);

  // Radii
  lines.push(`--radius-0: ${brand.radii.none};`);
  lines.push(`--radius-pill: ${brand.radii.pill};`);
  lines.push(`--radius-round: ${brand.radii.round};`);

  // Shadows
  for (const [k, v] of Object.entries(brand.shadows)) {
    lines.push(`--shadow-${kebab(k)}: ${v};`);
  }

  // Motion
  lines.push(`--ease-out: ${brand.motion.easeOut};`);
  lines.push(`--ease-in-out: ${brand.motion.easeInOut};`);
  lines.push(`--dur-fast: ${brand.motion.durFast};`);
  lines.push(`--dur: ${brand.motion.dur};`);
  lines.push(`--dur-slow: ${brand.motion.durSlow};`);

  // Semantic aliases (kept for legacy class/style references)
  lines.push(`--bone: var(--color-bone);`);
  lines.push(`--ivory: var(--color-ivory);`);
  lines.push(`--sand: var(--color-sand);`);
  lines.push(`--linen: var(--color-linen);`);
  lines.push(`--stone: var(--color-stone);`);
  lines.push(`--clay: var(--color-clay);`);
  lines.push(`--umber: var(--color-umber);`);
  lines.push(`--umber-deep: var(--color-umber-deep);`);
  lines.push(`--espresso: var(--color-espresso);`);
  lines.push(`--clove: var(--color-clove);`);
  lines.push(`--ink: var(--color-ink);`);
  lines.push(`--ash: var(--color-ash);`);
  lines.push(`--carbon: var(--color-carbon);`);
  lines.push(`--white: var(--color-white);`);

  lines.push(`--fg: var(--color-espresso);`);
  lines.push(`--fg-muted: var(--color-clove);`);
  lines.push(`--fg-subtle: rgba(61, 49, 43, 0.64);`);
  lines.push(`--fg-inverse: var(--color-bone);`);
  lines.push(`--bg: var(--color-bone);`);

  return `:root {\n  ${lines.join("\n  ")}\n}`;
})();

function kebab(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

export function BrandProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      {children}
    </>
  );
}
