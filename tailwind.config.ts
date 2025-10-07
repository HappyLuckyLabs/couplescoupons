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
        primary: {
          50: "#FEF2F0",
          100: "#FCE5E1",
          200: "#F9CBC3",
          300: "#F5B1A5",
          400: "#F29787",
          500: "#D64933",
          600: "#B83E2A",
          700: "#9A3321",
          800: "#7C2818",
          900: "#5E1D0F",
        },
        peach: {
          50: "#FFFAF9",
          100: "#FFE5E0",
          200: "#FFD0C7",
          300: "#FFBCAE",
          400: "#FFA795",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#6B6B6B",
          700: "#404040",
          800: "#262626",
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["4.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "display-md": ["3.75rem", { lineHeight: "1.1", fontWeight: "700" }],
        "heading-xl": ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-lg": ["1.875rem", { lineHeight: "1.3", fontWeight: "700" }],
        "heading-md": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
