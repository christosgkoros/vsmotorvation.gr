/* eslint-disable @next/next/no-img-element */

import { asset } from "@/lib/asset";

type LogoProps = {
  /** Ύψος σε px. Το πλάτος ακολουθεί την αναλογία του λογότυπου. */
  height?: number;
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Το λογότυπο είναι SVG στο /public/brand (δείτε brand/build-logo.py).
 * `dark` = για σκούρο φόντο, `light` = για ανοιχτό.
 */
export function Logo({ height = 36, variant = "dark", className }: LogoProps) {
  return (
    <img
      src={asset(variant === "dark" ? "/brand/logo-dark.svg" : "/brand/logo.svg")}
      alt="VS Motorvation"
      height={height}
      style={{ height }}
      className={className}
      width={Math.round(height * 2.75)}
    />
  );
}

export function LogoMark({ height = 40, variant = "dark", className }: LogoProps) {
  return (
    <img
      src={asset(variant === "dark" ? "/brand/mark-dark.svg" : "/brand/mark.svg")}
      alt=""
      aria-hidden
      height={height}
      style={{ height }}
      className={className}
      width={Math.round(height * 0.72)}
    />
  );
}
