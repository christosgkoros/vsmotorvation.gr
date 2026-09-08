import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { asset } from "@/lib/asset";
import { JsonLd, canonical, localBusinessSchema } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

import "./globals.css";

const body = Inter({
  subsets: ["greek", "latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Roboto_Condensed({
  subsets: ["greek", "latin"],
  weight: ["700"],
  style: ["italic", "normal"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Συνεργείο Μοτοσυκλετών Ηλιούπολη & Νότια Προάστια | ${site.name}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: canonical("/") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: site.name,
    url: site.url,
    title: `Συνεργείο Μοτοσυκλετών Ηλιούπολη & Νότια Προάστια — ${site.name}`,
    description: site.description,
    images: ["/media/og-image.jpg"],
  },
  // Το basePath δεν εφαρμόζεται αυτόματα στα metadata icons — δείτε lib/asset.
  icons: {
    icon: [
      { url: asset("/brand/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/brand/favicon-32.png"), sizes: "32x32" },
    ],
    apple: asset("/brand/apple-touch-icon.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0C10",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${body.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-vs-blue focus:px-4 focus:py-2"
        >
          Μετάβαση στο περιεχόμενο
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={localBusinessSchema()} />
        <meta itemProp="address" content={fullAddress()} />
      </body>
    </html>
  );
}
