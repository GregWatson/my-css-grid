"use client";

import { CssGridImageSizeSelect } from "./CssGridImageSizeSelect.tsx"
import { CssGridModalInfo } from "./CssGridLib.tsx"

export function CssGridModal({rightClicked, setRightClicked, setStatus, numCols}:
  {rightClicked:CssGridModalInfo, setRightClicked:any, setStatus:any, numCols:number}
) {
    let cl =
      "z-20 max-w-min min-w-min p-1 space-y-1 bg-sky-200 relative translate-x-" +
      rightClicked.x +
      " translate-y-" +
      rightClicked.y;

    return (
      <div className={cl}>
        <button
          className="min-w-full p-1 rounded bg-sky-500 text-center  border-2 border-sky-800 hover:border-slate-800 "
          onClick={(e) => {
            console.log("Move Button was clicked");
            setStatus("isDragging");
          }}
        >
          Move Image
        </button>

        <CssGridImageSizeSelect
            rightClicked={rightClicked}
            setRightClicked={setRightClicked}
            setStatus={setStatus}
            numCols={numCols} 
        />
      </div>
    );
  }
