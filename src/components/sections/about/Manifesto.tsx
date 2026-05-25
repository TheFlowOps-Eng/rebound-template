import { Button } from "@/components/ui/Button";
import type { AboutContent } from "@/types/content";

type Props = AboutContent["manifesto"];

export function Manifesto({ headline, primaryCta, secondaryCta, strip }: Props) {
  const loop = [...strip, ...strip];

  return (
    <section style={{ background: "var(--stone)", padding: "120px 0 110px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", padding: "0 64px" }}>
        <h2
          data-ohw-editable="text"
          data-ohw-key="manifesto-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(64px, 8.5vw, 124px)",
            lineHeight: 0.99,
            letterSpacing: "-0.04em",
            color: "var(--ink)",
            margin: 0,
            whiteSpace: "pre-line",
          }}
        >
          {headline}
        </h2>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            marginTop: 56,
            marginBottom: 96,
          }}
        >
          <Button variant="primary" size="md" href={primaryCta.href}>
            {primaryCta.label}
          </Button>
          <Button variant="inverse" size="md" href={secondaryCta.href}>
            {secondaryCta.label}
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes manifesto-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .manifesto-track {
          display: flex;
          gap: 28px;
          width: max-content;
          padding: 0 14px;
          animation: manifesto-marquee 70s linear infinite;
          will-change: transform;
        }
        .manifesto-track:hover,
        .manifesto-track[data-ohw-hover-paused] { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .manifesto-track { animation: none; }
        }
      `}</style>

      <div style={{ width: "100%", overflow: "hidden" }}>
        <div className="manifesto-track" data-ohw-hover-pause="">
          {loop.map((img, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              data-ohw-editable="image"
              data-ohw-key={`manifesto-img-${i % strip.length}`}
              src={img.src}
              alt={img.alt}
              aria-hidden={i >= strip.length ? true : undefined}
              style={{
                flex: "0 0 auto",
                width: 360,
                height: 460,
                objectFit: "cover",
                display: "block",
                borderRadius: 4,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
