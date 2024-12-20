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
        border: "#CCCCCC",
        text: {
          primary: "#222222",
          secondary: "#888888",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
