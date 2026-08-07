"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import clsx from "clsx";

import { Calendar } from "@/components/booking/calendar";
import {
  type BookingResult,
  formatLongDate,
  slotsFor,
  submitBooking,
  toISODate,
} from "@/lib/booking";
import { services, site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

const EMPTY = { name: "", phone: "", email: "", bike: "", plate: "", notes: "" };

export function BookingForm() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [serviceSlug, setServiceSlug] = useState(services[0].slug);
  const [fields, setFields] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState("");

  const slots = useMemo(() => (date ? slotsFor(date) : []), [date]);
  const service = services.find((s) => s.slug === serviceSlug)!;
  const ready = Boolean(date && time && fields.name.trim() && fields.phone.trim());

  const set = (key: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const pickDate = (d: Date) => {
    setDate(d);
    setTime((current) => (slotsFor(d).includes(current) ? current : ""));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || !date) return;

    setStatus("sending");
    setError("");
    try {
      const res = await submitBooking({
        date: toISODate(date),
        time,
        serviceSlug,
        serviceTitle: service.title,
        ...fields,
      });
      setResult(res);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Κάτι πήγε στραβά.");
      setStatus("error");
    }
  }

  if (status === "done" && result) {
    return <Confirmation result={result} date={date!} time={time} service={service.title} />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
      {/* ── Βήμα 1: μέρα ─────────────────────────────────────── */}
      <div>
        <Step n={1} label="Διάλεξε μέρα" />
        <div className="mt-4">
          <Calendar selected={date} onSelect={pickDate} />
        </div>
      </div>

      <div className="space-y-8">
        {/* ── Βήμα 2: ώρα ────────────────────────────────────── */}
        <div>
          <Step n={2} label="Διάλεξε ώρα" />
          {!date ? (
            <p className="mt-4 text-sm text-slate-500">
              Διάλεξε πρώτα μέρα από το ημερολόγιο.
            </p>
          ) : (
            <>
              <p className="mt-3 text-sm text-slate-400">{formatLongDate(date)}</p>
              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Διαθέσιμες ώρες">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    aria-pressed={time === slot}
                    className={clsx(
                      "slash border px-5 py-2.5 text-sm font-semibold transition",
                      time === slot
                        ? "border-vs-blue bg-vs-blue text-white"
                        : "border-white/15 bg-ink-800 text-slate-200 hover:border-white/40",
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Βήμα 3: στοιχεία ───────────────────────────────── */}
        <div>
          <Step n={3} label="Τα στοιχεία σου" />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="service">
                Τι χρειάζεσαι
              </label>
              <select
                id="service"
                className="field"
                value={serviceSlug}
                onChange={(e) => setServiceSlug(e.target.value)}
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                Ενδεικτική διάρκεια: {Math.round(service.minutes / 60)} ώρες περίπου
              </p>
            </div>

            <Field id="name" label="Ονοματεπώνυμο" required value={fields.name} onChange={set("name")} autoComplete="name" />
            <Field id="phone" label="Τηλέφωνο" required type="tel" value={fields.phone} onChange={set("phone")} autoComplete="tel" />
            <Field id="email" label="Email" type="email" value={fields.email} onChange={set("email")} autoComplete="email" />
            <Field id="bike" label="Μοτοσυκλέτα" placeholder="π.χ. BMW S 1000 XR 2024" value={fields.bike} onChange={set("bike")} />
            <Field id="plate" label="Πινακίδα" placeholder="προαιρετικό" value={fields.plate} onChange={set("plate")} className="sm:col-span-2" />

            <div className="sm:col-span-2">
              <label className="label" htmlFor="notes">
                Τι σε απασχολεί
              </label>
              <textarea
                id="notes"
                rows={4}
                className="field resize-y"
                placeholder="Θόρυβος στο πίσω, λάμπα ένδειξης αναμμένη, ό,τι έχεις παρατηρήσει…"
                value={fields.notes}
                onChange={set("notes")}
              />
            </div>
          </div>
        </div>

        {status === "error" && (
          <p role="alert" className="flex items-start gap-2 border border-vs-red/40 bg-vs-red/10 p-4 text-sm text-red-200">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {error} Πάρε μας τηλέφωνο στο {site.contact.phoneDisplay}.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
          <button type="submit" className="btn-primary" disabled={!ready || status === "sending"}>
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Στέλνεται…
              </>
            ) : (
              <>
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Στείλε το αίτημα
              </>
            )}
          </button>
          <p className="text-xs text-slate-500">
            {ready
              ? "Θα σου απαντήσουμε για επιβεβαίωση."
              : "Συμπλήρωσε μέρα, ώρα, όνομα και τηλέφωνο."}
          </p>
        </div>
      </div>
    </form>
  );
}

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="slash flex h-7 w-7 items-center justify-center bg-vs-blue text-xs font-bold text-white">
        {n}
      </span>
      <h2 className="text-lg not-italic">{label}</h2>
    </div>
  );
}

function Field({
  id,
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return (
    <div className={className}>
      <label className="label" htmlFor={id}>
        {label}
        {props.required && <span className="text-vs-red"> *</span>}
      </label>
      <input id={id} className="field" {...props} />
    </div>
  );
}

function Confirmation({
  result,
  date,
  time,
  service,
}: {
  result: BookingResult;
  date: Date;
  time: string;
  service: string;
}) {
  return (
    <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
      <CheckCircle2 className="mx-auto h-12 w-12 text-vs-bright" aria-hidden />
      <h2 className="mt-6 text-2xl sm:text-3xl">
        {result.status === "sent" ? "Το αίτημα στάλθηκε" : "Ένα βήμα ακόμη"}
      </h2>

      <dl className="mx-auto mt-8 max-w-sm space-y-2 border-y border-white/10 py-6 text-left text-sm">
        {[
          ["Ημερομηνία", formatLongDate(date)],
          ["Ώρα", time],
          ["Υπηρεσία", service],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-slate-500">{k}</dt>
            <dd className="text-right font-medium text-white">{v}</dd>
          </div>
        ))}
      </dl>

      {result.status === "sent" ? (
        <p className="mt-6 text-sm leading-relaxed text-slate-400">
          Το λάβαμε. Θα επικοινωνήσουμε μαζί σου για επιβεβαίωση — συνήθως την ίδια
          μέρα.
        </p>
      ) : (
        <>
          <p className="mt-6 text-sm leading-relaxed text-slate-400">
            Πάτα το κουμπί για να μας στείλεις το αίτημα με email — είναι ήδη
            συμπληρωμένο. Ή πάρε μας τηλέφωνο, το ίδιο εύκολο.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={result.href} className="btn-primary">
              Άνοιγμα email
            </a>
            <a href={`tel:${site.contact.phone}`} className="btn-ghost">
              {site.contact.phoneDisplay}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
