import type { InstructorsContent, Instructor } from "@/types/content";

type Props = { team: InstructorsContent["team"] };

export function InstructorGrid({ team }: Props) {
  return (
    <section style={{ padding: "0 0 0", background: "var(--bone)" }}>
      <style>{`
        .ig-card {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--ink, #1a1612);
          isolation: isolate;
        }
        .ig-card .ig-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 700ms cubic-bezier(.22,.61,.36,1), filter 500ms ease;
          will-change: transform;
        }
        .ig-card .ig-name {
          position: absolute;
          left: 28px;
          top: 28px;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(36px, 3.6vw, 48px);
          line-height: 1;
          letter-spacing: -.01em;
          color: var(--bone);
          text-shadow: 0 2px 18px rgba(0,0,0,.35);
          transition: opacity 320ms ease, transform 320ms ease;
          z-index: 2;
          pointer-events: none;
        }
        .ig-card .ig-panel {
          position: absolute;
          inset: 0;
          padding: 48px 56px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          background: linear-gradient(180deg, rgba(15,12,10,.55) 0%, rgba(15,12,10,.78) 50%, rgba(15,12,10,.92) 100%);
          color: var(--bone);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 360ms ease, transform 360ms cubic-bezier(.22,.61,.36,1);
          z-index: 3;
          overflow-y: auto;
        }
        @media (hover: hover) and (pointer: fine) {
          .ig-card:hover .ig-img,
          .ig-card:focus-within .ig-img {
            transform: scale(1.04);
            filter: brightness(.55);
          }
          .ig-card:hover .ig-panel,
          .ig-card:focus-within .ig-panel {
            opacity: 1;
            transform: translateY(0);
          }
          .ig-card:hover .ig-name,
          .ig-card:focus-within .ig-name {
            opacity: 0;
            transform: translateY(-4px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ig-card .ig-img,
          .ig-card .ig-panel,
          .ig-card .ig-name { transition: none; }
        }
        .ig-label {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: clamp(11px, 0.85vw, 13px);
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--bone);
          opacity: .9;
        }
        .ig-pname {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(38px, 3.8vw, 56px);
          line-height: 1;
          letter-spacing: -.01em;
          margin: 0 0 22px;
        }
        .ig-cert {
          font-family: var(--font-body);
          font-size: clamp(15px, 1.05vw, 18px);
          line-height: 1.55;
          margin: 8px 0 22px;
          color: var(--bone);
          opacity: .92;
        }
        .ig-quote {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.15vw, 20px);
          line-height: 1.55;
          margin: 0 0 22px;
          color: var(--bone);
          opacity: .94;
        }
        .ig-style {
          font-family: var(--font-body);
          font-size: clamp(15px, 1.05vw, 18px);
          line-height: 1.55;
          margin: 8px 0 26px;
          color: var(--bone);
          opacity: .92;
        }
        .ig-formats {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 18px;
        }
        .ig-chip {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: clamp(11px, 0.85vw, 13px);
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--bone);
          padding: 12px 22px;
          border: 1px solid rgba(255,255,255,.55);
          background: transparent;
        }
        .ig-book {
          align-self: flex-start;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: clamp(11px, 0.85vw, 13px);
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--ink, #1a1612);
          background: var(--bone);
          padding: 14px 26px;
          margin-top: 8px;
          transition: opacity 200ms ease;
        }
        .ig-book:hover { opacity: .82; }
        @media (max-width: 1024px) {
          .ig-card .ig-panel { padding: 32px 32px; }
          .ig-card .ig-pname { font-size: 32px; margin-bottom: 14px; }
          .ig-card .ig-cert,
          .ig-card .ig-style { font-size: 13px; margin: 6px 0 14px; }
          .ig-card .ig-quote { font-size: 14px; margin-bottom: 14px; }
          .ig-card .ig-label { font-size: 10px; }
          .ig-card .ig-chip { font-size: 10px; padding: 9px 16px; }
          .ig-card .ig-book { font-size: 10px; padding: 11px 20px; }
          .ig-card .ig-formats { gap: 8px; margin-bottom: 12px; }
        }
        @media (max-width: 720px) {
          .ig-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding: 28px 20px;
            background: var(--bone);
          }
          .ig-card {
            aspect-ratio: auto;
            display: flex;
            flex-direction: column;
            background: var(--bone);
            overflow: visible;
          }
          .ig-card .ig-name { display: none; }
          .ig-card .ig-img {
            position: relative;
            inset: auto;
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 5;
            filter: none;
            transform: none !important;
          }
          .ig-card .ig-panel {
            position: relative;
            inset: auto;
            opacity: 1;
            transform: none;
            background: var(--bone);
            color: var(--ink, #1a1612);
            padding: 22px 4px 4px;
            overflow: visible;
          }
          .ig-card .ig-pname {
            font-size: 32px;
            margin-bottom: 14px;
            color: var(--espresso, #1a1612);
          }
          .ig-card .ig-label { font-size: 10px; letter-spacing: .2em; color: var(--clove, #3d312b); opacity: 1; }
          .ig-card .ig-cert,
          .ig-card .ig-style { font-size: 14px; margin: 4px 0 14px; color: var(--clove, #3d312b); opacity: 1; }
          .ig-card .ig-quote { font-size: 15px; margin-bottom: 16px; color: var(--clove, #3d312b); opacity: 1; }
          .ig-card .ig-chip {
            font-size: 10px;
            padding: 9px 14px;
            color: var(--espresso, #1a1612);
            border-color: rgba(26,22,18,.35);
          }
          .ig-card .ig-formats { gap: 8px; margin-bottom: 16px; }
          .ig-card .ig-book {
            font-size: 11px;
            padding: 13px 22px;
            background: var(--espresso, #1a1612);
            color: var(--bone);
          }
        }
      `}</style>

      <div
        className="ig-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 0,
        }}
      >
        {team.map((p) => (
          <Card key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}

function Card({ p }: { p: Instructor }) {
  const formats = p.formats ?? [];
  return (
    <article className="ig-card" tabIndex={0} aria-label={p.name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ig-img" src={p.img} alt={p.name} />
      <h2 className="ig-name">{p.name}</h2>

      <div className="ig-panel">
        <h3 className="ig-pname">{p.name}</h3>

        {p.certification && p.certification.length > 0 && (
          <>
            <span className="ig-label">Certification</span>
            <p className="ig-cert">{p.certification.join(" · ")}</p>
          </>
        )}

        {p.quote && <p className="ig-quote">“{p.quote}”</p>}

        {p.style && (
          <>
            <span className="ig-label">Style</span>
            <p className="ig-style">{p.style}</p>
          </>
        )}

        {formats.length > 0 && (
          <div className="ig-formats">
            {formats.map((f) => (
              <span key={f} className="ig-chip">
                {f}
              </span>
            ))}
          </div>
        )}

        <a className="ig-book" href={p.bookHref ?? "/contact"}>
          Book Now →
        </a>
      </div>
    </article>
  );
}
