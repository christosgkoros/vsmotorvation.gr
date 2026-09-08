import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Χρώματα από το λογότυπο (μετρημένα από το πρωτότυπο αρχείο)
        vs: {
          blue: "#2C5BBD",
          bright: "#3D7BE8",
          deep: "#1B3E86",
          red: "#DC3A2B",
        },
        ink: {
          900: "#0A0C10",
          800: "#101318",
          700: "#161A21",
          600: "#1E242D",
          500: "#2A313C",
        },
      },
      fontFamily: {
        /**
         * Τα fallbacks είναι όλα γραμματοσειρές με πλήρη ελληνική κάλυψη.
         * Το «Impact» που ήταν εδώ είναι επικίνδυνο σε ελληνικό site: η
         * κάλυψη ελληνικών διαφέρει ανά πλατφόρμα, οπότε αν δεν φορτώσει η
         * webfont μπορεί να βγουν τετραγωνάκια αντί για γράμματα.
         */
        sans: [
          "var(--font-body)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Arial Narrow",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: { shell: "78rem" },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up .5s ease-out both" },
    },
  },
  plugins: [],
};

export default config;
