"use client";

import { CssGridElInfo, CssGridStatus } from "./cssgrid-types.ts"

/* Compute the number of rows needed to display the images
   assuming no back-filling for smaller images. Might need fewer
   rows than computed but that's OK.
*/
export function computeNumRowsNeeded(gridContents:any, numCols:number) {
  let numRows = 0; // Running total in grid
  let numRowsUsed = 1; // In this row
  let colsLeft = numCols;

  gridContents.forEach((element:CssGridElInfo) => {
    let i_rows = element.rows;
    let i_cols = element.cols;
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
export function moveElement(srcElemID:string, dstElemID:string, gridInfo:CssGridElInfo[]) :CssGridElInfo[] {
    // get the src image object
    let srcObj:CssGridElInfo;
    gridInfo.forEach((element:CssGridElInfo) => {
      if (element.ID === srcElemID) srcObj = element;
    });
    // create new list
    let newGridInfo :CssGridElInfo[] = [];
    gridInfo.forEach((element:CssGridElInfo) => {
      if (element.ID === dstElemID) {
        newGridInfo.push(srcObj); newGridInfo.push(element)
      } else 
        if (element.ID !== srcElemID) newGridInfo.push(element) 
    });
    return newGridInfo
}

// drop (from Drag and Drop)
export function handleOnDrop(dstElemID:string, setdragDstElemID:any, dragSrcElemID:any, setStatus:any) {
  if ((dragSrcElemID === "") || (dstElemID === "")) {
    console.log("ERROR: tried to move (re-order) elements but either src or dst is missing");
  } else {
    console.log("INFO: Moving element %s before element %s", dragSrcElemID, dstElemID);
  }
  setdragDstElemID(dstElemID);
  setStatus('moveElement');
}

export function handleOnDragEnd(status:CssGridStatus, setStatus:any, dragSrcElemID:string, setdragSrcElemID:any) {
  if (status === "isDragging") {
    console.log("Drag cancelled %s", dragSrcElemID);
    setStatus('noneSelected');
    setdragSrcElemID('');
  }
}
