/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: "#898CBB",
        blue: "#175DB8",
        toblue: "#1621E6",
        darkgray: "#3E3E3E",
        lightgray: "#EDEDEE",
        dark_kightgray: "#D4D4D4",
        dark_background: "#1A1A2E",
        to_dark_background: "#5F6A79"
      }
    },
  },
  plugins: [],
}