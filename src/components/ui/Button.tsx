"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useState } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "inverse" | "dark" | "overlay";
  size?: "sm" | "md" | "lg";
  href?: string;
  style?: CSSProperties;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href = "#",
  style,
  onClick,
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const base: CSSProperties = {
    fontFamily: "var(--font-label)",
    fontWeight: 700,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    transition: "background 300ms cubic-bezier(.22,1,.36,1), opacity 200ms",
    textDecoration: "none",
  };
  const sizeMap: Record<string, CSSProperties> = {
    sm: { padding: "10px 20px", fontSize: 11.4 },
    md: { padding: "20px 40px", fontSize: 14 },
    lg: { padding: "24px 48px", fontSize: 15 },
  };
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: hover ? "var(--umber-deep)" : "var(--umber)",
      color: "var(--bone)",
    },
    inverse: {
      background: hover ? "var(--sand)" : "var(--bone)",
      color: "var(--umber)",
      border: "1px solid var(--umber)",
    },
    dark: {
      background: hover ? "var(--ink)" : "var(--espresso)",
      color: "var(--bone)",
    },
    overlay: {
      background: hover ? "var(--bone)" : "rgba(235,236,221,.92)",
      color: "var(--umber)",
    },
  };
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...sizeMap[size], ...variants[variant], ...style }}
    >
      {children}
    </a>
  );
}
