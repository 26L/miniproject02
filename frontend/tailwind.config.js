/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#0284c7',
        accent: '#38bdf8',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        surface: '#f8fafc',
        text: '#0f172a',
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans KR', 'sans-serif'],
      },
      borderRadius: {
        ui: '12px',
      },
      boxShadow: {
        card: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
