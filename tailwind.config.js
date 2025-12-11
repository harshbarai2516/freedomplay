// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // or wherever your components are
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      display: ["landscape"],
      scale: ["landscape"],
      gap: ["landscape"],
      padding: ["landscape"],
      margin: ["landscape"],
      textColor: ["landscape"],
      fontSize: ["landscape"],
      // add more if you want to use landscape: on them
    },
  },
  safelist: [],
  // 👇 This is the important part:
  screens: {
    portrait: { raw: "(orientation: portrait)" },
    landscape: { raw: "(orientation: landscape)" },
  },
};
