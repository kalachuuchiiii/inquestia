import { useEffect } from "react";
import Dashboard from "@/features/app/account/components/UserDashboard.js";
import { useInView } from "react-intersection-observer";
import SurveyCard from "@/features/app/survey/components/SurveyCard.js";
import LoadingDisplay from "@/components/ui/LoadingDisplay.jsx";
import { useNavigate } from "react-router-dom";
import SurveyCardPlaceholder from "@/features/app/survey/components/ui/SurveyCardPlaceholder.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/axios.instance";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import type { Survey } from "@inquestia/schemas";
import { useAccount } from "../../account/hooks/useAccount";
import { Separator } from "@/components/ui/separator";

const MyFeedPage = () => {
  const { data: user } = useAccount();

  const {
    data,
    isPending: isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const res = await api.get<{
        nextPage: number | undefined;
        surveys: Survey[];
        totalSurveys: number;
      }>(`/api/survey?page=${pageParam}&limit=${5}`);
      return res;
    },
    queryKey: ["survey-list"],
    initialPageParam: 1,
    getNextPageParam: (res) => res.data.nextPage,
    enabled: !!user,
  });

  const surveys = data?.pages.flatMap((p) => p.data.surveys) ?? [];
  const totalSurveys = data?.pages?.[-1]?.data?.totalSurveys ?? 0;

  const { inView, ref } = useInView();

  useEffect(() => {
    if (isLoading || !inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView]);

  if (isLoading || !user) {
    return (
      <LoadingDisplay>
        <div className="flex gap-2 items-center">
          Welcome! Preparing everything for you...
        </div>
      </LoadingDisplay>
    );
  }

  return (
    <div>
      <div className=" px-4 pb-4">
        <Dashboard user={user} />
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col gap-2 min-h-screen">
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
