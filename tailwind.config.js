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
        light_background: "#fdf0d5",
        blue: "#003049",
        toblue: "#669bbc",
        lightred: "#c1121f",
        darkred: "#780000",
        darkgray: "#3E3E3E",
        lightgray: "#1e1b24",
        dark_kightgray: "#D4D4D4",
        dark_background: "#19181f",
        to_dark_background: "#5F6A79"
      }
    },
  },
  plugins: [],
}