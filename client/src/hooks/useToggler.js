import { useState, useCallback } from 'react';

const useToggler = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);
  
  const handleToggler = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [])
  
  return [isOpen, handleToggler];
}

export default useToggler