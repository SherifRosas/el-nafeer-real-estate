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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'sahara-gold': "#D4AF37",
        'sahara-gold-light': "#F5D77F",
        'sahara-gold-dark': "#997A15",
      },
    },
  },
  plugins: [],
};
export default config;


