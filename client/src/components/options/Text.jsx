import useRefActions from '../../hooks/useRefActions.js';
import { useEffect } from 'react';

const TextOption = ({handleChange, value}) => {
  
  const { ref, heightAdapt } = useRefActions();
  
  heightAdapt();


return <textarea ref = {ref} placeholder = "Type your answer here..." rows = "1" className = "w-full resize-none border-l-2 px-1 py-2 mt-4  mb-4 border-blue-400 mx-2 outline-none" onChange = {handleChange} value = {value}/>
}

export default TextOption