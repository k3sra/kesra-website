import type { Metadata } from "next";
import { site } from "@/lib/site";
import "./globals.css";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: site.title,
  description: site.description,
  applicationName: site.title,
  alternates: { canonical: `https://${site.domain}` },
  authors: [{ name: site.author.name }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }]
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.title,
    locale: site.locale,
    type: "website",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Kesra — Backend Platform & Systems Engineer" }]
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.svg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${mono.variable}`}>
      <body style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui" }}>
        {children}
      </body>
    </html>
  );
}
