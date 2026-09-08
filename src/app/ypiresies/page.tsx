import type { Metadata } from "next";
import Link from "next/link";
import { Check, Phone } from "lucide-react";

import { Breadcrumbs, Media } from "@/components/ui";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { services, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/ypiresies/",
  title: "Υπηρεσίες — Service Μηχανής, Διάγνωση, Ελαστικά, ΚΤΕΟ",
  description:
    "Service μοτοσυκλέτας, ηλεκτρονική διάγνωση, φρένα, αναρτήσεις, ελαστικά και προέλεγχος ΚΤΕΟ στην Ηλιούπολη. Όλες οι μάρκες, από scooter μέχρι adventure.",
});

const trail = [
  { name: "Αρχική", path: "/" },
  { name: "Υπηρεσίες", path: "/ypiresies/" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <section className="border-b border-white/10 bg-ink-800">
        <div className="shell py-12 sm:py-20">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow mt-6">Τι κάνουμε</p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            Υπηρεσίες συνεργείου μοτοσυκλετών
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Δεν κάνουμε τα πάντα για όλους. Κάνουμε μοτοσυκλέτα, καλά. Δες τι
            περιλαμβάνει κάθε δουλειά και τι να περιμένεις. Εξυπηρετούμε
            Ηλιούπολη και όλα τα{" "}
            <Link
              href="/periohes/"
              className="text-vs-bright underline-offset-4 hover:underline"
            >
              νότια προάστια
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="shell divide-y divide-white/10">
        {services.map((service, i) => (
          <article
            key={service.slug}
            id={service.slug}
            className="grid scroll-mt-24 items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <p className="eyebrow">
                {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{service.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-400">
                {service.summary}
              </p>

              <ul className="mt-7 space-y-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-vs-bright" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href={`tel:${site.contact.phone}`} className="btn-primary">
                  <Phone className="h-4 w-4" aria-hidden />
                  {site.contact.phoneDisplay}
                </a>
                <span className="text-xs text-slate-500">
                  Ενδεικτικά ~{Math.round(service.minutes / 60)} ώρες στο συνεργείο
                </span>
              </div>
            </div>

            {service.image && (
              <div className={`slash aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <Media
                  name={service.image}
                  alt={service.title}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            )}
          </article>
        ))}
      </div>

      <section className="bg-ink-800">
        <div className="shell py-14 text-center sm:py-20">
          <h2 className="text-2xl sm:text-3xl">Δεν βρήκες αυτό που ψάχνεις;</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
            Πάρε μας ένα τηλέφωνο και πες μας τι θέλεις. Αν δεν το κάνουμε εμείς, θα
            σου πούμε ποιος το κάνει σωστά.
          </p>
          <Link href="/epikoinonia/" className="btn-ghost mt-8">
            Επικοινωνία
          </Link>
        </div>
      </section>
    </>
  );
}
