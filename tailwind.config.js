// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "\"Helvetica Now Display\"",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"SF Pro Text\"",
          "\"Helvetica Neue\"",
          "\"Segoe UI\"",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
}
