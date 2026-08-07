import { site } from "@/lib/site";

export type BookingRequest = {
  date: string; // ISO, π.χ. "2026-09-14"
  time: string; // "10:30"
  serviceSlug: string;
  serviceTitle: string;
  name: string;
  phone: string;
  email: string;
  bike: string;
  plate: string;
  notes: string;
};

export type BookingResult =
  | { status: "sent" }
  | { status: "manual"; href: string; summary: string };

/**
 * Πού πάει το ραντεβού.
 *
 * Σήμερα το site είναι στατικό, οπότε χωρίς endpoint το αίτημα φεύγει σαν
 * προ-συμπληρωμένο email. Όταν αποφασιστεί η σύνδεση με το e-Συνεργείο,
 * αρκεί να οριστεί το NEXT_PUBLIC_BOOKING_ENDPOINT — τίποτε άλλο στο site
 * δεν αλλάζει.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "";

/** Ώρες που δίνουμε ραντεβού. */
export const SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "15:00",
  "16:00",
  "17:00",
];

/** Πόσες μέρες μπροστά μπορεί να κλείσει κάποιος. */
export const BOOKING_WINDOW_DAYS = 60;

const WEEKDAY_INDEX: Record<number, number> = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };

/** Είναι η μέρα ανοιχτή, με βάση το ωράριο στο site config; */
export function isOpenOn(date: Date): boolean {
  const entry = site.hours[WEEKDAY_INDEX[date.getDay()]];
  return Boolean(entry?.open);
}

export function isBookable(date: Date, today = startOfDay(new Date())): boolean {
  const d = startOfDay(date);
  const last = startOfDay(new Date(today));
  last.setDate(last.getDate() + BOOKING_WINDOW_DAYS);
  return d >= today && d <= last && isOpenOn(d);
}

/** Οι ώρες που προσφέρονται για μια μέρα — το Σάββατο κλείνει νωρίτερα. */
export function slotsFor(date: Date): string[] {
  const entry = site.hours[WEEKDAY_INDEX[date.getDay()]];
  if (!entry?.open || !entry.close) return [];
  return SLOTS.filter((slot) => slot >= entry.open! && slot < entry.close!);
}

export function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

export function toISODate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const LONG_DATE = new Intl.DateTimeFormat("el-GR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatLongDate(d: Date): string {
  return LONG_DATE.format(d);
}

export function bookingSummary(r: BookingRequest): string {
  const when = formatLongDate(new Date(`${r.date}T00:00:00`));
  return [
    `Αίτημα ραντεβού — ${site.name}`,
    "",
    `Ημερομηνία: ${when}`,
    `Ώρα: ${r.time}`,
    `Υπηρεσία: ${r.serviceTitle}`,
    "",
    `Ονοματεπώνυμο: ${r.name}`,
    `Τηλέφωνο: ${r.phone}`,
    `Email: ${r.email || "—"}`,
    `Μοτοσυκλέτα: ${r.bike}`,
    `Πινακίδα: ${r.plate || "—"}`,
    "",
    "Σχόλια:",
    r.notes || "—",
  ].join("\n");
}

export async function submitBooking(r: BookingRequest): Promise<BookingResult> {
  const summary = bookingSummary(r);

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r),
    });
    if (!res.ok) throw new Error(`Το αίτημα απορρίφθηκε (${res.status})`);
    return { status: "sent" };
  }

  const subject = `Ραντεβού ${r.date} ${r.time} — ${r.name}`;
  const href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(summary)}`;
  return { status: "manual", href, summary };
}
