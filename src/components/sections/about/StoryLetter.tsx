import type { AboutContent } from "@/types/content";

type Props = AboutContent["story"];

export function StoryLetter({ eyebrow, paragraphs, signature }: Props) {
  return (
    <section className="story-section" style={{ background: "var(--bone)", padding: "120px 64px 140px" }}>
      <style>{`
        @media (max-width: 960px) {
          .story-section { padding: 80px 28px 96px !important; }
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .story-grid > div { padding-top: 0 !important; }
          .story-board-wrap { max-width: 420px; margin: 0 auto; width: 100%; }
          .story-letter-eyebrow { font-size: 14px !important; }
          .story-letter-p { font-size: 16px !important; }
          .story-letter-script { font-size: 30px !important; }
        }
        @media (max-width: 520px) {
          .story-section { padding: 64px 20px 80px !important; }
          .story-board-wrap { max-width: 340px; }
        }
      `}</style>
      <div
        className="story-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
          alignItems: "start",
        }}
      >
        <div className="story-board-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Board.png"
            alt="Founder's note clipboard for Re:Bound"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 8 }}>
          <span
            data-ohw-editable="text"
            data-ohw-key="story-eyebrow"
            className="story-letter-eyebrow"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--espresso)",
            }}
          >
            {eyebrow}
          </span>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              data-ohw-editable="text"
              data-ohw-key={`story-para-${i}`}
              className="story-letter-p"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.55,
                color: "var(--clove)",
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
          <div
            data-ohw-editable="text"
            data-ohw-key="story-signature-script"
            className="story-letter-script"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 36,
              lineHeight: 1,
              color: "var(--espresso)",
              marginTop: 24,
            }}
          >
            {signature.script}
          </div>
          <div
            data-ohw-editable="text"
            data-ohw-key="story-signature-name"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
              marginTop: 8,
            }}
          >
            {signature.name}
          </div>
        </div>
      </div>
    </section>
  );
}
