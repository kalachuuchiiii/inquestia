import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SurveyCard from "@/features/app/survey/components/SurveyCard";
import SurveyCardPlaceholder from "@/features/app/survey/components/ui/SurveyCardPlaceholder";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { GetSurveysSharedToMeResponse } from "@inquestia/types";
import { useAppSelector } from "@/hooks/useAppSelector";
import api from "@/lib/axios.instance";

const SurveysSharedToMePage = () => {
  const { accessToken } = useAppSelector((state) => state.user);
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryFn: async ({ pageParam }) => {
        const res = await api.get<GetSurveysSharedToMeResponse>(
          `/api/user/me/shared-to-me?page=${pageParam}&limit=${4}`
        );
        return res.data;
      },
      queryKey: ["shared-surveys"],
      initialPageParam: 1,
      enabled: !!accessToken,
      getNextPageParam: (res) => res.nextPage,
    });
  const { ref, inView } = useInView();

  const sharedSurveys = data?.pages.flatMap((s) => s.sharedSurveys) ?? [];
  const totalSharedSurveys = data?.pages?.[-1]?.totalSharedSurveys ?? 0;

  useEffect(() => {
    if (!inView || !hasNextPage || isLoading || isFetchingNextPage) return;
    fetchNextPage();
  }, [inView]);

  return (
    <div className="w-11/12 mx-auto md:w-full">
      <div className="my-8">
        <h1 className="text-2xl font-bold text-gradient text-zinc-800 dark:text-zinc-100">
          Surveys Shared With You
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Explore the surveys others have shared with you. You can view their
          responses and gain insights from their results.
        </p>
      </div>
      <div className="space-y-2">
        {sharedSurveys.length > 0 &&
          sharedSurveys.map((survey) => <SurveyCard survey={survey} />)}
      </div>
      {isLoading || isFetchingNextPage ? (
        <SurveyCardPlaceholder number={3} />
      ) : !totalSharedSurveys ? (
        <p className=" text-center my-30 opacity-50 w-full">
          No surveys has been shared to you yet.
        </p>
      ) : (
        !hasNextPage && (
          <p className=" text-center my-30 h-20 opacity-50 w-full">
            You've reached end.
          </p>
        )
      )}
      <div ref={ref} />
    </div>
  );
};

export default SurveysSharedToMePage;
