"use client";

import { CssGrid } from "@/components/cssgrid/cssgrid";
import { getImageFileName, gridContents } from "@/app/data.jsx";

export default function Home() {
  return (
    <div className="App">
      <CssGrid
        getImageFileName={getImageFileName}
        gridContents={gridContents}
        numCols={1}
      />
    </div>
  );
}
