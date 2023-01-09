module.exports = {
  content: ["./atom/**/*.tsx", "./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    screens: {
      // --------------------------------------------------
      // custom settings
      // --------------------------------------------------
      sp: "350px",
      tab: "520px",
      pc: "1024px",
      // --------------------------------------------------
      // default settings
      // --------------------------------------------------
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontSize: {
      xxs: [
        "0.5rem",
        {
          lineHeight: "0.75rem",
        },
      ],
      xs: [
        "0.75rem",
        {
          lineHeight: "1rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.25rem",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
        },
      ],
      "3xl": [
        "1.875rem",
        {
          lineHeight: "2.25rem",
        },
      ],
      "4xl": [
        "2.25rem",
        {
          lineHeight: "2.5rem",
        },
      ],
      "5xl": [
        "3rem",
        {
          lineHeight: "1rem",
        },
      ],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
