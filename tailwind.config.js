/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust paths based on your project structure
  theme: {
    extend: {
      keyframes: {
        pushUp: {
          '0%': { transform: 'translateY(0) rotate(0)' },
          '25%': { transform: 'translateY(-20px) rotate(-10deg)' },
          '50%': { transform: 'translateY(0) rotate(0)' },
          '75%': { transform: 'translateY(-10px) rotate(10deg)' },
          '100%': { transform: 'translateY(0) rotate(0)' },
        },
      },
      animation: {
        pushUp: 'pushUp 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
