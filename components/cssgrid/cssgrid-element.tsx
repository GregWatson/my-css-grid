"use client";

import { cssGridMaxTranslateX } from "@/tailwind.config";
import { handleOnDragEnd, handleOnDrop } from "./cssgrid-lib.ts";
import {
  CssGridElInfo,
  CssGridStatus,
  CssGridModalInfo,
} from "./cssgrid-types.ts";
import { cssGridModalHeightPx } from "./cssgrid-modal.tsx";

export function CssGridElement({
  element,
  status,
  setStatus,
  dragSrcElemID,
  setdragSrcElemID,
  setdragDstElemID,
  rightClicked,
  setRightClicked,
  windowWidth,
  windowHeight,
  cssGridModalWidthPx,
}: {
  element: CssGridElInfo;
  status: CssGridStatus;
  setStatus: any;
  dragSrcElemID: any;
  setdragSrcElemID: any;
  setdragDstElemID: any;
  rightClicked: CssGridModalInfo;
  setRightClicked: any;
  windowWidth: number;
  windowHeight: number;
  cssGridModalWidthPx: number;
}) {
  let cl =
    "rounded-lg border-2 border-slate-400 hover:border-4 hover:border-slate-800 min-w-52";
  cl =
    cl +
    " col-span-" +
    element.cols.toString() +
    " row-span-" +
    element.rows.toString() +
    " relative";

  let elementCL = "bg-cover absolute top-0 ";
  if (status === "isDragging") elementCL += "blur-sm";

  return (
    <div
      id={element.ID}
      key={element.ID}
      className={cl}
      onClick={() => {
        if (status === "modalActive" || status === "isDragging") {
          setStatus("noneSelected");
        }
      }}
      onContextMenu={(e) => {
        // User right clicks.
        e.preventDefault(); // prevent the default behaviour when right clicked.
        // Bring up modal at location of mouse click.
        // If too far right (offscreen) then move it left.
        let X = Math.round(e.clientX);
        if (X + cssGridModalWidthPx > windowWidth) {
          X = windowWidth - cssGridModalWidthPx;
        }
        X = X >> 2; // convert to quad pix unit
        let Y = Math.round(e.clientY);
        if (Y + cssGridModalHeightPx > windowHeight) {
          Y = windowHeight - cssGridModalHeightPx;
        }
        Y = Y >> 2; // convert to quad pix unit
        if (X > cssGridMaxTranslateX) {
          X = cssGridMaxTranslateX - 1;
        }
        if (Y > cssGridMaxTranslateX) {
          Y = cssGridMaxTranslateX - 1;
        }
        if (status === "noneSelected") {
          setRightClicked({
            ...rightClicked,
            elemID: element.ID,
            x: X,
            y: Y,
            elemCols: element.cols,
            elemRows: element.rows,
          });
          setStatus("modalActive");
        }
      }}
    >
      <img
        className={elementCL}
        src={element.url}
        alt={element.comment}
        onDragStart={(e) => {
          e.stopPropagation();
          console.log("Drag Start %s", element.ID);
          setdragSrcElemID(element.ID);
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }} // required
        onDrop={(e) => {
          e.stopPropagation();
          handleOnDrop(element.ID, setdragDstElemID, dragSrcElemID, setStatus);
        }}
        onDragEnd={(e) => {
          e.stopPropagation();
          handleOnDragEnd(status, setStatus, dragSrcElemID, setdragSrcElemID);
        }}
      />
      <div className="absolute bottom-0 opacity-70 bg-slate-300 min-w-full">
        {element.comment}
      </div>
    </div>
  );
}
