import { useEffect } from 'react';

const useCustomEffect = (fn, cleanupFn, deps) => {
  
  useEffect(() => {
    fn();
    
    return()=>{
      cleanupFn();
    }
  }, deps);
  
}

export default useCustomEffect