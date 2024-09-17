"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { CssGridElement } from "./cssgrid-element.tsx"
import { computeNumRowsNeeded, moveElement } from "./cssgrid-lib.ts"
import { CssGridModal } from "./cssgrid-modal.tsx"
import { CssGridElInfo, CssGridStatus, CssGridModalInfo } from "./cssgrid-types.ts"

// Maximum number of rows we allow for a grid element, regardless of
// max number of colums set (numCols).
export const maxCssGridElemRows = 4;

/* numCols is the fixed number of columns in the grid. 
   Use 4 for a wide display and 1 for a narrow display (e.g. phone)?
   Values 1-4 are supported.
*/
export function CssGrid({getImageFileName, gridContents, numCols}:
  {getImageFileName:any, gridContents:any, numCols:any}
) {
  /* Create a local copy in which we bound the size of any element to
   the max number of rows and columns selected for the current window size. */
  let localGridInfo = gridContents.map((info:any) => {
    return {
      ID: info.name,
      cols: +info.cols > numCols ? numCols : +info.cols,
      rows: (+info.cols > numCols) && (+info.rows > numCols) ? numCols : +info.rows,
      comment: info.comment
    }
  })
  const [gridInfo, setGridInfo] = useState(localGridInfo);

  // Status info used by the modal (move, resize etc)
  const [rightClicked, setRightClicked] = useState<CssGridModalInfo>({
    elemID: "None",
    x: 0,
    y: 0,
    cols: 0,
    rows: 0
  });

  // Info used when reOrdering images via DnD
  const [dragSrcElemID, setdragSrcElemID ] = useState<string>("");
  const [dragDstElemID, setdragDstElemID ] = useState<string>("");

  const [status, setStatus] = useState<CssGridStatus>('noneSelected');

  // Event handling. Events cause status to be set, so we process them here.
  if (status === "resizeElement") {
    console.log("RESIZE IMAGE: image %s  cols:%d  rows:%d", rightClicked.elemID, rightClicked.cols, rightClicked.rows);
    let newGridInfo = gridInfo.map((element:CssGridElInfo) => {
      if (element.ID === rightClicked.elemID) 
        return {...element,
          cols:rightClicked.cols,
          rows:rightClicked.rows
        }
      else return element
    })
    setGridInfo(newGridInfo)
    setStatus('noneSelected')
  }

  if (status === "moveElement") {
    let newGridInfo = moveElement(dragSrcElemID, dragDstElemID, gridInfo);
    setGridInfo(newGridInfo);
    setStatus('noneSelected');
    setdragSrcElemID('');
  }

  let numRows = computeNumRowsNeeded(gridInfo, numCols);
  let gridClass =
    "grid grid-cols-[repeat(" + numCols.toString() + ",minmax(100px,1fr))] grid-rows-[repeat(" + numRows.toString() + ",minmax(300px,1fr))] gap-1";

  const gridElements = gridInfo.map((element:CssGridElInfo) => 
    <CssGridElement
      key = {element.ID}
      element = {element} 
      getImageFileName = {getImageFileName}
      status = {status}
      setStatus = {setStatus}
      dragSrcElemID = {dragSrcElemID}
      setdragSrcElemID = {setdragSrcElemID}
      setdragDstElemID = {setdragDstElemID}
      rightClicked = {rightClicked}
      setRightClicked = {setRightClicked}
     /> )

  return (
    <div className={gridClass}>
      { gridElements }
      { status === "modalActive" &&
        createPortal(
          <CssGridModal 
            rightClicked={rightClicked}
            setRightClicked={setRightClicked}
            setStatus={setStatus}
            numCols={numCols}
            onModalClose={() => (status === "modalActive") ? setStatus('noneSelected') : {} } 
            />,
          document.getElementById(rightClicked.elemID)
      )}
    </div>
  );
}

