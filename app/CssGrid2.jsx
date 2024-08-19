"use client";

import { getFilename, image_names, menuData } from "./data.jsx";
import { useState } from "react";
import { createPortal } from "react-dom";
import { maxTranslate } from "../tailwind.config";

/* Compute the number of rows needed to display the images
   assuming no back-filling for smaller images. Might need fewer
   but that's OK.
*/
function computeNumRowsNeeded(imageList) {
  let numRows = 0; // Running total in grid
  let numRowsUsed = 1; // In this row
  let numCols = 3; // Num columns in the grid
  let colsLeft = numCols;

  imageList.forEach((image) => {
    let i_rows = +image.rows;
    let i_cols = +image.cols;
    if (i_cols > colsLeft) {
      numRows = numRows + numRowsUsed;
      colsLeft = numCols;
      numRowsUsed = 1;
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
  console.log("Info: Used %d rows.", numRows);
  return numRows;
}


export function CssGrid2() {
  const [imageInfo, setImageInfo] = useState(image_names);
  const [rightClicked, setRightClicked] = useState({
    clicked: false,
    imageID: "No Image",
    x: 0,
    y: 0,
  });
  
  function ModalContent({ onClose }) {
    let cl = "max-w-sm rounded-lg border-2 border-black shadow-lg top-0 left-0 bg-red-200 z-[100]";
    cl = cl + " relative translate-x-" + rightClicked.x + " translate-y-" + rightClicked.y;
    // let cl = "flex items-center relative top-0 left-0 bg-red-200 translate-x-20 translate-y-10"
    return (
      <div class={cl}>
        <div>
          <p> X = {rightClicked.x} Y = {rightClicked.y}</p>
        </div>
      </div>
    );
  }

  function setClicked(val) {
    setRightClicked({ ...rightClicked, clicked: val });
  }

  function handleClick(imageID) {
    console.log("Clicked on image %s", imageID);
    return <p>Hi there</p>;
  }

  function handleMouseLeave(imageID) {
    const nextImageInfo = imageInfo.map((image) => {
      if (image.name === imageID) {
        image.hover = false;
      }
      return image;
    });
    setImageInfo(nextImageInfo);
    console.log("Exited %s", imageID);
  }

  const divImages = imageInfo.map((image) => {
    let cl =
      "rounded-lg border-2 border-slate-500 hover:border-4 hover:border-slate-800";
    cl =
      cl + " col-span-" + image.cols + " row-span-" + image.rows + " relative";

    return (
      <div
        id={image.name}
        key={image.name}
        class={cl}
        onContextMenu={(e) => {
          e.preventDefault(); // prevent the default behaviour when right clicked
          let X = Math.round((e.pageX - e.currentTarget.offsetLeft) / 4);
          let Y = Math.round((e.pageY - e.currentTarget.offsetTop) / 4);
          if (X > maxTranslate) { X = maxTranslate-1}
          if (Y > maxTranslate) { Y = maxTranslate-1}
          setRightClicked({
            clicked: true,
            imageID: image.name,
            x: X,
            y: Y
          });
          console.log(
            "click:  image %s  (%d,%d)",
            image.name,
            X,
            Y
          );
        }}
      >
        <img
          class="bg-cover absolute top-0"
          src={getFilename(image.name)}
          alt={"photo of a " + image.name}
        />
        <div class="absolute bottom-0 opacity-70 bg-slate-300 min-w-full">
          {image.comment}
        </div>
        {image.hover ? (
          <div class="absolute top-1 left-1 rounded indent-2  bg-black text-white ">
            <div class="font-bold">Editing options</div>
            <ul>
              <li>Click and hold mouse to move image.</li>
              <li>Right click image to resize.</li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  });

  let numRows = computeNumRowsNeeded(imageInfo);
  let gridClass =
    "grid grid-cols-[repeat(3,300px)] grid-rows-[repeat(5,_300px)] gap-1";

  return (
    <div class={gridClass} id="imgGrid">
      {divImages}
      {rightClicked.clicked &&
        createPortal(
          <ModalContent onClose={() => setClicked(false)} />,
          document.getElementById(rightClicked.imageID)
        )}
    </div>
  );
}

//             <div  class='absolute bg-red-200 translate-x-[var(--mouse-x)] translate-y-[var(--mouse-y)]' >
