"use client";

import { useState } from "react";

export function ImageSizeSelect({
  rightClicked,
  setRightClicked,
  setStatus
}) {
  // possible image sizes in [columns, rows]
  const sizes = [
    [6, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ];

  const divSizes = sizes.map((size, index) => {
    index=index+1;
    let numCols = size[0];
    let numRows = size[1];
    let imageID = rightClicked.imageID;
    let cl =
      "rounded-lg border-2 border-slate-400 bg-sky-500 hover:border-4 hover:border-slate-800";
    if (numCols === 6) {
      cl = "bg-sky-200 text-center";
    }
    cl = cl + " col-span-" + numCols + " row-span-" + numRows + " relative";
    return (
      <div
        key={index}
        class={cl}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Resize: Image '%s' to %d cols by %d rows.", imageID, numCols, numRows );
          setRightClicked({...rightClicked, cols:numCols.toString(), rows:numRows.toString()});
          if (numCols === 6) setStatus('noneSelected')
          else setStatus('resizeImage')
        }}
      >
        {numCols === 6 ? "Resize Image" : null}
      </div>
    );
  });

  let gridClass =
    "p-1 border-2 border-sky-800 grid rounded grid-cols-[repeat(6,30px)] grid-rows-[repeat(7,30px)] " +
    "gap-1 z-30 max-w-min";

  return (
    <div
      class={gridClass}
      onClick={(e) => {
        e.stopPropagation();
        console.log("ImageSizeSelect Grid is processing the click event.");
        setStatus("noneSelected")
    }}>
      {divSizes}
    </div>
  );
}
