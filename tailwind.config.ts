// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: { max: "640px" },
      "xs-mini": { max: "429px" },
      "only-sm": { min: "641px", max: "767px" },
      "only-md": { min: "768px", max: "1023px" },
      "only-lg": { min: "1024px", max: "1279px" },
      "only-xl": { min: "1280px", max: "1535px" },
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        heading: "var(--font-montserrat)", // Montserrat
        body: "var(--font-raleway)",       // Raleway
      },
      colors: {
        // Example color palette
        "green-start": "#9CE59C",
        "green-end": "#3FD24D",
        "primary-900": "#007400",
        "primary-800": "#009400",
        "primary-700": "#00A600",
        "primary-600": "#00B914",
        "primary-500": "#3FD24D",
        "primary-400": "#3FD24D",
        "primary-300": "#6DDB71",
        "primary-200": "#9CE59C",
        "primary-100": "#C4EFC3",
        "primary-50": "#E6F9E7",
        "secondary-900": "#090A09",
        "secondary-800": "#2B2C2B",
        "secondary-700": "#494949",
        "secondary-600": "#5B5C5B",
        "secondary-500": "#090A09",
        "secondary-400": "#A3A4A3",
        "secondary-300": "#C9CAC9",
        "secondary-200": "#DDDEDD",
        "secondary-100": "#EBEBEB",
        "secondary-50": "#F5F6F5",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        '298': '18.625rem',
        '118': '7.375rem',
      }
    },
  },
  plugins: [],
};

export default config;
