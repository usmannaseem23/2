import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
      },
      
      fontFamily: {
        heading: ['"YourCustomFont"', 'sans-serif'], // Replace "YourCustomFont" with the desired font
      },
    },
  },
  plugins: [],
};
export default config;
