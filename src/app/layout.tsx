import type { Metadata } from "next";
import { BrandProvider } from "@/components/layout/BrandProvider";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { instrumentSerif, redHatDisplay } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import "@/styles/globals.css";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${redHatDisplay.variable}`}
    >
      <body>
        <BrandProvider>
          <TopNav />
          {children}
          <Footer />
        </BrandProvider>
      </body>
    </html>
  );
}
