import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import StickyHeader from "@/components/StickyHeader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramble On — Builder. Writer. Cricket Nerd.",
  description:
    "Personal musings on building products, cricket, and cinema by Vishal Gayakwar.",
  metadataBase: new URL("https://blog.vishalbuilds.com"),
  alternates: {
    canonical: "https://blog.vishalbuilds.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.vishalbuilds.com",
    siteName: "Ramble On",
    title: "Ramble On — Builder. Writer. Cricket Nerd.",
    description:
      "Personal musings on building products, cricket, and cinema by Vishal Gayakwar.",
    images: [{ url: "/api/og?title=Ramble%20On", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vishalg31",
    creator: "@vishalg31",
    title: "Ramble On — Builder. Writer. Cricket Nerd.",
    description:
      "Personal musings on building products, cricket, and cinema by Vishal Gayakwar.",
    images: ["/api/og?title=Ramble%20On"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${geist.variable}`}>
      <body>
        <StickyHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
