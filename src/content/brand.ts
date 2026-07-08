import type { Brand } from "@/types/content";

/**
 * Re:Bound brand tokens.
 *
 * Single source of truth for colors, type, spacing, motion. The
 * BrandProvider component reads this object and emits matching CSS
 * custom properties at the document root, so every component can
 * reference values through `var(--…)` and re-skinning the entire
 * site only requires editing this file.
 */
export const brand: Brand = {
  colors: {
    bone: "#EBECDD",
    ivory: "#FEFFF0",
    sand: "#F3F3F0",
    linen: "#FBFBF2",
    stone: "#D0D0C5",
    clay: "#A89B83",
    umber: "#6A3921",
    umberDeep: "#200C02",
    espresso: "#3D312B",
    clove: "#3E2D2D",
    ink: "#000000",
    ash: "#2A2A2E",
    carbon: "#242225",
    white: "#FFFFFF",
    // Editor 4-color tokens — mapped to Re:Bound palette
    primary: "#6A3921",  // espresso — Book Now button fill, selected date fill
    light: "#EBECDD",    // ivory — section bg, button text on primary
    dark: "#200C02",     // umberDeep — body text, Join Waitlist button
    accent: "#A89B83",   // clay — accent / hover states
  },
  fonts: {
    // Documentation of the intended families. The actual @font-face
    // declarations (and the CSS variables --font-display / --font-body)
    // are wired up by next/font/local in src/lib/fonts.ts. Components
    // reference those variables directly, e.g. font-family: var(--font-display).
    // BrandProvider also aliases --font-label → --font-body since the
    // brand uses Red Hat Display for both body copy and labels.
    display: "'Instrument Serif', 'Times New Roman', serif",
    label: "'Red Hat Display', system-ui, sans-serif",
    body: "'Red Hat Display', system-ui, -apple-system, sans-serif",
  },
  type: {
    displayXl: 147,
    displayLg: 100,
    displayMd: 75,
    displaySm: 62,
    displayXs: 50,
    h1: 48,
    h2: 36,
    h3: 28,
    eyebrowLg: 17,
    eyebrow: 14,
    eyebrowSm: 12,
    bodyLg: 20,
    body: 18,
    bodySm: 16,
    caption: 14,
  },
  tracking: {
    label: "0.130em",
    eyebrow: "0.200em",
    displayTight: "-0.030em",
    display: "-0.010em",
    hero: "0.200em",
  },
  weight: {
    heading: 400,
  },
  headingScale: {
    sectionH2: "clamp(40px, 4.4vw, 64px)",
  },
  lineHeight: {
    display: 1.1,
    displayLoose: 1.22,
    displayCaps: 1.41,
    label: 1.52,
    body: 1.5,
    bodyLoose: 1.52,
  },
  spacing: {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
    "8": "64px",
    "9": "80px",
    "10": "120px",
    "11": "160px",
  },
  layout: {
    containerMax: "1280px",
    pageGutter: "64px",
    navHeight: "92px",
  },
  radii: {
    none: 0,
    pill: "999px",
    round: "50%",
  },
  shadows: {
    none: "none",
    soft: "0 2px 24px rgba(32, 12, 2, 0.10)",
    lift: "0 10px 40px rgba(32, 12, 2, 0.14)",
  },
  motion: {
    easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
    easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    durFast: "180ms",
    dur: "300ms",
    durSlow: "600ms",
  },
};
