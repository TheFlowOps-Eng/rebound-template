import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { StudioContent } from "@/types/content";

type Props = StudioContent["visit"];

export function StudioVisit({ eyebrow, headline, address, hours, cta }: Props) {
  return (
    <section
      data-ohw-section="studio-visit"
      className="studio-visit"
      style={{ background: "var(--bone)", padding: "120px 64px" }}
    >
      <style>{`
        @media (max-width: 960px) {
          .studio-visit { padding: 80px 28px !important; }
          .studio-visit-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .studio-visit h2 { font-size: clamp(48px, 9vw, 72px) !important; }
        }
        @media (max-width: 520px) {
          .studio-visit { padding: 64px 20px !important; }
        }
      `}</style>
      <div
        className="studio-visit-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        <div>
          <Eyebrow size="lg" ohwKey="visit-eyebrow">{eyebrow}</Eyebrow>
          <h2
            data-ohw-editable="text"
            data-ohw-key="visit-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(56px, 6.5vw, 96px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              color: "var(--espresso)",
              margin: "16px 0 32px",
            }}
          >
            {headline}
          </h2>
          <Button variant="primary" size="md" href={cta.href}>
            {cta.label}
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div>
            <span
              data-ohw-editable="text"
              data-ohw-key="visit-label-address"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--espresso)",
                display: "block",
                marginBottom: 12,
              }}
            >
              Address
            </span>
            {address.map((line, i) => (
              <div
                key={i}
                data-ohw-editable="text"
                data-ohw-key={`visit-address-${i}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: "var(--clove)",
                }}
              >
                {line}
              </div>
            ))}
          </div>

          <div>
            <span
              data-ohw-editable="text"
              data-ohw-key="visit-label-hours"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--espresso)",
                display: "block",
                marginBottom: 12,
              }}
            >
              Hours
            </span>
            {hours.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(94,73,57,.18)",
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  color: "var(--clove)",
                }}
              >
                <span
                  data-ohw-editable="text"
                  data-ohw-key={`visit-hour-${i}-label`}
                  style={{ fontWeight: 700 }}
                >{h.label}</span>
                <span
                  data-ohw-editable="text"
                  data-ohw-key={`visit-hour-${i}-value`}
                >{h.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
