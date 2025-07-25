import AnimationWrapper from './AnimationWrapper.jsx';
import { navRoutes } from '../data/navRoutes.jsx';
import { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import List from './List.jsx';
import NavIcon from './NavIcon.jsx';
import detectPosition from '../utils/detectPositionInAList.js';
const Sidebar = ({onClose = () => {}, isLargeScreen = false}) => {
  
  

return <AnimationWrapper
variants = "fromLeft"
className = {` ${isLargeScreen ? "sticky min-h-full" : "fixed h-screen"} top-0 z-40 `}
>
  <div className = "flex sticky  top-0 overflow-x-hidden bg-zinc-950  flex-col w-full justify-start h-full py-2" >
    <div className = "py-3 flex gap-2 items-center"> 
    <NavBar.SideBarToggler onToggleSidebar = {onClose} size = "30"/>
            <NavBar.App />
    </div>
    <List className = "w-60 my-6  z-50 overflow-hidden" list = {navRoutes} renderItem = {(info, i) => <NavIcon position = {detectPosition(i, navRoutes.length - 1)} key = {info?.path} info = {info} />} />
  </div>
  
</AnimationWrapper>
}

export default Sidebar