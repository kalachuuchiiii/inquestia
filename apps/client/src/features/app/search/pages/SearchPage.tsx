import SearchBar from "@/components/SearchBar.jsx";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/axios.instance";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.js";
import { UserBadge } from "@/components/ui/UserBadge.js";
import SurveyCard from "@/features/app/survey/components/SurveyCard.js";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import { Button } from "@/components/ui/button.js";
import { Item } from "@/components/ui/item.js";
import { useInView } from "react-intersection-observer";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAccount } from "../../account/hooks/useAccount";
import { Search } from "lucide-react";
import type { User } from "@inquestia/schemas";

const SearchPage = () => {
  const [searchQuery] = useSearchParams();
  const { data: user } = useAccount();

  const {
    data: userData,
    fetchNextPage: fetchNextUsers,
    hasNextPage: doesUsersHaveNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const res = await api.get<{
        nextPage: number | undefined;
        users: User[];
      }>(
        `/api/user/search?q=${searchQuery.get("q")}&page=${pageParam}&limit=${6}`
      );
      return res;
    },
    queryKey: ["search/user", searchQuery.get("q")],
    getNextPageParam: (res) => res.data.nextPage,
    initialPageParam: 1,
    enabled: !!user && !!searchQuery.get("q"),
  });

  const {
    data: surveyData,
    fetchNextPage: fetchNextSurveys,
    hasNextPage: doesSurveyHaveNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const res = await api.get(
        `/api/survey/search?q=${searchQuery.get("q")}&page=${pageParam}&limit=${6}`
      );
      return res;
    },
    queryKey: ["search/survey", searchQuery.get("q")],
    getNextPageParam: (res) => res.data.nextPage,
    initialPageParam: 1,
    enabled: !!user && !!searchQuery.get("q"),
  });

  const surveys = surveyData?.pages.flatMap((p) => p.data.surveys);
  const users = userData?.pages.flatMap((p) => p.data.users);
  const { ref: surveyRef, inView: surveyInView } = useInView();
  const { ref: userRef, inView: userInView } = useInView();

  useEffect(() => {
    if (!surveyInView || !!surveyRef || !doesSurveyHaveNextPage) return;
    fetchNextSurveys();
  }, [surveyInView, surveyRef]);

  useEffect(() => {
    if (!userInView || !!userRef || !doesUsersHaveNextPage) return;
    fetchNextUsers();
  }, [userInView, userRef]);

  return (
    <div className="space-y-3 pb-6   p-1">
      <SearchBar />
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="surveys">Surveys</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-2 w-full">
          {users && users?.length > 0 ? (
            users?.map((u) => (
              <Item className="flex items-center justify-between">
                <UserBadge
                  user={u}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <UserBadge.Avatar className="size-10" />
                    <div className="flex flex-col ">
                      <UserBadge.Nickname className="font-semibold lg:text-lg" />
                      <UserBadge.Username className="lg:text-base" />
                    </div>
                    <UserBadge.Badge />
                  </div>
                </UserBadge>
                <Link to={`/users/${u.username}`}>
                  <Button variant={"outline"}>View profile</Button>
                </Link>
              </Item>
            ))
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <Search />
                </EmptyMedia>
                <EmptyTitle>Search</EmptyTitle>
                <EmptyDescription>Try typing keywords</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          <div ref={userRef} />
        </TabsContent>
        <TabsContent value="surveys">
          {surveys && surveys?.length > 0 ? (
            surveys?.map((s) => <SurveyCard survey={s} />)
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <Search />
                </EmptyMedia>
                <EmptyTitle>Search</EmptyTitle>
                <EmptyDescription>Try typing keywords</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          <div ref={surveyRef} />
        </TabsContent>
      </Tabs>{" "}
    </div>
  );
};

export default SearchPage;
