  export const gridContents = [
    { name: 'bird', cols:'2', rows:'2',  comment:"Some comment about the image. This is some bird whose name I currently forget. Perhaps a curlew." }, 
    { name: 'coyote', cols:'1', rows:'1',  comment:"A coyote idling away a warm summer afternoon on a hill slope." }, 
    { name: 'hawk', cols:'1', rows:'2',  comment:"Some comment about the image." }, 
    { name: 'sealion', cols:'1', rows:'1',  comment:"Some comment about the image." }, 
    { name: 'view', cols:'1', rows:'1',  comment:"Some comment about the image." }, 
    { name: 'yellow_flower', cols:'1', rows:'1',  comment:"Some comment about the image." }, 
    { name: 'bug', cols:'1', rows:'1',  comment:"Some comment about the image." }, 
    { name: 'elk', cols:'1', rows:'1',  comment:"Some comment about the image." }, 
    { name: 'heron', cols:'1', rows:'1',  comment:"Some comment about the image." }, 
    { name: 'swift', cols:'1', rows:'1',  comment:"Some comment about the image." }, 
    { name: 'woodpecker' , cols:'1', rows:'1',  comment:"Some comment about the image." }
  ];

  export function getImageFileName (imageName) {
    return "images/" + imageName + ".jpg" }
  
