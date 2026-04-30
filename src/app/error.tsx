"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Branded error boundary. Required to be a client component (Next.js
 * routes errors only to client error boundaries).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: "var(--bone)",
        color: "var(--espresso)",
        padding: "160px 24px 120px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--fg-subtle)",
        }}
      >
        Something went wrong
      </span>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(56px, 9vw, 120px)",
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          margin: 0,
          maxWidth: 900,
        }}
      >
        Take a breath. We’ll <em style={{ fontStyle: "italic" }}>reset.</em>
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--clove)",
          maxWidth: 540,
          margin: 0,
        }}
      >
        The page hit an unexpected error. Try again, or head back to the studio.
      </p>
      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <Button variant="primary" size="md" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="inverse" size="md" href="/">
          Back to home
        </Button>
      </div>
    </section>
  );
}
