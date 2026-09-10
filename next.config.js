/**
 * Το site βγαίνει ως στατικά αρχεία (`next build` → out/).
 *
 * Το production είναι στο Netlify, στη ρίζα του vsmotorvation.gr, οπότε το
 * NEXT_PUBLIC_BASE_PATH είναι κενό και ο basePath βγαίνει "".
 * Μένει ως διέξοδος αν ποτέ χρειαστεί σερβίρισμα από υπο-φάκελο — τότε
 * αρκεί να τεθεί η μεταβλητή στο περιβάλλον του build.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

module.exports = nextConfig;
