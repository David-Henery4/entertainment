/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    colors: {
      red: "#FC4747",
      white: "#FFFFFF",
      darkBlue: "#10141E",
      greyishBlue: "#5A698F",
      semiDarkBlue: "#161D2F",
      transparent: "rgba(0,0,0,0)",
    },
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
    },
    extend: {
      fontSize: {
        bodySml: "13px",
        bodyM: "15px",
      },
      gridTemplateColumns: {
        contentRespon: "repeat(auto-fit, minmax(100px, 1fr))",
        mobBleed: "16px repeat(10, 1fr) 16px",
      }
    },
  },
  plugins: [],
};
