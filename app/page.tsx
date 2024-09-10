'use client';

import { CssGrid } from '@/app/lib/CssGrid'
import { getImageFileName, gridContents } from "@/app/data.jsx";

export default function Home() {

  // Doesnt work on console.log("Screen width:height is %d:%d", window.innerWidth, window.innerHeight );
  return (
    <div className="App">
      <CssGrid getImageFileName={getImageFileName} gridContents={gridContents} numCols={3}/>
    </div>
  );
}

