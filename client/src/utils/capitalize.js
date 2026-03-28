export const capitalize = (word) => {
  if(typeof word !== "string") return '';
  
  const firstLetter = word.charAt(0).toUpperCase();
  const the_rest = word.substring(1).toLowerCase(); 
  
  return `${firstLetter}${the_rest}`
}