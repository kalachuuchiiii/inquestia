import useRefActions from '../../hooks/useRefActions.js'
import { memo, useEffect } from 'react';

const Textarea = ({ limit = 250, placeholder = '', className = '', onChange = () => { }, name = '', value = '', readOnly = false, required = true, rows = 3, requiredDisplay = false, displayLimit = true }) => {
  const { ref, heightAdapt, valueLength } = useRefActions();

  useEffect(() => {
    heightAdapt();
  }, [value]);

  return <div className="w-full">
    <div className={`${className}  w-full flex gap-2 p-2 `}>
      { 
        requiredDisplay && <p className="text-red-400 ">*</p>
      }
      <textarea className = "w-full resize-none p-1 outline-none" readOnly={readOnly} rows={rows} name={name} required={required} placeholder={placeholder} maxLength={limit} value={value} onChange={onChange} ref={ref}  />
    </div>
    {displayLimit && (<div className="w-full p-2 text-right">
      <p className={`${valueLength === limit ? 'text-red-400' : ' opacity-50 '
        } text-xs`}>{`${valueLength} / ${limit}`}</p>
    </div>)}
  </div>
}

export default memo(Textarea);