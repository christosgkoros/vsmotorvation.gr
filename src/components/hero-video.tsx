"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { asset } from "@/lib/asset";

/**
 * Το βίντεο του hero.
 *
 * Δύο απαιτήσεις προσβασιμότητας που δεν καλύπτονται με σκέτο `autoPlay`:
 *
 * 1. `prefers-reduced-motion` — το CSS media query σβήνει animations και
 *    transitions, αλλά ΟΧΙ την αναπαραγωγή βίντεο. Γι' αυτό δεν βάζουμε
 *    καθόλου `autoPlay`· ξεκινάμε από JS μόνο αν επιτρέπεται η κίνηση.
 * 2. WCAG 2.2.2 — περιεχόμενο που κινείται αυτόματα πάνω από 5 δευτερόλεπτα
 *    πρέπει να μπορεί να σταματήσει. Εξού το κουμπί παύσης.
 *
 * Χωρίς JavaScript μένει το poster, που είναι ούτως ή άλλως το LCP.
 */
export function HeroVideo({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {
          /* π.χ. εξοικονόμηση μπαταρίας — μένει το poster */
        });
      }
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={asset("/media/hero-poster.jpg")}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={asset("/media/hero.mp4")} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Παύση βίντεο" : "Αναπαραγωγή βίντεο"}
        className="absolute bottom-3 right-3 z-10 grid h-11 w-11 place-items-center border border-white/25 bg-ink-900/70 text-white backdrop-blur transition hover:bg-ink-900/90"
      >
        {playing ? (
          <Pause className="h-4 w-4" aria-hidden />
        ) : (
          <Play className="h-4 w-4" aria-hidden />
        )}
      </button>
    </>
  );
}
