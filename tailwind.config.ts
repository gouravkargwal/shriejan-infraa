/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme"); // Import Tailwind's default font families

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include .ts, .tsx for Pages Router
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", ...fontFamily.sans],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
