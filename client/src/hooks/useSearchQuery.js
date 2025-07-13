import { normalize } from '../utils/formatTopicQuery.js';
import { useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

const useSearchQuery = ({initial, key}) => {

const [searchQuery, setSearchQuery] = useSearchParams({topic: localStorage.getItem(key) || initial});
  
  const currentParams = useMemo(() => {
    return searchQuery.get(key);
  }, [searchQuery, key])
  
  const formalCurrentParams = useMemo(() => {
    return normalize(searchQuery.get(key) ) 
  }, [searchQuery, key]);
  
  const setter = useCallback((value) => {
    setSearchQuery({[key]: value});
  }, [key]); 
  
  const compare = useCallback((paramValue) => {
    return paramValue === searchQuery.get(key);
  }, [searchQuery])
  
  return {
    currentParams,
    formalCurrentParams, 
    setSearchQuery: setter,
    compare
  }
}

export default useSearchQuery