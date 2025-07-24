import { IoReorderThreeOutline } from "react-icons/io5";
import AnimationWrapper from './AnimationWrapper.jsx';
import { CiSearch } from "react-icons/ci";
import { useState, memo } from 'react';
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";



const NavBar = memo(({ onToggleSidebar, className = "top-0 z-20 inset-x-0 sticky px-5 py-6 bg-gradient-to-b w-full rounded-b-xl flex justify-between text-zinc-900 items-center ", children }) => {

  return <div className={`${className} overflow-hidden h-18`}>
    {children}
  </div>
})

NavBar.Relate = memo(({ gap = 2, children }) => {
  return <div className={`flex items-center gap-${gap}`}>
    {children}
  </div>
})

NavBar.App = memo(({size = "8", color = "white", disabled = false}) => {
  return ( <button className = "flex">
          <a disabled = {disabled} href = "/" className = {`text-lg font-bold text-${color}`}>Inquestia.ask</a>
    </button>)
})

NavBar.SideBarToggler = memo(({onToggleSidebar = () => {}, size = "20", color = "white"}) => {
  return <button onClick = {onToggleSidebar} className = "backdrop-blur-md p-2 rounded">
    <IoReorderThreeOutline color = {color} size = {size} />
  </button>
})

NavBar.SignUp = () => {
  return <a className="px-6 py-2 font-bold text-white text-lg rounded-xl" href="/login">Login</a>
}


export default NavBar