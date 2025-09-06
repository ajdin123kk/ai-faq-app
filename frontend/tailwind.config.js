/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan React files for Tailwind classes
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          light: "#3b82f6", // blue-500
          dark: "#2563eb",  // blue-600
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};