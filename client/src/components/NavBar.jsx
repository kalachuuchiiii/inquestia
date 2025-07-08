import { IoReorderThreeOutline } from "react-icons/io5";
import AnimationWrapper from './AnimationWrapper.jsx';
import { CiSearch } from "react-icons/ci";
import { useState, memo } from 'react';
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import AppIcon from './icon/app-icon.jsx';


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

NavBar.App = memo(({size = "8", onToggleSidebar = () => null}) => {
  return <button onClick = {onToggleSidebar}>
    <AppIcon size = {size} />
  </button>
})

NavBar.SignUp = () => {
  return <a className="px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-zinc-900 rounded-xl shadow-md shadow-pink-100" href="/home">Sign up</a>
}

NavBar.Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  return <div className="flex justify-center gap-1 items-center justify-end w-full">

    <button className = "p-2" onClick={() => setIsSearchOpen(true)}><CiSearch size="20" /></button>
        <AnimatePresence> 
    {
    isSearchOpen && <AnimationWrapper className = "flex w-full rounded-lg outline-1 items-center"
    variants = "emerge"
    >
      <form>
       <input placeholder = "Search" className="p-2 outline-none w-full " /> 
      </form>
      <button onClick = {() => setIsSearchOpen(false)} className = "px-2"><IoMdClose /></button>
    </AnimationWrapper>
    }
    </AnimatePresence>
  </div>
}

export default NavBar