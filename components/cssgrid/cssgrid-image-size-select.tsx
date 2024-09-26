"use client";

import { maxCssGridElemRows } from "./cssgrid.tsx";
import { CssGridModalInfo } from "./cssgrid-types.ts";

function sFib(num: number) {
  var rval = 1;
  if (num < 2) return num;
  for (var i = 2; i <= num; i++) rval = rval + i;
  return rval;
}

function getSizeArray(numCols: number) {
  let sizes: any[] = []; // Text line
  for (let rowIndex = 1; rowIndex <= maxCssGridElemRows; rowIndex++) {
    for (let colIndex = 1; colIndex <= numCols; colIndex++) {
      sizes = sizes.concat([[colIndex, rowIndex]]);
    }
  }
  return sizes;
}

export function CssGridImageSizeSelect({
  rightClicked,
  setRightClicked,
  setStatus,
  numCols,
}: {
  rightClicked: CssGridModalInfo;
  setRightClicked: any;
  setStatus: any;
  numCols: number;
}) {
  const totCols = sFib(numCols);
  const totRows = sFib(maxCssGridElemRows);
  let sizes = getSizeArray(numCols);

  console.log(
    "CssGridImageSizeSelect: elemCols:%d  elemRows:%d",
    rightClicked.elemCols,
    rightClicked.elemRows
  );

  const divSizes = sizes.map((size, index) => {
    index = index + 1;
    let nCols: number = size[0];
    let nRows: number = size[1];
    let elemID = rightClicked.elemID;
    let isCurrentSize: boolean =
      nCols == rightClicked.elemCols && nRows == rightClicked.elemRows;
    let cl = "rounded-lg border-2 ";
    if (isCurrentSize) {
      cl = cl + "border-slate-200 bg-slate-300";
    } else {
      cl =
        cl +
        "border-slate-400 bg-sky-500 hover:border-4 hover:border-slate-800";
    }
    cl = cl + " col-span-" + nCols + " row-span-" + nRows + " relative";
    return (
      <div
        key={index}
        className={cl}
        onClick={(e) => {
          e.stopPropagation();
          console.log(
            "Resize: Image '%s' to %d cols by %d rows.",
            elemID,
            nCols,
            nRows
          );
          setRightClicked({
            ...rightClicked,
            cols: nCols.toString(),
            rows: nRows.toString(),
          });
          if (nCols === totCols) setStatus("noneSelected");
          else setStatus("resizeElement");
        }}
      />
    );
  });

  let gridClass =
    "grid rounded " +
    "grid-cols-[repeat(" +
    totCols.toString() +
    ",30px)] " +
    "grid-rows-[repeat(" +
    totRows.toString() +
    ",30px)] " +
    "gap-1 z-30  max-w-min";

  return (
    <div className="rounded-lg max-w-min border-sky-800 ">
      <div className=" rounded-lg bg-sky-200 text-center  z-30 min-w-full max-w-min">
        Resize Image
      </div>
      <div
        className={gridClass}
        onClick={(e) => {
          e.stopPropagation();
          console.log("ImageSizeSelect Grid is processing the click event.");
          setStatus("noneSelected");
        }}
      >
        {divSizes}
      </div>
    </div>
  );
}
