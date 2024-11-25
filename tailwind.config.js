/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#121212",
        primary: "#1F2937",
        secondary: "#4B5563",
        accent: "#10B981",
        lightAccent: "#34D399",
      },
    },
  },
  plugins: [],
}

