/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import clsx from "clsx";

import { asset } from "@/lib/asset";

export function Section({
  id,
  className,
  children,
  tone = "base",
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tone?: "base" | "raised";
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-16 sm:py-24",
        tone === "raised" && "bg-ink-800",
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-slate-400">{intro}</p>
      )}
    </div>
  );
}

/**
 * Εικόνα από το /public/media — σερβίρει webp με jpg fallback.
 * Το `name` είναι το όνομα αρχείου χωρίς κατάληξη (δείτε brand/build-media.py).
 */
export function Media({
  name,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
}: {
  name: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <picture className={className}>
      <source srcSet={asset(`/media/${name}.webp`)} type="image/webp" sizes={sizes} />
      <img
        src={asset(`/media/${name}.jpg`)}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // @ts-expect-error — έγκυρο HTML attribute, δεν είναι ακόμη στους τύπους
        fetchpriority={priority ? "high" : undefined}
        className={clsx("h-full w-full object-cover", imgClassName)}
      />
    </picture>
  );
}

/** Λεπτή διαγώνια λωρίδα — το μοτίβο του σήματος, ως διαχωριστικό. */
export function SlashRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx("h-1 w-16 skew-x-[-20deg] bg-vs-blue", className)}
    />
  );
}

/** Breadcrumbs — τα ορατά· το αντίστοιχο schema φτιάχνεται στο lib/seo. */
export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  const last = trail.length - 1;
  return (
    <nav aria-label="Διαδρομή" className="text-xs text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i === last ? (
              <span aria-current="page" className="text-slate-400">
                {item.name}
              </span>
            ) : (
              <>
                <Link href={item.path} className="transition hover:text-white">
                  {item.name}
                </Link>
                <span aria-hidden>/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
