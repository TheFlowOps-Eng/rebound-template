/**
 * Branded loading state. Shown by Next.js while a route segment
 * suspends. Quiet, on-brand bone background — matches the visual
 * tone of the rest of the site.
 */
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bone)",
        color: "var(--espresso)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 48,
          letterSpacing: "-0.02em",
          opacity: 0.5,
        }}
      >
        loading…
      </div>
    </div>
  );
}
