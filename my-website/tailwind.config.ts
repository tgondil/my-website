import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '18p': '9.2%',
        '20p': '12%',
      },
      lineHeight: {
        'hero': '1.2',
        'extra-loose': '2.3',
        '12': '3rem',
      },
      fontFamily: {
        "nexa": ["NexaH", "sans-serif"],
        "invis": ["InvisibleEB", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
        "scp": ["Source Code Pro", "monospace"]
      },
      fontSize: {
        "18px": '18px',
        "2.3v": '2.1vh',
        "1.1e": '4.3rem',
        "1.2e": '8rem',
        "1e": "3.8rem"
      },
      animation: {
        "intro-bounce": "bounce 2s 2",
        "other-bounce": "my_bounce 2s infinite",
        "slide-left": "slide_left 3s 1",
        "slide-right": "slide_right 3s 1",
        "intro-unhide": "unhide 4s 1",
        text: "text 5s ease infinite",
        pop: "pop 0.5s 1",
        minipop: "mini_pop 0.5s 1"
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "300% 300%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "300% 300%",
            "background-position": "right center",
          },
        },
        slide_right: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slide_left: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        unhide: {
          "0%, 75%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pop: {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(0%)" },
        },
        mini_pop: {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-2%)" },
          "100%": { transform: "translateY(0%)" },
        },
        my_bounce: {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(0%)" },
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'zanah': '#D4ECDD',
        'my-pink': '#B8B5FF',
        'my-blue': 'rgba(0,212,255,1)',
        'my-grey': '#161A30',
        'my-green': '#4CCD99'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
