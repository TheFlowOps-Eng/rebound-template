// ---------- Brand ----------

export type Brand = {
  colors: {
    bone: string;
    ivory: string;
    sand: string;
    linen: string;
    stone: string;
    clay: string;
    umber: string;
    umberDeep: string;
    espresso: string;
    clove: string;
    ink: string;
    ash: string;
    carbon: string;
    white: string;
    // Editor 4-color tokens — map to widget elements
    primary: string;
    light: string;
    dark: string;
    accent: string;
  };
  fonts: {
    display: string;
    label: string;
    body: string;
  };
  type: {
    displayXl: number;
    displayLg: number;
    displayMd: number;
    displaySm: number;
    displayXs: number;
    h1: number;
    h2: number;
    h3: number;
    eyebrowLg: number;
    eyebrow: number;
    eyebrowSm: number;
    bodyLg: number;
    body: number;
    bodySm: number;
    caption: number;
  };
  tracking: {
    label: string;
    eyebrow: string;
    displayTight: string;
    display: string;
    hero: string;
  };
  lineHeight: {
    display: number;
    displayLoose: number;
    displayCaps: number;
    label: number;
    body: number;
    bodyLoose: number;
  };
  spacing: Record<
    "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11",
    string
  >;
  layout: {
    containerMax: string;
    pageGutter: string;
    navHeight: string;
  };
  radii: {
    none: number;
    pill: string;
    round: string;
  };
  shadows: {
    none: string;
    soft: string;
    lift: string;
  };
  motion: {
    easeOut: string;
    easeInOut: string;
    durFast: string;
    dur: string;
    durSlow: string;
  };
};

// ---------- Global ----------

export type NavItem = { href: string; label: string };

export type SocialLink = { name: string; href: string };

export type FooterLinkColumn = {
  heading: string;
  items: Array<{ label: string; href: string }>;
};

export type GlobalContent = {
  nav: NavItem[];
  bookCta: { label: string; href: string };
  footer: {
    address: string;
    phone: string;
    email: string;
    columns: FooterLinkColumn[];
    socials: SocialLink[];
    credit: string;
  };
};

// ---------- Shared section pieces ----------

export type PageHeaderContent = { title: string; image: string };

export type CTA = { label: string; href: string };

export type ImageRef = { src: string; alt: string };

// ---------- Home ----------

export type Testimonial = { quote: string; name: string; role: string };

export type ClassTeaser = { name: string; copy: string; img: string };

export type HomeContent = {
  hero: {
    headline: string;
    headlineEm: string;
    subhead: string;
    cta: CTA;
    background: string;
  };
  lagree: {
    eyebrow: string;
    headlineEm: string;
    headline: string;
    body: string[];
    cta: CTA;
    image: ImageRef;
  };
  classes: {
    eyebrow: string;
    headline: string;
    headlineEm: string;
    viewAll: CTA;
    items: ClassTeaser[];
  };
  feelSplit: {
    left: { eyebrow: string; headline: string; body: string };
    right: { eyebrow: string; headline: string; body: string };
  };
  founder: {
    eyebrow: string;
    headline: string;
    body: string;
    cta: CTA;
    image: ImageRef;
  };
  testimonials: {
    items: Testimonial[];
    primaryCta: CTA;
    secondaryCta: CTA;
    background: string;
  };
  plan: {
    eyebrow: string;
    headline: string;
    headlineEm: string;
    body: string;
    submitLabel: string;
  };
  wordmark: { background: string; logo: string; alt: string };
};

// ---------- About ----------

export type AboutContent = {
  header: PageHeaderContent;
  story: {
    eyebrow: string;
    paragraphs: string[];
    signature: { script: string; name: string };
    notes: string[];
    polaroid: ImageRef;
    board: {
      title: string;
      name: string;
      fields: { label: string; value: string | string[] }[];
    };
  };
  manifesto: {
    headline: string;
    primaryCta: CTA;
    secondaryCta: CTA;
    strip: ImageRef[];
  };
  explainer: {
    headline: string;
    headlineEm: string;
    body: string;
    image: ImageRef;
    cards: Array<{ label: string; body: string }>;
    cta: CTA;
  };
  waitlist: {
    eyebrow: string;
    headline: string;
    headlineEm: string;
    body: string;
    submitLabel: string;
  };
};

// ---------- Classes ----------

export type ClassFilterId = "all" | "new" | "strength" | "flow";

export type ClassItem = {
  id: string;
  name: string;
  min: number;
  level: string;
  tag: Exclude<ClassFilterId, "all">;
  desc: string;
  img: string;
};

export type ClassesContent = {
  header: PageHeaderContent;
  filters: Array<{ id: ClassFilterId; label: string }>;
  items: ClassItem[];
};

// ---------- Instructors ----------

export type Instructor = {
  name: string;
  role: string;
  bio: string;
  img: string;
  certification?: string[];
  quote?: string;
  style?: string;
  formats?: string[];
  bookHref?: string;
};

export type InstructorsContent = {
  header: PageHeaderContent;
  team: Instructor[];
};

// ---------- Contact ----------

export type ContactContent = {
  header: PageHeaderContent;
  hello: {
    eyebrow: string;
    headline: string;
    headlineEm: string;
    body: string;
    channels: { label: string; value: string; href?: string }[];
  };
  successMessage: { title: string; body: string };
  info: Array<{ label: string; value: string }>;
  details: {
    blocks: { label: string; lines: string[] }[];
    mapsCta: CTA;
  };
  socials: SocialLink[];
  faq: {
    eyebrow?: string;
    headline: string;
    items: { q: string; a: string }[];
  };
  wordmark: { background: string; logo: string; alt: string };
};

// ---------- Pricing / Studio (stubs) ----------

export type StubContent = { header: PageHeaderContent };

// ---------- Studio ----------

export type StudioContent = {
  header: PageHeaderContent;
  intro: {
    eyebrow: string;
    headline: string;
    headlineEm: string;
    paragraphs: string[];
  };
  gallery: ImageRef[];
  features: {
    eyebrow: string;
    headline: string;
    items: { title: string; body: string }[];
  };
  visit: {
    eyebrow: string;
    headline: string;
    address: string[];
    hours: { label: string; value: string }[];
    cta: CTA;
  };
  wordmark: { background: string; logo: string; alt: string };
};

// ---------- Pricing ----------

export type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  perClass?: string;
};

export type PricingContent = {
  header: PageHeaderContent;
  freeClass: {
    eyebrow: string;
    headline: string;
    headlineEm: string;
    body: string;
    cta: CTA;
  };
  marquee: string[];
  memberships: {
    eyebrow: string;
    headline: string;
    body: string;
    tiers: PricingTier[];
    primaryCta: CTA;
    benefits: {
      eyebrow: string;
      headline: string;
      items: string[];
      image: ImageRef;
    };
  };
  specialty: {
    eyebrow: string;
    headline: string;
    body: string;
    cards: { title: string; price: string; body: string }[];
    cta: CTA;
  };
  matcher: {
    eyebrow: string;
    headline: string;
    rows: { situation: string; recommendation: string }[];
  };
  wordmark: {
    background: string;
    logo: string;
    alt: string;
  };
};
