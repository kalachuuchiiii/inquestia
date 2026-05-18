import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SurveyCard from "@/features/app/survey/components/SurveyCard";
import SurveyCardPlaceholder from "@/features/app/survey/components/ui/SurveyCardPlaceholder";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/useAppSelector";
import api from "@/lib/axios.instance";
import { useAccount } from "../../account/hooks/useAccount";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BoxSelect } from "lucide-react";

const SurveysSharedToMePage = () => {
  const { data: user } = useAccount();
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryFn: async ({ pageParam }) => {
        const res = await api.get(
          `/api/user/me/shared-to-me?page=${pageParam}&limit=${4}`
        );
        return res.data;
      },
      queryKey: ["shared-surveys"],
      initialPageParam: 1,
      enabled: !!user,
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
    <div className="w-full mx-auto md:w-full">
      <div>
        <h1 className="lg:text-3xl tracking-tighter font-bold text-gradient text-zinc-800 dark:text-zinc-100">
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
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <BoxSelect />
            </EmptyMedia>
            <EmptyTitle>No shared surveys yet</EmptyTitle>
            <EmptyDescription>Collab with other researchers!</EmptyDescription>
          </EmptyHeader>
        </Empty>
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
