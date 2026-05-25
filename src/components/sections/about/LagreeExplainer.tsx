import { Button } from "@/components/ui/Button";
import type { AboutContent } from "@/types/content";

type Props = AboutContent["explainer"];

export function LagreeExplainer({ headline, headlineEm, body, image, cards, cta }: Props) {
  return (
    <section className="explainer-section" style={{ background: "var(--bone)", padding: "140px 64px 160px" }}>
      <style>{`
        @media (max-width: 960px) {
          .explainer-section { padding: 80px 28px 96px !important; }
          .explainer-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .explainer-grid h2 { font-size: clamp(36px, 7vw, 52px) !important; line-height: 1.08 !important; }
          .explainer-grid .explainer-body { font-size: 16px !important; }
          .explainer-grid img { height: 320px !important; }
          .explainer-card { padding: 26px 26px !important; }
          .explainer-card .explainer-card-label { font-size: 12px !important; }
          .explainer-card .explainer-card-body { font-size: 15px !important; }
        }
        @media (max-width: 520px) {
          .explainer-section { padding: 64px 20px 80px !important; }
          .explainer-grid img { height: 240px !important; }
        }
      `}</style>
      <div
        className="explainer-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <h2
            data-ohw-editable="text"
            data-ohw-key="explainer-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(48px, 5.4vw, 78px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--espresso)",
              margin: 0,
            }}
          >
            {headline}
            <em style={{ fontStyle: "italic" }}>{headlineEm}</em>; though they share a family resemblance.
          </h2>
          <p
            data-ohw-editable="text"
            data-ohw-key="explainer-body"
            className="explainer-body"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--clove)",
              margin: 0,
            }}
          >
            {body}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-ohw-editable="image"
            data-ohw-key="explainer-img"
            src={image.src}
            alt={image.alt}
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              display: "block",
              filter: "saturate(.95)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {cards.map((c, i) => (
            <article
              key={i}
              className="explainer-card"
              style={{
                border: "2px solid var(--umber)",
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <span
                data-ohw-editable="text"
                data-ohw-key={`explainer-card-${i}-label`}
                className="explainer-card-label"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--espresso)",
                }}
              >
                {c.label}
              </span>
              <p
                data-ohw-editable="text"
                data-ohw-key={`explainer-card-${i}-body`}
                className="explainer-card-body"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--clove)",
                  margin: 0,
                }}
              >
                {c.body}
              </p>
            </article>
          ))}
          <div style={{ marginTop: 12 }}>
            <Button variant="primary" size="md" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
