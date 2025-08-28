import { useEffect, useState, useCallback } from 'react';


const useAsync = (fn = () => {}, deps = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const call = useCallback(async(arg) => {
    setIsLoading(true);
    try{
      await fn(arg);
      setError('');
      setIsSuccess(true);
    }catch(e){
      console.log(e);
      setError(e?.response?.data?.message || e?.message || 'Internal Server Error');
      setIsSuccess(false)
    }finally{
      setIsLoading(false);
    }
  }, deps)
  
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