"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ContactContent } from "@/types/content";

type Props = { successMessage: ContactContent["successMessage"] };

export function ContactForm({ successMessage }: Props) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ padding: 40, border: "1px solid var(--umber)", color: "var(--espresso)" }}>
        <h2
          data-ohw-editable="text"
          data-ohw-key="contact-success-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 56,
            lineHeight: 1,
            margin: "0 0 16px",
            letterSpacing: "-.02em",
          }}
        >
          {successMessage.title}
        </h2>
        <p
          data-ohw-editable="text"
          data-ohw-key="contact-success-body"
          style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, margin: 0 }}
        >
          {successMessage.body}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Input label="Full name" placeholder="Full name" ohwKey="contact-label-name" />
        <Input label="Email" placeholder="you@email.com" type="email" ohwKey="contact-label-email" />
      </div>
      <Input label="Phone (optional)" placeholder="+60" ohwKey="contact-label-phone" />
      <Input label="Your message" placeholder="Tell us what you are looking for..." multiline ohwKey="contact-label-message" />
      <div style={{ marginTop: 16 }}>
        <Button
          variant="primary"
          size="md"
          onClick={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
}
