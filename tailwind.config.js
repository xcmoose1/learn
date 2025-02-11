/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': 'rgb(var(--neon-blue) / <alpha-value>)',
        'neon-green': 'rgb(var(--neon-green) / <alpha-value>)',
        'dark-blue': 'rgb(var(--dark-blue) / <alpha-value>)',
        'darker-blue': 'rgb(var(--darker-blue) / <alpha-value>)',
      },
      fontFamily: {
        'heading': ['Bebas Neue', 'sans-serif'],
        'tech': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'goal': 'goal-celebration 0.5s ease-out forwards',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'slide': 'slide 0.5s ease-out forwards',
      },
      keyframes: {
        glow: {
          'from': {
            'box-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px rgb(var(--neon-blue)), 0 0 20px rgb(var(--neon-blue))',
          },
          'to': {
            'box-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px rgb(var(--neon-blue)), 0 0 40px rgb(var(--neon-blue))',
          },
        },
        slide: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'stadium': "url('/stadium-background.jpg')",
      },
    },
  },
  plugins: [],
}
