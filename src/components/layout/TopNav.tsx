"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/layout/Wordmark";
import { OhwLink } from "@/components/ui/OhwLink";
import { globalContent } from "@/content/global";

/**
 * TopNav — site-wide navigation. Position: absolute at top:0; intended
 * to overlay the hero on each page. Reads nav items + book-CTA from
 * `content/global.ts`.
 */
export function TopNav({ onLightBg = false }: { onLightBg?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 900px)");
    const fn = () => setIsMobile(m.matches);
    fn();
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);

  const ink = onLightBg ? "var(--espresso)" : "var(--bone)";

  // Pricing and Studio both point to "/" right now — those should not
  // light up just because we're on the home page.
  const homeMatches = globalContent.nav.filter((n) => n.href === "/");
  const homeIsAmbiguous = homeMatches.length > 1;

  const isActive = (href: string, label: string) => {
    const path = href.split("#")[0] || "/";
    if (homeIsAmbiguous && path === "/" && label !== "Home") return false;
    return pathname === path;
  };

  const linkStyle = (active: boolean) => ({
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: ink,
    textDecoration: "none",
    cursor: "pointer",
    opacity: active ? 1 : 0.92,
    borderBottom: active ? `1px solid ${ink}` : "1px solid transparent",
    paddingBottom: 2,
    transition: "opacity .2s",
  });

  const drawerLinkStyle = (active: boolean) => ({
    fontFamily: "var(--font-display)",
    fontSize: 36,
    lineHeight: 1.2,
    color: "var(--bone)",
    textDecoration: "none",
    cursor: "pointer",
    letterSpacing: "-.01em",
    opacity: active ? 1 : 0.85,
    padding: "8px 0",
  });

  const bookBtnStyle = {
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    fontSize: 11.5,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    background: "var(--bone)",
    color: "var(--umber-deep)",
    border: "none",
    cursor: "pointer",
    padding: "18px 28px",
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <>
      <nav
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr auto" : "180px 1fr auto",
          alignItems: "center",
          padding: isMobile ? "20px 20px" : "28px 36px",
          pointerEvents: "auto",
          gap: 16,
        }}
      >
        <Link href="/" style={{ cursor: "pointer", justifySelf: "start" }}>
          <Wordmark onDark={!onLightBg} height={isMobile ? 22 : 26} />
        </Link>
        {!isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            {globalContent.nav
              .map((item, i) => ({ item, i }))
              .filter(({ item }) => item.label.toLowerCase() !== "home")
              .map(({ item, i }) => (
                <OhwLink
                  key={`${item.href}-${item.label}-${i}`}
                  hrefKey={`nav-${i}-href`}
                  defaultHref={item.href}
                  data-ohw-drag-disabled={item.href === "/contact" ? "true" : undefined}
                  style={linkStyle(isActive(item.href, item.label))}
                >
                  <span data-ohw-editable="text" data-ohw-key={`nav-${i}-label`}>
                    {item.label}
                  </span>
                </OhwLink>
              ))}
          </div>
        )}
        {!isMobile ? (
          <OhwLink
            hrefKey="nav-book-href"
            defaultHref={globalContent.bookCta.href}
            data-ohw-role="navbar-button"
            style={bookBtnStyle}
          >
            <span data-ohw-editable="text" data-ohw-key="nav-book-label">
              {globalContent.bookCta.label}
            </span>
          </OhwLink>
        ) : (
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              background: "transparent",
              border: "none",
              padding: 8,
              cursor: "pointer",
              color: ink,
            }}
          >
            <span style={{ width: 22, height: 1.5, background: ink }} />
            <span style={{ width: 22, height: 1.5, background: ink }} />
            <span style={{ width: 22, height: 1.5, background: ink }} />
          </button>
        )}
      </nav>

      {isMobile && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.45)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: "opacity .25s",
              zIndex: 150,
            }}
          />
          <aside
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(86vw, 360px)",
              background: "var(--umber-deep)",
              color: "var(--bone)",
              zIndex: 200,
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transform: open ? "translateX(0)" : "translateX(100%)",
              transition: "transform .3s ease",
            }}
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              style={{
                alignSelf: "flex-end",
                background: "transparent",
                border: "none",
                color: "var(--bone)",
                fontSize: 24,
                cursor: "pointer",
                padding: 8,
                marginBottom: 16,
              }}
            >
              ×
            </button>
            {globalContent.nav.map((item, i) => (
              <OhwLink
                key={`drawer-${item.href}-${item.label}-${i}`}
                hrefKey={`nav-${i}-href`}
                defaultHref={item.href}
                data-ohw-drag-disabled={item.href === "/contact" ? "true" : undefined}
                onClick={() => setOpen(false)}
                style={drawerLinkStyle(isActive(item.href, item.label))}
              >
                <span data-ohw-editable="text" data-ohw-key={`nav-${i}-label`}>
                  {item.label}
                </span>
              </OhwLink>
            ))}
            <OhwLink
              hrefKey="nav-book-href"
              defaultHref={globalContent.bookCta.href}
              data-ohw-role="navbar-button"
              onClick={() => setOpen(false)}
              style={{ ...bookBtnStyle, marginTop: 24, alignSelf: "flex-start" }}
            >
              <span data-ohw-editable="text" data-ohw-key="nav-book-label">
                {globalContent.bookCta.label}
              </span>
            </OhwLink>
          </aside>
        </>
      )}
    </>
  );
}
