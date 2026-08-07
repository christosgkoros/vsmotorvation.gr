import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      {/* λάμψη πίσω από το κείμενο, στο μπλε του σήματος */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-vs-deep/25 blur-[120px]"
      />

      <div className="shell relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow">Service μοτοσυκλέτας — όλες οι μάρκες</p>

          <h1 className="mt-4 text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Η μηχανή σου
            <br />
            στα σωστά χέρια
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Service, διάγνωση και upgrades από κόσμο που οδηγεί. Σου λέμε τι
            βρήκαμε, τι κοστίζει και τι μπορεί να περιμένει — πριν πιάσουμε
            κατσαβίδι.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/rantevou/" className="btn-primary">
              Κλείσε ραντεβού
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={`tel:${site.contact.phone}`} className="btn-ghost">
              <Phone className="h-4 w-4" aria-hidden />
              {site.contact.phoneDisplay}
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { k: "Ραντεβού", v: "Online, σε 1 λεπτό" },
              { k: "Διάγνωση", v: "Πριν την εργασία" },
              { k: "Ανταλλακτικά", v: "Γνήσια ή ισοδύναμα" },
            ].map((item) => (
              <div key={item.k}>
                <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-vs-bright">
                  {item.k}
                </dt>
                <dd className="mt-1.5 text-sm text-slate-300">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="slash relative aspect-[3/4] overflow-hidden bg-ink-700 sm:aspect-[4/5] lg:aspect-[3/4]">
            <video
              className="h-full w-full object-cover"
              poster={asset("/media/hero-poster.jpg")}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Μοτοσυκλέτα BMW στον ανυψωτήρα του συνεργείου"
            >
              <source src={asset("/media/hero.mp4")} type="video/mp4" />
            </video>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent"
            />
          </div>

          {/* μπλε λωρίδα που «κόβει» την εικόνα, όπως στο σήμα */}
          <div
            aria-hidden
            className="absolute -bottom-3 -left-3 h-16 w-1.5 skew-y-[12deg] bg-vs-blue sm:h-24"
          />
        </div>
      </div>
    </section>
  );
}
