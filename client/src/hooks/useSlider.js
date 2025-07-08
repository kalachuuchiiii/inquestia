import { useMemo, useCallback, useState } from 'react';

const useSlider = (length) => {
  const [currentSlide, setCurrentSlide] = useState(0); 
  
  const lastIndex = useMemo(() => {
    return length - 1;
  }, [length])
  
  
  const nextPage = useCallback(() => {
    setCurrentSlide(prev => prev === lastIndex ? 0 : prev + 1);
  }, [lastIndex]);
  
  const prevPage = useCallback(() => {
    setCurrentSlide(prev => prev === 0 ? lastIndex : prev - 1);
  }, [lastIndex]);
  
  const isLastSlide = useMemo(() => {
    return lastIndex === currentSlide;
  }, [lastIndex, currentSlide])
  
  const isFirstSlide = useMemo(() => {
    return currentSlide === 0;
  }, [currentSlide])
  
  const position = useMemo(() => {
    return isLastSlide ? "last" : isFirstSlide ? "first" : "";
  }, [isLastSlide, isFirstSlide])
  
  return {
    currentSlide, 
    nextPage, 
    prevPage, 
    setCurrentSlide,
    isLastSlide, 
    isFirstSlide, 
    position
  }
}

export default useSlider