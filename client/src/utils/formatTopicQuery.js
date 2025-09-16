export const capitalizeFirstLetter = (word) => {
  const firstLetter = word.toString()[0].toUpperCase();
  const lettersAfterTheFirst = word.substring(1);
  
  return `${firstLetter}${lettersAfterTheFirst}`;
}

export const normalize = (word) => { 
  if(!word.includes("_")){
    return capitalizeFirstLetter(word);
  } 
  const splittedWords = word.split("_");
  const fullWord = splittedWords.reduce((acc, curr) => {
    const capitalized = curr === "and" ? curr : capitalizeFirstLetter(curr);
    acc += ` ${capitalized}`; 
    return acc;
  }, "")
  
  return fullWord;
  
}