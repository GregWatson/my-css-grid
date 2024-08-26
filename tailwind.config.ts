/** @type {import('tailwindcss').Config} */

/* Define any tailwind symbols that may be dynamically generated using JS code */
const usedColors: string[]  = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red',
    'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
    'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet',
    'purple', 'fuchsia', 'pink', 'rose' ];

const safeColors = usedColors.map((color) => `bg-${color}-500` );

/* Because of tailwind's lack of dynamic scripting, we need to
  add all needed translate values to the safelist. *sigh*
*/
const maxTranslate = 250;

var tempArray: any[] = [];
for (let count = 0; count < maxTranslate; count++) {
  tempArray = tempArray.concat(["translate-x-"+count, "translate-y-"+count])
}

// Now extend the theme to deal with these.
var trObj: any = {};
for (let count = 13; count < maxTranslate; count++) {
  var r = count/4.0;
  trObj[count.toString()] = r.toString() + 'rem'
}

const maxGridRows = 50;
var gridRowsArray: any[] = [];
for (let count = 0; count < maxGridRows; count++) {
  gridRowsArray = gridRowsArray.concat(["grid-rows-[repeat(" + count + ",_300px)]"])
}

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
    "col-span-6",
    "row-span-2",
    "row-span-3",
    ...safeColors,
    ...tempArray,
    ...gridRowsArray,
    "z-100"
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
      translate: trObj
    },
  },

  /*  plugins: [‘react-css-modules’] */
  plugins: [require("tailwindcss-animate")],
};