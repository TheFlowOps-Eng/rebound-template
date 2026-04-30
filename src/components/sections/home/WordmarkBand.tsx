import type { HomeContent } from "@/types/content";

type Props = HomeContent["wordmark"];

export function WordmarkBand({ background, logo, alt }: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        position: "relative",
        width: "100%",
        height: 280,
        backgroundImage: `url('${background}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(32,12,2,0.28) 0%, rgba(32,12,2,0.40) 100%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={alt}
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(78%, 1100px)",
          height: "auto",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
