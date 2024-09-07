'use client';

import { CssGrid } from '@/app/lib/CssGrid'
import { getImageFileName, image_names } from "@/app/data.jsx";

export default function Home() {

  // Doesnt work on console.log("Screen width:height is %d:%d", window.innerWidth, window.innerHeight );
  return (
    <div className="App">
      <CssGrid getImageFileName={getImageFileName} image_names={image_names} numCols={4}/>
    </div>
  );
}

