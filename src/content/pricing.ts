import type { PricingContent } from "@/types/content";

export const pricingContent: PricingContent = {
  header: { title: "Pricing", image: "/assets/header-pricing.jpg" },

  freeClass: {
    eyebrow: "Pricing & Membership",
    headline: "Your first class is ",
    headlineEm: "on us.",
    body:
      "No credit card. No commitment. Just 50 minutes on the Megaformer to see if this is the space you've been looking for.",
    cta: { label: "Book my first free class now", href: "/contact" },
  },

  marquee: [
    "10% off drop-ins on packs",
    "Cancel unlimited anytime",
    "Pause for travel or illness",
    "First class always free",
    "Members-only class drops",
  ],

  memberships: {
    eyebrow: "Become a Member",
    headline: "Monthly memberships.",
    body:
      "Pick the tier that matches your weekly rhythm. Upgrade or downgrade anytime; your body will tell you when.",
    tiers: [
      {
        name: "Intro Week",
        tagline: "For first-timers testing the method",
        price: "RM 99",
        unit: "1 week unlimited",
      },
      {
        name: "Express",
        tagline: "1 class a week",
        price: "RM 340",
        unit: "4 classes/month",
        perClass: "RM85/class",
      },
      {
        name: "Standard",
        tagline: "2 classes a week",
        price: "RM 560",
        unit: "8 classes/month",
        perClass: "RM70/class · save 18%",
      },
      {
        name: "Premier",
        tagline: "4 classes a week",
        price: "RM 960",
        unit: "16 classes/month",
        perClass: "RM60/class · save 30%",
      },
      {
        name: "Unlimited",
        tagline: "Daily practice",
        price: "RM 1,200",
        unit: "unlimited (max 1/day)",
        perClass: "RM40/class at 30 classes",
      },
    ],
    primaryCta: { label: "Become a Member", href: "/contact" },
    benefits: {
      eyebrow: "Every Membership Includes",
      headline: "The things that make Re:Bound feel like yours.",
      items: [
        "Priority booking (48h advance)",
        "10% off all retail & add-ons",
        "2 guest passes per month",
        "Members-only class drops & events",
        "Complimentary grippy socks on first visit",
        "Pause anytime · Cancel anytime",
      ],
      image: { src: "/assets/founder-detail.jpg", alt: "Member training on the Megaformer" },
    },
  },

  specialty: {
    eyebrow: "Also Available",
    headline: "Specialty programs & events.",
    body:
      "For specific situations — prenatal, corporate wellness, and private studio hire.",
    cards: [
      {
        title: "Corporate & Team",
        price: "Custom",
        body:
          "Tailored packages for teams of 6+, wellness days, and ongoing corporate memberships.",
      },
      {
        title: "Studio Buyouts & Events",
        price: "From RM 2,500 / 2 hours",
        body:
          "Private studio hire for birthdays, bachelorette parties, brand events, and filming.",
      },
    ],
    cta: { label: "Inquire about special events", href: "/contact" },
  },

  matcher: {
    eyebrow: "Which one is right for you?",
    headline: "Match the package to your life.",
    rows: [
      { situation: "Just curious / trying Lagree", recommendation: "Free first class" },
      { situation: "1 class a week", recommendation: "Express Membership" },
      { situation: "2 classes a week", recommendation: "Standard Membership" },
      { situation: "4+ classes a week", recommendation: "Premier or Unlimited" },
      { situation: "Irregular / travel a lot", recommendation: "10 or 20-Class Pack" },
      { situation: "Want 1:1 coaching", recommendation: "Private Sessions" },
      { situation: "Training with a partner", recommendation: "Duet Pack" },
      { situation: "Pregnant or postpartum", recommendation: "Prenatal/Postnatal Pack" },
      { situation: "Corporate or team event", recommendation: "Studio Buyout" },
    ],
  },

  wordmark: {
    background: "/assets/footer-bg.jpg",
    logo: "/assets/footer-logo.png",
    alt: "Re:Bound",
  },
};
