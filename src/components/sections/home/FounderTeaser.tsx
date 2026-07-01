import { Eyebrow } from "@/components/ui/Eyebrow";
import { InlineCTA } from "@/components/ui/InlineCTA";
import type { HomeContent } from "@/types/content";

type Props = HomeContent["founder"];

export function FounderTeaser({ eyebrow, headline, body, cta, image }: Props) {
  return (
    <section data-ohw-section="founder-teaser" style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 64px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "520px 1fr",
          gap: 96,
          alignItems: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          style={{
            width: "100%",
            height: 640,
            objectFit: "cover",
            display: "block",
            border: "2px solid var(--umber)",
            boxSizing: "border-box",
          }}
        />
        <div>
          <Eyebrow size="lg">{eyebrow}</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: 76,
              lineHeight: 1,
              letterSpacing: "-.02em",
              margin: "18px 0 32px",
            }}
          >
            {headline}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--clove)",
              marginBottom: 20,
            }}
          >
            {body}
          </p>
          <InlineCTA tone="espresso" href={cta.href}>
            {cta.label}
          </InlineCTA>
        </div>
      </div>
    </section>
  );
}
