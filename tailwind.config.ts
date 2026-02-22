import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        life: { DEFAULT: "#ef4444", light: "#fca5a5", dark: "#991b1b" },
        mental: { DEFAULT: "#8b5cf6", light: "#c4b5fd", dark: "#5b21b6" },
        safety: {
          daily: "#3b82f6",
          traffic: "#f59e0b",
          violence: "#8b5cf6",
          drug: "#ef4444",
          disaster: "#f97316",
          work: "#10b981",
          firstaid: "#dc2626",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s infinite",
        "bar-fill": "barFill 0.8s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        barFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
