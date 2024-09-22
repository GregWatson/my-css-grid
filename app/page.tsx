"use client";

import { CssGrid } from "@/components/cssgrid/cssgrid";
import { getImageFileName, gridContents } from "@/app/data.jsx";
import { useState } from "react";

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
