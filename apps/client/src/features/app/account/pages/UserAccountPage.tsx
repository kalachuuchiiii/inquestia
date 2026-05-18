import { useParams } from "react-router-dom";
import UserCard from "@/features/app/account/components/ui/UserProfileCard.js";
import { useEffect, useState } from "react";
import SurveyCard from "@/features/app/survey/components/SurveyCard.js";
import SurveyCardPlaceholder from "@/features/app/survey/components/ui/SurveyCardPlaceholder.js";
import { useInView } from "react-intersection-observer";
import LoadingDisplay from "@/components/ui/LoadingDisplay.jsx";
import { GoReport } from "react-icons/go";

import { Dialog } from "@/components/ui/dialog.js";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import API from "@/lib/axios.instance.js";

import { YouReachedTheEnd } from "@/components/YouReachedTheEnd.js";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item.js";
import type { Survey, User } from "@inquestia/schemas";

const UserAccountPage = () => {
  const { username } = useParams();

  const { data: userProfile, isPending: isLoading } = useQuery({
    queryKey: ["user-profile", username],
    queryFn: async () => {
      const res = await API.get<{ user: User }>(
        `/api/user/username/${username}`
      );
      return res.data.user;
    },
  });

  const {
    data,
    fetchNextPage: getUserSurveys,
    hasNextPage,
    isFetchingNextPage: isFetchingSurvey,
  } = useInfiniteQuery({
    queryKey: ["user-surveys", username],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await API.get<{
        nextPage: number | undefined;
        totalSurveys: number;
        surveys: Survey[];
      }>(`/api/user/surveys/${userProfile?._id}?page=${pageParam}&limit=4`);
      return res.data;
    },
    getNextPageParam: (res) => res.nextPage,
    enabled: !!userProfile?._id,
  });

  const userSurveys = data?.pages.flatMap((d) => d.surveys) ?? [];
  const totalUserSurvey = data?.pages?.[0]?.totalSurveys ?? 0;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView || isFetchingSurvey || !hasNextPage) return;
    getUserSurveys();
  }, [inView, ref]);

  if (isLoading || !userProfile) {
    return (
      <LoadingDisplay>
        <p>Loading...</p>
      </LoadingDisplay>
    );
  }

  return (
    <>
      <div className="p-3 w-full">
        <div className="space-y-4 md:flex flex-col justify-between p-3 gap-2 items-start w-full">
          <div className="w-full">
            <UserCard user={userProfile} />
          </div>
        </div>

        <Item className="p-3 my-2 w-full text-left">
          <ItemContent>
            <ItemTitle>Surveys ({totalUserSurvey})</ItemTitle>
          </ItemContent>
        </Item>
        <div>
          {userSurveys?.map((s) => {
            return <SurveyCard key={s._id} survey={s} />;
          })}
        </div>

        {isFetchingSurvey ? (
          <SurveyCardPlaceholder />
        ) : (
          !hasNextPage && userSurveys.length > 0 && <YouReachedTheEnd />
        )}
        <div ref={ref} />
      </div>
    </>
  );
};

export default UserAccountPage;
