import { useState, useEffect } from 'react'
import { Routes, Route, Outlet, useNavigate } from "react-router-dom"
import { pages, publicPages } from './data/pageRoutes.jsx';
import SideBar from './components/SideBar.jsx';
import { AnimatePresence } from 'framer-motion';
import UserIcon from './components/UserIcon.jsx';
import { getSession } from './state/slice/user.js';
import NavBar from './components/NavBar.jsx';
import usePath from './hooks/usePath.js';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './components/Footer.jsx';
import useWindow from './hooks/useWindow.js';
import Profile from './pages/authenticated/Profile.jsx';
import UserSurveyList from './components/lists/UserSurveyList.jsx';
import UserDraftList from './components/lists/UserDraftsList.jsx';
import SearchPage from './pages/authenticated/SearchPage.jsx';
import QuerySurvey from './components/lists/QuerySurvey.jsx';
import QueryUsers from './components/lists/QueryUsers.jsx';
import AuthenticatedLayout from './layout/Authenticated.jsx';

function App() {
  
  const dispatch = useDispatch();
  const nav = useNavigate();
const { user = {}, isAuthenticated } = useSelector(state => state.user);
  const checkSession = async () => {
    const res = await dispatch(getSession());
  }

  useEffect(() => {
    if (!isAuthenticated) {
      checkSession();
    }
  }, [isAuthenticated])


  const { isInThisPath } = usePath();

  return <div className=" w-full h-full  space-y-4 ">
    <Routes>
      <Route element={ <AuthenticatedLayout /> }>
        {
          pages.map((page) => {
            return <Route key={page.path} path={page.path} element={<div>
              {page.element}
            </div>} />
          })
        }
        <Route path="/profile" element={<Profile />} >
          <Route index path="/profile" element={<UserSurveyList />} />
          <Route path="/profile/drafts" element={<UserDraftList />} />
        </Route>
        <Route path="/browse" element={<SearchPage />} >
          <Route index path="/browse/users" element={<QueryUsers />} />
          <Route path="/browse" element={<QuerySurvey />} />
        </Route>
      </Route>

      <Route element={<div className="w-full ">
        <NavBar>
          <NavBar.App />
          <NavBar.SignUp />
        </NavBar>
        <div className="w-full min-h-96">
          <Outlet />
        </div>
      </div>} >
        {
          publicPages.map((page) => {
            return <Route key={page.path} path={page.path} element={<div className="">
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
