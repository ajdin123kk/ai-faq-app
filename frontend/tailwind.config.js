/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // blue-600
        secondary: "#f43f5e" // rose-500
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}