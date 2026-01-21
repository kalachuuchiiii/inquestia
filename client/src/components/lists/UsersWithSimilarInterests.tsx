import { useQuery } from "@tanstack/react-query";
import UserCardPlaceholder from "../card/placeholders/UserCardPlaceholder";
import ChatbotTextbox from "../AssistantWidget";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useApi } from "@/hooks/useApi";
import type { GetUsersWithSimilarInterestsResponse } from "@shared/types";
import { UserBadge } from "../UserBadge";

const UsersWithSimilarInterests = () => {
  const { user, accessToken } = useAppSelector((state) => state.user);
  const api = useApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["similar-", user?._id],
    queryFn: async () => {
      const res = await api.get<GetUsersWithSimilarInterestsResponse>(
        "/api/user/similar-interests"
      );
      return res;
    },
    enabled: !!user && !!accessToken,
  });

  const users = data?.data.users ?? [];

  return (
    <div className="w-100 scrollbar-none overflow-y-auto top-0 sticky right-0 h-[95vh] p-6 pt-10 hidden lg:block">
      <div className="flex flex-col justify-start h-full">
        {/* User Header */}
        <div className="w-full">
          <div className="flex items-center gap-3 px-4 py-5 h-16 border-b border-gray-200 dark:border-gray-800">
            <div className="shrink-0">
              <UserBadge user={user} displayBadge />
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
                  <UserBadge displayBadge user={u} />
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
