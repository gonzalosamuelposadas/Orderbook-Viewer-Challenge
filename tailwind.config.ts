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
        binance: {
          bg: "#0b0e11",
          card: "#1e2329",
          border: "#2b3139",
          yellow: "#f0b90b",
          "yellow-light": "#f8d12f",
          green: "#0ecb81",
          red: "#f6465d",
          text: "#e8e9eb",
          "text-secondary": "#848e9c",
          "text-tertiary": "#5e6673",
        },
      },
    },
  },
  plugins: [],
};
export default config;
