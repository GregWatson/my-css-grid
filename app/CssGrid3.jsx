/*
This version handles mouseover (highlights current image) and pops up some
help info if user hovers over an image for a second.
*/

import { getFilename, image_names } from './data.jsx';
import { useState } from 'react';

/* Compute the number of rows needed to display the images
   assuming no back-filling for smaller images
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
        }
        else {
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

  
  function handleMouseEnter(imageID) {
    const nextImageInfo = imageInfo.map(image => 
      {
        if (image.name === imageID) { image.hover = true }
        return image;
      } );
    setTimeout(() => {
      setImageInfo(nextImageInfo);
    }, 1000);
    console.log("Entered %s", imageID);
  }

  function handleMouseLeave(imageID) {
    const nextImageInfo = imageInfo.map(image => 
      {
        if (image.name === imageID) { image.hover = false }
        return image;
      } );
    setImageInfo(nextImageInfo);
    console.log("Exited %s", imageID);
  }

  const divImages = imageInfo.map(image => {
      let cl = "rounded-lg border-2 border-slate-500 hover:border-4 hover:border-slate-800";
      cl = cl + ' col-span-' + image.cols + ' row-span-' + image.rows + ' relative';

      return (
        <div key={image.name} class={cl}
            onMouseEnter={e => {e.stopPropagation(); handleMouseEnter(image.name)}}
            onMouseLeave={e => {e.stopPropagation(); handleMouseLeave(image.name)}} 
        >
          <img class="bg-cover absolute top-0" src={getFilename(image.name)} alt={"photo of a " + image.name} />
          <div class="absolute bottom-0 opacity-70 bg-slate-300 min-w-full">{image.comment}</div>
          {image.hover ? <div class="absolute top-1 left-1 rounded indent-2  bg-black text-white ">
            <div class="font-bold">Editing options</div>
            <ul><li>Click and hold mouse to move image.</li><li>Right click image to resize.</li></ul></div> 
            : null 
          }
        </div>
      )
  });
    
  let numRows = computeNumRowsNeeded(imageInfo); 
  let gridClass = "grid grid-cols-[repeat(3,300px)] grid-rows-[repeat(5,_300px)] gap-1"
  return (
    <div class={gridClass}>
      {divImages}
    </div>
  );
};
