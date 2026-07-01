import type { ImageRef } from "@/types/content";

type Props = { images: ImageRef[] };

export function StudioGallery({ images }: Props) {
  const tiles = images.slice(0, 8);

  return (
    <section
      data-ohw-section="studio-gallery"
      className="studio-gallery"
      style={{ background: "var(--bone)", padding: "20px 32px 100px" }}
    >
      <style>{`
        .sg-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 240px 240px 340px;
          gap: 16px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .sg-tile {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .sg-tile-1 { grid-column: 1 / span 6; grid-row: 1 / span 2; }
        .sg-tile-2 { grid-column: 7 / span 3; grid-row: 1; }
        .sg-tile-3 { grid-column: 10 / span 3; grid-row: 1; }
        .sg-tile-4 { grid-column: 7 / span 3; grid-row: 2; }
        .sg-tile-5 { grid-column: 10 / span 3; grid-row: 2; }
        .sg-tile-6 { grid-column: 1 / span 4; grid-row: 3; }
        .sg-tile-7 { grid-column: 5 / span 4; grid-row: 3; }
        .sg-tile-8 { grid-column: 9 / span 4; grid-row: 3; }

        @media (max-width: 960px) {
          .studio-gallery { padding: 16px 24px 80px !important; }
          .sg-grid {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: 200px 200px 200px 240px;
            gap: 12px;
          }
          .sg-tile-1 { grid-column: 1 / span 6; grid-row: 1 / span 2; }
          .sg-tile-2 { grid-column: 1 / span 3; grid-row: 3; }
          .sg-tile-3 { grid-column: 4 / span 3; grid-row: 3; }
          .sg-tile-4 { grid-column: 1 / span 3; grid-row: 4; }
          .sg-tile-5 { grid-column: 4 / span 3; grid-row: 4; }
          .sg-tile-6,
          .sg-tile-7,
          .sg-tile-8 { display: none; }
        }
        @media (max-width: 520px) {
          .sg-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(5, 240px);
            gap: 10px;
          }
          .sg-tile-1 { grid-column: 1; grid-row: 1; }
          .sg-tile-2 { grid-column: 1; grid-row: 2; }
          .sg-tile-3 { grid-column: 1; grid-row: 3; }
          .sg-tile-4 { grid-column: 1; grid-row: 4; }
          .sg-tile-5 { grid-column: 1; grid-row: 5; }
        }
      `}</style>
      <div className="sg-grid">
        {tiles.map((img, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={img.src + i}
            data-ohw-editable="image"
            data-ohw-key={`studio-gallery-${i + 1}-img`}
            src={img.src}
            alt={img.alt}
            className={`sg-tile sg-tile-${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
