import { getMs } from './getMs.js';

export const detectDayGap = (date) => {
  const [today, candiDate] = getMs("new", date); 
  
  const dayInMs = 1000 * 60 * 60 * 24;
  const days = Math.floor((today - candiDate) / dayInMs);
  return days;
}