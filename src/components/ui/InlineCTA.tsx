import type { CSSProperties, ReactNode } from "react";

const colorMap: Record<string, string> = {
  white: "var(--white)",
  espresso: "var(--espresso)",
  umber: "var(--umber)",
  bone: "var(--bone)",
};

export function InlineCTA({
  children,
  href = "#",
  tone = "white",
  style,
}: {
  children: ReactNode;
  href?: string;
  tone?: keyof typeof colorMap;
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--font-label)",
        fontWeight: 400,
        fontSize: 14,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        textDecoration: "underline",
        textUnderlineOffset: 6,
        color: colorMap[tone],
        display: "inline-block",
        ...style,
      }}
    >
      {children}
    </a>
  );
}
