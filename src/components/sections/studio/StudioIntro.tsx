import { Eyebrow } from "@/components/ui/Eyebrow";
import type { StudioContent } from "@/types/content";

type Props = StudioContent["intro"];

export function StudioIntro({ eyebrow, headline, headlineEm, paragraphs }: Props) {
  return (
    <section
      data-ohw-section="studio-intro"
      className="studio-intro"
      style={{ background: "var(--bone)", padding: "120px 64px 80px" }}
    >
      <style>{`
        @media (max-width: 960px) {
          .studio-intro { padding: 80px 28px 56px !important; }
          .studio-intro-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .studio-intro h2 { font-size: clamp(36px, 6.5vw, 52px) !important; }
        }
        @media (max-width: 520px) {
          .studio-intro { padding: 64px 20px 40px !important; }
        }
      `}</style>
      <div
        className="studio-intro-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        <div>
          <Eyebrow size="lg" ohwKey="studio-intro-eyebrow">{eyebrow}</Eyebrow>
          <h2
            data-ohw-editable="text"
            data-ohw-key="studio-intro-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(40px, 4.4vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--espresso)",
              margin: "16px 0 0",
            }}
          >
            <em style={{ fontStyle: "italic" }}>{headlineEm}</em>
            <br />
            {headline}
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              data-ohw-editable="text"
              data-ohw-key={`studio-intro-para-${i}`}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--clove)",
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
