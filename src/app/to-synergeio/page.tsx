import type { Metadata } from "next";
import { Phone } from "lucide-react";

import { Breadcrumbs, Media, SlashRule } from "@/components/ui";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { gallery, people, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/to-synergeio/",
  title: "Το συνεργείο — Οι μηχανικοί πίσω από το VS Motorvation",
  description:
    "Ο Βασίλης Χατζηκωνσταντίνου και ο Στάθης Σάπκας, με πάνω από 4 χρόνια στην αντιπροσωπεία της Piaggio, άνοιξαν συνεργείο μοτοσυκλετών στην Ηλιούπολη.",
});

const values = [
  {
    title: "Καθαρός χώρος",
    text: "Ανυψωτήρες μοτοσυκλέτας, οργανωμένος πάγκος, φως. Ένα συνεργείο που θα άφηνες τη μηχανή σου χωρίς δεύτερη σκέψη.",
  },
  {
    title: "Σωστά εργαλεία",
    text: "Ροπόκλειδα, ειδικά εργαλεία ανά μοντέλο και διαγνωστικά. Τίποτα δεν σφίγγεται «με το μάτι».",
  },
  {
    title: "Ό,τι λέμε, γράφεται",
    text: "Κάθε εργασία καταγράφεται: τι έγινε, με τι ανταλλακτικά, πότε. Την επόμενη φορά ξέρουμε πού μείναμε.",
  },
];

const trail = [
  { name: "Αρχική", path: "/" },
  { name: "Το συνεργείο", path: "/to-synergeio/" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Media
            name="bike-on-lift"
            alt=""
            priority
            imgClassName="opacity-25"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40"
          />
        </div>
        <div className="shell relative py-12 sm:py-24">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow mt-6">Το συνεργείο</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            Δύο μηχανικοί
            <br />
            από την αντιπροσωπεία
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
            Το {site.name} το άνοιξαν ο Βασίλης Χατζηκωνσταντίνου και ο Στάθης
            Σάπκας, μετά από χρόνια σε συνεργεία και πάνω από τέσσερα χρόνια
            στην αντιπροσωπεία της Piaggio. Έφυγαν για να δουλεύουν απευθείας
            με τον πελάτη — χωρίς τα γρανάζια του μεγάλου συνεργείου ανάμεσα.
          </p>
        </div>
      </section>

      {/* ── Ποιοι είμαστε ─────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-ink-800">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">Ποιοι είμαστε</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            Θα σου μιλήσει αυτός που θα πιάσει τη μηχανή
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Στα μεγάλα συνεργεία μιλάς με την υποδοχή, η μηχανή πάει πίσω και
            κάποιος που δεν είδες ποτέ αποφασίζει τι θα γίνει. Εδώ είμαστε δύο
            άτομα: αυτός που σε ακούει είναι αυτός που θα δουλέψει.
          </p>

          <dl className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {people.map((person) => (
              <div key={person.name} className="bg-ink-900 p-7">
                <dt>
                  <span className="font-display text-xl font-bold uppercase italic text-white sm:text-2xl">
                    {person.name}
                  </span>
                  <span className="label mt-2 block">{person.role}</span>
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-slate-400">
                  {person.bio}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-400">
            Η εμπειρία στην αντιπροσωπεία σημαίνει δουλειά με προδιαγραφές
            κατασκευαστή, επίσημα διαγνωστικά και διαδικασίες που δεν
            παρακάμπτονται. Αυτά τα κρατήσαμε. Αφήσαμε πίσω την αναμονή, τα
            τυποποιημένα πακέτα και το να μη μιλάει κανείς στον πελάτη.
          </p>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SlashRule />
            <h2 className="mt-6 text-3xl sm:text-4xl">Όλες οι μάρκες, μία λογική</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-400">
              <p>
                Αναλαμβάνουμε κάθε μάρκα και κατηγορία — από naked και sport
                μέχρι adventure και scooter. Διαγνωστικά, ειδικά εργαλεία και
                εμπειρία που καλύπτουν ό,τι μπαίνει στον ανυψωτήρα.
              </p>
              <p>
                Αυτό σημαίνει ότι δεν μαθαίνουμε πάνω στη μηχανή σου. Ξέρουμε τι
                σπάει, τι αντέχει και τι αξίζει να προλάβεις πριν σε αφήσει στον
                δρόμο.
              </p>
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10">
              {values.map((v) => (
                <div key={v.title} className="bg-ink-800 p-6">
                  <dt className="font-display text-lg font-bold uppercase italic text-white">
                    {v.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-400">
                    {v.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-3 self-start sm:gap-4">
            {gallery.slice(0, 6).map((item, i) => (
              <figure
                key={item.src}
                className={`slash overflow-hidden ${
                  i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"
                }`}
              >
                <Media
                  name={item.src}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 30vw, 50vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-800">
        <div className="shell flex flex-col items-start gap-6 py-14 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl">Έλα να τα πούμε από κοντά</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
              Πάρε ένα τηλέφωνο, πέρνα από τον χώρο, δες πού θα μπει η μηχανή σου
              και ρώτησε ό,τι θες.
            </p>
          </div>
          <a
            href={`tel:${site.contact.phone}`}
            className="btn-primary shrink-0"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.contact.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
