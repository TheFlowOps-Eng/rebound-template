import type { GlobalContent } from "@/types/content";

export const globalContent: GlobalContent = {
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/classes", label: "Classes" },
    { href: "/pricing", label: "Pricing" },
    { href: "/studio", label: "Studio" },
    { href: "/instructors", label: "Instructors" },
    { href: "/contact", label: "Contact" },
  ],
  bookCta: { label: "Book Now", href: "/contact" },
  footer: {
    address: "Level 2, 38 Jalan Telawi, Bangsar, Kuala Lumpur",
    phone: "+60 3 2000 1234",
    email: "hello@rebound.studio",
    columns: [
      {
        items: [
          { label: "Classes & Schedule", href: "/classes" },
          { label: "Booking", href: "/contact" },
          { label: "Contact Us", href: "/contact" },
          { label: "The Studio", href: "/" },
        ],
      },
      {
        items: [
          { label: "About Us", href: "/about" },
          { label: "Our Team", href: "/instructors" },
          { label: "Careers", href: "/" },
        ],
      },
    ],
    socials: [
      { name: "facebook", href: "#" },
      { name: "instagram", href: "#" },
      { name: "twitter", href: "#" },
      { name: "linkedin", href: "#" },
      { name: "youtube", href: "#" },
    ],
    credit: "© 2026 Re:Bound. All rights reserved.",
  },
};
