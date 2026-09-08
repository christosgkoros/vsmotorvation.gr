import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, MapPin, Phone, Route } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs, Media, NewTab, SlashRule } from "@/components/ui";
import { areaBySlug, areas } from "@/lib/areas";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { fullAddress, services, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) return {};

  return pageMeta({
    path: `/periohes/${area.slug}/`,
    title:
      area.seoTitle ?? `Συνεργείο Μοτοσυκλετών ${area.for} — Έδρα Ηλιούπολη`,
    description:
      area.seoDescription ??
      `Εξυπηρετούμε ${area.in}: service, διάγνωση, φρένα, ελαστικά, προέλεγχος ` +
        `ΚΤΕΟ. Έδρα στην Ηλιούπολη, ${area.minutes} λεπτά με τη μηχανή — ${site.contact.phoneDisplay}.`,
  });
}

export default async function AreaPage({ params }: Params) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  const trail = [
    { name: "Αρχική", path: "/" },
    { name: "Περιοχές", path: "/periohes/" },
    { name: area.name, path: `/periohes/${area.slug}/` },
  ];

  const nearby = areas.filter((a) => area.nearby.includes(a.name));

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="border-b border-white/10 bg-ink-800">
        <div className="shell py-12 sm:py-16">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow mt-6">Εξυπηρετούμε</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Συνεργείο μοτοσυκλετών
            <br />
            {area.for}
          </h1>

          {/* Ρητά, ώστε να μη διαβαστεί η σελίδα σαν υποκατάστημα.
              Στην έδρα μας το μήνυμα είναι διαφορετικό — εκεί ΕΙΜΑΣΤΕ. */}
          <p className="mt-5 inline-flex max-w-2xl items-start gap-2.5 border-l-2 border-vs-blue pl-4 text-sm leading-relaxed text-slate-300">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-vs-accent" aria-hidden />
            {area.minutes === 0 ? (
              <span>
                Εδώ είναι η <strong className="font-semibold text-white">έδρα μας</strong>:
                Λεωφόρος Κυπρίων Ηρώων 73Β, επί της λεωφόρου. Είναι το μοναδικό
                μας σημείο — δεν έχουμε υποκαταστήματα αλλού.
              </span>
            ) : (
              <span>
                Το συνεργείο είναι <strong className="font-semibold text-white">ένα</strong>, στη
                Λεωφόρο Κυπρίων Ηρώων 73Β στην Ηλιούπολη. Δεν έχουμε υποκατάστημα{" "}
                {area.in} — απλώς είμαστε κοντά.
              </span>
            )}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            {area.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${site.contact.phone}`} className="btn-primary">
              <Phone className="h-4 w-4" aria-hidden />
              {site.contact.phoneDisplay}
            </a>
            <a
              href={site.contact.mapsLink}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Οδηγίες πρόσβασης
            <NewTab />
            </a>
          </div>
        </div>
      </section>

      {/* ── Πώς έρχεστε ───────────────────────────────────────── */}
      <section className="shell py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SlashRule />
            <h2 className="mt-6 text-3xl sm:text-4xl">
              {area.minutes === 0
                ? `Οι μηχανές ${area.in}`
                : `Πώς έρχεστε ${area.from}`}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              {area.local}
            </p>

            <dl className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
              <div className="bg-ink-800 p-6">
                <Clock className="h-5 w-5 text-vs-accent" aria-hidden />
                <dt className="label mt-4">Απόσταση από εσάς</dt>
                <dd className="text-lg text-white">
                  {area.minutes === 0 ? "Είμαστε εδώ" : `~${area.minutes} λεπτά`}
                </dd>
              </div>
              <div className="bg-ink-800 p-6">
                <Route className="h-5 w-5 text-vs-accent" aria-hidden />
                <dt className="label mt-4">Διαδρομή</dt>
                <dd className="text-sm leading-relaxed text-slate-300">
                  {area.via}
                </dd>
              </div>
              <div className="bg-ink-800 p-6">
                <MapPin className="h-5 w-5 text-vs-accent" aria-hidden />
                <dt className="label mt-4">Η έδρα μας</dt>
                <dd className="text-sm leading-relaxed text-slate-300">
                  {fullAddress()}
                </dd>
              </div>
            </dl>
          </div>

          <div className="slash aspect-[4/3] self-start overflow-hidden lg:aspect-[3/4]">
            <Media
              name="workshop"
              alt={`Συνεργείο μοτοσυκλετών που εξυπηρετεί ${area.in} — μηχανές σε ανυψωτήρες`}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ── Υπηρεσίες ─────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-ink-800">
        <div className="shell py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl">
            Τι κάνουμε για μηχανές {area.from}
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/ypiresies/#${service.slug}`}
                  className="group flex items-start gap-3 py-1.5 text-sm text-slate-300 transition hover:text-white"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-vs-accent"
                    aria-hidden
                  />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-400">
            Αναλαμβάνουμε όλες τις μάρκες και όλες τις κατηγορίες — από scooter
            και παπιά μέχρι naked, sport και adventure. Πρώτα ελέγχουμε, μετά
            σας λέμε τι κοστίζει, και μόνο αφού συμφωνήσετε ξεκινάει η εργασία.
          </p>
        </div>
      </section>

      {/* ── Γειτονικές περιοχές ───────────────────────────────── */}
      {nearby.length > 0 && (
        <section className="shell py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl">Εξυπηρετούμε και τις γύρω περιοχές</h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/periohes/${n.slug}/`}
                className="group bg-ink-800 p-6 transition hover:bg-ink-700"
              >
                <h3 className="text-lg not-italic text-white">{n.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-vs-accent">
                  Πρόσβαση & διαδρομή
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/periohes/"
            className="mt-8 inline-flex items-center gap-1.5 py-1.5 text-sm text-vs-accent underline-offset-4 hover:underline"
          >
            Όλες οι περιοχές που εξυπηρετούμε
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-vs-deep">
        <div className="shell flex flex-col items-start gap-6 py-14 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl">
              Μηχανή {area.in}; Πάρε μας τηλέφωνο
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100">
              Πες μας τι μηχανή έχεις και τι σε απασχολεί. Κανονίζουμε πότε θα
              την περάσεις από το συνεργείο.
            </p>
          </div>
          <a
            href={`tel:${site.contact.phone}`}
            className="btn slash shrink-0 bg-white text-ink-900 hover:bg-slate-100"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.contact.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
