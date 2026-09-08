import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { Hero } from "@/components/hero";
import { Media, Section, SectionHead, SlashRule } from "@/components/ui";
import { areas } from "@/lib/areas";
import { asset } from "@/lib/asset";
import { JsonLd, faqSchema } from "@/lib/seo";
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
    title: "Σχολή αντιπροσωπείας",
    text: "Πάνω από 4 χρόνια στην αντιπροσωπεία της Piaggio. Δουλεύουμε με προδιαγραφές κατασκευαστή, όχι με το μάτι.",
  },
];

const steps = [
  {
    n: "01",
    title: "Μας παίρνεις τηλέφωνο",
    text: "Ένα τηλέφωνο αρκεί. Λέμε τι σε απασχολεί και κανονίζουμε μέρα και ώρα που σε βολεύει.",
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

/**
 * Ερωτήσεις που όντως πληκτρολογεί ο κόσμος στη Google.
 * Το FAQPage schema σπάνια δίνει rich result πλέον (η Google το περιόρισε το
 * 2023), αλλά το περιεχόμενο πιάνει long-tail και τροφοδοτεί τα AI overviews.
 */
const faq = [
  {
    q: "Πού βρίσκεται το συνεργείο;",
    a: "Στη Λεωφόρο Κυπρίων Ηρώων 73Β στην Ηλιούπολη, 163 41, επί της λεωφόρου. Εξυπηρετούμε όλα τα νότια προάστια: Αργυρούπολη, Γλυφάδα, Νέα Σμύρνη, Παλαιό Φάληρο, Άλιμο, Ελληνικό, Παγκράτι, Υμηττό, Νέο Κόσμο, Δάφνη και Βύρωνα.",
  },
  {
    q: "Ποιες μάρκες μοτοσυκλετών αναλαμβάνετε;",
    a: "Όλες. Από scooter και παπιά μέχρι naked, sport, adventure και custom. Αν για κάποιο μοντέλο δεν είμαστε σίγουροι ότι θα κάνουμε καλή δουλειά, θα σας το πούμε από το τηλέφωνο αντί να το ανακαλύψετε μετά.",
  },
  {
    q: "Πώς κλείνω ραντεβού;",
    a: "Τηλεφωνικά στο " + site.contact.phoneDisplay + ". Δεν έχουμε online κράτηση επίτηδες: προτιμάμε να ακούσουμε τι σας απασχολεί για να ξέρουμε πόσο χρόνο να κρατήσουμε για τη μηχανή σας.",
  },
  {
    q: "Ποιος θα δουλέψει στη μηχανή μου;",
    a: "Ο Βασίλης Χατζηκωνσταντίνου ή ο Στάθης Σάπκας — δεν υπάρχει τρίτος. Έχουν πολυετή εμπειρία σε συνεργεία και πάνω από τέσσερα χρόνια στην αντιπροσωπεία της Piaggio. Αυτός που θα σας ακούσει στο τηλέφωνο είναι αυτός που θα πιάσει τη μηχανή.",
  },
  {
    q: "Είναι καινούριο συνεργείο;",
    a: `Το συνεργείο άνοιξε τον Ιούλιο του 2026, οι μηχανικοί όμως όχι: έρχονται από χρόνια σε συνεργεία και από την αντιπροσωπεία της Piaggio. Στους πρώτους μήνες μαζέψαμε ${site.reviews.count} κριτικές στους Χάρτες Google, όλες με ${site.reviews.rating} αστέρια.`,
  },
  {
    q: "Έχετε υποκαταστήματα σε άλλες περιοχές;",
    a: "Όχι. Το συνεργείο είναι ένα, στη Λεωφόρο Κυπρίων Ηρώων 73Β στην Ηλιούπολη. Εξυπηρετούμε πελάτες από όλα τα νότια προάστια, αλλά η μηχανή έρχεται πάντα εδώ.",
  },
  {
    q: "Μαθαίνω το κόστος πριν ξεκινήσει η εργασία;",
    a: "Πάντα. Κάνουμε πρώτα τον έλεγχο, σας λέμε τι βρήκαμε και τι κοστίζει, και δεν προχωράει τίποτα χωρίς τη δική σας έγκριση.",
  },
  {
    q: "Κάνετε προέλεγχο για ΚΤΕΟ;",
    a: "Ναι. Περνάμε τη μηχανή από τα σημεία που ελέγχει το ΚΤΕΟ — φώτα, φρένα, ελαστικά, διαρροές, εξάτμιση — και αποκαθιστούμε ό,τι δεν θα περνούσε, ώστε να μη γυρίσετε με σημειώσεις.",
  },
  {
    q: "Τι να φέρω μαζί μου;",
    a: "Την άδεια κυκλοφορίας και, αν έχετε, το βιβλίο service. Βοηθάει πολύ να ξέρουμε το ιστορικό της μηχανής πριν αρχίσουμε να ψάχνουμε.",
  },
  {
    q: "Πόσο θα μείνει η μηχανή στο συνεργείο;",
    a: "Εξαρτάται από την εργασία. Στη σελίδα υπηρεσιών υπάρχει ενδεικτικός χρόνος για κάθε δουλειά — από μία ώρα για διάγνωση μέχρι μία ημέρα για πλήρες service.",
  },
  {
    q: "Είστε ανοιχτά Σάββατο;",
    a: "Όχι. Λειτουργούμε Δευτέρα έως Παρασκευή, 09:00–18:00. Εκτός ωραρίου εξυπηρετούμε κατόπιν τηλεφωνικής συνεννόησης.",
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
          intro="Από το προγραμματισμένο service μέχρι τον προέλεγχο ΚΤΕΟ. Όλα κάτω από την ίδια στέγη."
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
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-vs-accent">
                Δες τι περιλαμβάνει
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}

          <a
            href={`tel:${site.contact.phone}`}
            className="group relative flex flex-col bg-ink-700 p-7 transition hover:bg-ink-600"
          >
            <SlashRule className="transition-all group-hover:w-24" />
            <h3 className="mt-5 text-xl not-italic sm:text-2xl">
              Κάτι άλλο;
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
              Πες μας τι σε απασχολεί. Αν δεν το κάνουμε εμείς, θα σου πούμε
              ποιος το κάνει σωστά.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-vs-accent">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {site.contact.phoneDisplay}
            </span>
          </a>
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
                <Icon className="h-7 w-7 text-vs-accent" aria-hidden />
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
              <span className="font-display text-4xl italic text-vs-accent">
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

      {/* ── Περιοχές ──────────────────────────────────────────── */}
      <Section id="periohes" tone="raised">
        <SectionHead
          eyebrow="Πού εξυπηρετούμε"
          title="Ένα συνεργείο, όλα τα νότια προάστια"
          intro="Είμαστε στην Ηλιούπολη και μόνο εκεί — χωρίς υποκαταστήματα. Μας βρίσκουν όμως από όλη τη νότια Αθήνα. Διάλεξε την περιοχή σου για τη διαδρομή και πόσο απέχεις."
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/periohes/${area.slug}/`}
                className="slash inline-flex items-center gap-2 border border-white/15 bg-ink-700 px-4 py-2.5 text-sm text-slate-300 transition hover:border-vs-bright hover:text-white"
              >
                <MapPin className="h-3.5 w-3.5 text-vs-accent" aria-hidden />
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/periohes/"
          className="mt-8 inline-flex items-center gap-1.5 py-1.5 text-sm text-vs-accent underline-offset-4 hover:underline"
        >
          Όλες οι περιοχές και οι διαδρομές
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Section>

      {/* ── Συχνές ερωτήσεις ──────────────────────────────────── */}
      <Section id="syxnes-erotiseis">
        <JsonLd data={faqSchema(faq)} />
        <SectionHead
          eyebrow="Συχνές ερωτήσεις"
          title="Ό,τι μας ρωτάνε πιο συχνά"
        />
        <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {faq.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-white">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-vs-deep">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${asset("/media/bike-on-lift.jpg")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="shell relative flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <Phone className="h-9 w-9 text-white/80" aria-hidden />
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Πάρε μας τηλέφωνο
            </h2>
            <p className="mt-4 text-base leading-relaxed text-blue-100">
              Πες μας τι μηχανή έχεις και τι σε απασχολεί, και κανονίζουμε πότε
              θα την περάσεις από το συνεργείο.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${site.contact.phone}`}
              className="btn slash bg-white text-ink-900 hover:bg-slate-100"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {site.contact.phoneDisplay}
            </a>
            <Link
              href="/epikoinonia/"
              className="btn slash border border-white/40 text-white hover:bg-white/10"
            >
              Επικοινωνία
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
