import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fall": "fall 5s linear",
        "fade-out": "fadeOut 1s ease-in-out"
      },
      keyframes: {
        fall: {
          '0%': { top: '-200px' },
          '100%': { top: '100vh' },
        },
        fadeOut: {
          '0%': { opacity: "1", transform: 'translateY(0)' },
          '100%': { opacity: "0", transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
