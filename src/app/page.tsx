import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Gauge,
  MessageSquareText,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { Hero } from "@/components/hero";
import { Media, Section, SectionHead, SlashRule } from "@/components/ui";
import { gallery, services, site } from "@/lib/site";

const reasons = [
  {
    icon: Gauge,
    title: "Διάγνωση πριν την εργασία",
    text: "Πρώτα βρίσκουμε τι φταίει, μετά συμφωνούμε τι θα γίνει. Καμία έκπληξη στο τέλος.",
  },
  {
    icon: MessageSquareText,
    title: "Σου μιλάμε καθαρά",
    text: "Φωτογραφίες από ό,τι βρήκαμε και εξήγηση χωρίς όρους που δεν λένε τίποτα.",
  },
  {
    icon: ShieldCheck,
    title: "Εγγύηση στην εργασία",
    text: "Ό,τι κάνουμε το στηρίζουμε. Αν κάτι δεν κάθισε σωστά, γυρίζεις και το βλέπουμε.",
  },
  {
    icon: Wrench,
    title: "Εργαλεία για μοτοσυκλέτα",
    text: "Ανυψωτήρες, ροπόκλειδα και διαγνωστικά φτιαγμένα για μηχανές — όχι αυτοσχεδιασμοί.",
  },
];

const steps = [
  {
    n: "01",
    title: "Κλείνεις ραντεβού",
    text: "Online σε ένα λεπτό ή με ένα τηλέφωνο. Διαλέγεις μέρα και ώρα που σε βολεύει.",
  },
  {
    n: "02",
    title: "Ελέγχουμε & σου λέμε",
    text: "Κάνουμε τη διάγνωση και σου στέλνουμε τι βρήκαμε, με κόστος και χρόνο.",
  },
  {
    n: "03",
    title: "Εγκρίνεις εσύ",
    text: "Δεν προχωράει τίποτα χωρίς το ΟΚ σου. Ούτε ένα εξάρτημα παραπάνω.",
  },
  {
    n: "04",
    title: "Παίρνεις τη μηχανή",
    text: "Καθαρή, ελεγμένη και με γραπτό ιστορικό της εργασίας για την επόμενη φορά.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Υπηρεσίες ─────────────────────────────────────────── */}
      <Section id="ypiresies" tone="raised">
        <SectionHead
          eyebrow="Τι κάνουμε"
          title="Υπηρεσίες συνεργείου"
          intro="Από το προγραμματισμένο service μέχρι το upgrade που σκέφτεσαι μήνες. Όλα κάτω από την ίδια στέγη."
        />

        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/ypiresies/#${service.slug}`}
              className="group relative flex flex-col bg-ink-700 p-7 transition hover:bg-ink-600"
            >
              <SlashRule className="transition-all group-hover:w-24" />
              <h3 className="mt-5 text-xl not-italic sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {service.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-vs-bright">
                Δες τι περιλαμβάνει
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Γιατί εμάς ────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Γιατί εδώ"
              title="Δεν αφήνεις απλώς τη μηχανή"
              intro="Την αφήνεις σε κάποιον που ξέρει τι κρατάει στα χέρια του και τι σημαίνει για σένα."
            />
            <div className="slash mt-10 aspect-[4/3] overflow-hidden">
              <Media
                name="workshop"
                alt="Δύο BMW σε ανυψωτήρες μέσα στο συνεργείο"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>

          <div className="grid gap-px self-start border border-white/10 bg-white/10 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-ink-800 p-7">
                <Icon className="h-7 w-7 text-vs-bright" aria-hidden />
                <h3 className="mt-5 text-lg not-italic">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Πώς δουλεύουμε ────────────────────────────────────── */}
      <Section tone="raised">
        <SectionHead
          eyebrow="Η διαδικασία"
          title="Τέσσερα βήματα, καμία έκπληξη"
          align="center"
        />
        <ol className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n} className="bg-ink-700 p-7">
              <span className="font-display text-4xl italic text-vs-blue">
                {step.n}
              </span>
              <h3 className="mt-4 text-lg not-italic">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Gallery ───────────────────────────────────────────── */}
      <Section id="gallery">
        <SectionHead
          eyebrow="Από το συνεργείο"
          title="Από τον πάγκο μας"
          intro="Μηχανές που πέρασαν από εδώ και έφυγαν όπως έπρεπε."
        />
        {/* 1 μεγάλη (2×2) + 8 τετράγωνες = ακριβώς 3 σειρές των 4 στηλών */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <figure
              key={item.src}
              className={
                i === 0
                  ? "slash col-span-2 aspect-square overflow-hidden lg:row-span-2"
                  : "slash aspect-square overflow-hidden"
              }
            >
              <Media
                name={item.src}
                alt={item.alt}
                sizes="(min-width: 1024px) 25vw, 50vw"
                imgClassName="transition-transform duration-500 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-vs-deep">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/media/bike-on-lift.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="shell relative flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <ClipboardCheck className="h-9 w-9 text-white/80" aria-hidden />
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Κλείσε ραντεβού online
            </h2>
            <p className="mt-4 text-base leading-relaxed text-blue-100">
              Διάλεξε μέρα και ώρα, πες μας τι μηχανή έχεις και τι σε απασχολεί.
              Επιβεβαιώνουμε την ίδια μέρα.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/rantevou/"
              className="btn slash bg-white text-ink-900 hover:bg-slate-100"
            >
              Ραντεβού
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={`tel:${site.contact.phone}`}
              className="btn slash border border-white/40 text-white hover:bg-white/10"
            >
              {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
