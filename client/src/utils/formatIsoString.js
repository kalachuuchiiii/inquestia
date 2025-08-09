import { months } from '../data/months.js';
import { detectDayGap } from './detectDayGap.js';
import { detectHourGap } from './detectHourGap.js';
import { detectMinuteGap } from './detectMinuteGap.js'; 
import { getMs } from './getMs.js';

export const formatIsoString = (date) => {
  
  const dayGap = detectDayGap(date);
  const [today, candiDate] = getMs("new", date);
  
  if(dayGap > 14 || (today - candiDate) < 0){
    const [ year, month, day ] = date.split("T")[0].split("-").map(Number);
    return `${months[month-1]} ${day}, ${year}`;
  }
  
  if(dayGap > 0){
    return `${dayGap}d ago`;
  }
  
  const hourGap = detectHourGap(date);
  
  if(hourGap > 0){
    return `${hourGap}h ago`;
  }
  
  const minuteGap = detectMinuteGap(date);
  
  if(minuteGap > 0){
    return `${minuteGap}m ago`;
  }
  
  return `Created a few seconds ago`;
  
}