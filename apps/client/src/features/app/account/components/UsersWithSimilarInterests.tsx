import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UserCardPlaceholder from "@/features/app/account/components/ui/UserCardPlaceholder";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserBadge } from "@/components/ui/UserBadge";
import api from "@/lib/axios.instance";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import type { User } from "@inquestia/schemas";
import { useAccount } from "../hooks/useAccount";

const UsersWithSimilarInterests = () => {
  const { data: user } = useAccount();
  const isMobile = useIsMobile();
  const [hideWidget] = useState(isMobile);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["similar-", user?._id],
    queryFn: () => api.get<{ users: User[] }>("/api/user/me/similar-interests"),
    enabled: !!user,
  });

  const users = data?.data.users ?? [];

  return (
    <Sidebar side="right" className=" pt-12  sticky top-0 ">
      <SidebarHeader className="p-6">
        <h1 className="text-3xl tracking-tighter font-bold">
          People with similar interests
        </h1>
        <p className="tracking-tighter opacity-75">Find people you may like</p>
      </SidebarHeader>
      <SidebarContent className="p-4 scrollbar-none w-full ">
        <SidebarGroup>
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
                className="py-2  my-1 border-b border-neutral-200 dark:border-neutral-800"
              >
                <UserBadge
                  user={u}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col items-start gap-4">
                    <header className="flex items-start gap-4">
                      <UserBadge.Avatar className="size-10" />
                      <div className="flex flex-col items-start justify-start">
                        <UserBadge.Nickname className="truncate leading-4" />
                        <UserBadge.Username className="truncate" />
                      </div>
                    </header>
                    <UserBadge.Badge />
                  </div>
                </UserBadge>
              </div>
            ))
          ) : (
            <p className="text-center opacity-50 py-10">No users found.</p>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default UsersWithSimilarInterests;
