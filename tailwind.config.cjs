/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px"
      },
      keyframes: {
        hideVisibility: {
          "0%": { visibility: "visible" },
          "100%": { visibility: "hidden" }
        },
        showVisibility: {
          "0%": { visibility: "hidden", opacity: "0" },
          "100%": { visibility: "visible", opacity: "1" }
        },
        slideInOut: {
          "0%": { transform: "translateY(20vh)" },
          "30%": { transform: "translateY(0vh)" },
          "70%": { transform: "translateY(0vh)" },
          "100%": { transform: "translateY(-20vh)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(150vh)" },
          "100%": { transform: "translateX(0)" }
        },
        slideInRightRotated: {
          "0%": { transform: "translateX(50vh), rotate(90deg)" },
          "100%": { transform: "translateX(0) rotate(90deg)" }
        },
        slideIn: {
          "0%": { transform: "translateY(25vh)" },
          "100%": { transform: "translateY(0)" }
        },
        slideIn30: {
          "0%": { transform: "translateY(30vh)" },
          "100%": { transform: "translateY(0)" }
        },
        slideOut: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-25vh)" }
        },
        slideInMob: {
          "0%": { transform: "translateY(10vh)" },
          "100%": { transform: "translateY(0)" }
        },
        slideInMob100: {
          "0%": { transform: "translateY(100vh)" },
          "100%": { transform: "translateY(0)" }
        },
        slideInMob40: {
          "0%": { transform: "translateY(40vh)" },
          "100%": { transform: "translateY(0)" }
        },
        circleRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        hamburgerMove: {
          "0%": { left: "0%" },
          "100%": { left: "50%" },
        },
        hamburgerMoveBack: {
          "0%": { left: "50%" },
          "100%": { left: "0%" },
        },
        hamburgerRotate: {
          "0%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        hamburgerRotateBack: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        fullHeight: {
          "0%": { height: "0" },
          "100%": { height: "100%" },
        },
        noHeight: {
          "0%": { height: "100%" },
          "100%": { height: "0" },
        },
        slideInImage: {
          "0%": { transform: "translateY(100vh)" },
          "100%": { transform: "translateY(0vh)" },
        },
        slideOutImage: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translateY(-100vh)" },
        },
      },
      colors: {
        "orange": "rgb(253, 81, 49)"
      }
    },
    fontFamily: {
      poppins: "Poppins"
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    prefix: "daisy_",
    styled: true,
    base: false,
    utils: false,
    themes: [
      {
        customTheme: {
          primary: "#ffffff"
        }
      }
    ]
  }
};
