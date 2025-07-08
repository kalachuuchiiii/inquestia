import Settings from '../pages/authenticated/Settings.jsx'
import Profile from '../pages/authenticated/Profile.jsx'
import HomePage from '../pages/authenticated/HomePage.jsx';
import SurveyCollections from '../pages/authenticated/SurveyCollections.jsx'
import CreateSurvey from '../pages/authenticated/CreateSurvey.jsx'
import Leaderboards from '../pages/authenticated/Leaderboards.jsx';
import WelcomePage from '../pages/not-authenticated/WelcomePage.jsx';
import QuestsPage from '../pages/authenticated/Quests.jsx';

export const publicPages = [
      {
      path: "/", 
      element: <WelcomePage />
    }, ]

export const pages = [
    {
      path: "/home", 
      element: <HomePage />
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
      path: "/create-survey",
      element: <CreateSurvey />
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