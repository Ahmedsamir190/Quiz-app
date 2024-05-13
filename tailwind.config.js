/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        customiz: " repeat(2, minmax(400px, 1fr))",
        tab: " repeat(1, minmax(650px, 1fr))",
      },
    },
  },
  plugins: [],
};
