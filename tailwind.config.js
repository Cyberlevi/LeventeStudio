/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#ebe3d7',
          300: '#ddd0bd',
          400: '#cbb89f',
          500: '#b9a089',
        },
        taupe: {
          50: '#f7f5f4',
          100: '#ebe7e4',
          200: '#d7cec8',
          300: '#b9aca3',
          400: '#9d8c7f',
          500: '#887568',
          600: '#72645a',
          700: '#5d534c',
          800: '#4d4641',
          900: '#423c38',
          950: '#38322f',
        },
        graphite: {
          900: '#151816',
          950: '#0b0d0c',
        },
        ivory: {
          100: '#f4f0e8',
          400: '#c9c3b8',
        },
        signal: {
          300: '#d8ff78',
          500: '#bfe85a',
        },
        accent: {
          600: '#b8865f',
          700: '#9d7050',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
