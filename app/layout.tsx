import type { Metadata } from "next";
import { content } from "@/lib/content";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";

// Using Inter for a clean, premium Swiss-style look (similar to Apple/Linear)
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  metadataBase: new URL(`https://${content.meta.domain}`),
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: `https://${content.meta.domain}`,
    siteName: "Kesra",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    creator: content.meta.twitter,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased selection:bg-white selection:text-black">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
