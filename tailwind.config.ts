/** @type {import('tailwindcss').Config} */

/* Define any tailwind symbols that may be dynamically generated using JS code */
const usedColors: string[]  = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red',
    'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
    'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet',
    'purple', 'fuchsia', 'pink', 'rose' ];

const safeColors = usedColors.map((color) => `bg-${color}-500` );

/* Because of tailwind's lack of dynamic scripting, we need to
  add all needed translate values to the safelist. *sigh* 
  cssGridMaxTranslateX is the max pixel width that we want the modal to
  support when user right clicks in an image.
  Nothing breaks if it is not big enough - the modal will simply
  pop up to the left to the cursor instead of at the cursor.
*/
const cssGridMaxTranslateX = 250;

var transXArray: any[] = [];
for (let count = 0; count < cssGridMaxTranslateX; count++) {
  transXArray = transXArray.concat(["translate-x-"+count, "translate-y-"+count])
}

// Now extend the theme to deal with these.
var trObj: any = {};
for (let count = 13; count < cssGridMaxTranslateX; count++) {
  var r = count/4.0;
  trObj[count.toString()] = r.toString() + 'rem'
}

const maxGridRows = 50;
var gridRowsArray: any[] = [];
for (let count = 1; count <= maxGridRows; count++) {
  gridRowsArray = gridRowsArray.concat(["grid-rows-[repeat(" + count.toString() + ",300px)]"])
}

// Widescreen monitor = 4 cols.  Normal monitor = 3. Tablet = 2. Phone = 1
const maxGridCols = 4;
var gridColsArray: any[] = [];
for (let count = 1; count <= maxGridCols; count++) {
  gridColsArray = gridColsArray.concat(["grid-cols-[repeat(" + count.toString() + ",300px)]"])
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
    "col-span-4",
    "col-span-6",
    "col-span-10",
    "row-span-2",
    "row-span-3",
    "row-span-4",
    ...safeColors,
    ...transXArray,
    ...gridRowsArray,
    ...gridColsArray,
    "z-100",
    "grid-cols-[repeat(1,30px)]",
    "grid-cols-[repeat(3,30px)]",
    "grid-cols-[repeat(6,30px)]",
    "grid-cols-[repeat(10,30px)]",
    "grid-rows-[repeat(1,30px)]",
    "grid-rows-[repeat(3,30px)]",
    "grid-rows-[repeat(4,30px)]",
    "grid-rows-[repeat(10,30px)]"
  ],
  theme: {
    extend: {
      translate: trObj
    },
  },

  /*  plugins: [‘react-css-modules’] */
  plugins: [require("tailwindcss-animate")],
};