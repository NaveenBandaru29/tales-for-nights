const { typography } = require('@mui/system');

module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      // typography: ({ theme }) => (
      //   {
      //   DEFAULT: {
      //     css: {
      //       '--tw-prose-bullets': theme("colors.grey.900"),
      //     },
      //   },
      //   }
      // ),
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-bullets': '#333', // Use theme() for Tailwind colors
          },
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), typography],
}
