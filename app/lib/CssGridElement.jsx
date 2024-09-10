"use client";

import { maxTranslate } from "@/tailwind.config";

// drop (from Drag and Drop)
function handleOnDrop(dstElemID, setdragDstElemID, dragSrcElemID, setStatus) {
  if ((dragSrcElemID === "") | (dstElemID === "")) {
    console.log("ERROR: tried to move (re-order) images but either src or dst is missing");
  } else {
    console.log("INFO: Moving image %s before image %s", dragSrcElemID, dstElemID);
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

export function cssGridElement( image, getImageFileName, status, setStatus, 
                                dragSrcElemID, setdragSrcElemID,
                                setdragDstElemID, 
                                rightClicked, setRightClicked ) {
  let cl =
    "rounded-lg border-2 border-slate-400 hover:border-4 hover:border-slate-800";
  cl =
    cl + " col-span-" + image.cols + " row-span-" + image.rows + " relative";

  // console.log("Image %s had cols: %s and rows: %s", image.name, image.cols, image.rows)

  let imageCL = "bg-cover absolute top-0 ";
  if (status === "isDragging") imageCL += "blur-sm";

  return (
    <div
      id={image.name}
      key={image.name}
      className={cl}
      onClick = {() => {
        if ((status === 'modalActiveOnImage') | (status === "isDragging")) {
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
            imageID: image.name,
            x: X,
            y: Y
          });
          setStatus('modalActiveOnImage')
        }
      }}
    >
      <img
        className={imageCL}
        src={getImageFileName(image.name)}
        alt={"photo of a " + image.name}
        onDragStart= {(e) => { e.stopPropagation(); console.log("Drag Start %s", image.name); setdragSrcElemID(image.name) }}
        onDragOver = {(e) => { e.stopPropagation(); e.preventDefault() }} // required
        onDrop     = {(e) => { e.stopPropagation(); handleOnDrop(image.name, setdragDstElemID, dragSrcElemID, setStatus) }}
        onDragEnd  = {(e) => { e.stopPropagation(); handleOnDragEnd(status, setStatus, dragSrcElemID, setdragSrcElemID) }}
        />
      <div className="absolute bottom-0 opacity-70 bg-slate-300 min-w-full">
        {image.comment}
      </div>
    </div>
  );
};

 

