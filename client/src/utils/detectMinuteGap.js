import { getMs } from './getMs.js';

export const detectMinuteGap = (date) => {
  
  const [today, candiDate] = getMs("new", date); 
  
  const minuteInMs = 1000 * 60; 
  const minuteGap = Math.floor((today - candiDate) / minuteInMs);
  
  return minuteGap;
}

export default detectMinuteGap