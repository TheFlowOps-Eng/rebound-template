"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type {
  ClassesContent,
  ClassFilterId,
} from "@/types/content";

type Props = {
  filters: ClassesContent["filters"];
  items: ClassesContent["items"];
};

/**
 * ClassLibrary — combined filter chip bar + class list. Kept as a
 * single client component because the filter state drives both UI
 * regions; splitting them would require lifting state to a parent
 * client wrapper anyway.
 */
export function ClassLibrary({ filters, items }: Props) {
  const [active, setActive] = useState<ClassFilterId>("all");

  const filterStyle = (on: boolean) => ({
    fontFamily: "var(--font-body)",
    fontWeight: 700 as const,
    fontSize: 12,
    letterSpacing: ".13em",
    textTransform: "uppercase" as const,
    padding: "14px 28px",
    cursor: "pointer",
    background: on ? "var(--umber)" : "transparent",
    color: on ? "var(--bone)" : "var(--espresso)",
    border: `1px solid ${on ? "var(--umber)" : "var(--espresso)"}`,
  });

  return (
    <>
      <style>{`
        @media (max-width: 960px) {
          .cl-filters { padding: 40px 24px 20px !important; gap: 10px !important; }
          .cl-filters button { font-size: 11px !important; padding: 11px 18px !important; }
          .cl-list { padding: 32px 24px 96px !important; gap: 56px !important; }
          .cl-card {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding-bottom: 48px !important;
          }
          .cl-card img { height: auto !important; aspect-ratio: 4 / 5; }
          .cl-card h2 { font-size: clamp(48px, 9vw, 64px) !important; }
          .cl-card p { font-size: 16px !important; max-width: none !important; }
          .cl-card .cl-actions { flex-direction: column; align-items: stretch; gap: 12px !important; }
          .cl-card .cl-actions a { width: 100%; text-align: center; }
        }
        @media (max-width: 520px) {
          .cl-list { padding: 24px 20px 80px !important; }
          .cl-filters { padding: 32px 20px 16px !important; }
        }
      `}</style>
      <div
        className="cl-filters"
        style={{
          display: "flex",
          gap: 12,
          padding: "48px 64px 24px",
          maxWidth: 1280,
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {filters.map((f) => (
          <button key={f.id} onClick={() => setActive(f.id)} style={filterStyle(active === f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div
        className="cl-list"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "40px 64px 140px",
          display: "flex",
          flexDirection: "column",
          gap: 64,
        }}
      >
        {items.map((c) => (
          <article
            key={c.id}
            className="cl-card"
            style={{
              display: active !== "all" && c.tag !== active ? "none" : "grid",
              gridTemplateColumns: "460px 1fr",
              gap: 64,
              alignItems: "center",
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 64,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-ohw-editable="image"
              data-ohw-key={`class-lib-${c.id}-img`}
              src={c.img}
              alt={c.name}
              style={{
                width: "100%",
                height: 340,
                objectFit: "cover",
                display: "block",
                border: "2px solid var(--umber)",
                boxSizing: "border-box",
              }}
            />
            <div>
              <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
                <span data-ohw-editable="text" data-ohw-key={`class-${c.id}-min`} style={metaStyle}>{c.min} min</span>
                <span style={metaStyle}>·</span>
                <span data-ohw-editable="text" data-ohw-key={`class-${c.id}-level`} style={metaStyle}>{c.level}</span>
              </div>
              <h2
                data-ohw-editable="text"
                data-ohw-key={`class-${c.id}-name`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(56px, 7vw, 84px)",
                  lineHeight: 1,
                  letterSpacing: "-.02em",
                  margin: "14px 0 20px",
                  color: "var(--espresso)",
                }}
              >
                {c.name}
              </h2>
              <p
                data-ohw-editable="text"
                data-ohw-key={`class-${c.id}-desc`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--clove)",
                  margin: "0 0 24px",
                  maxWidth: 560,
                }}
              >
                {c.desc}
              </p>
              <div className="cl-actions" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Button variant="primary" size="md" href="/contact">
                  Book {c.name}
                </Button>
                <Button variant="inverse" size="md">
                  View Schedule
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

const metaStyle = {
  fontFamily: "var(--font-body)",
  fontWeight: 700 as const,
  fontSize: 12,
  letterSpacing: ".13em",
  textTransform: "uppercase" as const,
  color: "var(--fg-subtle)",
};
