import { TemplateContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const TEST_DATA = [
  {
    name: "bird",
    colSpan: 2,
    rowSpan: 2,
  },
];

function GridItem({
  name,
  colspan,
  rowspan,
}: {
  name: string;
  colspan: number;
  rowspan: number;
}) {
  let cn: string = "";
  if (colspan === 1) {
    cn += " col-span-1";
  } else if (colspan === 2) {
    cn += " col-span-2";
  } else if (colspan === 3) {
    cn += " col-span-3";
  }
  if (rowspan === 1) {
    cn += " row-span-1";
  } else if (rowspan === 2) {
    cn += " row-span-2";
  } else if (rowspan === 3) {
    cn += " row-span-3";
  }
  return (
    <div
      className={`${cn} min-h-[40px] bg-blue-300 flex justify-center items-center border-2 border-slate-400`}
      style={{ gridRow: `span ${rowspan}`, gridColumn: `span ${colspan}` }}
    >
      {name}
      {`${colspan}x${rowspan}`}
    </div>
  );
}

// I think one key is the "grid-rows..." magic. If you calculate the number of rows you can do
// it like I did below.
function CssGrid2() {
  const rows = 20;
  return (
    <div>
      <h1 className="text-3xl text-center w-full bg-slate-200">CssGrid2</h1>
      <div
        className="grid grid-cols-6 gap-4 w-full"
        style={{ gridTemplateRows: `repeat(${rows},minmax(0px,1fr))` }}
      >
        <GridItem name="bird" colspan={2} rowspan={2} />
        <GridItem name="bird" colspan={2} rowspan={1} />
        <GridItem name="bird" colspan={1} rowspan={2} />
        <GridItem name="bird" colspan={1} rowspan={1} />
        <GridItem name="bird" colspan={1} rowspan={3} />
        <GridItem name="bird" colspan={2} rowspan={2} />
        <GridItem name="bird" colspan={2} rowspan={2} />
        <GridItem name="bird" colspan={2} rowspan={2} />
        <GridItem name="bird" colspan={4} rowspan={4} />
        <GridItem name="bird" colspan={3} rowspan={3} />
        <GridItem name="bird" colspan={3} rowspan={3} />
        <GridItem name="bird" colspan={3} rowspan={3} />
        <GridItem name="bird" colspan={3} rowspan={3} />
        <GridItem name="bird" colspan={1} rowspan={1} />
      </div>
      <p>End of grid</p>
    </div>
  );
}
export default CssGrid2;
