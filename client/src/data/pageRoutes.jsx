import Settings from '../pages/authenticated/Settings.jsx'
import Profile from '../pages/authenticated/Profile.jsx'
import HomePage from '../pages/authenticated/HomePage.jsx';
import CreateSurvey from '../pages/authenticated/CreateSurvey.jsx'
import Leaderboards from '../pages/authenticated/Leaderboards.jsx';
import WelcomePage from '../pages/not-authenticated/WelcomePage.jsx';
import AnswerSurveyPage from '../pages/authenticated/AnswerSurvey.jsx';
import LoginPage from '../pages/not-authenticated/Login.jsx';
import RegisterPage from '../pages/not-authenticated/Register.jsx';
import EditProfilePage from '../pages/authenticated/EditProfile.jsx';
import Onboarding from '../pages/authenticated/Onboarding.jsx';
import AnswerListPage from '../pages/authenticated/AnswerList.jsx';
import UpdatePasswordPage from '../pages/not-authenticated/UpdatePassword.jsx';
import SurveySummary from '../pages/authenticated/Summary.jsx';
import ViewProfilePage from '../pages/authenticated/ViewProfile.jsx';
import ResponseHistory from '../pages/authenticated/ResponseHistory.jsx';

export const publicPages = [
  {
    path: "/",
    element: <WelcomePage />,
  }, {
    path: "/register",
    element: <RegisterPage />
  }, {
    path: '/login',
    element: <LoginPage />
  }, {
    path: "/update-password/:token", 
    element: <UpdatePasswordPage />
  }];
  
export const pages = [
  {
    path: "/home",
    element: <HomePage />
  },  
  {
    path: "/response-history", 
    element: <ResponseHistory />
  },
  {
    path: '/users/:username', 
    element: <ViewProfilePage />
  },
  {
    path: '/survey-summary/:id', 
    element: <SurveySummary />
  },
  {
    path: '/answer/s/:id', 
    element: <AnswerListPage />
  },
  {
    path: '/interests',
    element: <Onboarding />
  },
  {
    path: '/profile/edit',
    element: <EditProfilePage />
  },
  {
    path: "/survey/:id",
    element: <AnswerSurveyPage />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/create/:id?",
    element: <CreateSurvey />
  },
  {
    path: "/leaderboard",
    element: <Leaderboards />
  }, 
]