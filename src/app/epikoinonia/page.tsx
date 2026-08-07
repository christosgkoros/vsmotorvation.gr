import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description:
    "Πού θα μας βρεις, πότε είμαστε ανοιχτά και πώς να επικοινωνήσεις με το VS Motorvation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-ink-800">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">Επικοινωνία</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">Πού θα μας βρεις</h1>
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

            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-start gap-4 border-l-2 border-white/15 pl-5 transition hover:border-vs-bright"
              >
                <Instagram className="mt-1 h-5 w-5 shrink-0 text-vs-bright" aria-hidden />
                <span>
                  <span className="label !mb-0.5">Instagram</span>
                  <span className="block text-lg text-white transition group-hover:text-vs-bright">
                    @vsmotorvation
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
              Κλείσε ραντεβού για να μη σε ταλαιπωρήσουμε με αναμονή.
            </p>
            <Link href="/rantevou/" className="btn-primary mt-5">
              Κλείσε ραντεβού
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="min-h-[24rem] border border-white/10 bg-ink-700">
          {site.contact.mapsEmbed ? (
            <iframe
              src={site.contact.mapsEmbed}
              title={`Χάρτης — ${site.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[24rem] w-full"
            />
          ) : (
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center gap-4 p-8 text-center">
              <MapPin className="h-10 w-10 text-slate-600" aria-hidden />
              <p className="max-w-xs text-sm text-slate-500">
                Ο χάρτης μπαίνει μόλις οριστικοποιηθεί η διεύθυνση.
                {/* TODO: βάλτε το embed URL στο src/lib/site.ts → contact.mapsEmbed */}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
