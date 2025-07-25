import { useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom"
import { pages, publicPages } from './data/pageRoutes.jsx';
import SideBar from './components/SideBar.jsx';
import { AnimatePresence } from 'framer-motion';
import UserIcon from './components/UserIcon.jsx';
import user from './data/user.js';
import NavBar from './components/NavBar.jsx';
import usePath from './hooks/usePath.js';
import Footer from './components/Footer.jsx';
import useWindow from './hooks/useWindow.js';
function App() {
  const [isSidebarOpen, setIsSideBarOpen] = useState(window.innerWidth >= 720);
  const [isLargeScreen] = useWindow({
    screenSize: 720
  });

  const { isInThisPath } = usePath();
  
  return <div className = " w-full h-full  space-y-4 ">
    <Routes>
      <Route element={
        <div className="w-full h-full flex">

                      <AnimatePresence>
            { (isLargeScreen || isSidebarOpen) && <SideBar isLargeScreen = {isLargeScreen} onClose = {() => setIsSideBarOpen(false)} />
            }
          </AnimatePresence>
          <div className = "w-full transition-all duration-200">
             <NavBar >
               <div>
                                {
                 !isSidebarOpen && !isLargeScreen &&                <NavBar.Relate >
                 <NavBar.SideBarToggler onToggleSidebar = {() => setIsSideBarOpen(prev => !prev)} size = "30" />
              <NavBar.App color = "white" /> 
              
               </NavBar.Relate>
               }
               </div>
               <UserIcon user = {user} >
                 <UserIcon.Avatar className = "ml-4" size = "8" />
               </UserIcon>
            </NavBar>
            <Outlet />
          </div>
        </div>
      }>
      {
        pages.map((page) => {
          return <Route path = {page.path} element = {<div className = "container mx-auto overflow-y-auto h-full ">
            {page.element}
          </div>} />
        })
      }
      </Route>
      <Route element = {<div className = "w-full ">
        <NavBar>
          <NavBar.App /> 
          <NavBar.SignUp />
        </NavBar>
        <Outlet />
      </div>} >
           {
        publicPages.map((page) => {
          return <Route path = {page.path} element = {<div className = "">
            {page.element}
          </div>} />
        })
      }
      </Route>

    </Routes>
                      <Footer />
  </div>
}

export default App
