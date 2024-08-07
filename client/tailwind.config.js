/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-500': '#6B7280',
        'gray-600': '#4B5563',
        'gray-900': '#111827',
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
      },
    },
  },
  plugins: [],
}