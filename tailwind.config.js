const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize: {
      "4x": "400%",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", ...fontFamily.sans],
        monoton: ["var(--font-monoton)", ...fontFamily.sans],
      },
      animation: {
        "color-rotate": "color-rotate 6s ease infinite",
      },
      keyframes: {
        "color-rotate": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
