import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        ingenium: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#a78bfa",
          "secondary": "#2dd4bf",
          "accent": "#00a600",
          "neutral": "#111827",
          "info": "#7dd3fc",
          "success": "#86efac",
          "warning": "#f87171",
          "error": "#fda4af",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
