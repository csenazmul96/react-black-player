/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'player-bg': '#000000',
        'player-text': '#ffffff',
        'player-red': '#dc143c',
      },
    },
  },
  plugins: [],
}
