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
        "primary":              "#1a6fb5",
        "primary-dim":          "#0d5a9e",
        "primary-fixed":        "#64b5f6",
        "primary-fixed-dim":    "#42a5f5",
        "primary-container":    "#64b5f6",
        "on-primary":           "#e3f2fd",
        "on-primary-container": "#0a3d6b",
        "on-primary-fixed":     "#071e36",

        "secondary":               "#2196f3",
        "secondary-dim":           "#1976d2",
        "secondary-fixed":         "#90caf9",
        "secondary-fixed-dim":     "#64b5f6",
        "secondary-container":     "#bbdefb",
        "on-secondary":            "#e3f2fd",
        "on-secondary-container":  "#0d47a1",
        "on-secondary-fixed":      "#0a3a7a",

        "tertiary":               "#0d8a6a",
        "tertiary-dim":           "#0a7358",
        "tertiary-fixed":         "#80cbc4",
        "tertiary-fixed-dim":     "#4db6ac",
        "tertiary-container":     "#b2dfdb",
        "on-tertiary":            "#e0f2f1",
        "on-tertiary-container":  "#004d40",
        "on-tertiary-fixed":      "#00382e",

        "error":              "#d32f2f",
        "error-dim":          "#c62828",
        "error-container":    "#ef5350",
        "on-error":           "#ffebee",
        "on-error-container": "#7f0000",

        "surface":                    "#f0f4f8",
        "surface-dim":                "#cfd8dc",
        "surface-bright":             "#f0f4f8",
        "surface-container-lowest":   "#ffffff",
        "surface-container-low":      "#eceff1",
        "surface-container":          "#e1e8ed",
        "surface-container-high":     "#dce3e8",
        "surface-container-highest":  "#d6dee3",
        "surface-variant":            "#d6dee3",
        "surface-tint":               "#1a6fb5",
        "background":                 "#f0f4f8",

        "on-surface":         "#1a2c3d",
        "on-surface-variant": "#5a7a94",
        "on-background":      "#1a2c3d",
        "inverse-surface":    "#0a1929",
        "inverse-on-surface": "#90a4ae",
        "inverse-primary":    "#64b5f6",

        "outline":         "#78909c",
        "outline-variant": "#b0bec5",

        life:   { DEFAULT: "#ef4444", light: "#fca5a5", dark: "#991b1b" },
        mental: { DEFAULT: "#42a5f5", light: "#90caf9", dark: "#1565c0" },
        safety: {
          daily:    "#1e88e5",
          traffic:  "#ffa726",
          violence: "#7e57c2",
          drug:     "#ef5350",
          disaster: "#ff7043",
          work:     "#26a69a",
          firstaid: "#ef5350",
        },
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg:      "2rem",
        xl:      "3rem",
        full:    "9999px",
      },
      fontFamily: {
        headline: ["Maplestory", "Noto Sans KR", "sans-serif"],
        body:     ["Maplestory", "Noto Sans KR", "sans-serif"],
        label:    ["Maplestory", "Noto Sans KR", "sans-serif"],
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
        "3d-primary":   "0 8px 0 #0d5a9e",
        "3d-secondary": "0 8px 0 #1565c0",
        "3d-tertiary":  "0 8px 0 #0a7358",
        "3d-error":     "0 8px 0 #7f0000",
        card: "0 4px 24px rgba(26,111,181,0.08), 0 1px 4px rgba(26,44,61,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
