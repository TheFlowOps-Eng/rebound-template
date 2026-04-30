import type { AboutContent } from "@/types/content";

export const aboutContent: AboutContent = {
  header: { title: "Our Philosophy", image: "/assets/header-about.jpg" },

  story: {
    eyebrow: "Why I started Re:Bound",
    paragraphs: [
      "I’d spent years in KL’s fitness scene — the loud classes, the competitive energy. The workouts were effective. But I always left depleted. Never restored.",
      "Then I found Lagree. A method that asked me to slow down instead of speed up. That made my muscles shake without a single jump. That demanded so much focus I forgot about everything outside the studio for fifty minutes.",
      "I looked for a Lagree studio in KL. There wasn’t one. So I decided to build it, and to build it the way I wished every studio I’d been to had been built. Warm. Quiet. Considered. A space where the lighting, the materials, the music and the method all work together to make you feel something you can’t get anywhere else.",
      "See you on the Megaformer.",
    ],
    signature: { script: "Amara", name: "Amara Chen · Founder & Studio Director" },
    notes: [
      "06.04 — Bangsar walk-through",
      "cork floor / linen acoustic / soft N light",
      "12 reformers, 50 min, 8 per class",
      "warm. quiet. considered.",
      "— A.C",
    ],
    polaroid: { src: "/assets/amara.jpg", alt: "Amara on the Megaformer" },
    board: {
      title: "Founder’s Note",
      name: "Amara Chen",
      fields: [
        { label: "Role", value: "Founder & Studio Director" },
        { label: "Philosophy", value: "Discipline meets softness. Always." },
        { label: "Approach", value: "Slow movement. Warm spaces." },
        {
          label: "Foundation",
          value: ["Lagree method", "Exercise science", "Rehabilitation"],
        },
        { label: "Intent", value: "Every class makes you stronger." },
      ],
    },
  },

  manifesto: {
    headline: "We built the studio\nwe couldn’t find.",
    primaryCta: { label: "View the Studio", href: "/" },
    secondaryCta: { label: "Book a Class", href: "/classes" },
    strip: [
      { src: "/assets/studio-interior.jpg", alt: "" },
      { src: "/assets/hero-banner.jpg", alt: "" },
      { src: "/assets/header-classes.jpg", alt: "" },
      { src: "/assets/instructors-banner.jpg", alt: "" },
      { src: "/assets/class-tile.jpg", alt: "" },
    ],
  },

  explainer: {
    headline: "Lagree is ",
    headlineEm: "not Pilates",
    body:
      "Developed by Sebastien Lagree in Los Angeles, the method uses a patented machine called the Megaformer to deliver a full-body workout that’s low-impact but high-intensity. Every class is performed in slow motion: long holds, controlled transitions, constant muscular tension.",
    image: { src: "/assets/lagree-girls.jpg", alt: "Two students on the Megaformer" },
    cards: [
      {
        label: "What it feels like",
        body:
          "Imagine holding a lunge so slowly your legs begin to shake. Now imagine doing that for four minutes. That’s a Tuesday at Re:Bound. The method builds lean, defined muscle through endurance, not bulk.",
      },
      {
        label: "What it doesn’t feel like",
        body:
          "No pounding music. No one shouting at you. No jumping, no jarring, no impact on your joints. You won’t leave feeling beaten up. You’ll leave feeling worked — deeply, thoroughly, and precisely.",
      },
      {
        label: "Who it’s for",
        body:
          "Everyone. The Megaformer is adjustable and every exercise has modifications. Our Foundation classes are designed for complete beginners. Our Intensify classes will challenge competitive athletes.",
      },
    ],
    cta: { label: "Book a Class", href: "/classes" },
  },

  waitlist: {
    eyebrow: "Get Ready to Transform",
    headline: "Let’s make a ",
    headlineEm: "plan",
    body:
      "Waitlist members get early access to booking, launch-day pricing, and a complimentary first class. No credit card. Just your name and email.",
    submitLabel: "Reserve My Spot",
  },
};
