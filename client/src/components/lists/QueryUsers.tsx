import { useEffect, useState } from "react";

import { useSearchParams, NavLink } from "react-router-dom";
import User from "../UserIcon.jsx";
import UserCardPlaceholder from "../card/placeholders/UserCardPlaceholder.jsx";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import { API } from "@/lib/axios.instance.js";
import { useInfiniteQuery } from "@tanstack/react-query";

const QueryUsers = () => {
  const [searchQuery] = useSearchParams();

  const { user: sessionUser } = useAppSelector((state) => state.user);
  const [totalUsers, setTotalUsers] = useState(0);

  const {
    fetchNextPage: getUsers,
    data,
    isFetchingNextPage: isLoading,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await API.get(`/api/users/list?page=${pageParam}`, {
        params: {
          filter: {
            username: searchQuery.get("q"),
            nickname: searchQuery.get("q"),
          },
        },
      });
      setTotalUsers(res.data.totalUsers ?? 0);
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (res) => res.data.nextPage,
  });

  const { ref, inView } = useInView();

  const users = data?.pages.flatMap((f) => f.data.users) ?? [];
  const query = searchQuery.get("q");

  useEffect(() => {
    if (isLoading || !inView || !hasNextPage) return;
    getUsers();
  }, [isLoading, inView, query, ref]);

  return (
    <div className="space-y-4 w-full max-w-2xl flex flex-col justify-start mx-auto">
      {!isLoading && totalUsers === 0 ? (
        <div className="flex opacity-70 justify-center items-center h-96 text-lg font-medium text-gray-500 dark:text-gray-400">
          No results found
        </div>
      ) : (
        users?.length > 0 &&
        users.map((user) => (
          <div
            key={user._id}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 w-full flex flex-col gap-3 border border-neutral-200 dark:border-zinc-800"
          >
            <div className="flex items-center gap-4">
              <User className="text-sm" user={user}>
                <User.Avatar size={12} />
              </User>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-lg text-zinc-800 dark:text-neutral-100">
                  {user.username}
                </span>
                {sessionUser._id === user._id ? (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900 dark:text-blue-300 w-fit">
                    You
                  </span>
                ) : (
                  user.hasSimilarInterest && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full dark:bg-green-900 dark:text-green-300 w-fit">
                      Has similar Interests
                    </span>
                  )
                )}
              </div>
            </div>
            <NavLink
              className="w-full p-2 mt-2 bg-blue-50 text-blue-700 dark:text-blue-200 dark:bg-blue-900 text-sm rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-150 text-center"
              to={
                sessionUser._id === user._id
                  ? "/profile"
                  : `/users/${user.username}`
              }
            >
              View Profile
            </NavLink>
          </div>
        ))
      )}
      {isLoading && <UserCardPlaceholder number={2} />}
      <div ref = {ref} />
    </div>
  );
};

export default QueryUsers;
