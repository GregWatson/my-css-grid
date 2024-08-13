
import { getFilename, image_names } from './data.jsx';

/* Compute the number of rows needed to display the images
   assuming no back-filling for smaller images
*/
function computeNumRowsNeeded(imageList) {
    let numRows = 0; // Running total in grid
    let numRowsUsed = 1; // In this row
    let numCols = 3; // Num columns in the grid
    let colsLeft = numCols;

    imageList.forEach((image) => {
        let i_rows = +image.rows;
        let i_cols = +image.cols;
        if (i_cols > colsLeft) {
            numRows = numRows + numRowsUsed;
            colsLeft = numCols;
            numRowsUsed = 1;
        }
        else {
            colsLeft = colsLeft - i_cols;
            if (i_rows > numRowsUsed) numRowsUsed = i_rows;
            if (colsLeft === 0) {
                numRows = numRows + numRowsUsed;
                colsLeft = numCols;
                numRowsUsed = 1;
            }
        }
    });
    if (colsLeft !== numCols) numRows = numRows + numRowsUsed;
    console.log("Info: Used %d rows.", numRows);
    return numRows; 
}

export function CssGrid2() {

    const divImages = image_names.map(image => {
      let cl = "bg-teal-500 ";
      cl = cl + ' col-span-' + image.cols + ' row-span-' + image.rows + ' relative';
      return (
        <div key={image.name} class={cl}>
          <img class="bg-cover absolute top-0" src={getFilename(image.name)} alt={"photo of a " + image.name} />
          <div class="absolute bottom-0 opacity-70 bg-slate-300 min-w-full">{image.comment}</div>
        </div>
      )
      }
    );
    
    let numRows = computeNumRowsNeeded(image_names); 
    let gridClass = "grid grid-cols-[repeat(3,300px)] grid-rows-[repeat(5,_300px)] gap-1"
    return (
      <div class={gridClass}>
        {divImages}
      </div>
    );
  };
  