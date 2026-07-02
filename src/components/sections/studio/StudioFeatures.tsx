import { Eyebrow } from "@/components/ui/Eyebrow";
import type { StudioContent } from "@/types/content";

type Props = StudioContent["features"];

export function StudioFeatures({ eyebrow, headline, items }: Props) {
  return (
    <section
      data-ohw-section="studio-features"
      data-ohw-section-label="Studio Features"
      className="studio-features"
      style={{ background: "var(--clay)", color: "var(--bone)", padding: "120px 64px" }}
    >
      <style>{`
        @media (max-width: 960px) {
          .studio-features { padding: 80px 28px !important; }
          .studio-features h2 { font-size: clamp(40px, 7vw, 56px) !important; }
          .studio-features-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px 24px !important;
          }
        }
        @media (max-width: 520px) {
          .studio-features { padding: 64px 20px !important; }
          .studio-features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: 760, margin: "0 auto 64px", textAlign: "center" }}>
        <Eyebrow size="lg" tone="bone" ohwKey="features-eyebrow">
          {eyebrow}
        </Eyebrow>
        <h2
          data-ohw-editable="text"
          data-ohw-key="features-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(44px, 5.2vw, 68px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--bone)",
            margin: "16px 0 0",
          }}
        >
          {headline}
        </h2>
      </div>

      <div
        className="studio-features-grid"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px 56px",
        }}
      >
        {items.map((it, i) => (
          <article key={it.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h3
              data-ohw-editable="text"
              data-ohw-key={`feature-${i}-title`}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 28,
                lineHeight: 1.1,
                letterSpacing: "-.01em",
                color: "var(--bone)",
                margin: 0,
              }}
            >
              {it.title}
            </h3>
            <div
              aria-hidden="true"
              style={{ width: 36, height: 1, background: "rgba(255,255,255,.55)", margin: "4px 0" }}
            />
            <p
              data-ohw-editable="text"
              data-ohw-key={`feature-${i}-body`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.55,
                color: "var(--bone)",
                opacity: 0.9,
                margin: 0,
              }}
            >
              {it.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
