"use client";

import { useState, useEffect } from "react";
import { CssGridElement } from "./cssgrid-element.tsx";
import { computeNumRowsNeeded, moveElement } from "./cssgrid-lib.ts";
import { computeCssGridModalWidthPx, CssGridModal } from "./cssgrid-modal.tsx";
import {
  CssGridElInfo,
  CssGridStatus,
  CssGridModalInfo,
} from "./cssgrid-types.ts";

// Maximum number of rows we allow for a grid element, regardless of
// max number of colums set (numCols).
export const maxCssGridElemRows = 4;

export function CssGrid({
  getImageFileName,
  gridContents,
}: {
  getImageFileName: any;
  gridContents: CssGridElInfo[];
}) {
  const initialWidth: number =
    typeof window !== "undefined" ? window.innerWidth : 768;

  const [numCols, setNumCols]: [number, any] = useState(
    initialWidth <= 768 ? 2 : initialWidth <= 1280 ? 3 : 4
  );

  console.log("CssGrid: Initially numCols is %d", numCols);

  function detectWindowSize() {
    let newNumCols: number =
      window.innerWidth <= 768 ? 2 : window.innerWidth <= 1280 ? 3 : 4;
    console.log(
      "CssGrid: innerWidth is %d   numCols is %d",
      window.innerWidth,
      newNumCols
    );
    setNumCols(newNumCols);
  }

  useEffect(() => {
    window.addEventListener("resize", detectWindowSize);
    detectWindowSize();
    return () => {
      window.removeEventListener("resize", detectWindowSize);
    };
  }, []);

  /* Create a local copy in which we bound the size of any element to
   the max number of rows and columns selected for the current window size. */
  let localGridInfo = gridContents.map((info: any) => {
    return {
      ID: info.name,
      cols: +info.cols > numCols ? numCols : +info.cols,
      rows: +info.cols > numCols && +info.rows > numCols ? numCols : +info.rows,
      comment: info.comment,
    };
  });
  const [gridInfo, setGridInfo] = useState(localGridInfo);

  // Status info used by the modal (move, resize etc)
  const [rightClicked, setRightClicked] = useState<CssGridModalInfo>({
    elemID: "None",
    x: 0,
    y: 0,
    cols: 0,
    rows: 0,
  });

  // Info used when reOrdering images via DnD
  const [dragSrcElemID, setdragSrcElemID] = useState<string>("");
  const [dragDstElemID, setdragDstElemID] = useState<string>("");
  const [status, setStatus] = useState<CssGridStatus>("noneSelected");
  const cssGridModalWidthPx = computeCssGridModalWidthPx(numCols);

  // Event handling. Events cause status to be set, so we process them here.
  if (status === "resizeElement") {
    console.log(
      "RESIZE IMAGE: image %s  cols:%d  rows:%d",
      rightClicked.elemID,
      rightClicked.cols,
      rightClicked.rows
    );
    let newGridInfo = gridInfo.map((element: CssGridElInfo) => {
      if (element.ID === rightClicked.elemID)
        return {
          ...element,
          cols: rightClicked.cols > numCols ? numCols : rightClicked.cols,
          rows: rightClicked.rows,
        };
      else return element;
    });
    setGridInfo(newGridInfo);
    setStatus("noneSelected");
  }

  if (status === "moveElement") {
    let newGridInfo = moveElement(dragSrcElemID, dragDstElemID, gridInfo);
    setGridInfo(newGridInfo);
    setStatus("noneSelected");
    setdragSrcElemID("");
  }

  let numRows = computeNumRowsNeeded(gridInfo, numCols);
  let gridClass =
    "grid grid-cols-[repeat(" +
    numCols.toString() +
    ",minmax(100px,1fr))] grid-rows-[repeat(" +
    numRows.toString() +
    ",minmax(300px,1fr))] gap-1";

  let windowWidth = 1024;
  let windowHeight = 1024;
  if (typeof window !== "undefined") {
    if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    } else {
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    }
  }

  const gridElements = gridInfo.map((element: CssGridElInfo) => (
    <CssGridElement
      key={element.ID}
      element={element}
      getImageFileName={getImageFileName}
      status={status}
      setStatus={setStatus}
      dragSrcElemID={dragSrcElemID}
      setdragSrcElemID={setdragSrcElemID}
      setdragDstElemID={setdragDstElemID}
      rightClicked={rightClicked}
      setRightClicked={setRightClicked}
      windowWidth={windowWidth}
      windowHeight={windowHeight}
      cssGridModalWidthPx={cssGridModalWidthPx}
    />
  ));

  return (
    <div className={gridClass}>
      {gridElements}
      {status === "modalActive" && (
        <CssGridModal
          rightClicked={rightClicked}
          setRightClicked={setRightClicked}
          setStatus={setStatus}
          numCols={numCols}
          onModalClose={() =>
            status === "modalActive" ? setStatus("noneSelected") : {}
          }
        />
      )}
    </div>
  );
}
