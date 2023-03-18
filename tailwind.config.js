const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '15px',
    },
    colors: {
      body_bg: 'var(--body-bg)',
      primary: 'var(--color-primary)',
      primary_light: 'var(--color-primary-light)',
      secondary: 'var(--color-secondary)',
      input_bg: 'var(--input-bg)',
      input_border: 'var(--input-border)',
      white: '#fff',
      gray: '#888',
      gray_light: '#ddd',
      red: '#f20'
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}