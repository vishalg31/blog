import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
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
    "Independent dispatches on building, cricket & cinema by Vishal Gayakwar.",
  metadataBase: new URL("https://blog.vishalbuilds.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.vishalbuilds.com",
    siteName: "Ramble On",
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
      </body>
    </html>
  );
}
