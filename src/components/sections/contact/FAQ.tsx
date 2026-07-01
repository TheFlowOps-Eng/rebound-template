import type { ContactContent } from "@/types/content";

type Props = ContactContent["faq"];

export function FAQ({ headline, items }: Props) {
  return (
    <section
      data-ohw-section="faq"
      className="faq-section"
      style={{ background: "var(--stone)", padding: "120px 64px 140px" }}
    >
      <style>{`
        @media (max-width: 720px) {
          .faq-section { padding: 80px 24px 96px !important; }
          .faq-section h2 { font-size: clamp(56px, 14vw, 88px) !important; }
          .faq-q summary { font-size: 15px !important; padding: 22px 0 !important; }
          .faq-a { font-size: 14px !important; padding-bottom: 22px !important; }
        }
        .faq-q {
          border-bottom: 1px solid var(--ink, #1a1612);
        }
        .faq-q summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 26px 0;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 16px;
          letter-spacing: .01em;
          color: var(--espresso);
        }
        .faq-q summary::-webkit-details-marker { display: none; }
        .faq-chevron {
          flex: 0 0 auto;
          width: 18px;
          height: 18px;
          transition: transform 280ms cubic-bezier(.22,.61,.36,1);
        }
        .faq-q[open] .faq-chevron { transform: rotate(180deg); }
        .faq-a {
          padding: 0 0 26px;
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.65;
          color: var(--clove);
          max-width: 760px;
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-chevron { transition: none; }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2
          data-ohw-editable="text"
          data-ohw-key="faq-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(72px, 9vw, 124px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--espresso)",
            margin: "0 0 56px",
          }}
        >
          {headline}
        </h2>

        <div>
          {items.map((it, i) => (
            <details key={i} className="faq-q" open={i === 0 ? false : undefined}>
              <summary>
                <span data-ohw-editable="text" data-ohw-key={`faq-${i}-q`}>{it.q}</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p data-ohw-editable="text" data-ohw-key={`faq-${i}-a`} className="faq-a">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
