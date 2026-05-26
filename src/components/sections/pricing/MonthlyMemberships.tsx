import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { PricingContent } from "@/types/content";

type Props = PricingContent["memberships"];

export function MonthlyMemberships({
  eyebrow,
  headline,
  body,
  tiers,
  primaryCta,
  benefits,
}: Props) {
  return (
    <section
      className="pricing-memberships"
      style={{ background: "var(--bone)", padding: "110px 64px 140px" }}
    >
      <style>{`
        @media (max-width: 960px) {
          .pricing-memberships { padding: 80px 28px 96px !important; }
          .pricing-memberships .pm-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .pricing-memberships .pm-table { padding: 28px 24px !important; }
          .pricing-memberships .pm-tier { grid-template-columns: 1fr !important; gap: 6px !important; }
          .pricing-memberships .pm-tier-right { text-align: left !important; }
          .pricing-memberships .pm-tier-name { font-size: 28px !important; }
          .pricing-memberships .pm-tier-price { font-size: 28px !important; }
          .pricing-memberships .pm-benefits { padding: 36px 28px !important; }
          .pricing-memberships .pm-benefits h3 { font-size: 28px !important; }
          .pricing-memberships .pm-heading h2 { font-size: clamp(40px, 8vw, 60px) !important; }
        }
        @media (max-width: 520px) {
          .pricing-memberships { padding: 64px 20px 80px !important; }
        }
      `}</style>

      <div
        className="pm-heading"
        style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 64px" }}
      >
        <Eyebrow size="lg" ohwKey="memberships-eyebrow">{eyebrow}</Eyebrow>
        <h2
          data-ohw-editable="text"
          data-ohw-key="memberships-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px, 5.4vw, 76px)",
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
          data-ohw-key="memberships-body"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--clove)",
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>

      <div
        className="pm-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        {/* Tier table */}
        <div
          className="pm-table"
          style={{
            border: "1px solid var(--umber)",
            padding: "44px 48px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {tiers.map((t, i) => {
            const slug = t.name.toLowerCase().replace(/\s+/g, "-");
            return (
            <div
              key={t.name}
              className="pm-tier"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 24,
                padding: "26px 0",
                borderBottom:
                  i === tiers.length - 1 ? "none" : "1px solid rgba(94,73,57,.25)",
              }}
            >
              <div>
                <h3
                  className="pm-tier-name"
                  data-ohw-editable="text"
                  data-ohw-key={`tier-${slug}-name`}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 32,
                    lineHeight: 1,
                    letterSpacing: "-.01em",
                    color: "var(--espresso)",
                    margin: "0 0 8px",
                  }}
                >
                  {t.name}
                </h3>
                <p
                  data-ohw-editable="text"
                  data-ohw-key={`tier-${slug}-tagline`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontStyle: "italic",
                    fontSize: 14,
                    lineHeight: 1.4,
                    color: "var(--clove)",
                    margin: 0,
                  }}
                >
                  {t.tagline}
                </p>
              </div>
              <div className="pm-tier-right" style={{ textAlign: "right" }}>
                <div
                  className="pm-tier-price"
                  data-ohw-editable="text"
                  data-ohw-key={`tier-${slug}-price`}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 32,
                    lineHeight: 1,
                    letterSpacing: "-.01em",
                    color: "var(--espresso)",
                    margin: "0 0 6px",
                  }}
                >
                  {t.price}
                </div>
                <div
                  data-ohw-editable="text"
                  data-ohw-key={`tier-${slug}-unit`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--clove)",
                    margin: 0,
                  }}
                >
                  {t.unit}
                </div>
                {t.perClass && (
                  <div
                    data-ohw-editable="text"
                    data-ohw-key={`tier-${slug}-per-class`}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "var(--clove)",
                      opacity: 0.85,
                      marginTop: 2,
                    }}
                  >
                    {t.perClass}
                  </div>
                )}
              </div>
            </div>
            );
          })}

          <div style={{ marginTop: 36 }}>
            <Button variant="primary" size="md" href={primaryCta.href}>
              {primaryCta.label}
            </Button>
          </div>
        </div>

        {/* Benefits panel */}
        <div
          className="pm-benefits"
          data-ohw-editable="bg-image"
          data-ohw-key="benefits-bg"
          style={{
            position: "relative",
            color: "var(--bone)",
            overflow: "hidden",
            backgroundColor: "var(--espresso, #2a1f17)",
            backgroundImage: `url('${benefits.image.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,12,8,.78) 0%, rgba(20,12,8,.86) 100%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", padding: "48px 44px" }}>
          <span
            data-ohw-editable="text"
            data-ohw-key="benefits-eyebrow"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--bone)",
              opacity: 0.85,
            }}
          >
            {benefits.eyebrow}:
          </span>
          <h3
            data-ohw-editable="text"
            data-ohw-key="benefits-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: 36,
              lineHeight: 1.1,
              letterSpacing: "-.01em",
              color: "var(--bone)",
              margin: "16px 0 30px",
              maxWidth: 360,
            }}
          >
            {benefits.headline}
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {benefits.items.map((b, bi) => (
              <li
                key={bi}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: "var(--bone)",
                  display: "flex",
                  gap: 12,
                }}
              >
                <span aria-hidden="true" style={{ opacity: 0.9 }}>✓</span>
                <span
                  data-ohw-editable="text"
                  data-ohw-key={`benefit-${bi}`}
                >{b}</span>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
