import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { InlineCTA } from "@/components/ui/InlineCTA";
import type { HomeContent } from "@/types/content";

type Props = HomeContent["classes"];

export function ClassesStrip({ eyebrow, headline, headlineEm, viewAll, items }: Props) {
  return (
    <section
      data-ohw-section="classes-strip"
      className="classes-section"
      style={{
        background: "var(--clay)",
        color: "var(--bone)",
        padding: "120px 0 100px",
      }}
    >
      <style>{`
        .classes-images,
        .classes-copy {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .classes-card-img {
          width: 100%;
          height: 560px;
          object-fit: cover;
          display: block;
        }
        .classes-card-copy { padding: 0 48px; }
        @media (max-width: 960px) {
          .classes-section { padding: 80px 0 80px !important; }
          .classes-heading-wrap { padding: 0 28px !important; margin-bottom: 48px !important; }
          .classes-heading-wrap h2 { font-size: clamp(40px, 7.5vw, 56px) !important; }
          .classes-mobile-stack {
            display: flex !important;
            flex-direction: column;
            gap: 56px;
            padding: 0 24px;
          }
          .classes-images,
          .classes-copy { display: none !important; }
          .classes-card {
            display: flex;
            flex-direction: column;
            background: transparent;
          }
          .classes-card .classes-card-img {
            height: auto;
            aspect-ratio: 4 / 5;
            margin-bottom: 24px;
          }
          .classes-card .classes-card-copy {
            padding: 0;
          }
          .classes-card .classes-card-copy h3 {
            font-size: 40px !important;
            margin-bottom: 14px !important;
          }
          .classes-card .classes-card-copy p {
            font-size: 16px !important;
            margin-bottom: 22px !important;
            max-width: none !important;
          }
          .classes-viewall { margin-top: 56px !important; padding: 0 24px; }
        }
      `}</style>

      <div
        className="classes-heading-wrap"
        style={{ textAlign: "center", padding: "0 64px", marginBottom: 72 }}
      >
        <Eyebrow size="lg" tone="bone" ohwKey="classes-eyebrow">
          {eyebrow}
        </Eyebrow>
        <h2
          data-ohw-editable="text"
          data-ohw-key="classes-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px, 5.2vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-.02em",
            margin: "14px 0 0",
            color: "var(--bone)",
          }}
        >
          {headline}{" "}
          <em style={{ fontStyle: "italic" }}>{headlineEm}</em>
        </h2>
      </div>

      {/* Desktop / tablet: separate image strip + copy strip */}
      <div className="classes-images">
        {items.map((c) => {
          const slug = c.name.toLowerCase().replace(/\s+/g, "-");
          return (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={c.name}
              data-ohw-editable="image"
              data-ohw-key={`class-strip-${slug}-img`}
              src={c.img}
              alt={c.name}
              className="classes-card-img"
            />
          );
        })}
      </div>
      <div className="classes-copy" style={{ padding: "44px 0 0" }}>
        {items.map((c) => {
          const slug = c.name.toLowerCase().replace(/\s+/g, "-");
          return (
          <article key={c.name} className="classes-card-copy">
            <h3
              data-ohw-editable="text"
              data-ohw-key={`class-${slug}-name`}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 44,
                lineHeight: 1,
                letterSpacing: "-.01em",
                margin: "0 0 18px",
                color: "var(--bone)",
              }}
            >
              {c.name}
            </h3>
            <p
              data-ohw-editable="text"
              data-ohw-key={`class-${slug}-copy`}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--bone)",
                margin: "0 0 28px",
                maxWidth: 360,
              }}
            >
              {c.copy}
            </p>
            <InlineCTA tone="bone" href="/classes">
              Book {c.name} →
            </InlineCTA>
          </article>
          );
        })}
      </div>

      {/* Mobile: stacked cards — same keys as desktop so edits sync */}
      <div className="classes-mobile-stack" style={{ display: "none" }}>
        {items.map((c) => {
          const slug = c.name.toLowerCase().replace(/\s+/g, "-");
          return (
          <article key={c.name} className="classes-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-ohw-editable="image"
              data-ohw-key={`class-strip-${slug}-img`}
              src={c.img}
              alt={c.name}
              className="classes-card-img"
            />
            <div className="classes-card-copy">
              <h3
                data-ohw-editable="text"
                data-ohw-key={`class-${slug}-name`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 44,
                  lineHeight: 1,
                  letterSpacing: "-.01em",
                  margin: "0 0 18px",
                  color: "var(--bone)",
                }}
              >
                {c.name}
              </h3>
              <p
                data-ohw-editable="text"
                data-ohw-key={`class-${slug}-copy`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "var(--bone)",
                  margin: "0 0 24px",
                }}
              >
                {c.copy}
              </p>
              <InlineCTA tone="bone" href="/classes">
                Book {c.name} →
              </InlineCTA>
            </div>
          </article>
          );
        })}
      </div>

      <div className="classes-viewall" style={{ textAlign: "center", marginTop: 72 }}>
        <Button variant="primary" size="md" href={viewAll.href}>
          {viewAll.label}
        </Button>
      </div>
    </section>
  );
}
