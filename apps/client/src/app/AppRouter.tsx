import AppFooter from "@/components/ui/AppFooter";
import AuthenticatedLayout from "@/layout/Authenticated";
import LandingPage from "@/pages/LandingPage";
import { lazy } from "react";
import { Outlet, useRoutes } from "react-router-dom";
const DocumentationPage = lazy(() => import("@/pages/DocumentationPage"));
const SignUpPage = lazy(() => import("@/features/auth/pages/SignUpPage"));
const SignInPage = lazy(() => import("@/features/auth/pages/SignInPage"));
const UpdatePasswordPage = lazy(
  () => import("@/features/auth/pages/UpdatePasswordPage")
);
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const TechnologyStackPage = lazy(() => import("@/pages/TechnologyStackPage"));
const AboutAppPage = lazy(() => import("@/pages/AboutAppPage"));

const authRoutes = [
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/update-password",
    element: <UpdatePasswordPage />,
  },
];

const publicRoutes = [
  {
    element: (
      <div className="w-full min-h-screen ">
        <Outlet />
        <AppFooter />
      </div>
    ),
    children: [
      ...authRoutes,
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/documentation",
        element: <DocumentationPage />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },

      {
        path: "/technologies",
        element: <TechnologyStackPage />,
      },
      {
        path: "/about",
        element: <AboutAppPage />,
      },
    ],
  },
];

const MyFeedPage = lazy(() => import("@/features/app/survey/pages/MyFeedPage"));
const SurveysSharedToMePage = lazy(
  () => import("@/features/app/survey/pages/SurveysSharedToMePage")
);
const CreateSurveyPage = lazy(
  () => import("@/features/app/survey/pages/CreateSurveyPage")
);

const SearchPage = lazy(
  () => import("@/features/app/search/pages/SearchPage")
);

const MySurveyDrafts = lazy(
  () => import("@/features/app/answers/pages/MySurveyDrafts")
);
const MyResponsesPage = lazy(
  () => import("@/features/app/answers/pages/MyResponsesPage")
);
const AnswerSurveyPage = lazy(
  () => import("@/features/app/answers/pages/AnswerSurveyPage")
);
const SurveyAnswersPage = lazy(
  () => import("@/features/app/answers/pages/SurveyAnswersPage")
);

const LeaderboardsPage = lazy(
  () => import("@/features/app/analytics/pages/LeaderboardsPage")
);

const UserAccountPage = lazy(
  () => import("@/features/app/account/pages/UserAccountPage")
);
const MyProfilePage = lazy(
  () => import("@/features/app/account/pages/MyProfilePage")
);
const MyProfileManagerPage = lazy(
  () => import("@/features/app/account/pages/MyProfileManagerPage")
);
const OnboardingPage = lazy(
  () => import("@/features/app/account/pages/OnboardingPage")
);
const SettingsPage = lazy(
  () => import("@/features/app/account/pages/SettingsPage")
);

const SurveySummaryPage = lazy(
  () => import("@/features/app/assistant/pages/SurveySummaryPage")
);
const AssistantPage = lazy(
  () => import("@/features/app/assistant/pages/AssistantPage")
);

const BoostMarketPage = lazy(
  () => import("@/features/app/unlocks/pages/BoostMarketPage")
);

const privateRoutes = [
  {
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/feed",
        element: <MyFeedPage />,
      },
        {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/my-responses",
        element: <MyResponsesPage />,
      },
      {
        path: "/users/:username",
        element: <UserAccountPage />,
      },
      {
        path: "/my-profile",
        element: <MyProfilePage />,
      },
      {
        path: "/ai-summary/:surveyId",
        element: <SurveySummaryPage />,
      },
      {
        path: "/interests",
        element: <OnboardingPage />,
      },
      {
        path: "/profile/manager",
        element: <MyProfileManagerPage />,
      },
      {
        path: "/survey/published/:surveyId",
        element: <AnswerSurveyPage />,
      },
      {
        path: "/survey/drafts/:surveyId",
        element: <MySurveyDrafts />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/survey-answers/:surveyId",
        element: <SurveyAnswersPage />,
      },
      {
        path: "/boost-market",
        element: <BoostMarketPage />,
      },
      {
        path: "/create/:id?",
        element: <CreateSurveyPage />,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardsPage />,
      },
      {
        path: "/shared-surveys",
        element: <SurveysSharedToMePage />,
      },
      {
        path: "/inko",
        element: <AssistantPage />,
      },
    ],
  },
];

const AppRouter = () => {
  return useRoutes([...publicRoutes, ...privateRoutes]);
};

export default AppRouter;
