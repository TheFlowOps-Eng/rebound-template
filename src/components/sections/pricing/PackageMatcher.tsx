import { Eyebrow } from "@/components/ui/Eyebrow";
import type { PricingContent } from "@/types/content";

type Props = PricingContent["matcher"];

export function PackageMatcher({ eyebrow, headline, rows }: Props) {
  return (
    <section
      data-ohw-section="package-matcher"
      data-ohw-section-label="Packages"
      className="pricing-matcher"
      style={{ background: "var(--bone)", padding: "20px 64px 130px" }}
    >
      <style>{`
        @media (max-width: 720px) {
          .pricing-matcher { padding: 16px 24px 80px !important; }
          .pricing-matcher h2 { font-size: clamp(36px, 9vw, 52px) !important; }
          .pricing-matcher .pm-row {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
            padding: 18px 22px !important;
          }
          .pricing-matcher .pm-row span:first-child {
            font-size: 18px !important;
          }
          .pricing-matcher .pm-row span:last-child {
            text-align: left !important;
            font-size: 12px !important;
          }
          .pricing-matcher .pm-table { padding: 16px 0 !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto 36px" }}>
        <Eyebrow size="lg" ohwKey="matcher-eyebrow">{eyebrow}</Eyebrow>
        <h2
          data-ohw-editable="text"
          data-ohw-key="matcher-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px, 5.4vw, 76px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--espresso)",
            margin: "16px 0 0",
          }}
        >
          {headline}
        </h2>
      </div>

      <div
        className="pm-table"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          background: "var(--ivory, #f3f0e6)",
          padding: "16px 0",
        }}
      >
        {rows.map((r, i) => (
          <div
            key={i}
            className="pm-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 24,
              alignItems: "baseline",
              padding: "26px 56px",
              borderBottom:
                i === rows.length - 1 ? "none" : "1px solid rgba(94,73,57,.30)",
            }}
          >
            <span
              data-ohw-editable="text"
              data-ohw-key={`matcher-${i}-situation`}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 26,
                lineHeight: 1.15,
                letterSpacing: "-.005em",
                color: "var(--espresso)",
              }}
            >
              {r.situation}
            </span>
            <span
              data-ohw-editable="text"
              data-ohw-key={`matcher-${i}-recommendation`}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--umber-deep, #5e4939)",
                textAlign: "right",
                whiteSpace: "nowrap",
              }}
            >
              {r.recommendation}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
