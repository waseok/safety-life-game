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
        // Stitch Material Design 3 색상 팔레트
        "primary":              "#9b3e20",
        "primary-dim":          "#8b3315",
        "primary-fixed":        "#fd8863",
        "primary-fixed-dim":    "#ec7b58",
        "primary-container":    "#fd8863",
        "on-primary":           "#ffefeb",
        "on-primary-container": "#531300",
        "on-primary-fixed":     "#1e0300",

        "secondary":               "#006384",
        "secondary-dim":           "#005673",
        "secondary-fixed":         "#97daff",
        "secondary-fixed-dim":     "#6ccfff",
        "secondary-container":     "#97daff",
        "on-secondary":            "#e6f5ff",
        "on-secondary-container":  "#004d68",
        "on-secondary-fixed":      "#00394e",

        "tertiary":               "#3c6600",
        "tertiary-dim":           "#345900",
        "tertiary-fixed":         "#c1fd7c",
        "tertiary-fixed-dim":     "#b3ee6f",
        "tertiary-container":     "#c1fd7c",
        "on-tertiary":            "#d9ffab",
        "on-tertiary-container":  "#396100",
        "on-tertiary-fixed":      "#2c4d00",

        "error":              "#b31b25",
        "error-dim":          "#9f0519",
        "error-container":    "#fb5151",
        "on-error":           "#ffefee",
        "on-error-container": "#570008",

        "surface":                    "#f5f6f7",
        "surface-dim":                "#d1d5d7",
        "surface-bright":             "#f5f6f7",
        "surface-container-lowest":   "#ffffff",
        "surface-container-low":      "#eff1f2",
        "surface-container":          "#e6e8ea",
        "surface-container-high":     "#e0e3e4",
        "surface-container-highest":  "#dadddf",
        "surface-variant":            "#dadddf",
        "surface-tint":               "#9b3e20",
        "background":                 "#f5f6f7",

        "on-surface":         "#2c2f30",
        "on-surface-variant": "#595c5d",
        "on-background":      "#2c2f30",
        "inverse-surface":    "#0c0f10",
        "inverse-on-surface": "#9b9d9e",
        "inverse-primary":    "#fd8863",

        "outline":         "#757778",
        "outline-variant": "#abadae",

        // 기존 안전영역 색상 유지
        life:   { DEFAULT: "#ef4444", light: "#fca5a5", dark: "#991b1b" },
        mental: { DEFAULT: "#8b5cf6", light: "#c4b5fd", dark: "#5b21b6" },
        safety: {
          daily:    "#3b82f6",
          traffic:  "#f59e0b",
          violence: "#8b5cf6",
          drug:     "#ef4444",
          disaster: "#f97316",
          work:     "#10b981",
          firstaid: "#dc2626",
        },
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg:      "2rem",
        xl:      "3rem",
        full:    "9999px",
      },
      fontFamily: {
        headline: ["'Plus Jakarta Sans'", "Noto Sans KR", "sans-serif"],
        body:     ["'Plus Jakarta Sans'", "Noto Sans KR", "sans-serif"],
        label:    ["'Plus Jakarta Sans'", "Noto Sans KR", "sans-serif"],
      },
      animation: {
        "fade-in":    "fadeIn 0.5s ease-out",
        "slide-up":   "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s infinite",
        "bar-fill":   "barFill 0.8s ease-out",
        "float":      "float 3s ease-in-out infinite",
        "pop":        "pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        barFill: {
          "0%":   { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        pop: {
          "0%":   { transform: "scale(0.5) rotate(-10deg)", opacity: "0" },
          "70%":  { transform: "scale(1.12) rotate(3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      boxShadow: {
        "3d-primary":   "0 8px 0 #8b3315",
        "3d-secondary": "0 8px 0 #00394e",
        "3d-tertiary":  "0 8px 0 #1e3300",
        "3d-error":     "0 8px 0 #570008",
        card: "0 4px 24px rgba(155,62,32,0.08), 0 1px 4px rgba(44,47,48,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
