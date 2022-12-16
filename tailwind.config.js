/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: "'Syne', sans-serif",
        sourceSans: "'Source Sans Pro', sans-serif"
      }
    },
  },
  plugins: [],
}
