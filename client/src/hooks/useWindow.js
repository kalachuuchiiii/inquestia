import { useEffect, useState } from 'react';

const useWindow = ({screenSize = 720}) => {
  
  const [match, setIsMatch] = useState(window.innerWidth >720);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${screenSize}px`);

    const handleChange = (e) => setIsMatch(e.matches);
    mediaQuery.addEventListener('change', handleChange);


    return () => mediaQuery.removeEventListener('change', handleChange);
    
  }, [])
  
  return [ match ];
}

export default useWindow