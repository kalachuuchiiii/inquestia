import { useEffect } from "react";
import Dashboard from "../../components/Dashboard.jsx";
import { useInView } from "react-intersection-observer";
import SurveyCard from "../../components/card/SurveyCard.jsx";
import LoadingDisplay from "../../components/html/LoadingDisplay.jsx";
import { useNavigate } from "react-router-dom";
import SurveyCardPlaceholder from "../../components/card/placeholders/surveyCardPlaceholder.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi.js";
import type { SurveyListResponse } from "@shared/index.js";
import { useAppSelector } from "@/hooks/useAppSelector.js";

const HomePage = () => {
  const nav = useNavigate();
  const {
    isLoading: isSessionLoading,
    user,
    accessToken,
  } = useAppSelector((state) => state.user);
  const api = useApi();

  const {
    data,
    isPending: isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const res = await api.get<SurveyListResponse>(
        `/api/survey/list/?page=${pageParam}&limit=${5}`
      );
      return res;
    },
    queryKey: ["survey-list"],
    initialPageParam: 1,
    getNextPageParam: (res) => res.data.nextPage,
    enabled: !!accessToken,
  });

  const surveys = data?.pages.flatMap((p) => p.data.surveys) ?? [];
  const totalSurveys = data?.pages?.[-1]?.data?.totalSurveys ?? 0;

  const { inView, ref } = useInView();

  useEffect(() => {
    if (isLoading || !inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (isSessionLoading) return;
    if (!user.isFinishedOnboarding) {
      nav("/interests");
    }
  }, [user]);

  if (isSessionLoading) {
    return (
      <LoadingDisplay>
        <div className="flex gap-2 items-center">
          Welcome! Preparing everything for you...
        </div>
      </LoadingDisplay>
    );
  }

  return (
    <div className="p-2">
      <div className="my-6 space-y-6">
        <Dashboard user={user} />
      </div>
      <div className="space-y-3 min-h-screen">
        {surveys?.length > 0 ? (
          surveys.map((survey) => (
            <SurveyCard survey={survey} key={survey._id} />
          ))
        ) : totalSurveys === 0 ? (
          <p className=" text-center  opacity-50 w-full">
            No surveys are published yet.
          </p>
        ) : (
          !hasNextPage && (
            <p className=" text-center  opacity-50 w-full">
              You've reached end.
            </p>
          )
        )}
        {isLoading && <SurveyCardPlaceholder number={8} />}
      </div>
      <div className="h-1 " ref={ref} />
    </div>
  );
};

export default HomePage;
