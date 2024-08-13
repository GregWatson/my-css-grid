import { getFilename, image_names } from './data.jsx';

export function CssGrid1() {

    const divImages = image_names.map(image => {
      let cl = 'max_w_none text-center col-span-' + image.cols + ' row-span-' + image.rows + ' bg-slate-500 ';
      return <div key={image.name} class={cl}><img src={getFilename(image.name)} alt={"photo of a " + image.name} /></div> 
      //return <div class={cl}>{image.name}</div> 
      }
    );
    
    return (
      <div class="grid grid-cols-img3 bg-blue-200 ">
        {divImages}
        <div class="bg-pink-500 row-span-2">Pink</div>
        <div class="bg-fuchsia-500">Fuschia</div>
        <div class="bg-indigo-500 col-span-2 row-span-2">Indigo</div>
        <div class="bg-gray-500 col-span-1">Gray</div>
        <div class="bg-teal-500 col-span-2">Teal</div>
      </div>
    );
  };
  