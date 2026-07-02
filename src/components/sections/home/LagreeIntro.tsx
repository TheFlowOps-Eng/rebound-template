import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeContent } from "@/types/content";

type Props = HomeContent["lagree"];

export function LagreeIntro({ eyebrow, headlineEm, headline, body, cta, image }: Props) {
  return (
    <section
      data-ohw-section="lagree-intro"
      data-ohw-section-label="Lagree Intro"
      className="lagree-section" style={{ background: "var(--bone)", padding: "120px 64px" }}>
      <style>{`
        @media (max-width: 960px) {
          .lagree-section { padding: 80px 28px !important; }
          .lagree-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .lagree-grid h2 { font-size: clamp(36px, 7vw, 52px) !important; }
          .lagree-grid img { height: 480px !important; }
        }
        @media (max-width: 520px) {
          .lagree-section { padding: 64px 20px !important; }
          .lagree-grid img { height: 360px !important; }
        }
      `}</style>
      <div
        className="lagree-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
          alignItems: "center",
        }}
      >
        <div>
          <Eyebrow size="lg" ohwKey="lagree-eyebrow">{eyebrow}</Eyebrow>
          <h2
            data-ohw-editable="text"
            data-ohw-key="lagree-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(44px, 4.6vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-.015em",
              margin: "24px 0 28px",
              color: "var(--espresso)",
            }}
          >
            <em style={{ fontStyle: "italic" }}>{headlineEm}</em>
            <br />
            {headline}
          </h2>
          {body.map((p, i) => (
            <p
              key={i}
              data-ohw-editable="text"
              data-ohw-key={`lagree-body-${i}`}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 1.65,
                color: "var(--clove)",
                margin: "0 0 18px",
                maxWidth: 480,
              }}
            >
              {p}
            </p>
          ))}
          <Link
            href={cta.href}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: "var(--umber)",
              color: "var(--bone)",
              padding: "20px 36px",
              marginTop: 16,
              textDecoration: "none",
            }}
          >
            {cta.label}
          </Link>
        </div>
        <div
          data-ohw-editable="image"
          data-ohw-key="lagree-intro-img"
          style={{ position: "relative" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            style={{
              width: "100%",
              height: 720,
              objectFit: "cover",
              display: "block",
              border: "2px solid var(--umber)",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    </section>
  );
}
