import { useEffect } from 'react';

const useScroll = ({ freeze = false}) => {
  
  
  const terminateScroll = () => {
    document.body.style.overflow = "hidden";
  }
  
  const resumeScroll = () => {
    document.body.style.overflow = "";
  }
  
  useEffect(() => {
    if(!freeze)return; 
    terminateScroll(); 
    
    return()=>{
      resumeScroll();
    }
  }, [])
  
  
  
  return {
    terminateScroll, 
    resumeScroll
  }
}

export default useScroll