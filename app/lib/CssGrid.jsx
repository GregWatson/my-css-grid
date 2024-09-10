"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { cssGridElement } from "./CssGridElement.jsx"
import { computeNumRowsNeeded, moveElement } from "./CssGridLib.jsx"
import { CssGridModal } from "./CssGridModal.jsx"

// Maximum number of rows we allow for a grid element, regardless of
// max number of colums set (numCols).
export const maxCssGridElemRows = 4;

/* numCols is the fixed number of columns in the grid. 
   Use 4 for a wide display and 1 for a narrow display (e.g. phone)?
   Values 1-4 are supported.
*/
export function CssGrid({getImageFileName, gridContents, numCols}) {
  const gridImageSize = "300"; // px. Need to update in tailwind.config.ts as well.
  /* Create a local copy in which we bound the size of any element to
   the max number of rows and columns selected for the current window size. */
  let localGridInfo = gridContents.map((info) => {
    return {...info,
      cols: info.cols > numCols ? numCols : info.cols,
      rows: (info.cols > numCols) && (info.rows > numCols) ? numCols : info.rows
    }
  })
  const [gridInfo, setGridInfo] = useState(localGridInfo);

  // Status info used by the modal (move, resize etc)
  const [rightClicked, setRightClicked] = useState({
    elemID: "None",
    x: 0,
    y: 0,
    cols: 0,
    rows: 0
  });

  // Info used when reOrdering images via DnD
  const [dragSrcElemID, setdragSrcElemID ] = useState("");
  const [dragDstElemID, setdragDstElemID ] = useState("");

  // const statusVals = ['noneSelected', 'modalActive', 'resizeElement', 'isDragging', 'moveElement'];
  const [status, setStatus] = useState('noneSelected');

  // Event handling. Events cause status to be set, so we process them here.
  if (status === "resizeElement") {
    console.log("RESIZE IMAGE: image %s  cols:%d  rows:%d", rightClicked.elemID, rightClicked.cols, rightClicked.rows);
    let newGridInfo = gridInfo.map((element) => {
      if (element.name === rightClicked.elemID) 
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
    "grid grid-cols-[repeat(" + numCols.toString() + "," + gridImageSize + "px)] grid-rows-[repeat(" + numRows.toString() + "," + gridImageSize + "px)] gap-1";

  const gridElements = gridInfo.map(element => 
    cssGridElement(
      element, 
      getImageFileName,
      status, 
      setStatus,
      dragSrcElemID,
      setdragSrcElemID,
      setdragDstElemID,
      rightClicked, 
      setRightClicked
    ))

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
            onClose={() => (status === "modalActive") ? setStatus('noneSelected') : {} } 
            />,
          document.getElementById(rightClicked.elemID)
      )}
    </div>
  );
}

