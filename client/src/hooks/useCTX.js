import { useContext } from 'react';

const useCTX = (Context) => {
  if(!Context)return {};
  const context = useContext(Context);
  
  if(!context){

    return {};
  }
  return context;
}

export default useCTX