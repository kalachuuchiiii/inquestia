import { Outlet } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Sidebar from '../components/SideBar.jsx';
import NavBar from '../components/NavBar.jsx'
import UserIcon from '../components/UserIcon.jsx'
import useWindow from '../hooks/useWindow.js'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UnauthorizedModal from '../components/modals/UnauthorizedModal.jsx';
import UsersWithSameInterests from "../components/lists/UsersWithSameInterests.jsx";

const AuthenticatedLayout = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(window.innerWidth >= 720);
  const { user = {}, isAuthenticated, isProcessOK } = useSelector(state => state.user);
  const [isLargeScreen] = useWindow({ screenSize: 720 });
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false);

  useEffect(() => {
    if (!isProcessOK || isAuthenticated || user?._id) return;
setIsUnauthorizedModalOpen(true)
  }, [user, isAuthenticated, isProcessOK])

  return (
    <div className="h-screen w-full  ">
      <AnimatePresence>
        {isUnauthorizedModalOpen && <UnauthorizedModal />}
      </AnimatePresence>
      <div className="w-full items-start flex">
        <AnimatePresence>
          {(isLargeScreen || isSidebarOpen) && (
            <Sidebar
              isLargeScreen={isLargeScreen}
              onClose={() => setIsSideBarOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="w-full  transition-all duration-200">
          <NavBar>
            <div>
              {!isSidebarOpen && !isLargeScreen && (
                <NavBar.Relate>
                  <NavBar.SideBarToggler
                    onToggleSidebar={() => setIsSideBarOpen((prev) => !prev)}
                    size="30"
                  />
                  <NavBar.App color="white" />
                </NavBar.Relate>
              )}
            </div>
            <UserIcon user={user}>
              <UserIcon.Avatar className="ml-4" size="8" />
            </UserIcon>
          </NavBar>
          <div className="w-full justify-evenly  flex min-h-screen ">
            <div className="w-full">
              <Outlet />
            </div>
            { isLargeScreen && <UsersWithSameInterests /> }
          </div>
        </div>
      </div>
    </div>
  );
};


export default AuthenticatedLayout;