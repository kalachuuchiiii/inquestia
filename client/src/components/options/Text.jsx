import useRefActions from '../../hooks/useRefActions.js';
import Textarea from '../html/Textarea.jsx';

const TextOption = ({handleChange = () => {}, value = '', readOnly = false}) => {
  
return <Textarea readOnly = {readOnly} limit = {400} requiredDisplay = {false} required = {true} placeholder = "Type your answer here..." onChange = {handleChange} value = {value}/>
}

export default TextOption