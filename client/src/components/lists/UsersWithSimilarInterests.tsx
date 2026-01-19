
import { useQuery } from "@tanstack/react-query";

import UserIcon from "../UserIcon";
import UserCardPlaceholder from "../card/placeholders/UserCardPlaceholder";
import ChatbotTextbox from "../AssistantWidget";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useApi } from "@/hooks/useApi";
import type { GetUsersWithSimilarInterestsResponse } from "@shared/types";

const UsersWithSimilarInterests = () => {
  const { user, accessToken } = useAppSelector((state) => state.user);
  const api = useApi();

  // Fetch users with same interests using TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["similar-", user?._id],
    queryFn: async () => {
      const res = await api.get<GetUsersWithSimilarInterestsResponse>(
        "/api/user/similar-interests"
      );
      return res;
    },
    enabled: !!user && !!accessToken, // only run query when user is available and logged in
  });

  const users = data?.data.users ?? [];

  return (
    <div className="w-100 scrollbar-none overflow-y-auto top-0 sticky right-0 h-[95vh] p-6 pt-10 hidden lg:block">
      <div className="flex flex-col justify-start h-full">
        {/* User Header */}
        <div className="w-full">
          <div className="flex items-center gap-3 px-4 py-5 h-16 border-b border-gray-200 dark:border-gray-800">
            <div className="shrink-0">
              <UserIcon user={user}>
                <UserIcon.Avatar size={12} />
              </UserIcon>
            </div>
            <div className="flex flex-col truncate">
              <p className="font-semibold truncate">{user?.username}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          <h2 className="text-md my-4">Users with similar interests</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Connect with users who share your interests and explore new
            perspectives.
          </p>
          <hr className="mb-4" />
          <div className="h-[26vh] overflow-auto">
            {isLoading ? (
              <UserCardPlaceholder />
            ) : isError ? (
              <p className="w-full text-center opacity-50 text-red-500">
                {error.message || "Something went wrong."}
              </p>
            ) : users.length > 0 ? (
              users.map((u) => (
                <div
                  key={u._id}
                  className="p-2 border-b overflow-x-auto border-neutral-200 dark:border-neutral-800"
                >
                  <UserIcon user={u}>
                    <UserIcon.Card size="8" />
                  </UserIcon>
                </div>
              ))
            ) : (
              <p className="w-full text-center opacity-50">No users found.</p>
            )}
          </div>
        </div>
        <ChatbotTextbox />
      </div>
    </div>
  );
};

export default UsersWithSimilarInterests;
