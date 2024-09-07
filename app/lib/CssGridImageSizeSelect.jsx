"use client";

function sFib(num)
{
    var rval=1;
    if (num < 2) 
      return num;
    for (var i = 2; i <= num; i++)
        rval = rval + i;
    return rval;
}


function getSizeArray(numCols) {
  let totCols = sFib(numCols)
  let sizes = [ [totCols, 1] ]; // Text line
  for (let rowIndex = 1; rowIndex <= numCols; rowIndex++) {
    for (let colIndex = 1; colIndex <= numCols; colIndex++) {
      sizes = sizes.concat([[colIndex, rowIndex]])
    }
  }
  return sizes
}

export function CssGridImageSizeSelect({
  rightClicked,
  setRightClicked,
  setStatus,
  numCols
}) {
  const totCols = sFib(numCols)
  const totRows = totCols + 1
  let sizes = getSizeArray(numCols)

  console.log("GridImageSizeSelect numCols is %d   totCols is %d   Sizes has len %d", numCols, totCols, sizes.length);

  const divSizes = sizes.map((size, index) => {
    index=index+1;
    let nCols = size[0];
    let nRows = size[1];
    let imageID = rightClicked.imageID;
    let cl =
      "rounded-lg border-2 border-slate-400 bg-sky-500 hover:border-4 hover:border-slate-800";
    if (nCols === totCols) {
      cl = "bg-sky-200 text-center";
    }
    cl = cl + " col-span-" + nCols + " row-span-" + nRows + " relative";
    return (
      <div
        key={index}
        className={cl}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Resize: Image '%s' to %d cols by %d rows.", imageID, nCols, nRows );
          setRightClicked({...rightClicked, cols:nCols.toString(), rows:nRows.toString()});
          if (nCols === totCols) setStatus('noneSelected')
          else setStatus('resizeImage')
        }}
      >
        {nCols === totCols ? "Resize Image" : null}
      </div>
    );
  });

  let gridClass =
    "p-1 border-2 border-sky-800 grid rounded " +
    "grid-cols-[repeat(" + totCols.toString() + ",30px)] " +
    "grid-rows-[repeat(" + totRows.toString() + ",30px)] " +
    "gap-1 z-30 max-w-min";

  return (
    <div
      className={gridClass}
      onClick={(e) => {
        e.stopPropagation();
        console.log("ImageSizeSelect Grid is processing the click event.");
        setStatus("noneSelected")
    }}>
      {divSizes}
    </div>
  );
}
