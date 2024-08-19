'use client';

import { CssGrid1 } from './CssGrid1.jsx';
import { CssGrid2 } from './CssGrid2.jsx';


export default function Home() {
  return (
    <div className="App">
      <header>CssGrid2</header>
      <CssGrid2 />
      { // <header>CssGrid1</header>
        // <CssGrid1 />
      }
      <p>End of the Page</p>
    </div>
  );
}

