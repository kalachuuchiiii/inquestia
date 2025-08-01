import { useDispatch } from 'react-redux';

const useDispatcher = (fn = () => {}) => {
  const dispatch = useDispatch();
  
  const handleDispatch = async() => {
    const res = await dispatch(fn());
    return res.payload || {};
  }
  
  handleDispatch();
}

export default useDispatcher