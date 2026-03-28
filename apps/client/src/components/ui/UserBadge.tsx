import type { UserDTO } from "@inquestia/types";
import { createContext, useContext, useMemo, type ComponentProps, type ReactNode } from "react";
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "./avatar";
import clsx from 'clsx'
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";

const UserBadgeContext = createContext<UserDTO | undefined>(undefined);

const useUserBadge = () => {
  const user = useContext(UserBadgeContext);
  if (!user)
    throw new Error("UserBadge components must be used inside UserBadge");
  return user;
};

const Root = ({ user, children, ...props }: { user: UserDTO; children: ReactNode } & ComponentProps<'div'>) => {

    const value = useMemo(() => user, [user]);

  return (
    <UserBadgeContext.Provider value={value}>
      <div {...props}>
        {children}
      </div>
    </UserBadgeContext.Provider>
  );
};

const Avatar = ({ ...props }: ComponentProps<'div'>) => {
  const user = useUserBadge();
  return (
      <AvatarUI className={clsx(props.className, 'avatar-ring')}>
        <AvatarImage src={user?.avatar} />
        <AvatarFallback>{user?.username}</AvatarFallback>
      </AvatarUI>
  );
};

const Username = ({ ...props }: ComponentProps<'p'>) => {
  const user = useUserBadge();
  const { user: me } = useAppSelector(state => state.user);

  const redirectTo = user._id === me._id ? '/my-profile' : `/users/${user.username}`;

  return (
    <Link to={redirectTo}>
     <p {...props} className={clsx(props.className, 'truncate cursor-pointer opacity-75')}>
      @{user.username}
    </p></Link>
  );
};

const Nickname = ({ ...props }:ComponentProps<'p'>) => {
  const user = useUserBadge();

  return <p {...props}>{user.nickname || user.username}</p>;
};

const Badge = () => {
  const user = useUserBadge();
  return <div className={user?.badge?.style}>{user?.badge?.badge}</div>;
};

export const UserBadge = Object.assign(Root, {
  Avatar,
  Nickname,
  Username,
  Badge,
});
