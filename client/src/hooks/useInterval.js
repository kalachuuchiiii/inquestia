import { useEffect } from 'react';

const useInterval = ({fn = () => null, interval = 1000}, deps) => {
  
  useEffect(() => {
    if(!fn)return;
    const intervalId = setInterval(() => {
      fn();
    }, interval)
    
    return()=>{
      clearInterval(intervalId);
    }
  }, [interval, fn, deps])

}

export default useInterval