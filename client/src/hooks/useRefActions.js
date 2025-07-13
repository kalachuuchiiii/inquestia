import { useRef, useCallback, useMemo } from 'react';

const useRefActions = () => {
  
  const ref = useRef(null);
  const currentRef = ref.current;
  
  const focusRef = () => {
    if(!currentRef)return; 
    currentRef.focus();
  }
  
  const heightAdapt = () => {
    if(!currentRef)return;
    const handleChangeHeight = () => {
      currentRef.style.height = "auto";
     currentRef.style.height = `${currentRef.scrollHeight}px`;
    }
     currentRef.addEventListener("input", handleChangeHeight);
     return() => {
       currentRef.removeEventListener("input", handleChangeHeight);
     }
  }
  
  const unfocusRef = () => {
    if(!currentRef) return; 
    currentRef.blur();
  }
  
  
  
  return {
    ref, 
    heightAdapt,
    focusRef,
    unfocusRef
  }
}

export default useRefActions