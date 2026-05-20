import type { Metadata } from "next";
import { Suspense } from "react";
import { BrandProvider } from "@/components/layout/BrandProvider";
import { OhhwellsBridge } from "@/components/layout/OhhwellsBridge";
import { PreserveSearchParams } from "@/components/layout/PreserveSearchParams";
import { OHW_LOADER_STYLE, OhwLoaderSpinner } from "@/components/layout/OhwLoaderSurface";
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
        <div
          id="ohw-loader"
          suppressHydrationWarning
          style={{ ...OHW_LOADER_STYLE, display: "none" }}
        >
          <OhwLoaderSpinner />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!new URLSearchParams(location.search).get("subdomain"))return;var e=document.getElementById("ohw-loader");if(e)e.style.display="flex"}catch(e){}})();`,
          }}
        />
        <Suspense>
          <OhhwellsBridge />
          <PreserveSearchParams />
        </Suspense>
        <BrandProvider>
          <TopNav />
          {children}
          <Footer />
        </BrandProvider>
      </body>
    </html>
  );
}
