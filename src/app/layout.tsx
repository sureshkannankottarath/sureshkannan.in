import type { Metadata, Viewport } from "next";
import { Fraunces, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "lenis/dist/lenis.css";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sureshkannan.in"),
  title: "Suresh Kannan | Technical Project Manager, AI & Automation",
  description:
    "Suresh Kannan is a Technical Project Manager and R&D Team Lead in Kochi, turning ambiguous ideas into shipped AI products, automation and software platforms.",
  openGraph: {
    title: "Suresh Kannan | From chaos to delivery",
    description: "Technical Project Manager & R&D Lead, AI & Automation. 8+ years shipping software.",
    url: "https://sureshkannan.in",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0A07",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${schibsted.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        {children}
        <Script id="mouseflow" strategy="afterInteractive">
          {`
            window._mfq = window._mfq || [];
            (function() {
              var mf = document.createElement("script");
              mf.type = "text/javascript"; mf.defer = true;
              mf.src = "//cdn.mouseflow.com/projects/2bca941f-26d1-4a9a-be54-eb15ccf213bc.js";
              document.getElementsByTagName("head")[0].appendChild(mf);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
