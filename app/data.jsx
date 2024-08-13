  export const image_names = [
    { name: 'bird', cols:'2', rows:'2', color:'teal', comment:"Some comment about the image. This is some bird whose name I currently forget. Perhaps a curlew." }, 
    { name: 'coyote', cols:'1', rows:'1', color:'pink', comment:"A coyote idling away a warm summer afternoon on a hill slope." }, 
    { name: 'hawk', cols:'1', rows:'2', color:'purple', comment:"Some comment about the image." }, 
    { name: 'sealion', cols:'1', rows:'1', color:'indigo', comment:"Some comment about the image." }, 
    { name: 'view', cols:'1', rows:'1', color:'yellow', comment:"Some comment about the image." }, 
    { name: 'yellow_flower', cols:'1', rows:'1', color:'lime', comment:"Some comment about the image." }, 
    { name: 'bug', cols:'1', rows:'1', color:'green', comment:"Some comment about the image." }, 
    { name: 'elk', cols:'1', rows:'1', color:'emerald', comment:"Some comment about the image." }, 
    { name: 'heron', cols:'1', rows:'1', color:'rose', comment:"Some comment about the image." }, 
    { name: 'swift', cols:'1', rows:'1', color:'gray', comment:"Some comment about the image." }, 
    { name: 'woodpecker' , cols:'1', rows:'1', color:'fuchsia', comment:"Some comment about the image." }
  ];

  export function getFilename (imageName) {
    return process.env.PUBLIC_URL + "/images/" + imageName + ".jpg" }
  