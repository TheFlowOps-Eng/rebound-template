type Props = { items: string[] };

export function BenefitsMarquee({ items }: Props) {
  const loop = [...items, ...items, ...items];

  return (
    <section
      data-ohw-section="benefits-marquee"
      data-ohw-section-label="Benefits"
      style={{
        background: "var(--clay)",
        color: "var(--bone)",
        overflow: "hidden",
        padding: "26px 0",
      }}
    >
      <style>{`
        @keyframes pricing-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-33.3333%, 0, 0); }
        }
        .pricing-marquee-track {
          display: flex;
          width: max-content;
          animation: pricing-marquee 50s linear infinite;
          will-change: transform;
        }
        .pricing-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .pricing-marquee-track { animation: none; }
        }
      `}</style>
      <div className="pricing-marquee-track">
        {loop.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length ? true : undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 36,
              padding: "0 36px",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--bone)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              data-ohw-editable="text"
              data-ohw-key={`marquee-${i % items.length}`}
            >
              {t}
            </span>
            <span style={{ opacity: 0.6 }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
