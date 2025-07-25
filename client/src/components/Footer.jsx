import { outsideLinks } from '../data/outsideLinks.jsx';
import footerRoutes from '../data/footerRoutes.js';
import List from './List.jsx';
import { FaCode } from "react-icons/fa6";

import user from '../data/user.js';

const Footer = () => {


  return <footer className=" bottom-0 mx-auto w-screen flex flex-col justify-center items-center py-2 bg-zinc-950">
    <div className="h-40 px-4 flex flex-col justify-center gap-2">
      <div className = "flex items-center">
        <h1 className="text-3xl lato">Inquestia.ask</h1>
      </div>
      <List className="flex gap-1 items-center text-2xl ml-2 opacity-90" list={outsideLinks} renderItem={(link) => <a href={link.path}>
        {link.icon}
      </a>} />
    </div>
    <div className="flex p-4 gap-8 justify-end items-end sm:items-start h-full">
      <List className = " w-full grid grid-cols-1 sm:grid-cols-2 gap-8" list = {footerRoutes} renderItem = {(route) => <div>
           <label className="font-semibold my-4">{route.title}</label>
           <List className = "flex text-sm flex-col" list = {route.paths} renderItem = {(path) =>         <a className = "active:underline" href={path.path} >{path.label}</a>} />
      </div>} />
            <div className = "h-full flex flex-col ">
        <a href = "https://github.com/kalachuuchiiii/inquestia" className = "truncate items-center px-6 py-2 rounded-lg bg-zinc-900 active:text-zinc-900 active:bg-neutral-50 active:outline transition-colors duration-all flex gap-2 text-neutral-200">View Source Code <FaCode size = "20" /></a>
      </div>
    </div>
    <div className="h-[1px] bg-black/30 w-full mt-10 opacity-80" />
    <div className="my-10 text-sm px-4 ">
      <div className="text-sm my-4 flex gap-2 items-center">
        <img src = {user.avatar} className = "size-8 rounded-full outline" />
        <div className = "w-full flex flex-col">
         <a href = "https://github.com/kalachuuchiiii">{user.username}</a>
         <p className = "px-3 py-1 bg-zinc-900/70 text-xs rounded-lg w-fit">Developer</p>
        </div>
      </div>
            <div className = "opacity-70">
        <p>Practical Research 2 — G1</p>
        <p>12 - Haskell</p>
      </div>
    </div>
<p className = "text-sm px-4">© 2025</p>
  </footer>
}

export default Footer