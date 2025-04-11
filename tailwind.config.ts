import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark mode colors
        dark: {
          bg: "#1a1b1e",       // Slightly lighter than pure black
          card: "#25262b",     // Slightly lighter background for cards
          hover: "#2c2d32"     // Slightly lighter hover state
        }
      }
    },
  },
  plugins: [],
};

export default config; 