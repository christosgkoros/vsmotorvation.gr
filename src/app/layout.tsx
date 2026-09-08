import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { asset } from "@/lib/asset";
import {
  JsonLd,
  canonical,
  localBusinessSchema,
  webSiteSchema,
} from "@/lib/seo";
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
  /**
   * Χωρίς τα max-* όρια, η Google κόβει τα snippets σε ~160 χαρακτήρες.
   * Τα AI Overviews και οι απαντήσεις των μοντέλων δουλεύουν καλύτερα όταν
   * επιτρέπεται ολόκληρο το απόσπασμα και μεγάλη εικόνα.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
        <JsonLd data={webSiteSchema()} />
        <Analytics />
        <meta itemProp="address" content={fullAddress()} />
      </body>
    </html>
  );
}
