import { Button } from "@/components/ui/Button";

/**
 * Branded 404. Renders inside the root layout, so the TopNav/Footer
 * still appear above and below.
 */
export default function NotFound() {
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
        404 — Page not found
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
        That page is <em style={{ fontStyle: "italic" }}>off the reformer.</em>
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
        We couldn’t find what you were looking for. Try the studio map below.
      </p>
      <div style={{ marginTop: 16 }}>
        <Button variant="primary" size="md" href="/">
          Back to home
        </Button>
      </div>
    </section>
  );
}
