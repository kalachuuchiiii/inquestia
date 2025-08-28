import { useEffect, useState, useCallback } from 'react';


const useFieldArray = (fieldArr = [], condition = false) => {
const [fieldArray, setFieldArray] = useState([]);
const [totalDocuments, setTotalDocuments] = useState(0);

const modifyFieldById = useCallback((upd = () => {}, id) => {
  setFieldArray(prev => prev.map((f) => f._id !== id ? f : upd(f)))
}, []);

const removeFieldById = useCallback((id) => {
  setFieldArray(prev => prev.filter(p => p._id !== id));
  setTotalDocuments(prev => prev - 1);
}, [])

const getFieldById = (id) => {
  return fieldArray.find(f => f._id === id);
}

useEffect(() => {
  if(condition && fieldArr.length){
    setFieldArray(fieldArr);
  }
}, [fieldArr, condition]);

return {
  fieldArray,
  setFieldArray,
  modifyFieldById, 
  getFieldById, 
  removeFieldById, 
  totalDocuments, 
  setTotalDocuments
}


}

export default useFieldArray