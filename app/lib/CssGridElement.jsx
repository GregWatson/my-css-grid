"use client";

import { maxTranslate } from "@/tailwind.config";

// drop (from Drag and Drop)
function handleOnDrop(dstElemID, setdragDstElemID, dragSrcElemID, setStatus) {
  if ((dragSrcElemID === "") | (dstElemID === "")) {
    console.log("ERROR: tried to move (re-order) elements but either src or dst is missing");
  } else {
    console.log("INFO: Moving element %s before element %s", dragSrcElemID, dstElemID);
  }
  setdragDstElemID(dstElemID);
  setStatus('moveElement');
}

function handleOnDragEnd(status, setStatus, dragSrcElemID, setdragSrcElemID) {
  if (status === "isDragging") {
    console.log("Drag cancelled %s", dragSrcElemID);
    setStatus('noneSelected');
    setdragSrcElemID('');
  }
}

export function cssGridElement( element, getImageFileName, status, setStatus, 
                                dragSrcElemID, setdragSrcElemID,
                                setdragDstElemID, 
                                rightClicked, setRightClicked ) {
  let cl =
    "rounded-lg border-2 border-slate-400 hover:border-4 hover:border-slate-800";
  cl =
    cl + " col-span-" + element.cols + " row-span-" + element.rows + " relative";

  // console.log("element %s had cols: %s and rows: %s", element.name, element.cols, element.rows)

  let elementCL = "bg-cover absolute top-0 ";
  if (status === "isDragging") elementCL += "blur-sm";

  return (
    <div
      id={element.name}
      key={element.name}
      className={cl}
      onClick = {() => {
        if ((status === 'modalActive') | (status === "isDragging")) {
          setStatus("noneSelected")
        }}
      }
      onContextMenu={(e) => { // User right clicks.
        e.preventDefault(); // prevent the default behaviour when right clicked.
        // Bring up modal at location of mouse click.
        let X = Math.round((e.pageX - e.currentTarget.offsetLeft) / 4);
        let Y = Math.round((e.pageY - e.currentTarget.offsetTop) / 4);
        if (X > maxTranslate) { X = maxTranslate-1}
        if (Y > maxTranslate) { Y = maxTranslate-1}
        if (status === "noneSelected") {
          setRightClicked({
            ...rightClicked,
            elemID: element.name,
            x: X,
            y: Y
          });
          setStatus('modalActive')
        }
      }}
    >
      <img
        className={elementCL}
        src={getImageFileName(element.name)}
        alt={"photo of a " + element.name}
        onDragStart= {(e) => { e.stopPropagation(); console.log("Drag Start %s", element.name); setdragSrcElemID(element.name) }}
        onDragOver = {(e) => { e.stopPropagation(); e.preventDefault() }} // required
        onDrop     = {(e) => { e.stopPropagation(); handleOnDrop(element.name, setdragDstElemID, dragSrcElemID, setStatus) }}
        onDragEnd  = {(e) => { e.stopPropagation(); handleOnDragEnd(status, setStatus, dragSrcElemID, setdragSrcElemID) }}
        />
      <div className="absolute bottom-0 opacity-70 bg-slate-300 min-w-full">
        {element.comment}
      </div>
    </div>
  );
};

 

