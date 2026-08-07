"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import clsx from "clsx";

import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const nav = [
  { href: "/ypiresies/", label: "Υπηρεσίες" },
  { href: "/to-synergeio/", label: "Το συνεργείο" },
  { href: "/epikoinonia/", label: "Επικοινωνία" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled || open
          ? "border-white/10 bg-ink-900/95 backdrop-blur"
          : "border-transparent bg-gradient-to-b from-ink-900/90 to-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" aria-label={`${site.name} — αρχική`} className="shrink-0">
          <Logo height={34} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "px-4 py-2 text-sm font-medium transition",
                pathname === item.href
                  ? "text-white"
                  : "text-slate-300 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.contact.phone}`}
            className="hidden items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.contact.phoneDisplay}
          </a>
          <Link href="/rantevou/" className="btn-primary !px-4 !py-2.5 text-xs sm:!px-6">
            Κλείσε ραντεβού
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            className="p-2 text-white md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-white/10 md:hidden">
          <div className="shell flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/5 py-3.5 text-sm font-medium text-slate-200 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${site.contact.phone}`}
              className="py-3.5 text-sm font-medium text-vs-bright"
            >
              {site.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
