  export const image_names = [
    { name: 'bird', cols:'2', rows:'2', color:'teal', comment:"Some comment about the image. This is some bird whose name I currently forget. Perhaps a curlew.", hover:false }, 
    { name: 'coyote', cols:'1', rows:'1', color:'pink', comment:"A coyote idling away a warm summer afternoon on a hill slope.", hover:false }, 
    { name: 'hawk', cols:'1', rows:'2', color:'purple', comment:"Some comment about the image.", hover:false }, 
    { name: 'sealion', cols:'1', rows:'1', color:'indigo', comment:"Some comment about the image.", hover:false }, 
    { name: 'view', cols:'1', rows:'1', color:'yellow', comment:"Some comment about the image.", hover:false }, 
    { name: 'yellow_flower', cols:'1', rows:'1', color:'lime', comment:"Some comment about the image.", hover:false }, 
    { name: 'bug', cols:'1', rows:'1', color:'green', comment:"Some comment about the image.", hover:false }, 
    { name: 'elk', cols:'1', rows:'1', color:'emerald', comment:"Some comment about the image.", hover:false }, 
    { name: 'heron', cols:'1', rows:'1', color:'rose', comment:"Some comment about the image.", hover:false }, 
    { name: 'swift', cols:'1', rows:'1', color:'gray', comment:"Some comment about the image.", hover:false }, 
    { name: 'woodpecker' , cols:'1', rows:'1', color:'fuchsia', comment:"Some comment about the image.", hover:false }
  ];

  export function getFilename (imageName) {
    return process.env.PUBLIC_URL + "/images/" + imageName + ".jpg"}
  
// Right click popup
  export const menuData = [
    {
      id: 1,
      title: "Message 1",
    },
    {
      id: 2,
      title: "Message 2",
    },
    {
      id: 3,
      title: "Message 3",
    },
    {
      id: 4,
      title: "Message 4",
    },
  ];