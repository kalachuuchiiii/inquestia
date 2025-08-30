import { Outlet } from "react-router-dom";
import { pages } from '../data/pageRoutes.jsx';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '../components/SideBar.jsx';
import NavBar from '../components/NavBar.jsx'
import UserIcon from '../components/UserIcon.jsx'
import Profile from '../pages/authenticated/Profile.jsx';
import UserSurveyList from '../components/lists/UserSurveyList';
import UserDraftList from '../components/lists/UserDraftsList.jsx';
import SearchPage from '../pages/authenticated/SearchPage.jsx';
import QueryUsers from '../components/lists/QueryUsers.jsx';
import QuerySurvey from '../components/lists/QuerySurvey.jsx';
import useWindow from '../hooks/useWindow.js'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UnauthorizedModal from '../components/modals/UnauthorizedModal.jsx';

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
    <div className=" mr-auto overflow-y-auto min-h-96 " >
      <AnimatePresence>
        {isUnauthorizedModalOpen && <UnauthorizedModal />}
      </AnimatePresence>
      <div className="w-full h-full flex">
        <AnimatePresence>
          {(isLargeScreen || isSidebarOpen) && (
            <Sidebar
              isLargeScreen={isLargeScreen}
              onClose={() => setIsSideBarOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="w-full transition-all duration-200">
          <NavBar>
            <div>
              {!isSidebarOpen && !isLargeScreen && (
                <NavBar.Relate>
                  <NavBar.SideBarToggler
                    onToggleSidebar={() => setIsSideBarOpen(prev => !prev)}
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
          <div className="w-full sm:w-11/12 mr-auto md:w-10/12 min-h-96">
            <Outlet />
          </div>
        </div>
      </div>
    </div >
  )
};


export default AuthenticatedLayout;