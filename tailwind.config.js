/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#16213E',
        'darker-blue': '#1A1A2E',
        'neon-blue': '#4CAF50',
        'light-blue': '#97C1E7',
        'neon-green': 'rgb(var(--neon-green) / <alpha-value>)',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Poppins', 'sans-serif'],
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
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
