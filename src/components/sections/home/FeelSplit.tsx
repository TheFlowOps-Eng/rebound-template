import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeContent } from "@/types/content";

type Props = HomeContent["feelSplit"];

export function FeelSplit({ left, right }: Props) {
  const panel = {
    padding: "100px 72px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    gap: 24,
  };
  const headline = {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 60,
    lineHeight: 1.05,
    letterSpacing: "-.02em",
    margin: 0,
  };
  const body = {
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 1.6,
    margin: 0,
  };

  return (
    <section
      data-ohw-section="feel-split"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 640,
      }}
    >
      <div style={{ ...panel, background: "var(--umber-deep)" }}>
        <Eyebrow size="md" tone="bone">
          {left.eyebrow}
        </Eyebrow>
        <h2 style={{ ...headline, color: "var(--bone)" }}>{left.headline}</h2>
        <p style={{ ...body, color: "var(--bone)", opacity: 0.82 }}>{left.body}</p>
      </div>
      <div style={{ ...panel, background: "var(--sand)" }}>
        <Eyebrow size="md" tone="espresso">
          {right.eyebrow}
        </Eyebrow>
        <h2 style={{ ...headline, color: "var(--espresso)" }}>{right.headline}</h2>
        <p style={{ ...body, color: "var(--clove)" }}>{right.body}</p>
      </div>
    </section>
  );
}
