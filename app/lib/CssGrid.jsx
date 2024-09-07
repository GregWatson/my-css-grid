"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { CssGridImageSizeSelect } from "./CssGridImageSizeSelect.jsx"
import { cssGridElement } from "./CssGridElement.jsx"

/* Compute the number of rows needed to display the images
   assuming no back-filling for smaller images. Might need fewer
   rows than computed but that's OK.
*/
function computeNumRowsNeeded(imageList, numCols) {
  let numRows = 0; // Running total in grid
  let numRowsUsed = 1; // In this row
  let colsLeft = numCols;

  imageList.forEach((image) => {
    let i_rows = +image.rows;
    let i_cols = +image.cols;
    if (i_cols > colsLeft) { // cannot add to current row.
      numRows = numRows + numRowsUsed;
      colsLeft = numCols - i_cols;
      numRowsUsed = i_rows;
    } else {
      colsLeft = colsLeft - i_cols;
      if (i_rows > numRowsUsed) numRowsUsed = i_rows;
      if (colsLeft === 0) {
        numRows = numRows + numRowsUsed;
        colsLeft = numCols;
        numRowsUsed = 1;
      }
    }
  });
  if (colsLeft !== numCols) numRows = numRows + numRowsUsed;
  // console.log("Info: Used %d rows.", numRows);
  return numRows;
}

/* numCols is the fixed number of columns in the grid. 
   Use 4 for a wide display and 1 for a narrow dispaly (e.g. phone)?
*/
export function CssGrid({getImageFileName, image_names, numCols}) {
  const gridImageSize = "300"; // px. Need to update in tailwind.config.ts as well.
  const [imageInfo, setImageInfo] = useState(image_names);
  const [rightClicked, setRightClicked] = useState({
    imageID: "No Image",
    x: 0,
    y: 0,
    cols: 0,
    rows: 0
  });

  // dragInfo used when reOrdering images via DnD
  const [dragSrcImageID, setDragSrcImageID ] = useState("");

  // const statusVals = ['noneSelected', 'modalActiveOnImage', 'resizeImage', 'isDragging'];
  const [status, setStatus] = useState('noneSelected');

  if (status === "resizeImage") {
    console.log("RESIZE IMAGE: image %s  cols:%d  rows:%d", rightClicked.imageID, rightClicked.cols, rightClicked.rows);
    let newImageInfo = imageInfo.map((image) => {
      if (image.name === rightClicked.imageID) 
        return {...image,
          cols:rightClicked.cols,
          rows:rightClicked.rows
        }
      else return image
    })
    setImageInfo(newImageInfo)
    setStatus('noneSelected')
  }

  function ModalContent( ) {
    let cl="z-20 w-min p-1 space-y-1 bg-sky-200 relative translate-x-" + rightClicked.x + " translate-y-" + rightClicked.y;
    return ( 
      <div className={cl}>
        <button className="min-w-full p-1 rounded bg-sky-500 text-center  border-2 border-sky-800 "
        onClick = {(e) => {
          console.log("Move Button was clicked"); 
          setStatus("isDragging")}
          }
        >
          Move Image
        </button>
        <CssGridImageSizeSelect  
                          rightClicked={rightClicked} 
                          setRightClicked={setRightClicked} 
                          setStatus={setStatus}
                          numCols={numCols}
        />
      </div> )
  }

  // move srcImage to immediately before dstImage in the list
  function moveImage(srcImageID, dstImageID) {
    // get the src image object
    let srcObj;
    imageInfo.forEach((image) => {
      if (image.name === srcImageID) srcObj = image;
    });
    // create new list
    let newImageInfo = [];
    imageInfo.forEach((image) => {
      if (image.name === dstImageID) {
        newImageInfo.push(srcObj); newImageInfo.push(image)
      } else 
        if (image.name !== srcImageID) newImageInfo.push(image) 

    });
    setImageInfo(newImageInfo)
  }


  let numRows = computeNumRowsNeeded(imageInfo, numCols);
  let gridClass =
    "grid grid-cols-[repeat(" + numCols.toString() + "," + gridImageSize + "px)] grid-rows-[repeat(" + numRows.toString() + "," + gridImageSize + "px)] gap-1";

  const gridElements = imageInfo.map(image => 
    cssGridElement(
      image, 
      getImageFileName,
      status, 
      setStatus,
      dragSrcImageID,
      setDragSrcImageID,
      rightClicked, 
      setRightClicked,
      moveImage
    ))

  return (
    <div className={gridClass}>
      { gridElements }
      { status === "modalActiveOnImage" &&
        createPortal(
          <ModalContent onClose={() => (status === "modalActiveOnImage") ? setStatus('noneSelected') : {} } />,
          document.getElementById(rightClicked.imageID)
      )}
    </div>
  );
}

