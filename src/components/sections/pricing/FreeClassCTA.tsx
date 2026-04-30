import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { PricingContent } from "@/types/content";

type Props = PricingContent["freeClass"];

export function FreeClassCTA({ eyebrow, headline, headlineEm, body, cta }: Props) {
  return (
    <section
      className="pricing-free"
      style={{
        background: "var(--bone)",
        padding: "120px 64px 110px",
        textAlign: "center",
      }}
    >
      <style>{`
        @media (max-width: 720px) {
          .pricing-free { padding: 72px 24px 80px !important; }
          .pricing-free h2 { font-size: clamp(40px, 9vw, 56px) !important; }
          .pricing-free p { font-size: 15px !important; }
        }
      `}</style>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Eyebrow size="lg">{eyebrow}</Eyebrow>
        <h2
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
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--clove)",
            margin: "0 auto 36px",
            maxWidth: 540,
          }}
        >
          {body}
        </p>
        <Button variant="primary" size="md" href={cta.href}>
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
