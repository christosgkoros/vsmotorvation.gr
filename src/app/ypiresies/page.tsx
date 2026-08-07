import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Media } from "@/components/ui";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Υπηρεσίες",
  description:
    "Service, ηλεκτρονική διάγνωση, φρένα και αναρτήσεις, ελαστικά, εξατμίσεις και upgrades για μοτοσυκλέτες — όλες οι μάρκες.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-ink-800">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">Τι κάνουμε</p>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
            Υπηρεσίες
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Δεν κάνουμε τα πάντα για όλους. Κάνουμε μοτοσυκλέτα, καλά. Δες τι
            περιλαμβάνει κάθε δουλειά και τι να περιμένεις.
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
                <Link href="/rantevou/" className="btn-primary">
                  Κλείσε ραντεβού
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
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
