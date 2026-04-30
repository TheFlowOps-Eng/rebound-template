import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { globalContent } from "@/content/global";

/**
 * Footer — site-wide. Reads address, phone, email, link columns,
 * and socials from `content/global.ts`.
 */
export function Footer() {
  const f = globalContent.footer;

  const root = {
    background: "var(--bone)",
    padding: "80px 64px 60px",
    color: "var(--ink)",
    borderTop: "none" as const,
  };
  const inner = {
    maxWidth: 1280,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
  };
  const col = { display: "flex", flexDirection: "column" as const, gap: 32 };
  const label = {
    fontFamily: "var(--font-body)",
    fontWeight: 700 as const,
    fontSize: 16,
    color: "var(--ink)",
    margin: 0,
    marginBottom: 4,
  };
  const body = {
    fontFamily: "var(--font-body)",
    fontWeight: 400 as const,
    fontSize: 14,
    color: "var(--ink)",
    margin: 0,
  };
  const linkStyle = {
    fontFamily: "var(--font-body)",
    fontWeight: 700 as const,
    fontSize: 14,
    color: "var(--ink)",
    textDecoration: "none",
    letterSpacing: "0.02em",
  };

  return (
    <footer style={root}>
      <div style={inner}>
        <div style={col}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/rebound-logo-dark.png"
            alt="Re:Bound"
            style={{ height: 40, objectFit: "contain", objectPosition: "left", display: "block" }}
          />
          <div>
            <p style={label}>Address:</p>
            <p style={body}>{f.address}</p>
          </div>
          <div>
            <p style={label}>Contact:</p>
            <p style={body}>{f.phone}</p>
            <p style={body}>{f.email}</p>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {f.socials.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name}>
                <Icon name={s.name} size={22} />
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {f.columns.map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.items.map((item, j) => (
                <Link key={j} href={item.href} style={linkStyle}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <hr style={{ border: 0, borderTop: "1px solid var(--ink)", margin: "64px 0 24px" }} />
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 14,
          color: "var(--ink)",
          textAlign: "center",
        }}
      >
        {f.credit}
      </p>
    </footer>
  );
}
