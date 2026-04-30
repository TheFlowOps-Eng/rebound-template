import localFont from "next/font/local";

export const instrumentSerif = localFont({
  src: [
    {
      path: "../../public/fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const redHatDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/RedHatDisplay-VariableFont_wght.ttf",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/RedHatDisplay-Italic-VariableFont_wght.ttf",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
