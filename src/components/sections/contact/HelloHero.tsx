import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ContactContent } from "@/types/content";

type Props = ContactContent["hello"];

export function HelloHero({ eyebrow, headline, headlineEm, body, channels }: Props) {
  return (
    <section
      data-ohw-section="hello-hero"
      data-ohw-section-label="Hello"
      className="hello-section"
      style={{ background: "var(--bone)", paddingTop: 100 }}
    >
      <style>{`
        @media (max-width: 960px) {
          .hello-section { padding-top: 64px !important; }
          .hello-top { padding: 0 28px 48px !important; }
          .hello-top h2 { font-size: clamp(40px, 8vw, 56px) !important; }
          .hello-top p { font-size: 15px !important; }
          .hello-strip {
            grid-template-columns: 1fr 1fr !important;
            padding: 32px 28px !important;
            gap: 28px 24px !important;
          }
          .hello-channel { padding-left: 14px !important; }
        }
        @media (max-width: 520px) {
          .hello-strip { grid-template-columns: 1fr !important; gap: 22px !important; padding: 28px 24px !important; }
        }
      `}</style>
      <div
        className="hello-top"
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 64px 60px",
          textAlign: "center",
        }}
      >
        <Eyebrow size="lg" ohwKey="hello-eyebrow">{eyebrow}</Eyebrow>
        <h2
          data-ohw-editable="text"
          data-ohw-key="hello-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px, 5.4vw, 76px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--espresso)",
            margin: "16px 0 22px",
          }}
        >
          {headline}
          <em style={{ fontStyle: "italic" }}>{headlineEm}</em>
        </h2>
        <p
          data-ohw-editable="text"
          data-ohw-key="hello-body"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--clove)",
            margin: 0,
            maxWidth: 540,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {body}
        </p>
      </div>

      <div
        className="hello-strip"
        style={{
          background: "var(--stone)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
          padding: "32px 64px",
        }}
      >
        {channels.map((c) => (
          <div
            key={c.label}
            className="hello-channel"
            style={{
              borderLeft: "2px solid var(--umber)",
              paddingLeft: 18,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              data-ohw-editable="text"
              data-ohw-key={`hello-channel-${c.label.toLowerCase().replace(/\s+/g, '-')}-label`}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--espresso)",
              }}
            >
              {c.label}
            </span>
            {c.href ? (
              <a
                href={c.href}
                data-ohw-editable="text"
                data-ohw-key={`hello-channel-${c.label.toLowerCase().replace(/\s+/g, '-')}-value`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.4,
                  color: "var(--clove)",
                  textDecoration: "none",
                }}
              >
                {c.value}
              </a>
            ) : (
              <span
                data-ohw-editable="text"
                data-ohw-key={`hello-channel-${c.label.toLowerCase().replace(/\s+/g, '-')}-value`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.4,
                  color: "var(--clove)",
                }}
              >
                {c.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
