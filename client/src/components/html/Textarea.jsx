import useRefActions from '../../hooks/useRefActions.js'
import { memo, useEffect } from 'react';

const Textarea = ({limit = 250, placeholder, className, onChange, name, value, required = true, requiredDisplay = false}) => {
  const { ref, heightAdapt, valueLength } = useRefActions();
   
   useEffect(() => {
     heightAdapt();
   }, [value]);

return <div className = "">
  <div className = "flex">
    <p className = "text-red-400 pt-2">{requiredDisplay && "*"}</p>
      <textarea rows = {1} name = {name} required = {required} placeholder = {placeholder} maxLength = {limit} value = {value} onChange = {onChange} ref = {ref} className = {`${className} outline-none p-2 resize-none`}/> 
  </div>
  <div className = "w-full text-right">
    <p className = {`${valueLength === limit && 'text-red-400' 
    } text-xs`}>{`${valueLength} / ${limit}`}</p>
  </div>
</div>
}

export default memo(Textarea);