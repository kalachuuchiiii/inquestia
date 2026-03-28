
export const getMs = (...date) => {
  
 const datesInMs = date.map((d) => {
   if(d === "new") return new Date().getTime();
    return new Date(d).getTime();
  })
  
  return [...datesInMs];
}