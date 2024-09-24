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
      className={`${cn} min-h-48 bg-blue-300 flex justify-center items-center border-2 border-slate-400`}
    >
      {name}
      {`${colspan}x${rowspan}`}
    </div>
  );
}

function CssGrid2() {
  return (
    <div>
      <h1 className="text-3xl text-center w-full bg-slate-200">CssGrid2</h1>
      <div className="grid grid-cols-6 grid-rows-[repeat(20,minmax(100px,1fr))] gap-4 w-full">
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
    </div>
  );
}
export default CssGrid2;
