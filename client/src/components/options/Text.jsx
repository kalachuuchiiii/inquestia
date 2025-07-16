import useRefActions from '../../hooks/useRefActions.js';
import Textarea from '../html/Textarea.jsx';

const TextOption = ({handleChange, value}) => {
  
return <Textarea limit = {400} requiredDisplay = {false} required = {true} placeholder = "Type your answer here..." className = "w-full resize-none border-l-2 px-1 py-2 mt-4  mb-4 border-blue-400 mx-2 outline-none" onChange = {handleChange} value = {value}/>
}

export default TextOption