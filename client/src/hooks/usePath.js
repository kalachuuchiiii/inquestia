import {useCallback } from 'react';
import { useLocation } from "react-router-dom"

const usePath = () => {
  const { pathname } = useLocation(); 
  
  const isInThisPath = useCallback((path) => {
    if(!path)console.warn("You've left path empty. usePath.js");
    return pathname === path;
  }, [pathname]); 
  
  return {
    isInThisPath
  }
}

export default usePath