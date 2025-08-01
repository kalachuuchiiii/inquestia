import Settings from '../pages/authenticated/Settings.jsx'
import Profile from '../pages/authenticated/Profile.jsx'
import HomePage from '../pages/authenticated/HomePage.jsx';
import SurveyCollections from '../pages/authenticated/SurveyCollections.jsx'
import CreateSurvey from '../pages/authenticated/CreateSurvey.jsx'
import Leaderboards from '../pages/authenticated/Leaderboards.jsx';
import WelcomePage from '../pages/not-authenticated/WelcomePage.jsx';
import QuestsPage from '../pages/authenticated/Quests.jsx';
import AnswerSurveyPage from '../pages/authenticated/AnswerSurvey.jsx';
import TemplatePage from '../pages/authenticated/Templates.jsx'
import LoginPage from '../pages/not-authenticated/Login.jsx';
import RegisterPage from '../pages/not-authenticated/Register.jsx';
import EditProfilePage from '../pages/authenticated/EditProfile.jsx';

export const publicPages = [
      {
      path: "/", 
      element: <WelcomePage />, 
    }, {
      path: "/register", 
      element: <RegisterPage/>
    }, {
      path: '/login', 
      element: <LoginPage />
    }];
    
export const pages = [
    {
      path: "/home", 
      element: <HomePage />
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
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/create",
      element: <CreateSurvey />
    },
    {
      path: "/templates",
      element: <TemplatePage />
    },
    {
      path: "/surveys",
      element: <SurveyCollections />
    },
    {
      path: "/quests", 
      element: <QuestsPage />
    },
    {
      path: "/leaderboard",
      element: <Leaderboards />
    }
    ]