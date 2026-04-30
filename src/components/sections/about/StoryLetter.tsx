import type { AboutContent } from "@/types/content";

type Props = AboutContent["story"];

export function StoryLetter({ eyebrow, paragraphs, signature, polaroid, board }: Props) {
  return (
    <section className="story-section" style={{ background: "var(--bone)", padding: "120px 64px 140px" }}>
      <style>{`
        @media (max-width: 960px) {
          .story-section { padding: 80px 28px 96px !important; }
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          .story-grid > div { padding-top: 0 !important; }
          .story-clipboard { max-width: 420px; margin: 0 auto; width: 100%; }
          .story-clipboard-polaroid { display: none !important; }
          .story-letter-eyebrow { font-size: 14px !important; }
          .story-letter-p { font-size: 16px !important; }
          .story-letter-script { font-size: 30px !important; }
        }
        @media (max-width: 520px) {
          .story-section { padding: 64px 20px 80px !important; }
          .story-clipboard { max-width: 340px; }
        }
      `}</style>
      <div
        className="story-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
          alignItems: "start",
        }}
      >
        <div className="story-clipboard">
          <Clipboard board={board} polaroid={polaroid} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 8 }}>
          <span
            className="story-letter-eyebrow"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--espresso)",
            }}
          >
            {eyebrow}
          </span>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="story-letter-p"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.55,
                color: "var(--clove)",
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
          <div
            className="story-letter-script"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 36,
              lineHeight: 1,
              color: "var(--espresso)",
              marginTop: 24,
            }}
          >
            {signature.script}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
              marginTop: 8,
            }}
          >
            {signature.name}
          </div>
        </div>
      </div>
    </section>
  );
}

function Clipboard({
  board,
  polaroid,
}: {
  board: Props["board"];
  polaroid: Props["polaroid"];
}) {
  const handwriting =
    '"Caveat", "Homemade Apple", "Bradley Hand", "Segoe Script", cursive';

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "510 / 660",
        transform: "rotate(-1.2deg)",
        transformOrigin: "top center",
        filter: "drop-shadow(0 30px 50px rgba(32,12,2,.22)) drop-shadow(0 6px 14px rgba(32,12,2,.14))",
      }}
    >
      {/* Wood-tone clipboard backing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          background:
            "linear-gradient(180deg, #c79e74 0%, #b78a5d 50%, #a37846 100%)",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)",
        }}
      />
      {/* Wood grain (subtle) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 7px), repeating-linear-gradient(90deg, rgba(0,0,0,.04) 0 1px, transparent 1px 13px)",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* Metal clip */}
      <div
        style={{
          position: "absolute",
          top: -14,
          left: "50%",
          transform: "translateX(-50%)",
          width: "30%",
          height: 56,
          zIndex: 4,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 6,
            background:
              "linear-gradient(180deg, #d8d8d8 0%, #aeaeae 38%, #8e8e8e 60%, #cfcfcf 100%)",
            boxShadow: "0 4px 8px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "22%",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #fafafa, #888 70%, #555 100%)",
            boxShadow: "inset 0 -1px 1px rgba(0,0,0,.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            right: "22%",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #fafafa, #888 70%, #555 100%)",
            boxShadow: "inset 0 -1px 1px rgba(0,0,0,.4)",
          }}
        />
      </div>

      {/* Paper */}
      <div
        style={{
          position: "absolute",
          top: "5.2%",
          left: "5.5%",
          right: "5.5%",
          bottom: "3%",
          background: "#fbfaf6",
          boxShadow: "0 2px 6px rgba(0,0,0,.1)",
          padding: "56px 44px 44px",
          fontFamily: "var(--font-body)",
          color: "#2a2620",
        }}
      >
        {/* Title row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28 }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#2a2620",
            }}
          >
            {board.title}
          </span>
          <span
            style={{
              fontFamily: handwriting,
              fontSize: 26,
              lineHeight: 1,
              color: "#1a1612",
              transform: "rotate(-2deg)",
              display: "inline-block",
            }}
          >
            {board.name}
          </span>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {board.fields.map((f) => {
            const values = Array.isArray(f.value) ? f.value : [f.value];
            return (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      color: "#2a2620",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.label}:
                  </span>
                  <FieldLine
                    text={values[0]}
                    handwriting={handwriting}
                  />
                </div>
                {values.slice(1).map((v, i) => (
                  <FieldLine key={i} text={v} handwriting={handwriting} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Polaroid taped on */}
      <div
        className="story-clipboard-polaroid"
        style={{
          position: "absolute",
          width: "48%",
          left: "40%",
          top: "50%",
          transform: "rotate(2.5deg)",
          zIndex: 5,
        }}
      >
        {/* Tape */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%) rotate(-3deg)",
            width: "55%",
            height: 22,
            background: "rgba(245,240,225,.7)",
            boxShadow: "0 1px 3px rgba(0,0,0,.15)",
            backdropFilter: "blur(1px)",
          }}
        />
        <div
          style={{
            background: "#fff",
            padding: "10px 10px 32px",
            boxShadow: "0 14px 26px rgba(32,12,2,.28), 0 2px 6px rgba(32,12,2,.16)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={polaroid.src}
            alt={polaroid.alt}
            style={{
              width: "100%",
              aspectRatio: "1 / 1.15",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function FieldLine({ text, handwriting }: { text: string; handwriting: string }) {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        minWidth: 0,
        paddingBottom: 4,
        borderBottom: "1px solid #2a2620",
      }}
    >
      <span
        style={{
          fontFamily: handwriting,
          fontSize: 19,
          lineHeight: 1.1,
          color: "#1a1612",
          display: "inline-block",
          transform: "rotate(-1deg)",
        }}
      >
        {text}
      </span>
    </div>
  );
}
