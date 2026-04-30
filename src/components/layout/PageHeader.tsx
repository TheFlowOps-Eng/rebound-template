export function PageHeader({
  title,
  image,
  height = 320,
}: {
  title: string;
  image: string;
  height?: number;
}) {
  return (
    <header
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
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(72px, 11vw, 168px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--bone)",
            margin: 0,
            textShadow: "0 2px 24px rgba(28,12,4,0.18)",
            userSelect: "none",
          }}
        >
          {title}
        </h1>
      </div>
    </header>
  );
}
