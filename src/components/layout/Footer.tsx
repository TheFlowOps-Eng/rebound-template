import { Icon } from "@/components/ui/Icon";
import { globalContent } from "@/content/global";

/**
 * Footer — site-wide. Reads address, phone, email, link columns,
 * and socials from `content/global.ts`.
 */
export function Footer() {
  const f = globalContent.footer;

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
  const headingStyle = {
    fontFamily: "var(--font-body)",
    fontWeight: 800 as const,
    fontSize: 14,
    color: "var(--espresso, #3d312b)",
    opacity: 0.82,
    margin: 0,
    marginBottom: 6,
    padding: 0,
    lineHeight: 1.2,
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
    <footer
      className="rb-footer"
      data-ohw-section="footer"
      data-ohw-section-label="Footer"
    >
      <style>{`
        .rb-footer {
          background: var(--bone);
          padding: 80px 64px 60px;
          color: var(--ink);
        }
        .rb-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }
        .rb-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .rb-footer-logo {
          height: 40px;
          object-fit: contain;
          object-position: left;
          display: block;
        }
        .rb-footer-links {
          display: flex;
          gap: 24px;
        }
        .rb-footer-link-col {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 10px;
        }
        .rb-footer-socials {
          display: flex;
          gap: 16px;
          margin-top: 8px;
        }
        .rb-footer-rule {
          border: 0;
          border-top: 1px solid var(--ink);
          margin: 64px 0 24px;
        }
        .rb-footer-credit {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 14px;
          color: var(--ink);
          text-align: center;
          margin: 0;
        }

        @media (max-width: 960px) {
          .rb-footer { padding: 60px 28px 40px; }
          .rb-footer-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .rb-footer-rule { margin: 40px 0 20px; }
        }
        @media (max-width: 520px) {
          .rb-footer { padding: 48px 22px 32px; }
          .rb-footer-brand { gap: 24px; }
          .rb-footer-logo { height: 32px; }
          .rb-footer-links {
            flex-direction: column;
            gap: 28px;
            padding-top: 28px;
            border-top: 1px solid rgba(26,22,18,.18);
            margin-top: 12px;
          }
          .rb-footer-link-col { gap: 14px; }
          .rb-footer-link-col a { font-size: 15px; }
          .rb-footer-socials { gap: 18px; margin-top: 4px; }
          .rb-footer-credit { font-size: 12px; letter-spacing: .04em; line-height: 1.5; }
        }
      `}</style>

      <div className="rb-footer-inner">
        <div className="rb-footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/rebound-logo-dark.png" alt="Re:Bound" className="rb-footer-logo" />
          <div>
            <p data-ohw-editable="text" data-ohw-key="footer-label-address" style={label}>Address:</p>
            <p data-ohw-editable="text" data-ohw-key="footer-address" style={body}>{f.address}</p>
          </div>
          <div>
            <p data-ohw-editable="text" data-ohw-key="footer-label-contact" style={label}>Contact:</p>
            <p data-ohw-editable="text" data-ohw-key="footer-phone" style={body}>{f.phone}</p>
            <p data-ohw-editable="text" data-ohw-key="footer-email" style={body}>{f.email}</p>
          </div>
          <div className="rb-footer-socials">
            {f.socials.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name}>
                <Icon name={s.name} size={22} />
              </a>
            ))}
          </div>
        </div>

        <div className="rb-footer-links" data-ohw-footer-links="">
          {f.columns.map((c, i) => (
            <div
              key={i}
              className="rb-footer-link-col"
              data-ohw-footer-col={String(i)}
            >
              <p
                data-ohw-editable="text"
                data-ohw-key={`footer-${i}-heading`}
                style={headingStyle}
              >
                {c.heading}
              </p>
              {c.items.map((item, j) => (
                <a
                  key={j}
                  href={item.href}
                  data-ohw-href-key={`footer-${i}-${j}-href`}
                  style={linkStyle}
                >
                  <span data-ohw-editable="text" data-ohw-key={`footer-${i}-${j}-label`}>
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <hr className="rb-footer-rule" />
      <p data-ohw-editable="text" data-ohw-key="footer-credit" className="rb-footer-credit">{f.credit}</p>
    </footer>
  );
}
