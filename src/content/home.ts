import type { HomeContent } from "@/types/content";

export const homeContent: HomeContent = {
  hero: {
    headline: "Discipline Meets ",
    headlineEm: "Softness",
    subhead:
      "50-minute, full-body workouts on the Megaformer. Low-impact enough to protect your joints. Intense enough to reshape your body.",
    cta: { label: "Join the Waitlist. It’s Free", href: "/contact" },
    background: "/assets/hero-banner.jpg",
  },

  lagree: {
    eyebrow: "What Is Lagree?",
    headlineEm: "Not Pilates. Not yoga.",
    headline: "Something that borrows from both — and outworks them.",
    body: [
      "Our studio was designed to feel the way the method feels: warm materials, soft light, deliberate space. Because where you train shapes how you train. And how you train shapes who you become. The Lagree method uses a machine called the Megaformer to deliver slow, controlled movements under constant tension. It’s the same system used by athletes and celebrities in LA, but you don’t need to be either to start.",
      "The slower you go, the harder it gets. That’s what makes it different, exactly what the body needs.",
    ],
    cta: { label: "Learn About Lagree", href: "/about" },
    image: { src: "/assets/lagree-girls.jpg", alt: "Three members laughing after class" },
  },

  classes: {
    eyebrow: "Choose Your Class",
    headline: "Three formats.",
    headlineEm: "One intention.",
    viewAll: { label: "View All Classes", href: "/classes" },
    items: [
      {
        name: "Foundation",
        copy: "Your introduction to the Megaformer. We’ll build your vocabulary of movement patterns so you can find your form — and keep it.",
        img: "/assets/foundation-class.png",
      },
      {
        name: "Sculpt",
        copy: "Targeted sequences isolating & fatigue specific muscles. Expect slow lunges, long planks, and a shake that means it’s working.",
        img: "/assets/class-tile.jpg",
      },
      {
        name: "Restore",
        copy: "A gentler pace with emphasis on flexibility, mobility, and breath. Designed for recovery days & those who needs to decompress.",
        img: "/assets/instructors-banner.jpg",
      },
    ],
  },

  feelSplit: {
    left: {
      eyebrow: "What It Feels Like",
      headline: "Slow. Steady. Quietly brutal.",
      body:
        "The slower you go, the harder it gets. You’ll shake. You’ll breathe through it. You’ll leave longer — taller — and a little surprised at what your body will do when no one is rushing it.",
    },
    right: {
      eyebrow: "What It Doesn’t Feel Like",
      headline: "Not bootcamp. Not choreography.",
      body:
        "No pounding music. No one counting you down. No jumping, no jarring. The Megaformer is adjustable and every exercise has an option — so it meets you where you are and still asks for more.",
    },
  },

  founder: {
    eyebrow: "Who It’s For",
    headline: "Everyone.",
    body:
      "The Megaformer is adjustable and every exercise has an option. New to strength work. Returning from injury. A runner looking for the cross-training no one warned you that you’d love. Students. Parents. Shift workers. You, at six in the morning, before the city is awake.",
    cta: { label: "Read our founder’s letter →", href: "/about" },
    image: { src: "/assets/founder.png", alt: "Founder" },
  },

  testimonials: {
    items: [
      {
        quote:
          "Arched ceilings. Warm textured walls. Diffused lighting that softens as you settle in. Every detail was considered, from the temperature of the towels to the curve of the doorways.",
        name: "Kaitlyn",
        role: "Beginner",
      },
      {
        quote:
          "I left each class taller. Not louder, not more exhausted — taller. It’s the first movement practice that hasn’t asked me to perform.",
        name: "Priya",
        role: "Member since ’25",
      },
      {
        quote:
          "Slow is a lie they tell you. Fifty minutes in and my legs were shaking in a way I haven’t felt since I stopped running half-marathons.",
        name: "Daniel",
        role: "Crossover athlete",
      },
    ],
    primaryCta: { label: "View Packages & Membership", href: "#" },
    secondaryCta: { label: "Book a Session", href: "/contact" },
    background: "/assets/testimonial-bg.jpg",
  },

  plan: {
    eyebrow: "Get Ready to Transform",
    headline: "Let’s make a ",
    headlineEm: "plan.",
    body:
      "Waitlist members get early access to booking, launch-day pricing, and a complimentary first class. No credit card. Just your name and email.",
    submitLabel: "Reserve My Spot",
  },

  wordmark: {
    background: "/assets/footer-bg.jpg",
    logo: "/assets/footer-logo.png",
    alt: "Re:Bound",
  },
};
