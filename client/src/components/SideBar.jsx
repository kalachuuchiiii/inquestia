import AnimationWrapper from './AnimationWrapper.jsx';
import { navRoutes } from '../data/navRoutes.jsx';
import { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import List from './List.jsx';
import NavIcon from './NavIcon.jsx';
import UserIcon from '../components/UserIcon.jsx';
import { useSelector } from 'react-redux';
const Sidebar = ({onClose = () => {}, isLargeScreen = false}) => {
  const { user } = useSelector(state => state.user);
  
  

return <AnimationWrapper
variants = "fromLeft"
className = {` ${isLargeScreen ? "sticky min-h-full" : "fixed h-screen"} top-0 z-40 `}
>
  <div className = "flex sticky  top-0 overflow-x-hidden bg-zinc-950  flex-col w-full justify-start h-full py-2" >
    <div className = "py-3 flex gap-2 items-center"> 
    <NavBar.SideBarToggler onToggleSidebar = {onClose} size = "30"/>
            <NavBar.App />
    </div>
    <div className = "p-4 text-xs flex opacity-50">
      <div className = "size-16">
        <UserIcon user = {user}>
          <UserIcon.Avatar size = "10" />
        </UserIcon>
      </div>
      <div className = "flex flex-col">
                  <p >{user?.username}</p>
          <p>{user?.email}</p>
      </div>
    </div>
    <List className = "w-60 my-6  z-50 overflow-hidden" list = {navRoutes} renderItem = {(info, i) => <NavIcon key = {info?.path} info = {info} />} />
  </div>
  
</AnimationWrapper>
}

export default Sidebar