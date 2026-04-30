import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

export type SEOInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

/**
 * Build a Next.js Metadata object with sensible defaults pulled from
 * src/lib/constants. Pages call this and export the result so each route
 * gets a consistent title format, canonical URL, and Open Graph payload.
 */
export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = "/assets/hero-banner.jpg",
}: SEOInput = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — A Lagree Studio`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
