"use client";

import { getFilename, image_names, menuData } from "./data.jsx";
import { useState } from "react";
import { createPortal } from "react-dom";
import { maxTranslate } from "../tailwind.config";
import { ImageSizeSelect } from "./ImageSizeSelect.jsx"

/* Compute the number of rows needed to display the images
   assuming no back-filling for smaller images. Might need fewer
   rows than computed but that's OK.
*/
function computeNumRowsNeeded(imageList) {
  let numRows = 0; // Running total in grid
  let numRowsUsed = 1; // In this row
  let numCols = 3; // Num columns in the grid
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


export function CssGrid2() {
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
      <div class={cl}>
        <button class="min-w-full p-1 rounded bg-sky-500 text-center  border-2 border-sky-800 "
        onClick = {(e) => {
          console.log("Move Button was clicked"); 
          setStatus("isDragging")}
          }
        >
          Move Image
        </button>
        <ImageSizeSelect  rightClicked={rightClicked} 
                          setRightClicked={setRightClicked} 
                          setStatus={setStatus} 
                          imageInfo={imageInfo}
                          setImageInfo={setImageInfo}
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


  // drop 
  function handleOnDrop(dstImage) {
    if ((dragSrcImageID === "") | (dstImage === "")) {
      console.log("ERROR: tried to move (re-order) images but either src or dst is missing");
    } else {
      console.log("INFO: Moving image %s before image %s", dragSrcImageID, dstImage);
      moveImage(dragSrcImageID, dstImage);
    }
    setStatus('noneSelected');
    setDragSrcImageID('');
  }

  function handleOnDragEnd() {
    if (status === "isDragging") {
      console.log("Drag cancelled %s", dragSrcImageID);
      setStatus('noneSelected');
      setDragSrcImageID('');
    }
  }

  const divImages = imageInfo.map((image) => {
    let cl =
      "rounded-lg border-2 border-slate-400 hover:border-4 hover:border-slate-800";
    cl =
      cl + " col-span-" + image.cols + " row-span-" + image.rows + " relative";

    // console.log("Image %s had cols: %s and rows: %s", image.name, image.cols, image.rows)

    let imageCL = "bg-cover absolute top-0 ";
    if (status === "isDragging") imageCL += "blur-sm";

    return (
      <div
        id={image.name}
        key={image.name}
        class={cl}
        onClick = {() => {
          if ((status === 'modalActiveOnImage') | (status === "isDragging")) {
            setStatus("noneSelected")
          }}
        }
        onContextMenu={(e) => {
          e.preventDefault(); // prevent the default behaviour when right clicked
          let X = Math.round((e.pageX - e.currentTarget.offsetLeft) / 4);
          let Y = Math.round((e.pageY - e.currentTarget.offsetTop) / 4);
          if (X > maxTranslate) { X = maxTranslate-1}
          if (Y > maxTranslate) { Y = maxTranslate-1}
          if (status === "noneSelected") {
            setRightClicked({
              ...rightClicked,
              imageID: image.name,
              x: X,
              y: Y
            });
            setStatus('modalActiveOnImage')
          }
        }}
      >
        <img
          class={imageCL}
          src={getFilename(image.name)}
          alt={"photo of a " + image.name}
          onDragStart= {(e) => { e.stopPropagation(); console.log("Drag Start %s", image.name); setDragSrcImageID(image.name) }}
          onDragOver = {(e) => { e.stopPropagation(); e.preventDefault() }} // required
          onDrop     = {(e) => { e.stopPropagation(); handleOnDrop(image.name) }}
          onDragEnd  = {(e) => { e.stopPropagation(); handleOnDragEnd() }}
          />
        <div class="absolute bottom-0 opacity-70 bg-slate-300 min-w-full">
          {image.comment}
        </div>
      </div>
    );
  });

  let numRows = computeNumRowsNeeded(imageInfo);
  let gridClass =
    "grid grid-cols-[repeat(3," + gridImageSize + "px)] grid-rows-[repeat(" + numRows.toString() + ",_" + gridImageSize + "px)] gap-1";

  return (
    <div class={gridClass}>
      {divImages}
      {status === "modalActiveOnImage" &&
        createPortal(
          <ModalContent onClose={() => (status === "modalActiveOnImage") ? setStatus('noneSelected') : {} } />,
          document.getElementById(rightClicked.imageID)
      )}
    </div>
  );
}

