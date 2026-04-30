import type { InstructorsContent } from "@/types/content";

export const instructorsContent: InstructorsContent = {
  header: { title: "Instructors", image: "/assets/header-instructors.jpg" },
  team: [
    {
      name: "Amara Chen",
      role: "Head Coach · Founder",
      bio: "Former physio. Lagree-certified since 2019. Believes a whisper works better than a shout.",
      img: "/assets/amara.jpg",
      certification: ["Lagree-Certified", "Physiotherapist (MPhysio)", "Pre/Post-Natal"],
      quote:
        "I came to Lagree after years of rehab work — the same control, slower, with a body that lasts. My classes are quiet but exact: every cue earns its place.",
      style: "Calm, technical, deeply attentive to alignment.",
      formats: ["Foundation", "Restore", "Post-Natal"],
      bookHref: "/contact",
    },
    {
      name: "Wren Halim",
      role: "Senior Coach",
      bio: "Yoga background. Teaches Flow and Foundation. Will make you hold a plank longer than you meant to.",
      img: "/assets/wren.jpg",
      certification: ["Lagree-Certified", "RYT-500 Yoga"],
      quote:
        "I want you to leave taller — not louder. We work the small muscles first, breathe through the shake, and let the strength settle in.",
      style: "Steady tempo, breath-led, long holds.",
      formats: ["Foundation", "Sculpt", "Restore"],
      bookHref: "/contact",
    },
    {
      name: "Idris Vale",
      role: "Coach",
      bio: "Rehab and strength. Works with returning athletes, new parents, and anyone starting over.",
      img: "/assets/idris.jpg",
      certification: ["Lagree-Certified", "NASM-CPT", "TRX Qualified"],
      quote:
        "Strength is just control under load. We train it slowly so you can use it everywhere — on the trail, on the floor, on a long day.",
      style: "Patient, precise, won’t let you cheat a rep.",
      formats: ["Foundation", "Sculpt", "Athlete"],
      bookHref: "/contact",
    },
    {
      name: "Mika Okafor",
      role: "Coach",
      bio: "Dance background. Sculpt and Core specialist. Quiet, precise, exacting.",
      img: "/assets/mika.jpg",
      certification: ["Lagree-Certified", "BFA Contemporary Dance"],
      quote:
        "I teach the way I was taught to dance — with intention, not noise. Expect long, slow lines and a core that won’t stop talking the next morning.",
      style: "Choreographic flow, sculpting holds, refined transitions.",
      formats: ["Sculpt", "Flow", "Core"],
      bookHref: "/contact",
    },
  ],
};
