import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UserCardPlaceholder from "@/features/app/account/components/ui/UserCardPlaceholder";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { GetUsersWithSimilarInterestsResponse } from "@inquestia/types";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../../../../components/ui/item";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserBadge } from "@/components/ui/UserBadge";
import api from "@/lib/axios.instance";

const UsersWithSimilarInterests = () => {
  const { user, accessToken } = useAppSelector((s) => s.user);
  const isMobile = useIsMobile();
  const [hideWidget] = useState(isMobile);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["similar-", user?._id],
    queryFn: () =>
      api.get<GetUsersWithSimilarInterestsResponse>(
        "/api/user/me/similar-interests"
      ),
    enabled: !!user && !!accessToken && !hideWidget && !isMobile,
  });

  const users = data?.data.users ?? [];

  return (
    <div className="scrollbar-none max-w-lg  sticky top-0 hidden lg:block space-y-3">
      <header className="rounded-xl ">
        <Item>
          <ItemContent>
            <ItemTitle className="lg:text-xl font-semibold">Users with similar interests</ItemTitle>
            <ItemDescription className="lg:text-lg">
              Connect with users who share your interests and explore new
              perspectives.
            </ItemDescription>
          </ItemContent>
        </Item>
      </header>

      <div className="overflow-y-auto scrollbar-none space-y-3 h-full">
        {isLoading ? (
          <UserCardPlaceholder />
        ) : isError ? (
          <p className="text-center opacity-50 text-red-500">
            {error.message || "Something went wrong."}
          </p>
        ) : users.length > 0 ? (
          users.map((u) => (
            <div
              key={u._id}
              className="p-2 border-b border-neutral-200 dark:border-neutral-800"
            >
              <UserBadge user={u} className="flex items-center justify-between" >
                <div className="flex items-center gap-2">
                  <UserBadge.Avatar className="size-10" />
                <div className="flex flex-col ">
                  <UserBadge.Nickname className="font-semibold lg:text-xl" />
                  <UserBadge.Username className="hover:underline" />
                </div>
                
                </div>
                <UserBadge.Badge />
              </UserBadge>
            </div>
          ))
        ) : (
          <p className="text-center opacity-50">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UsersWithSimilarInterests;
