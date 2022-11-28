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
    },
    extend: {
      fontSize: {
        bodySml: "13px",
        bodyM: "15px",
      },
    },
  },
  plugins: [],
};
