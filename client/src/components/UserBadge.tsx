import { memo, useState, type FC, type ReactNode } from "react";
import ImageComponent from "./html/Image";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { SiDeepcool } from "react-icons/si";
import type { UserDTO } from "@shared/types";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserBadge = memo(
  ({ user, displayBadge }: { user: UserDTO; displayBadge: boolean }) => {
    const { user: sessionUser } = useAppSelector((state) => state.user);

    const navigateTo =
      user?._id === sessionUser?._id ? "/profile" : `/users/${user?.username}`;

    const displayName = user?.nickname ?? user?.username;
    return (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <p className="truncate font-medium">{displayName}</p>

          <NavLink to={navigateTo} className="text-xs opacity-50 truncate">
            @{user?.username}
          </NavLink>
        </div>

        {displayBadge && (
          <div className="flex items-center gap-1 shrink-0">
            <SiDeepcool />
            <span className={user?.badge?.style}>{user?.badge?.badge}</span>
          </div>
        )}
      </div>
    );
  }
);
