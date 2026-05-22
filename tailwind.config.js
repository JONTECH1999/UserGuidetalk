/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accessible-black': '#000000',
        'accessible-white': '#FFFFFF',
        'accessible-blue': '#0066CC',
        'accessible-gray': '#F2F2F2',
      },
      fontSize: {
        'xl-accessible': ['2rem', { lineHeight: '1.5' }],
        'lg-accessible': ['1.75rem', { lineHeight: '1.5' }],
        'base-accessible': ['1.25rem', { lineHeight: '1.6' }],
      },
      spacing: {
        'accessible': '1.5rem',
      },
      borderRadius: {
        'accessible': '1rem',
      },
    },
  },
  plugins: [],
}
