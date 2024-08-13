/** @type {import('tailwindcss').Config} */

/* Define any tailwind symbols that may be dynamically generated using JS code */
const usedColors: string[]  = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red',
    'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
    'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet',
    'purple', 'fuchsia', 'pink', 'rose' ];

const safeColors = usedColors.map((color) => `bg-${color}-500` );

console.log("tailwind.config.ts executed.");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  //  safelist: [usedColors.map((c) => `bg-${c}-500`),
  safelist: [
    "col-span-2",
    "col-span-3",
    "row-span-2",
    "row-span-3",
    ...safeColors
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 3 column grid
        img3: "repeat(3, minmax(150px, 300px))",
      },
      gridTemplateRows: {
        g5: "repeat(5, 300px)",
      },
    },
  },

  /*  plugins: [‘react-css-modules’] */
  plugins: [require("tailwindcss-animate")],
};