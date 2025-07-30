exports.capitalize = (str) => {
  if(typeof str !== "string"){
    console.error(str, "is not a string");
    return;
  }
  const firstLetter = str.charAt(0).toUpperCase(); 
  return `${firstLetter}${str.substring(1)}`;
}