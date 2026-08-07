import type { Metadata } from "next";

import { BookingForm } from "@/components/booking/booking-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Κλείσε ραντεβού",
  description:
    "Κλείσε online ραντεβού για service, διάγνωση ή επισκευή στη μοτοσυκλέτα σου. Διάλεξε μέρα και ώρα σε ένα λεπτό.",
};

export default function BookingPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-ink-800">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">Ραντεβού</p>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
            Διάλεξε πότε σε βολεύει
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Στείλε μας το αίτημα και το επιβεβαιώνουμε. Αν χρειάζεσαι κάτι
            επείγον, πάρε καλύτερα τηλέφωνο στο{" "}
            <a
              href={`tel:${site.contact.phone}`}
              className="text-vs-bright underline-offset-4 hover:underline"
            >
              {site.contact.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>

      <div className="shell py-14 sm:py-20">
        <BookingForm />
      </div>

      <section className="border-t border-white/10 bg-ink-800">
        <div className="shell py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl">Καλό να ξέρεις</h2>
          <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-white">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

const faq = [
  {
    q: "Είναι κλεισμένο το ραντεβού;",
    a: "Όχι ακόμη. Στέλνεις αίτημα και το επιβεβαιώνουμε με μήνυμα ή τηλέφωνο, συνήθως την ίδια μέρα.",
  },
  {
    q: "Τι να φέρω μαζί;",
    a: "Την άδεια κυκλοφορίας και, αν έχεις, το βιβλίο service. Βοηθάει να ξέρουμε το ιστορικό της μηχανής.",
  },
  {
    q: "Πόσο θα μείνει η μηχανή;",
    a: "Εξαρτάται από τη δουλειά. Στη σελίδα υπηρεσιών υπάρχει ενδεικτικός χρόνος για κάθε εργασία.",
  },
  {
    q: "Μαθαίνω το κόστος πριν;",
    a: "Πάντα. Κάνουμε πρώτα τον έλεγχο και σου λέμε τι βρήκαμε και τι κοστίζει πριν ξεκινήσουμε.",
  },
  {
    q: "Αν θέλω να το ακυρώσω;",
    a: "Ένα τηλέφωνο αρκεί. Ενημέρωσέ μας όσο πιο νωρίς μπορείς για να δώσουμε τη θέση σε άλλον.",
  },
  {
    q: "Ποιες μάρκες αναλαμβάνετε;",
    a: "Όλες. Από naked και sport μέχρι adventure και scooter — αν δεν είμαστε σίγουροι ότι μπορούμε να κάνουμε καλή δουλειά, θα σου το πούμε από το τηλέφωνο.",
  },
];
