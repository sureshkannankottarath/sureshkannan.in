import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className="scroll-smooth snap-y snap-mandatory scroll-p-0 overflow-x-hidden">
      <body
        className={`${inter.variable} font-sans antialiased selection:bg-accent-blue/30 selection:text-text-primary h-full`}
      >
        {children}
      </body>
    </html>
  );
}
