import type { Metadata } from "next";
import Link from "next/link";
import { Facebook, Mail, MapPin, Phone, Star } from "lucide-react";

import { Breadcrumbs } from "@/components/ui";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/epikoinonia/",
  title: "Επικοινωνία — Λεωφ. Κυπρίων Ηρώων 73Β, Ηλιούπολη",
  description:
    "Συνεργείο μοτοσυκλετών VS Motorvation: Λεωφ. Κυπρίων Ηρώων 73Β, Ηλιούπολη 163 41. Τηλέφωνο 217 218 0862, ωράριο και χάρτης.",
});

const trail = [
  { name: "Αρχική", path: "/" },
  { name: "Επικοινωνία", path: "/epikoinonia/" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <section className="border-b border-white/10 bg-ink-800">
        <div className="shell py-12 sm:py-20">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow mt-6">Επικοινωνία</p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            Πού θα μας βρεις
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Το συνεργείο είναι στη Λεωφόρο Κυπρίων Ηρώων 73Β στην Ηλιούπολη, επί
            της λεωφόρου. Εξυπηρετούμε όλα τα νότια προάστια — δες{" "}
            <Link
              href="/periohes/"
              className="text-vs-bright underline-offset-4 hover:underline"
            >
              πόσο απέχεις από εμάς
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="shell grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="space-y-10">
          <div className="space-y-5">
            <a
              href={`tel:${site.contact.phone}`}
              className="group flex items-start gap-4 border-l-2 border-vs-blue pl-5 transition hover:border-vs-bright"
            >
              <Phone className="mt-1 h-5 w-5 shrink-0 text-vs-bright" aria-hidden />
              <span>
                <span className="label !mb-0.5">Τηλέφωνο</span>
                <span className="block text-lg text-white transition group-hover:text-vs-bright">
                  {site.contact.phoneDisplay}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${site.contact.email}`}
              className="group flex items-start gap-4 border-l-2 border-white/15 pl-5 transition hover:border-vs-bright"
            >
              <Mail className="mt-1 h-5 w-5 shrink-0 text-vs-bright" aria-hidden />
              <span>
                <span className="label !mb-0.5">Email</span>
                <span className="block text-lg text-white transition group-hover:text-vs-bright">
                  {site.contact.email}
                </span>
              </span>
            </a>

            <a
              href={site.contact.mapsLink}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-start gap-4 border-l-2 border-white/15 pl-5 transition hover:border-vs-bright"
            >
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-vs-bright" aria-hidden />
              <span>
                <span className="label !mb-0.5">Διεύθυνση</span>
                <span className="block text-lg text-white transition group-hover:text-vs-bright">
                  {fullAddress()}
                </span>
              </span>
            </a>

            <a
              href={site.contact.googleBusiness}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-start gap-4 border-l-2 border-white/15 pl-5 transition hover:border-vs-bright"
            >
              <Star className="mt-1 h-5 w-5 shrink-0 text-vs-bright" aria-hidden />
              <span>
                <span className="label !mb-0.5">Κριτικές</span>
                <span className="block text-lg text-white transition group-hover:text-vs-bright">
                  Δες μας στους Χάρτες Google
                </span>
              </span>
            </a>

            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-start gap-4 border-l-2 border-white/15 pl-5 transition hover:border-vs-bright"
              >
                <Facebook className="mt-1 h-5 w-5 shrink-0 text-vs-bright" aria-hidden />
                <span>
                  <span className="label !mb-0.5">Facebook</span>
                  <span className="block text-lg text-white transition group-hover:text-vs-bright">
                    VS Motorvation
                  </span>
                </span>
              </a>
            )}
          </div>

          <div className="card p-6">
            <h2 className="text-lg not-italic">Ωράριο</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 text-slate-300">
                  <span>{h.day}</span>
                  <span className={h.open ? "font-medium text-white" : "text-slate-600"}>
                    {h.open ? `${h.open} – ${h.close}` : "Κλειστά"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg not-italic">Θες να έρθεις;</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Πάρε πρώτα ένα τηλέφωνο, να κανονίσουμε πότε θα φέρεις τη μηχανή
              και να μη σε ταλαιπωρήσουμε με αναμονή.
            </p>
            <a href={`tel:${site.contact.phone}`} className="btn-primary mt-5">
              <Phone className="h-4 w-4" aria-hidden />
              {site.contact.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="min-h-[24rem] border border-white/10 bg-ink-700">
          <iframe
            src={site.contact.mapsEmbed}
            title={`Χάρτης — ${site.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[24rem] w-full"
          />
        </div>
      </div>
    </>
  );
}
