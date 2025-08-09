import { useEffect, useState } from 'react';


const useAsync = (fn = () => {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const call = async(arg) => {
    setIsLoading(true);
    try{
      await fn(arg);
      setError('');
      setIsSuccess(true);
    }catch(e){
      console.log(e);
      setError(e?.response?.data?.message || e?.message || 'Internal Server Error');
    }finally{
      setIsLoading(false);
    }
  }
  
  const resetState = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError('');
  }
  
  return [call, {
    isLoading, 
    isSuccess,
    error, 
    resetState
  }];
}

export default useAsync