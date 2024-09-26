"use client";

import { CssGrid } from "@/components/cssgrid/cssgrid";
import { gridContents } from "@/app/data.ts";
import { CssGridElInfo } from "@/components/cssgrid/cssgrid-types";
export default function Home() {
  const newGridContents: CssGridElInfo[] = gridContents.map((elem) => {
    return {
      ID: elem.ID,
      elType: elem.elType,
      url: "images/" + elem.ID + ".jpg",
      cols: elem.cols,
      rows: elem.rows,
      comment: elem.comment,
      mode: "view",
    };
  });

  return (
    <div className="App">
      <CssGrid gridContents={newGridContents} />
    </div>
  );
}
