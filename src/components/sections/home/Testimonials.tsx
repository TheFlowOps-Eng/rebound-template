"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { mod } from "@/lib/utils";
import type { HomeContent } from "@/types/content";

type Props = HomeContent["testimonials"];

export function Testimonials({ items, primaryCta, secondaryCta, background }: Props) {
  const [tIdx, setTIdx] = useState(0);
  const t = items[tIdx];
  const goT = (dir: number) => setTIdx((i) => mod(i + dir, items.length));

  const arrowStyle = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 3,
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid var(--bone)",
    background: "transparent",
    color: "var(--bone)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <section
      data-ohw-section="testimonials"
      style={{
        position: "relative",
        minHeight: 640,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        data-ohw-editable="bg-image"
        data-ohw-key="testimonials-bg"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(32,12,2,0.55) 0%, rgba(32,12,2,0.45) 100%)",
        }}
      />
      <button
        aria-label="Previous testimonial"
        onClick={() => goT(-1)}
        style={{ ...arrowStyle, left: 48 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        aria-label="Next testimonial"
        onClick={() => goT(1)}
        style={{ ...arrowStyle, right: 48 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 820,
          padding: "80px 40px",
          textAlign: "center",
          color: "var(--bone)",
        }}
      >
        <div style={{ position: "relative", height: 0 }}>
          <span
            style={{
              position: "absolute",
              top: -60,
              left: -40,
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 160,
              lineHeight: 1,
              color: "var(--bone)",
              opacity: 0.95,
              userSelect: "none",
            }}
          >
            “
          </span>
        </div>
        {items.map((item, i) => (
          <div key={i} style={i !== tIdx ? { display: "none" } : undefined}>
            <p
              data-ohw-editable="text"
              data-ohw-key={`testimonial-${i}-quote`}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 46,
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                margin: 0,
                color: "var(--bone)",
              }}
            >
              {item.quote}
            </p>
            <p
              data-ohw-editable="text"
              data-ohw-key={`testimonial-${i}-attribution`}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--bone)",
                margin: "44px 0 40px",
              }}
            >
              {item.name},
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: ".05em",
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  marginLeft: 6,
                }}
              >
                {item.role}
              </span>
            </p>
          </div>
        ))}
        <div style={{ display: "inline-flex", gap: 0, marginTop: 8 }}>
          <Button variant="primary" size="md" href={primaryCta.href}>
            {primaryCta.label}
          </Button>
          <div style={{ width: 12 }} />
          <Button variant="inverse" size="md" href={secondaryCta.href}>
            {secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
