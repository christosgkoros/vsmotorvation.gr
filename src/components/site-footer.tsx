import Link from "next/link";
import { Clock, Facebook, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { NewTab } from "@/components/ui";
import { areas } from "@/lib/areas";
import { fullAddress, services, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-800">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo height={40} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {site.tagline}. Η μηχανή σας φεύγει από εδώ όπως θα θέλαμε να φύγει η δική
            μας.
          </p>
          {site.social.facebook && (
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 py-1.5 text-sm text-slate-400 transition hover:text-white"
            >
              <Facebook className="h-4 w-4" aria-hidden />
              Facebook
            <NewTab />
            </a>
          )}
        </div>

        <div>
          <h2 className="text-sm not-italic">Υπηρεσίες</h2>
          <ul className="mt-3 text-sm text-slate-400">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/ypiresies/#${s.slug}`}
                  className="block py-1.5 transition hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm not-italic">Επικοινωνία</h2>
          <ul className="mt-3 text-sm text-slate-400">
            <li>
              <a
                href={`tel:${site.contact.phone}`}
                className="inline-flex items-start gap-2.5 py-1.5 transition hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-start gap-2.5 py-1.5 transition hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.contact.mapsLink}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-start gap-2.5 py-1.5 transition hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {fullAddress()}
              <NewTab />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm not-italic">Ωράριο</h2>
          <ul className="mt-4 space-y-1.5 text-sm text-slate-400">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className={h.open ? "" : "text-slate-400"}>
                  {h.open ? `${h.open}–${h.close}` : "Κλειστά"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            Εκτός ωραρίου, κατόπιν τηλεφωνικής συνεννόησης
          </p>
        </div>
      </div>

      {/* Οι περιοχές, ως γραμμή κάλυψης. Ήταν στήλη με 11 ονόματα, που
          διαβαζόταν σαν λίστα καταστημάτων. */}
      <div className="border-t border-white/5">
        <div className="shell py-5 text-xs leading-relaxed text-slate-400">
          <span className="text-slate-300">Εξυπηρετούμε:</span>{" "}
          {areas.map((area, i) => (
            <span key={area.slug}>
              {i > 0 && <span aria-hidden> · </span>}
              <Link
                href={`/periohes/${area.slug}/`}
                className="underline-offset-4 transition hover:text-white hover:underline"
              >
                {area.name}
              </Link>
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Με επιφύλαξη παντός δικαιώματος.
          </p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
