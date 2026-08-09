/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        lightGray: "#2C365E",
        lightBlue: "#2C365E",
        ngrokBlue: "#3e6ff4",
        ngrokGray: "#23253a",
        ngrokDark: "#151530",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "420px",
      ss: "620px",
      sm: "768px",
      md: "1460px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
