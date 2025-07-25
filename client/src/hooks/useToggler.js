import { useState, useCallback } from 'react';

const useToggler = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);
  
  const handleToggler = () => setIsOpen(prev => !prev);
  
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const modify = (val = false) => setIsOpen(val || false);
  return [
     isOpen, 
     handleOpen, 
     handleClose,
     handleToggler, 
    modify
  ]
}

export default useToggler