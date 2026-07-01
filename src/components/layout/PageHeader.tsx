export function PageHeader({
  title,
  image,
  height = 320,
  ohwKey,
  bgKey,
}: {
  title: string;
  image: string;
  height?: number;
  ohwKey?: string;
  bgKey?: string;
}) {
  return (
    <header
      data-ohw-section="page-header"
      {...(bgKey ? { 'data-ohw-editable': 'bg-image', 'data-ohw-key': bgKey } : {})}
      style={{
        position: "relative",
        width: "100%",
        height,
        backgroundImage: `url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(28,12,4,.18) 0%, rgba(28,12,4,.10) 50%, rgba(28,12,4,.30) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 56,
          pointerEvents: ohwKey ? "auto" : "none",
        }}
      >
        <h1
          {...(ohwKey ? { 'data-ohw-editable': 'text', 'data-ohw-key': ohwKey } : {})}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(72px, 11vw, 168px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--bone)",
            margin: 0,
            textShadow: "0 2px 24px rgba(28,12,4,0.18)",
            userSelect: ohwKey ? "auto" : "none",
          }}
        >
          {title}
        </h1>
      </div>
    </header>
  );
}
