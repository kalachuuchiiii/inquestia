import { useRef, useCallback, useMemo } from 'react';

const useRefActions = () => {
  
  const ref = useRef(null);
  const currentRef = useMemo(() => {
    return ref.current;
  }, [ref])
  
  const focusRef = useCallback(() => {
    if(!currentRef)return; 
    currentRef.focus();
  }, [currentRef]);
  
  const unfocusRef = useCallback(() => {
    if(!currentRef) return; 
    currentRef.blur();
  }, [currentRef])
  
  return {
    ref, 
    focusRef,
    unfocusRef
  }
}

export default useRefActions