"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeContent } from "@/types/content";

type Props = HomeContent["plan"];

export function PlanForm({ eyebrow, headline, headlineEm, body, submitLabel }: Props) {
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    fontFamily: "var(--font-body)",
    fontSize: 15,
    color: "var(--espresso)",
    padding: "14px 16px",
    background: "transparent",
    border: "1px solid var(--umber)",
    borderRadius: 0,
    outline: "none",
    transition: "border-color 160ms",
  };

  return (
    <section className="plan-section" style={{ background: "var(--bone)", padding: "120px 64px 100px" }}>
      <style>{`
        @media (max-width: 960px) {
          .plan-section { padding: 80px 28px !important; }
          .plan-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .plan-grid h2 { font-size: clamp(48px, 9vw, 72px) !important; }
          .plan-grid p { max-width: none !important; font-size: 16px !important; }
        }
        @media (max-width: 520px) {
          .plan-section { padding: 64px 20px !important; }
          .plan-form-row {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
      `}</style>
      <div
        className="plan-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 96,
          alignItems: "start",
        }}
      >
        <div>
          <Eyebrow size="lg" ohwKey="plan-eyebrow">{eyebrow}</Eyebrow>
          <h2
            data-ohw-editable="text"
            data-ohw-key="plan-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(56px, 7.5vw, 84px)",
              lineHeight: 1.0,
              letterSpacing: "-.02em",
              margin: "24px 0 28px",
              color: "var(--espresso)",
            }}
          >
            {headline}
            <em style={{ fontStyle: "italic" }}>{headlineEm}</em>
          </h2>
          <p
            data-ohw-editable="text"
            data-ohw-key="plan-body"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--clove)",
              margin: 0,
              maxWidth: 360,
            }}
          >
            {body}
          </p>
        </div>

        <form
          className="plan-form-row"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label data-ohw-editable="text" data-ohw-key="plan-label-name" style={fieldLabelStyle} htmlFor="rb-name">Full name</label>
            <input id="rb-name" type="text" style={inputStyle} />
          </div>
          <div>
            <label data-ohw-editable="text" data-ohw-key="plan-label-email" style={fieldLabelStyle} htmlFor="rb-email">Email</label>
            <input id="rb-email" type="email" style={inputStyle} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label data-ohw-editable="text" data-ohw-key="plan-label-message" style={fieldLabelStyle} htmlFor="rb-msg">Your Message</label>
            <textarea
              id="rb-msg"
              style={{ ...inputStyle, minHeight: 150, resize: "vertical" }}
              placeholder="Type your message…"
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button
              type="submit"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 12.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "var(--umber-deep)",
                color: "var(--bone)",
                border: "none",
                cursor: "pointer",
                padding: "18px 36px",
                marginTop: 8,
              }}
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const fieldLabelStyle = {
  display: "block" as const,
  fontFamily: "var(--font-body)",
  fontWeight: 500 as const,
  fontSize: 14,
  color: "var(--espresso)",
  marginBottom: 10,
};
