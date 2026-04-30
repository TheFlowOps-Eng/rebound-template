export function Wordmark({ onDark = false, height = 28 }: { onDark?: boolean; height?: number }) {
  const src = onDark ? "/assets/rebound-logo-light.png" : "/assets/rebound-logo-dark.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="Re:Bound" style={{ height, display: "block" }} />;
}
