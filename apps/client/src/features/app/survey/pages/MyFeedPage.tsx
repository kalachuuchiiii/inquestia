import { useEffect } from "react";
import Dashboard from "@/features/app/account/components/UserDashboard.js";
import { useInView } from "react-intersection-observer";
import SurveyCard from "@/features/app/survey/components/SurveyCard.js";
import LoadingDisplay from "@/components/ui/LoadingDisplay.jsx";
import { useNavigate } from "react-router-dom";
import SurveyCardPlaceholder from "@/features/app/survey/components/ui/SurveyCardPlaceholder.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/axios.instance";
import type { SurveyListResponse } from "@inquestia/types";
import { useAppSelector } from "@/hooks/useAppSelector.js";

const MyFeedPage = () => {
  const {
    user,
    accessToken,
  } = useAppSelector((state) => state.user);
  
  const {
    data,
    isPending: isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const res = await api.get<SurveyListResponse>(
        `/api/survey?page=${pageParam}&limit=${5}`
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

  if (isLoading) {
    return (
      <LoadingDisplay>
        <div className="flex gap-2 items-center">
          Welcome! Preparing everything for you...
        </div>
      </LoadingDisplay>
    );
  }

  return (
    <div >
      <div className=" space-y-6">
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

export default MyFeedPage;
