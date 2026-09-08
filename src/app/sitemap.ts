import type { MetadataRoute } from "next";

import { areas } from "@/lib/areas";
import { site } from "@/lib/site";

/**
 * Το sitemap δείχνει πάντα στο vsmotorvation.gr, ακόμη κι όταν το build
 * τρέχει για το αντίγραφο του GitHub Pages — εκεί το αντίγραφο είναι noindex.
 */
const pages = [
  { path: "/", priority: 1 },
  { path: "/ypiresies/", priority: 0.9 },
  { path: "/periohes/", priority: 0.9 },
  { path: "/epikoinonia/", priority: 0.8 },
  { path: "/to-synergeio/", priority: 0.7 },
  ...areas.map((area) => ({
    path: `/periohes/${area.slug}/`,
    priority: 0.8,
  })),
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Σταθερή ημερομηνία ανά build· αλλιώς κάθε build δείχνει «άλλαξαν όλα».
  const lastModified = new Date();

  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
