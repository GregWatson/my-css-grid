"use client";

// Misc functions used by CssGrid 

/* Compute the number of rows needed to display the images
   assuming no back-filling for smaller images. Might need fewer
   rows than computed but that's OK.
*/
export function computeNumRowsNeeded(gridContents, numCols) {
  let numRows = 0; // Running total in grid
  let numRowsUsed = 1; // In this row
  let colsLeft = numCols;

  gridContents.forEach((image) => {
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

/* move srcImage to immediately before dstImage in the list of 
   grid Elements. Return the new list.
 */
export function moveElement(srcImageID, dstImageID, gridInfo) {
    // get the src image object
    let srcObj;
    gridInfo.forEach((image) => {
      if (image.name === srcImageID) srcObj = image;
    });
    // create new list
    let newGridInfo = [];
    gridInfo.forEach((image) => {
      if (image.name === dstImageID) {
        newGridInfo.push(srcObj); newGridInfo.push(image)
      } else 
        if (image.name !== srcImageID) newGridInfo.push(image) 
    });
    return(newGridInfo)
}