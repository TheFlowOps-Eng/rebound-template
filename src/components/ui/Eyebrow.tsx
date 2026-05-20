import type { CSSProperties, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  size?: "lg" | "md" | "sm";
  tone?: "espresso" | "bone" | "umber" | string;
  style?: CSSProperties;
  ohwKey?: string;
};

export function Eyebrow({ children, size = "lg", tone = "espresso", style, ohwKey }: EyebrowProps) {
  const sizes: Record<string, number> = { lg: 17, md: 14, sm: 12 };
  const tracking = size === "lg" ? "0.20em" : "0.13em";
  const colorMap: Record<string, string> = {
    espresso: "var(--espresso)",
    bone: "var(--bone)",
    umber: "var(--umber)",
  };
  return (
    <span
      {...(ohwKey ? { 'data-ohw-editable': 'text', 'data-ohw-key': ohwKey } : {})}
      style={{
        fontFamily: "var(--font-label)",
        fontWeight: 700,
        fontSize: sizes[size],
        letterSpacing: tracking,
        lineHeight: 1.41,
        textTransform: "uppercase",
        color: colorMap[tone] || tone,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
