"use client";

import type { CSSProperties } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
};

export function Icon({
  name,
  size = 20,
  stroke = 1.5,
  color = "currentColor",
  style,
}: {
  name: string;
  size?: number;
  stroke?: number;
  color?: string;
  style?: CSSProperties;
}) {
  const Cmp = map[name];
  if (!Cmp) return null;
  return (
    <span style={{ display: "inline-flex", width: size, height: size, color, ...style }}>
      <Cmp size={size} strokeWidth={stroke} />
    </span>
  );
}
