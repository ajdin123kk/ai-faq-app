/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Indigo
        secondary: "#06b6d4", // Cyan
        accent: "#f59e0b" // Amber
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}