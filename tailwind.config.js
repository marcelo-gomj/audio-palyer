/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "opacityAnimation": {
          "0%": { opacity: 0.2 },
          "100%": { opacity: 1 }
        }
      },
      spacing: {
        "1/2": "1.5px"
      }
    },
    colors: {
      "15": "rgb(15, 15, 15)",
      "white": "white",
      "red": "red",
      "opacity": "transparent",
      "black-80": "rgb(8, 8, 8)",
      "black-100": "rgb(10, 10, 10)",
      "black-150": "rgb(15, 15, 15)",
      "black-200": "rgb(20, 20, 20)",
      "black-300": "rgb(30, 30, 30)",
      "black-350" : "rgb(35, 35, 35)",
      "black-400": "rgb(40, 40, 40)",
      "bkack-450": "rgb(45, 45, 45)",
      "white-400": "rgb(255, 255, 255, 0.4)",
      "white-500": "rgb(255, 255, 255, 0.5)",
      "white-800": "rgb(255, 255, 255, .8)",
      "white-950": "rgb(255, 255, 255, 0.95"
    }
  },
  plugins: [],
}

