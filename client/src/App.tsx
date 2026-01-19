import { useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { pages, publicPages } from "./data/pageRoutes";
import { getSession } from "./state/slice/user";
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import Profile from "./pages/authenticated/Profile";
import UserSurveyList from "./components/lists/UserSurveyList";
import UserDraftList from "./components/lists/UserDraftsList";
import SearchPage from "./pages/authenticated/SearchPage";
import QuerySurvey from "./components/lists/QuerySurvey";
import QueryUsers from "./components/lists/QueryUsers";
import AuthenticatedLayout from "./layout/Authenticated";
import AdminPage from "./pages/admin/Index";
import ReportedSurveys from "./pages/admin/ReportedSurveys";
import ReportedUsers from "./pages/admin/ReportedUsers";
import Welcome from "./pages/admin/Welcome";
import TransactionRequests from "./pages/admin/TransactionRequests";
import Feedbacks from "./pages/admin/pages/Feedbacks";
import { useAppSelector } from "./hooks/useAppSelector";
import { Toaster } from "sonner";
import type { AppDispatch } from "./state/store";
import type { SessionResponse } from "@shared/types";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const { user = {}, accessToken } = useAppSelector((state) => state.user);

  const checkSession = async () => {
    const res = await dispatch(getSession());

    if (res.type === "session/fulfilled") {
      nav("/home");
    }
  };

  useEffect(() => {
    checkSession();
  }, [dispatch]);

  return (
    <div className=" w-full  flex flex-col justify-between  scrollbar-none space-y-4 ">
      <Toaster position="top-center" />
      <Routes>
        <Route element={<AuthenticatedLayout />}>
          {pages.map((page) => {
            return (
              <Route
                key={page.path}
                path={page.path}
                element={<div>{page.element}</div>}
              />
            );
          })}
          <Route path="/profile" element={<Profile />}>
            <Route index path="/profile" element={<UserSurveyList />} />
            <Route path="/profile/drafts" element={<UserDraftList />} />
          </Route>
          <Route path="/browse" element={<SearchPage />}>
            <Route index path="/browse/users" element={<QueryUsers />} />
            <Route path="/browse" element={<QuerySurvey />} />
          </Route>
        </Route>

        <Route
          element={
            <div className="w-full min-h-screen ">
              <NavBar>
              
              </NavBar>
              <div className="w-full min-h-96">
                <Outlet />
                <Footer />
              </div>
            </div>
          }
        >
          {publicPages.map((page) => {
            return (
              <Route
                key={page.path}
                path={page.path}
                element={<div className="">{page.element}</div>}
              />
            );
          })}
          <Route path="/adm" element={<AdminPage />}>
            <Route path="/adm" element={<Welcome />} />
            <Route path="/adm/transactions" element={<TransactionRequests />} />
            <Route path="/adm/reports/surveys" element={<ReportedSurveys />} />
            <Route path="/adm/reports/users" element={<ReportedUsers />} />
            <Route path="/adm/feedbacks" element={<Feedbacks />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
