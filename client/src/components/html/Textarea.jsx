import useRefActions from '../../hooks/useRefActions.js'
import { memo, useEffect } from 'react';

const Textarea = ({limit = 250, placeholder = 'Textarea', className = '', onChange = () => {}, name = '', value = '', readOnly = false, required = true, rows = 3, requiredDisplay = false}) => {
  const { ref, heightAdapt, valueLength } = useRefActions();
   
   useEffect(() => {
     heightAdapt();
   }, [value]);

return <div className = "w-full">
  <div className = "flex">
    <p className = "text-red-400 pt-2">{requiredDisplay && "*"}</p>
      <textarea  readOnly = {readOnly} rows = {rows} name = {name} required = {required} placeholder = {placeholder} maxLength = {limit} value = {value} onChange = {onChange} ref = {ref} className = {`${className}  outline-none p-2 resize-none w-full`}/> 
  </div>
  <div className = "w-full p-2  text-right">
    <p className = {`${valueLength === limit && 'text-red-400' 
    } text-xs`}>{`${valueLength} / ${limit}`}</p>
  </div>
</div>
}

export default memo(Textarea);