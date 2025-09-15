import {  useEffect } from 'react'
import { Routes, Route, Outlet, useNavigate } from "react-router-dom"
import { pages, publicPages } from './data/pageRoutes.jsx';
import { getSession } from './state/slice/user.js';
import NavBar from './components/NavBar.jsx';
import usePath from './hooks/usePath.js';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './components/Footer.jsx';
import Profile from './pages/authenticated/Profile.jsx';
import UserSurveyList from './components/lists/UserSurveyList.jsx';
import UserDraftList from './components/lists/UserDraftsList.jsx';
import SearchPage from './pages/authenticated/SearchPage.jsx';
import QuerySurvey from './components/lists/QuerySurvey.jsx';
import QueryUsers from './components/lists/QueryUsers.jsx';
import AuthenticatedLayout from './layout/Authenticated.jsx';
import AdminPage from './pages/admin/Index.jsx';
import RequestAnalyticsTable from './pages/admin/RequestAnalyticsTable.jsx';
import ReportedSurveys from './pages/admin/ReportedSurveys.jsx';
import ReportedUsers from './pages/admin/ReportedUsers.jsx';
import ResolvedUserReports from './pages/admin/ResolvedUserReports.jsx';
import ResolvedSurveyReports from './pages/admin/ResolvedSurveyReports.jsx';

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

  return <div className=" w-full  flex flex-col justify-between  scrollbar-none space-y-4 ">
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

      <Route element={<div className="w-full min-h-screen ">
        <NavBar>
          <NavBar.App />
        </NavBar>
        <div className="w-full min-h-96">
          <Outlet />
          <Footer />

        </div>
      </div>} >
        {
          publicPages.map((page) => {
            return <Route key={page.path} path={page.path} element={<div className="">
              {page.element}
            </div>} />
          })
        }
        <Route path = '/adm' element = {<AdminPage />}  >
        <Route path = '/adm' element = {<RequestAnalyticsTable />} />
          <Route path = "/adm/reports/surveys" element = {<ReportedSurveys />}/>
           <Route path = "/adm/reports/users" element = {<ReportedUsers />}/>
           <Route path = "/adm/reports/resolved/users" element = {<ResolvedUserReports /> } />
           <Route path = "/adm/reports/resolved/surveys" element = {<ResolvedSurveyReports /> } />
        </Route>
      </Route>
    </Routes>

  </div>
}

export default App
