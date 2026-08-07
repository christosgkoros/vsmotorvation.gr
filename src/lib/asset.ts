/**
 * Prefix για assets μέσα στο /public.
 *
 * Στο GitHub Pages το site σερβίρεται από υπο-φάκελο
 * (`/vsmotorvation.gr/`), οπότε τα absolute paths χρειάζονται πρόθεμα.
 * Το Next προσθέτει basePath μόνο του σε <Link> και next/image — ΟΧΙ σε
 * raw <img src>, <source srcSet>, poster ή CSS url(). Γι' αυτά, εδώ.
 *
 * Σε custom domain (vsmotorvation.gr) το NEXT_PUBLIC_BASE_PATH είναι κενό
 * και η asset() επιστρέφει το path αμετάβλητο.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
