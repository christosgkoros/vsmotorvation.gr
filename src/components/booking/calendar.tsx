"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

import { isBookable, startOfDay, toISODate } from "@/lib/booking";

const WEEKDAYS = ["Δε", "Τρ", "Τε", "Πε", "Πα", "Σα", "Κυ"];

const MONTH_LABEL = new Intl.DateTimeFormat("el-GR", {
  month: "long",
  year: "numeric",
});

/** Μέρες του μήνα, με κενά μπροστά ώστε η 1η να πέσει στη σωστή στήλη. */
function monthGrid(month: Date): (Date | null)[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7; // Δευτέρα = 0
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  return [
    ...Array.from({ length: lead }, () => null),
    ...Array.from(
      { length: days },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
    ),
  ];
}

export function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (date: Date) => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  // Το site είναι στατικό: το HTML φτιάχνεται στο build, οπότε η "σημερινή"
  // μέρα του server δεν είναι η σημερινή του επισκέπτη. Δείχνουμε το
  // ημερολόγιο μόνο στον browser, ώστε να μη χτυπήσει το hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cells = useMemo(() => monthGrid(month), [month]);
  const atFirstMonth =
    month.getFullYear() === today.getFullYear() &&
    month.getMonth() === today.getMonth();

  const shift = (delta: number) =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));

  if (!mounted) {
    return (
      <div className="card p-5 sm:p-6" aria-busy>
        <div className="h-9 animate-pulse bg-white/5" />
        <div className="mt-5 grid grid-cols-7 gap-1">
          {Array.from({ length: 42 }, (_, i) => (
            <div key={i} className="aspect-square animate-pulse bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={atFirstMonth}
          aria-label="Προηγούμενος μήνας"
          className="p-2 text-slate-300 transition hover:text-white disabled:opacity-25"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p
          aria-live="polite"
          className="font-display text-lg font-bold uppercase italic text-white"
        >
          {MONTH_LABEL.format(month)}
        </p>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="Επόμενος μήνας"
          className="p-2 text-slate-300 transition hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500"
          >
            {d}
          </div>
        ))}

        {cells.map((date, i) => {
          if (!date) return <div key={`pad-${i}`} />;

          const enabled = isBookable(date, today);
          const isSelected = selected && toISODate(selected) === toISODate(date);
          const isToday = toISODate(today) === toISODate(date);

          return (
            <button
              key={toISODate(date)}
              type="button"
              disabled={!enabled}
              onClick={() => onSelect(date)}
              aria-pressed={Boolean(isSelected)}
              className={clsx(
                "relative aspect-square text-sm font-medium transition",
                isSelected && "bg-vs-blue text-white",
                !isSelected && enabled && "text-slate-200 hover:bg-white/10",
                !enabled && "cursor-not-allowed text-slate-700",
              )}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <span
                  aria-hidden
                  className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-vs-bright"
                />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-5 border-t border-white/10 pt-4 text-xs text-slate-500">
        Οι γκρίζες μέρες είναι Κυριακές ή έχουν περάσει. Το ραντεβού
        επιβεβαιώνεται από εμάς — θα λάβεις μήνυμα.
      </p>
    </div>
  );
}
