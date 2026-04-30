import type { StudioContent } from "@/types/content";

export const studioContent: StudioContent = {
  header: { title: "Studio", image: "/assets/header-studio.jpg" },

  intro: {
    eyebrow: "The Space",
    headlineEm: "Warm. Quiet. Considered.",
    headline: "A studio designed to feel the way the method feels.",
    paragraphs: [
      "Twelve Megaformers under soft North light. Cork underfoot. Linen on the walls so the room never gets loud, even when twelve people are working hard. We built every corner of this studio around one idea: where you train shapes how you train.",
      "No mirrors competing for your attention. No music that demands you keep up. Just space, breath, and the machine — calibrated for the way the body actually wants to move.",
    ],
  },

  gallery: [
    { src: "/assets/studio-interior.jpg", alt: "Re:Bound studio main floor" },
    { src: "/assets/hero-banner.jpg", alt: "Member training on the Megaformer" },
    { src: "/assets/header-classes.jpg", alt: "Reformer detail" },
    { src: "/assets/class-tile.jpg", alt: "Mid-class focus" },
    { src: "/assets/instructors-banner.jpg", alt: "Coach cueing form" },
    { src: "/assets/lagree-girls.jpg", alt: "After class on the floor" },
    { src: "/assets/foundation-class.png", alt: "Foundation class setup" },
    { src: "/assets/founder-detail.jpg", alt: "Studio detail" },
  ],

  features: {
    eyebrow: "Inside the Studio",
    headline: "Built for the body. Calibrated for the room.",
    items: [
      {
        title: "12 Megaformers",
        body: "Sebastien Lagree’s patented machine — the only one in KL — calibrated for slow, controlled tension.",
      },
      {
        title: "8 per class",
        body: "Capped at eight. Every form correction lands on the right body.",
      },
      {
        title: "Cork floor",
        body: "Shock-absorbing, naturally warm, and quiet underfoot — even at six in the morning.",
      },
      {
        title: "Linen acoustic walls",
        body: "Soft surfaces that absorb sound so the room stays calm even at full capacity.",
      },
      {
        title: "Filtered air",
        body: "HEPA filtration on a 30-minute cycle between classes. Bring your breath; we’ll keep it clean.",
      },
      {
        title: "Showers & lockers",
        body: "Travertine showers, organic amenities, and lockers stocked with grippy socks for first-timers.",
      },
    ],
  },

  visit: {
    eyebrow: "Visit",
    headline: "Come find us.",
    address: ["48 Jalan Bangkung", "Bangsar, Kuala Lumpur", "Malaysia"],
    hours: [
      { label: "Mon – Fri", value: "06:00 – 21:00" },
      { label: "Saturday", value: "07:00 – 18:00" },
      { label: "Sunday", value: "08:00 – 14:00" },
    ],
    cta: { label: "Book a Class", href: "/contact" },
  },

  wordmark: {
    background: "/assets/footer-bg.jpg",
    logo: "/assets/footer-logo.png",
    alt: "Re:Bound",
  },
};
