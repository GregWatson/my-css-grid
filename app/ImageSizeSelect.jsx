"use client";

import { useState } from "react";

export function ImageSizeSelect({
  rightClicked,
  setRightClicked,
  setStatus,
  imageInfo,
  setImageInfo,
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
      "rounded-lg border-2 border-slate-400 bg-slate-200 hover:border-4 hover:border-slate-800";
    if (numCols === 6) {
      cl = "bg-slate-500 text-center";
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
          setStatus('resizeImage')
        }}
      >
        {numCols === 6 ? "Select Size (" + imageID + ")" : null}
      </div>
    );
  });

  let gridClass =
    "grid rounded grid-cols-[repeat(6,30px)] grid-rows-[repeat(7,30px)] " +
    "gap-1 z-30 max-w-min relative translate-x-" + 
    rightClicked.x + " translate-y-" + rightClicked.y;

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
