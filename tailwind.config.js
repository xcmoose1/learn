/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'real-white': '#FFFFFF',
        'real-gold': '#FAB614',
        'psg-blue': '#004170',
        'psg-red': '#DA291C',
        'nassr-yellow': '#FFCD00',
        'nassr-blue': '#004170',
        'united-red': '#DA291C',
        'united-white': '#FFFFFF'
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif']
      }
    },
  },
  plugins: [],
}
