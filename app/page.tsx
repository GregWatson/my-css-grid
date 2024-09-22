"use client";

import { CssGrid } from "@/components/cssgrid/cssgrid";
import { getImageFileName, gridContents } from "@/app/data.ts";

export default function Home() {
  return (
    <div className="App">
      <CssGrid
        getImageFileName={getImageFileName}
        gridContents={gridContents}
      />
    </div>
  );
}
