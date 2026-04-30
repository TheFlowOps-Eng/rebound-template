import type { ClassesContent } from "@/types/content";

export const classesContent: ClassesContent = {
  header: { title: "Classes", image: "/assets/header-classes.jpg" },
  filters: [
    { id: "all", label: "All Levels" },
    { id: "new", label: "New to Lagree" },
    { id: "strength", label: "Strength" },
    { id: "flow", label: "Flow" },
  ],
  items: [
    {
      id: "foundation",
      name: "Foundation",
      min: 50,
      level: "All Levels",
      tag: "new",
      desc: "Your Lagree primer. We take every fundamental unhurried so the method takes root — carriage control, spring choice, tempo.",
      img: "/assets/foundation-class.png",
    },
    {
      id: "sculpt",
      name: "Sculpt",
      min: 50,
      level: "Intermediate",
      tag: "strength",
      desc: "Targeted sequences. Slow lunges, long planks, and a shake that means it is working. You will leave longer.",
      img: "/assets/class-tile.jpg",
    },
    {
      id: "flow",
      name: "Flow",
      min: 50,
      level: "Intermediate",
      tag: "flow",
      desc: "Connected movement at a steady tempo. Where stamina and form meet — built for those who have found their rhythm.",
      img: "/assets/instructors-banner.jpg",
    },
    {
      id: "core",
      name: "Core",
      min: 45,
      level: "All Levels",
      tag: "strength",
      desc: "A shorter session built entirely around the middle. Plank-heavy. Deep, slow, and rarely quiet.",
      img: "/assets/hero-banner.jpg",
    },
  ],
};
