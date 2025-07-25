import { NavLink } from "react-router-dom"
import { memo, useMemo } from 'react';
import usePath from '../hooks/usePath.js';

const NavIcon = ({info = null, position}) => {
  
  const { path, icon, label } = info;
  const { isInThisPath } = usePath();
  
  
return <NavLink to = {path} className = {` flex gap-2 items-center px-3 py-4 ${isInThisPath(path) && "bg-zinc-400"} active:bg-zinc-400 transition-colors duration-200   `}>
  <p>{icon}</p>
        <p>{label}</p>
      </NavLink>
}

export default memo(NavIcon);