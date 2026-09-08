import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";

import { Breadcrumbs, Media } from "@/components/ui";
import { areas } from "@/lib/areas";
import {
  JsonLd,
  areaListSchema,
  breadcrumbSchema,
  pageMeta,
} from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/periohes/",
  title: "Περιοχές που εξυπηρετούμε — Νότια Προάστια",
  description:
    "Συνεργείο μοτοσυκλετών στην Ηλιούπολη που εξυπηρετεί Αργυρούπολη, Γλυφάδα, Νέα Σμύρνη, Παλαιό Φάληρο, Άλιμο, Ελληνικό, Παγκράτι, Υμηττό και Νέο Κόσμο.",
});

const trail = [
  { name: "Αρχική", path: "/" },
  { name: "Περιοχές", path: "/periohes/" },
];

export default function AreasPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd data={areaListSchema()} />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Media
            name="xr-three-quarter"
            alt="Μοτοσυκλέτα έτοιμη για παράδοση στο συνεργείο στην Ηλιούπολη"
            priority
            imgClassName="opacity-20"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40"
          />
        </div>
        <div className="shell relative py-12 sm:py-20">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow mt-6">Κάλυψη</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Ένα συνεργείο,
            <br />
            όλα τα νότια προάστια
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
            Δεν έχουμε υποκαταστήματα. Είμαστε ένα συνεργείο, στη Λεωφόρο
            Κυπρίων Ηρώων 73Β στην Ηλιούπολη, και μας βρίσκουν από όλη τη νότια
            Αθήνα — από τον Νέο Κόσμο και το Παγκράτι μέχρι τη Γλυφάδα και το
            Παλαιό Φάληρο. Διαλέξτε την περιοχή σας για να δείτε τη διαδρομή,
            πόσο απέχετε και τι προσέχουμε στις μηχανές που έρχονται από εκεί.
          </p>
          <a
            href={`tel:${site.contact.phone}`}
            className="btn-primary mt-8"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.contact.phoneDisplay}
          </a>
        </div>
      </section>

      <section className="shell py-14 sm:py-20">
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/periohes/${area.slug}/`}
              className="group flex flex-col bg-ink-800 p-7 transition hover:bg-ink-700"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl not-italic text-white sm:text-2xl">
                  {area.name}
                </h2>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {area.minutes === 0 ? "η έδρα μας" : `~${area.minutes}′ μακριά`}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {area.intro}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-vs-bright">
                Πρόσβαση & διαδρομή
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}

          {/* Γεμίζει το τελευταίο κελί — 11 περιοχές σε grid των 3. */}
          <a
            href={`tel:${site.contact.phone}`}
            className="group flex flex-col bg-ink-800 p-7 transition hover:bg-ink-700"
          >
            <h2 className="text-xl not-italic text-white sm:text-2xl">
              Αλλού;
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
              Εξυπηρετούμε και γειτονικούς δήμους — Καισαριανή, Άγιο Δημήτριο,
              Ταύρο, Βούλα, Βουλιαγμένη. Ένα τηλέφωνο και σας λέμε αν σας
              βολεύει η διαδρομή.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-vs-bright">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {site.contact.phoneDisplay}
            </span>
          </a>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink-800">
        <div className="shell flex flex-col items-start gap-6 py-14 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl">Η μοναδική μας διεύθυνση</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
              Λεωφόρος Κυπρίων Ηρώων 73Β, Ηλιούπολη — επί της λεωφόρου, με χώρο
              να αφήσεις τη μηχανή.
            </p>
          </div>
          <Link href="/epikoinonia/" className="btn-ghost shrink-0">
            <MapPin className="h-4 w-4" aria-hidden />
            Χάρτης & ωράριο
          </Link>
        </div>
      </section>
    </>
  );
}
