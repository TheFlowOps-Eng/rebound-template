import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { AboutContent } from "@/types/content";

type Props = AboutContent["waitlist"];

export function WaitlistCTA({ eyebrow, headline, headlineEm, body, submitLabel }: Props) {
  return (
    <section
      data-ohw-section="waitlist-cta"
      data-ohw-section-label="Waitlist"
      className="waitlist-section"
      style={{
        background: "var(--umber)",
        color: "var(--bone)",
        padding: "120px 64px",
      }}
    >
      <style>{`
        @media (max-width: 960px) {
          .waitlist-section { padding: 80px 28px !important; }
          .waitlist-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .waitlist-grid h2 { font-size: clamp(40px, 7.5vw, 60px) !important; line-height: 1.05 !important; }
          .waitlist-eyebrow { font-size: 13px !important; margin-bottom: 16px !important; }
          .waitlist-body { font-size: 16px !important; margin-top: 20px !important; }
        }
        @media (max-width: 520px) {
          .waitlist-section { padding: 64px 20px !important; }
          .waitlist-form-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
      <div
        className="waitlist-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        <div>
          <span
            data-ohw-editable="text"
            data-ohw-key="waitlist-eyebrow"
            className="waitlist-eyebrow"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--bone)",
              display: "block",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </span>
          <h2
            data-ohw-editable="text"
            data-ohw-key="waitlist-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(48px, 5vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--bone)",
              margin: 0,
            }}
          >
            {headline}
            <em style={{ fontStyle: "italic" }}>{headlineEm}</em>.
          </h2>
          <p
            data-ohw-editable="text"
            data-ohw-key="waitlist-body"
            className="waitlist-body"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--bone)",
              opacity: 0.85,
              margin: "24px 0 0",
              maxWidth: 480,
            }}
          >
            {body}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="waitlist-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Input label="Full name" placeholder="Full name" onCream={false} ohwKey="waitlist-label-name" />
            <Input label="Email" placeholder="you@email.com" type="email" onCream={false} ohwKey="waitlist-label-email" />
          </div>
          <Input
            label="Your message"
            placeholder="Tell us what you’re hoping for..."
            multiline
            onCream={false}
            ohwKey="waitlist-label-message"
          />
          <div style={{ marginTop: 8 }}>
            <Button variant="inverse" size="md">
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
