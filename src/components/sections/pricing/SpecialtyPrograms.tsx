import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { PricingContent } from "@/types/content";

type Props = PricingContent["specialty"];

export function SpecialtyPrograms({ eyebrow, headline, body, cards, cta }: Props) {
  return (
    <section
      className="pricing-specialty"
      style={{ background: "var(--bone)", padding: "30px 64px 110px", textAlign: "center" }}
    >
      <style>{`
        @media (max-width: 720px) {
          .pricing-specialty { padding: 16px 24px 80px !important; }
          .pricing-specialty h2 { font-size: clamp(36px, 8vw, 52px) !important; }
          .pricing-specialty .ps-cards {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            max-width: 480px !important;
          }
          .pricing-specialty .ps-card { padding: 28px 24px !important; }
          .pricing-specialty .ps-card h3 { font-size: 28px !important; }
        }
      `}</style>
      <div style={{ maxWidth: 760, margin: "0 auto 48px" }}>
        <Eyebrow size="lg" ohwKey="specialty-eyebrow">{eyebrow}</Eyebrow>
        <h2
          data-ohw-editable="text"
          data-ohw-key="specialty-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(44px, 5vw, 68px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--espresso)",
            margin: "16px 0 18px",
          }}
        >
          {headline}
        </h2>
        <p
          data-ohw-editable="text"
          data-ohw-key="specialty-body"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--clove)",
            margin: 0,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {body}
        </p>
      </div>

      <div
        className="ps-cards"
        style={{
          maxWidth: 880,
          margin: "0 auto 56px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          textAlign: "left",
        }}
      >
        {cards.map((c, i) => (
          <article
            key={c.title}
            className="ps-card"
            style={{
              border: "1px solid var(--umber)",
              padding: "36px 36px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <h3
              data-ohw-editable="text"
              data-ohw-key={`specialty-${i}-title`}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 32,
                lineHeight: 1.05,
                letterSpacing: "-.01em",
                color: "var(--espresso)",
                margin: "0 0 6px",
              }}
            >
              {c.title}
            </h3>
            <span
              data-ohw-editable="text"
              data-ohw-key={`specialty-${i}-price`}
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--clove)",
                marginBottom: 6,
              }}
            >
              {c.price}
            </span>
            <p
              data-ohw-editable="text"
              data-ohw-key={`specialty-${i}-body`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.55,
                color: "var(--clove)",
                margin: 0,
              }}
            >
              {c.body}
            </p>
          </article>
        ))}
      </div>

      <Button variant="primary" size="md" href={cta.href}>
        {cta.label}
      </Button>
    </section>
  );
}
