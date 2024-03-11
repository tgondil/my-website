import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '20p': '4%',
      },
      lineHeight: {
        'hero': '1.2',
        'extra-loose': '2.3',
        '12': '3rem',
      },
      fontFamily: {
        "nexa": ["NexaH", "sans-serif"],
        "invis": ["InvisibleEB", "sans-serif"]
      },
      fontSize: {
        "2.3v": '2.3vh',
        "1.1e": '4.3rem',
        "1.2e": '4.8rem'
      },
      animation: {
        "intro-bounce": "bounce 2s 2",
        "intro-slide": "slide_up 3s 1",
        "intro-unhide": "unhide 4.5s 1",
        text: "text 5s ease infinite",
        pop: "pop 0.5s 1"
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
        slide_up: {
          "0%": { transform: "translateY(250%)" },
          "100%": { transform: "translateY(0%)" },
        },
        unhide: {
          "0%, 75%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pop: {
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
        'my-blue': 'rgba(0,212,255,1)'
      
      }
    },
  },
  plugins: [],
};
export default config;
