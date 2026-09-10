/**
 * Prefix για assets μέσα στο /public.
 *
 * Το Next προσθέτει το basePath μόνο του σε <Link> και next/image — ΟΧΙ σε
 * raw <img src>, <source srcSet>, poster, metadata icons ή CSS url().
 * Γι' αυτά, εδώ.
 *
 * Στο Netlify το site είναι στη ρίζα, άρα το NEXT_PUBLIC_BASE_PATH είναι
 * κενό και η asset() επιστρέφει το path αμετάβλητο. Την κρατάμε ώστε ένα
 * μελλοντικό deploy σε υπο-φάκελο να μη σπάσει κάθε raw src.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
