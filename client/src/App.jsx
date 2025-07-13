import { useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom"
import { pages, publicPages } from './data/pageRoutes.jsx';
import SideBar from './components/SideBar.jsx';
import { AnimatePresence } from 'framer-motion';
import user from './data/user.js';
import NavBar from './components/NavBar.jsx';
import List from './components/List.jsx';
import UserIcon from './components/UserIcon.jsx'
import usePath from './hooks/usePath.js';
import Footer from './components/Footer.jsx';
function App() {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const { isInThisPath } = usePath();
  
  return <div className = "h-max mx-auto container">
    <Routes>
      <Route element={
        <div className="w-full flex">
          <AnimatePresence>
            {
              (!isInThisPath("/") && isSidebarOpen) &&             <SideBar />
            }
          </AnimatePresence>
          <div className = "w-full transition-all duration-200">
             <NavBar >
               <NavBar.Relate >
              <NavBar.App onToggleSidebar = {() => setIsSideBarOpen(prev => !prev)}  /> 
              
               </NavBar.Relate>
               <NavBar.Search />
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
          return <Route path = {page.path} element = {<div className = "container mx-auto min-h-screen overflow-y-auto ">
            {page.element}
          </div>} />
        })
      }
      </Route>
      <Route element = {<div>
        <NavBar>
          <NavBar.App /> 
          <NavBar.SignUp />
        </NavBar>
        <Outlet />
      </div>} >
           {
        publicPages.map((page) => {
          return <Route path = {page.path} element = {page.element} />
        })
      }
      </Route>

    </Routes>
                      <Footer />
  </div>
}

export default App
