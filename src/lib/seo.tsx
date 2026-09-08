/**
 * SEO helpers: canonical URLs, robots και structured data.
 *
 * Το canonical δηλώνει ρητά ότι κάθε σελίδα ζει στο vsmotorvation.gr. Το
 * κρατάμε ακόμη κι όταν το site ανεβαίνει σε ένα μόνο σημείο: προστατεύει
 * από www/non-www, από URLs με query parameters (utm_*, fbclid) και από
 * τυχόν preview deployments.
 */
import type { Metadata } from "next";

import { site } from "@/lib/site";
import { areas, areaNames } from "@/lib/areas";
import { services } from "@/lib/site";

export function canonical(path: string): string {
  return new URL(path, site.url).toString();
}

/**
 * Metadata για μια σελίδα, με canonical και σωστό OpenGraph URL.
 * Το `path` γράφεται πάντα με trailing slash, όπως τα παράγει το Next.
 */
export function pageMeta({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title,
      description,
      url: canonical(path),
    },
  };
}

/** Αγγλικά ονόματα ημερών: το schema.org δεν δέχεται «Δευτέρα». */
const SCHEMA_DAYS: Record<string, string> = {
  Δευτέρα: "Monday",
  Τρίτη: "Tuesday",
  Τετάρτη: "Wednesday",
  Πέμπτη: "Thursday",
  Παρασκευή: "Friday",
  Σάββατο: "Saturday",
  Κυριακή: "Sunday",
};

/** Σταθερό @id ώστε τα υπόλοιπα schemas να δείχνουν στην ίδια επιχείρηση. */
export const BUSINESS_ID = `${site.url}/#business`;

export function localBusinessSchema() {
  const a = site.contact.address;

  return {
    "@context": "https://schema.org",
    "@type": "MotorcycleRepairShop",
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: [
      `${site.url}/media/og-image.jpg`,
      `${site.url}/media/workshop.jpg`,
      `${site.url}/media/bike-on-lift.jpg`,
    ],
    logo: `${site.url}/brand/logo.png`,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Μετρητά, Κάρτα",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      // Ο δήμος, όχι «Αθήνα» — αυτό διαβάζει η Google για την τοπική αναζήτηση.
      addressLocality: a.area,
      addressRegion: "Αττική",
      postalCode: a.postal,
      addressCountry: "GR",
    },
    ...(site.contact.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.contact.geo.lat,
        longitude: site.contact.geo.lng,
      },
    }),
    hasMap: site.contact.mapsLink,
    sameAs: [site.social.facebook].filter(Boolean),
    areaServed: areaNames.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: site.hours
      .filter((h) => h.open)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${SCHEMA_DAYS[h.day]}`,
        opens: h.open,
        closes: h.close,
      })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Υπηρεσίες συνεργείου μοτοσυκλετών",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.summary,
          url: `${site.url}/ypiresies/#${s.slug}`,
          serviceType: s.title,
          provider: { "@id": BUSINESS_ID },
          areaServed: areaNames,
        },
      })),
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Το ItemList των σελίδων περιοχών — βοηθάει το crawling του hub. */
export function areaListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Περιοχές που εξυπηρετεί το ${site.name}`,
    itemListElement: areas.map((area, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Συνεργείο μοτοσυκλετών ${area.name}`,
      url: canonical(`/periohes/${area.slug}/`),
    })),
  };
}

/** Ένα <script type="application/ld+json"> — το αντικείμενο είναι δικό μας. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
