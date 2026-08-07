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
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
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
