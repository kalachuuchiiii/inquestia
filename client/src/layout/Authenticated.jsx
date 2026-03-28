import { Outlet } from "react-router-dom";
import Sidebar from '../components/SideBar.jsx';
import NavBar from '../components/NavBar.jsx'
import UserIcon from '../components/UserIcon.jsx'
import useWindow from '../hooks/useWindow.js'
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import UsersWithSameInterests from "../components/lists/UsersWithSameInterests.jsx";

const AuthenticatedLayout = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(window.screenSize >= 1024);
  const { user = {}, isAuthenticated, isProcessOK } = useSelector(state => state.user);
  const [isLargeScreen] = useWindow({ screenSize: 1024});
  const upperRef = useRef(null);

  useEffect(() => {
   if(!upperRef.current)return;

   upperRef.current.scrollIntoView({ behavior: "auto" });
  }, [window.location.pathname])

  return (
    <div className="h-screen w-full ">
      <div className="w-full items-start justify-start h-full   flex md:flex-row  flex-col-reverse">
        {isAuthenticated && (
          <Sidebar
            isLargeScreen={isLargeScreen}
            onClose={() => setIsSideBarOpen(false)}
          />
        )}

        {isLargeScreen && isAuthenticated && <UsersWithSameInterests />}
        <div className="w-full lg:my-16 mx-auto lg:w-9/12 lg:mr-4 rounded-2xl bg-white dark:bg-[#101012] shadow-2xl dark:shadow-black/40">
          <div className="w-full  transition-all duration-200">
            <NavBar>
              {isLargeScreen ? <NavBar.App /> : <div />}
              <NavBar.Relate gap="gap-2 md:gap-6">
                <NavBar.Points />
                <UserIcon user={user}>
                  <UserIcon.Avatar size="8" />
                </UserIcon>
                <NavBar.NotificationBell></NavBar.NotificationBell>
              </NavBar.Relate>
            </NavBar>

            <div className="w-full ">
              
              <div className="lg:w-10/12 lg:p-4   py-8 md:py-3 w-full overflow-x-hidden outline-none overflow-y-auto mx-auto h-[80vh]  ">
                 <div className="h-1 w-full " ref = {upperRef} />
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AuthenticatedLayout;