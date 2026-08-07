/**
 * Το site βγαίνει ως στατικά αρχεία (`next build` → out/).
 *
 * NEXT_PUBLIC_BASE_PATH: κενό για custom domain (vsmotorvation.gr),
 * ή "/vsmotorvation.gr" όταν σερβίρεται από GitHub Pages project page.
 * Το θέτει το .github/workflows/deploy.yml.
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
