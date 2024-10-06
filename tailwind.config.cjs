// @ts-check

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        yt: '"YouTube Sans", Roboto, sans-serif',
        base: "Roboto, Arial, sans-serif",
      },
      fontSize: {
        "yt-header": ["1.25rem", "1.75rem"],
        "yt-small": ["0.75rem", "1rem"],
        "yt-x-small": ["0.75rem", "1.125rem"],
      },
    },
  },

  plugins: [
    /** @type {import("tailwindcss/types/config").PluginCreator} */
    ({ addUtilities, matchUtilities, theme }) => {
      matchUtilities(
        {
          "exact-h"(value) {
            return {
              height: value,
              "min-height": value,
              "max-height": value,
            }
          },
        },
        { values: theme("height") }
      )

      addUtilities({
        ".letter-spacing-0\\.2": {
          "letter-spacing": "0.2px",
        },
      })
    },
  ],
}

module.exports = config
