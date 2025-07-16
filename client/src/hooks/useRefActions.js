import { useRef, useCallback, useMemo, useState, useEffect } from 'react';

const useRefActions = () => {
  
  const ref = useRef(null);
  const [valueLength, setValueLength] = useState(0);
  
  const focusRef = () => {
    const currentRef = ref.current;
    if(!currentRef)return; 
    currentRef.focus();
  }
  
  const heightAdapt = () => {
    const currentRef = ref.current;
    const validElements = [
      "INPUT", "TEXTAREA"]
    if(!currentRef || !validElements.includes(currentRef.tagName))return;
    setValueLength(currentRef.value.trim().length || 0);
      currentRef.style.height = "auto";
      currentRef.style.height = `${currentRef.scrollHeight}px`;
  }
  
  const unfocusRef = () => {
    const currentRef = ref.current;
    if(!currentRef) return; 
    currentRef.blur();
  }
  
  return {
    ref,
    heightAdapt,
    focusRef,
    valueLength,
    unfocusRef
  }
}

export default useRefActions