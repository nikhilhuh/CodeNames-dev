/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile-m': '330px',
      'mobile-l': '380px',
      'mobile-tablet' : '440px',
      'tablet': '510px',
      'laptop-sm': '770px',
      'laptop-l': '1030px',
      '4k': '1800px'
    },
    extend: {
      height: {
        screen: '100svh',
      },
      animation: {
        'card-appear': 'cardAppear 1s ease-in-out forwards',
      },
      keyframes: {
        cardAppear: {
          '0%': {
            transform: 'translateY(-100vh)', // Start off-screen
          },
          '50%': {
            transform: 'translateY(0)', // Move to the middle of the screen
          },
          '100%': {
            transform: 'translateY(0)', // End at the final position
          },
        },
      },
    },
  },
  plugins: [],
}