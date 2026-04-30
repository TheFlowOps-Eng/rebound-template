import type { ContactContent } from "@/types/content";

export const contactContent: ContactContent = {
  header: { title: "Contact", image: "/assets/header-contact.jpg" },

  hello: {
    eyebrow: "Contact & FAQ",
    headline: "Come say ",
    headlineEm: "hello.",
    body:
      "We’re in the heart of KL. Drop by during studio hours, send us a message, or WhatsApp us — we’re a small team and we actually read every word.",
    channels: [
      { label: "Email", value: "hello@rebound.my", href: "mailto:hello@rebound.my" },
      { label: "WhatsApp", value: "+6012 356 7638", href: "https://wa.me/60123567638" },
      { label: "Instagram", value: "@rebound.kl", href: "https://instagram.com/rebound.kl" },
      { label: "Studio phone", value: "03-84783982", href: "tel:+60384783982" },
    ],
  },

  successMessage: {
    title: "Thank you.",
    body: "We’ll be in touch within two business days. Keep an eye on your inbox for a note from Amara.",
  },

  info: [
    {
      label: "Studio",
      value: "Lot 12-01, Jalan Maarof\nBangsar, 59000 Kuala Lumpur",
    },
    {
      label: "Hours",
      value: "Mon–Fri · 6:30am — 9:00pm\nSat–Sun · 7:00am — 4:00pm",
    },
    {
      label: "Contact",
      value: "+60 3-8478 3982\nhello@rebound.my",
    },
  ],

  details: {
    blocks: [
      {
        label: "Address",
        lines: ["Lot 12-01, Jalan Maarof", "Bangsar, 59000 Kuala Lumpur", "Malaysia"],
      },
      {
        label: "Studio Hours",
        lines: [
          "Mon–Fri · 6:30am – 9:00pm",
          "Sat–Sun · 7:00am – 4:00pm",
          "Public holidays · Limited schedule",
        ],
      },
      {
        label: "Parking",
        lines: [
          "Basement lot · Complimentary for members",
          "Street parking along Jalan Maarof",
          "Grab drop-off available at entrance",
        ],
      },
    ],
    mapsCta: {
      label: "Open in Google Maps",
      href: "https://maps.google.com/?q=Jalan+Maarof+Bangsar+Kuala+Lumpur",
    },
  },

  socials: [
    { name: "instagram", href: "#" },
    { name: "facebook", href: "#" },
    { name: "youtube", href: "#" },
  ],

  faq: {
    eyebrow: "Frequently Asked",
    headline: "FAQs",
    items: [
      {
        q: "Can I just drop in to see the studio?",
        a: "Absolutely — we love studio visits. Pop by during opening hours (Mon–Fri 6:30am–9pm, weekends 7am–4pm) and the team will walk you through the space, the Megaformer, and answer any questions.",
      },
      {
        q: "Do you offer private sessions or corporate bookings?",
        a: "Yes. We run 1:1 sessions, duet pairings, and full studio buyouts for teams, brand activations, and private events. Email hello@rebound.my and we’ll send you a tailored package.",
      },
      {
        q: "How do I cancel or reschedule a class?",
        a: "Cancellations are free up to 12 hours before class via the booking app. Inside the 12-hour window, the credit is forfeited — but you can transfer your spot to a friend at no charge.",
      },
      {
        q: "What should I wear and bring to my first class?",
        a: "Form-fitting workout clothes (no zips that scratch the upholstery), grippy socks (we provide a complimentary pair on your first visit), and a water bottle. Towels and amenities are stocked in the changing rooms.",
      },
      {
        q: "Is Lagree safe if I’m new to fitness or returning from injury?",
        a: "Lagree is famously low-impact and joint-friendly, and every exercise has a regression. Mention any injuries when you book and your instructor will guide you on safe modifications. If in doubt, start with Foundation.",
      },
      {
        q: "Do you have showers and lockers?",
        a: "Yes — travertine showers, organic toiletries, lockers, and hair tools are all available. Most members head straight from class to work or coffee at Bangsar Village around the corner.",
      },
    ],
  },

  wordmark: {
    background: "/assets/footer-bg.jpg",
    logo: "/assets/footer-logo.png",
    alt: "Re:Bound",
  },
};
