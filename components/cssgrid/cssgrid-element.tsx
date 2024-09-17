"use client";

import { cssGridMaxTranslateX } from "@/tailwind.config";
import { handleOnDragEnd, handleOnDrop } from "./cssgrid-lib.ts";
import { CssGridElInfo, CssGridStatus, CssGridModalInfo } from "./cssgrid-types.ts"

export function CssGridElement({
  element,
  getImageFileName,
  status,
  setStatus,
  dragSrcElemID,
  setdragSrcElemID,
  setdragDstElemID,
  rightClicked,
  setRightClicked
}: {
  element: CssGridElInfo;
  getImageFileName: any;
  status: CssGridStatus;
  setStatus: any;
  dragSrcElemID: any;
  setdragSrcElemID: any;
  setdragDstElemID: any;
  rightClicked: CssGridModalInfo;
  setRightClicked: any;
}) {
  let cl =
    "rounded-lg border-2 border-slate-400 hover:border-4 hover:border-slate-800";
  cl =
    cl +
    " col-span-" +
    element.cols.toString() +
    " row-span-" +
    element.rows.toString() +
    " relative";

  // console.log("element %s had cols: %s and rows: %s", element.ID, element.cols, element.rows)

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
        let X = Math.round((e.pageX - e.currentTarget.offsetLeft) / 4);
        let Y = Math.round((e.pageY - e.currentTarget.offsetTop) / 4);
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
          });
          setStatus("modalActive");
        }
      }}
    >
      <img
        className={elementCL}
        src={getImageFileName(element.ID)}
        alt={"photo of a " + element.ID}
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
