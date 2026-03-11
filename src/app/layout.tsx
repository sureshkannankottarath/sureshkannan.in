import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Suresh Kannan K | AI Engineer & Project Manager",
  description:
    "Portfolio of Suresh Kannan K, AI Engineer based in Kerala building production RAG systems and AI agents.",
  openGraph: {
    title: "Suresh Kannan K | AI Engineer",
    description: "Building intelligent systems, RAG pipelines, and full-stack products.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${syne.variable} font-sans antialiased selection:bg-accent-blue selection:text-bg-primary`}
      >
        {children}
      </body>
    </html>
  );
}
