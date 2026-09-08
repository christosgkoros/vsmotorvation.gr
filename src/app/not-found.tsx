import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl italic text-vs-accent">404</p>
      <h1 className="mt-6 text-3xl sm:text-4xl">Η σελίδα δεν βρέθηκε</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
        Μάλλον πήρες λάθος στροφή. Γύρνα στην αρχική ή πάρε μας ένα τηλέφωνο.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Αρχική
        </Link>
        <Link href="/epikoinonia/" className="btn-ghost">
          Επικοινωνία
        </Link>
      </div>
    </div>
  );
}
