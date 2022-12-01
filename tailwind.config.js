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
      width: {
        trendingThumbTab: "470px",
      },
      gap: {
        19: "75px",
      },
      gridColumnEnd: {
        lrgMainGridBeforeEnd: "14",
        lrgMainGridEnd: "15",
      },
      height: {
        trendingThumbTab: "230px",
      },
      screens: {
        smTab: "730px",
      },
      fontSize: {
        bodySml: "13px",
        bodyM: "15px",
        subheadingTab: "32px",
      },
      gridTemplateColumns: {
        contentRespon: "repeat(auto-fit, minmax(163px, 1fr))",
        contentResponTab: "repeat(auto-fit, minmax(185px, 1fr))",
        contentResponDesk: "repeat(auto-fit, minmax(220px, 1fr))",
        mobBleed: "16px repeat(10, 1fr) 16px",
        tabBleed: "25px repeat(10, 1fr) 25px",
        deskBleed: "36px repeat(10, 1fr) 36px",
        lrgDeskBleed: "32px 1fr 36px repeat(10, 1fr) 36px",
      },
      spacing: {
        contentTabColGap: "30px",
        contentLapColGap: "40px",
        contentTabRowGap: "24px",
        contentLapRowGap: "32px",
      },
    },
  },
  plugins: [],
};
