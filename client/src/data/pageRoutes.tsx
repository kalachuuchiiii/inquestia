import Settings from '../pages/authenticated/Settings.jsx'
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
import ViewAnswer from '../pages/authenticated/ViewAnswer.jsx';
import ExchangeCenter from '../pages/authenticated/ExchangeCenter.jsx';
import Transactions from '../pages/authenticated/Transactions.jsx';
import ViewTransaction from '../pages/authenticated/ViewTransaction.jsx';
import CustomerService from '../pages/authenticated/CustomerService.jsx';
import SharedSurvey from '../pages/authenticated/SharedSurvey.jsx';
import FeedbackPage from '../pages/authenticated/FeedbackPage.jsx';
import ChatbotPage from '../pages/authenticated/AssistantPage.js';
import AboutPage from '../pages/not-authenticated/About.jsx';
import TechnologiesPage from '../pages/not-authenticated/Technologies.jsx';
import NotFoundPage from '../pages/not-authenticated/NotFound.jsx';
import GuidePage from '../pages/not-authenticated/Guides.jsx';

export const publicPages = [
  {
    path: "/",
    element: <WelcomePage />,
  }, {
   path: '/guide',
   element: <GuidePage />
  },
   {
    path: "/register",
    element: <RegisterPage />
  },{
    path: '*',
    element: <NotFoundPage />
  }, 
  {
    path: '/login',
    element: <LoginPage />
  }, {
    path: "/update-password/:timeframe", 
    element: <UpdatePasswordPage />
  }, {
    path: '/technologies',
    element: <TechnologiesPage />
  } ,
  {
    path: '/about',
    element: <AboutPage />
  }];
  
export const pages = [
  {
    path: "/home",
    element: <HomePage />
  },  
  { 
    path: '/transactions', 
    element: <Transactions />
  }, 
  { 
   path: '/transaction/:id', 
   element: <ViewTransaction />
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
    path: "/survey/published/:id",
    element: <AnswerSurveyPage />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  { 
    path: '/answer/:id', 
    element: <ViewAnswer />
  },
  {
    path: '/exchange-center', 
    element: <ExchangeCenter />
  },
  {
    path: "/create/:id?",
    element: <CreateSurvey />
  },
  {
    path: "/leaderboard",
    element: <Leaderboards />
  }, 
  { 
    path: '/shared-surveys',
    element: <SharedSurvey />
  },
  { 
    path: '/cs', 
    element: <CustomerService />
  }, 
  { 
    path: '/feedback/:feedbackId',
    element: <FeedbackPage />
  }, {
    path: '/chatbot',
    element: <ChatbotPage />
  }
]
