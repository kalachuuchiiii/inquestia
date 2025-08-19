import { useEffect, useState, useCallback } from 'react';


const useFieldArray = (fieldArr = [], condition = false) => {
const [fieldArray, setFieldArray] = useState([]);

const modifyFieldById = useCallback((upd = () => {}, id) => {
  setFieldArray(prev => prev.map((f) => f._id !== id ? f : upd(f)))
});

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
  modifyFieldById, 
  getFieldById
}


}

export default useFieldArray