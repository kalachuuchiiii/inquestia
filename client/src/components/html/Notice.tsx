import type { JSX } from "react";
import { BsExclamationCircle } from "react-icons/bs";

const Notice = ({children, className = "text-xs opacity-50"}:{children: JSX.Element | string; className: string;}) => {


return <div className = {`${className} flex gap-1 items-start`}>
  <div className = "shrink-0">
      <BsExclamationCircle size = {12} /> 
  </div>
  <p className = "leading-3">{children}</p>
</div>
}

export default Notice
