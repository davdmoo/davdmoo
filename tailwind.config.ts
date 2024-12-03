import type { Config } from "tailwindcss"

export default {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "lighter-background": "var(--lighter-background)",
        foreground: "var(--foreground)",
        anchor: "var(--anchor)",
        "anchor-visited": "var(--anchor-visited)",
        "anchor-alt": "var(--anchor-alt)",
        "anchor-visited-alt": "var(--anchor-visited-alt)",
        "input-background": "var(--input-background)",
        "input-border": "var(--input-border)",
        "button-background": "var(--button-background)",
        "button-hover": "var(--button-hover)",
        disabled: "var(--disabled)",
        "disabled-foreground": "var(--disabled-foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config
