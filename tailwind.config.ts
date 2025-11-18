import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        nature: {
          50: '#f5f7f0',
          100: '#e8edd9',
          200: '#d1dbb3',
          300: '#b4c385',
          400: '#9aab5e',
          500: '#7e9142',
          600: '#627333',
          700: '#4d5a2b',
          800: '#3f4a26',
          900: '#363f23',
          950: '#1b2210',
        },
        earth: {
          50: '#f6f5f3',
          100: '#e7e4df',
          200: '#d1c9bd',
          300: '#b5a795',
          400: '#9c8b74',
          500: '#8c7a63',
          600: '#7f6c58',
          700: '#69584a',
          800: '#584a40',
          900: '#493e36',
          950: '#27201c',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
};
export default config;
