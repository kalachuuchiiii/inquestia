import { useContext } from 'react';

const useCTX = (Context) => {
  const context = useContext(Context);
  
  if(!context){
    console.warn('No context was found at ', Context);
    return {};
  }
  return context;
}

export default useCTX