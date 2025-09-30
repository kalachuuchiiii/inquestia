import { NavLink } from "react-router-dom"
import { memo, useMemo } from 'react';
import usePath from '../hooks/usePath.js';

const NavIcon = ({info = null, isLargeScreen = window.screenSize >= 1024}) => {
  
  const { path, icon, label } = info;
  const { isInThisPath } = usePath();
  
  
return (
  <NavLink
    to={path}
    className={` flex gap-2 mx-auto  w-full items-center p-3 ${
      isInThisPath(path) && "bg-gradient-to-r from-cyan-100 to-transparent dark:from-cyan-950 dark:to-transparent"
    } active:bg-zinc-400 flex-col  text-center transition-colors duration-200   `}
  >
    <div className="py-2 text-black text-xs dark:text-white">{icon}</div>
    {isLargeScreen && <p className="text-xs">{label}</p>}
  </NavLink>
);
}

export default memo(NavIcon);