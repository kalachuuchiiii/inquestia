import { getMs } from './getMs.js';

export const detectHourGap = (date) => {
  const [today, candiDate] = getMs("new", date);
  const hoursInMs = 1000 * 60 * 60;
  
  const hourGap = Math.floor((today - candiDate) / hoursInMs); 
  
  return hourGap;
}

export default detectHourGap