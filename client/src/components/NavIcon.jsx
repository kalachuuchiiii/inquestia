import { Link } from "react-router-dom"
import { memo, useMemo } from 'react';
import usePath from '../hooks/usePath.js';

const NavIcon = ({info = null, position}) => {
  
  const { path, icon } = info;
  const { isInThisPath } = usePath();
  
  const border = {
    first: "rounded-tr-[25px]", 
    last: "rounded-br-[25px]",
    "" : ""
  }
  
return <div className = {`py-6 px-3 border-r-3 ${border[position]}  transition-colors duration-200  ${ isInThisPath(path) ? "border-fuchsia-200/60" : "border-transparent"} `}>
        <Link to = {path}>{icon}</Link>
      </div>
}

export default memo(NavIcon);