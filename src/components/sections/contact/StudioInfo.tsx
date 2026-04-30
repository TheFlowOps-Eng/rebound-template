import type { ContactContent } from "@/types/content";

type Props = {
  details: ContactContent["details"];
};

export function StudioInfo({ details }: Props) {
  return (
    <aside
      style={{
        border: "1px solid var(--umber)",
        padding: "40px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        background: "transparent",
      }}
    >
      {details.blocks.map((b) => (
        <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--espresso)",
            }}
          >
            {b.label}:
          </span>
          {b.lines.map((line) => (
            <span
              key={line}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--clove)",
              }}
            >
              {line}
            </span>
          ))}
        </div>
      ))}

      <a
        href={details.mapsCta.href}
        target="_blank"
        rel="noreferrer"
        style={{
          marginTop: 8,
          alignSelf: "flex-start",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "var(--espresso)",
          textDecoration: "underline",
          textUnderlineOffset: 6,
        }}
      >
        {details.mapsCta.label}  →
      </a>
    </aside>
  );
}
