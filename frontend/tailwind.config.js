/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#940d94",
        // #5f6FFF
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill,minmaz(200px,1fr))",
      },
    },
  },
  plugins: [],
};
