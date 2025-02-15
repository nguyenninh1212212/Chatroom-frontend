/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "index.html"
  ],
  theme: {
    extend: {
      colors:{
        primary_100:"rgb(0, 86, 224)"
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
