import Link from "next/link";
import type { HomeContent } from "@/types/content";

type Props = HomeContent["hero"];

export function Hero({ headline, headlineEm, subhead, cta, background }: Props) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        background: `url('${background}') center/cover no-repeat`,
        color: "var(--bone)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(28,12,4,.42) 0%, rgba(28,12,4,.18) 45%, rgba(28,12,4,.55) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 24px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(56px, 11vw, 148px)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            margin: 0,
            color: "var(--bone)",
            maxWidth: 1300,
          }}
        >
          {headline}
          <em style={{ fontStyle: "italic" }}>{headlineEm}</em>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.4vw, 19px)",
            lineHeight: 1.55,
            maxWidth: 580,
            color: "var(--bone)",
            margin: 0,
          }}
        >
          {subhead}
        </p>
        <Link
          href={cta.href}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 12.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            background: "var(--bone)",
            color: "var(--umber-deep)",
            border: "none",
            cursor: "pointer",
            padding: "22px 44px",
            textDecoration: "none",
          }}
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
