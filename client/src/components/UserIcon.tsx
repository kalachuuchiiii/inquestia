import { memo, FC, ReactNode, useState } from "react";
import { UserContext } from '../context/userContext';
import ImageComponent from './html/Image';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { SiDeepcool } from "react-icons/si";
import { createPortal } from "react-dom";
import useCtx from '../hooks/useCTX'
import type { User } from '../types';

/** Props for main UserIcon provider component */
interface UserIconProps {
  className?: string;
  children?: ReactNode;
  user?: User;
}

/** Props for Username subcomponent */
interface UsernameProps {
  className?: string;
  username?: string;
  showAt?: boolean;
}

/** Props for Nickname subcomponent */
interface NicknameProps {
  className?: string;
}

/** Props for Avatar subcomponent */
interface AvatarProps {
  size?: number;
  className?: string;
  disableZoom?: boolean;
}

/** Props for Card subcomponent */
interface CardProps {
  children?: ReactNode;
  className?: string;
  size?: string | number;
}

/**
 * Main UserIcon component - Provider wrapper for user context
 * Allows child components to access user information
 */
const UserIconComponent: FC<UserIconProps> = memo(({ className = "", children, user }) => {
  const { user: sessionUser } = useSelector((state: any) => state.user);

  return (
    <UserContext.Provider value={{ user, sessionUser }}>
      <div className={className}>
        {children}
      </div>
    </UserContext.Provider>
  );
});

/**
 * Username subcomponent - Displays user's username as link
 * Links to profile if viewing own profile, otherwise links to user's public page
 */
const Username: FC<UsernameProps> = memo(({ className = "", username = "", showAt = false }) => {
  const { user = { username: '' }, sessionUser = {} } = useCtx(UserContext);
  const navigateTo = user?._id === sessionUser?._id ? "/profile" : `/users/${user?.username}`;

  return (
    <NavLink to={navigateTo} className={className}>
      {showAt && '@'}{user?.username || username}
    </NavLink>
  );
});

/**
 * Nickname subcomponent - Displays user's nickname with optional badge
 * Shows badge if user has earned one
 */
const Nickname: FC<NicknameProps> = memo(({ className = '' }) => {
  const { user = { nickname: '', username: '', badge: { badge: '' } } } = useCtx(UserContext);

  return (
    <div className={`${className} w-full flex overflow-x-auto gap-2 items-center`}>
      <p className="truncate">{user?.nickname || user?.username}</p>
      {user?.badge?.badge && (
        <div className="flex items-center gap-2">
          <p><SiDeepcool /></p>
          <p className={user?.badge?.style}>
            {user?.badge?.badge}
          </p>
        </div>
      )}
    </div>
  );
});

/**
 * Avatar subcomponent - Displays user's profile picture
 * Can be clicked to zoom in on the avatar image
 */
const Avatar: FC<AvatarProps> = memo(({ size = 20, className = '', disableZoom = false }) => {
  const { user = { avatar: 'https://www.maximizingresultsllc.com/wp-content/uploads/2016/07/profile-placeholder.jpg' } } = useCtx(UserContext);
  const [isZoomed, setIsZoomed] = useState(false);
  const avatarSrc = user?.avatar || "https://i.pinimg.com/originals/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg";

  return (
    <>
      <div
        className={`cursor-pointer rounded-full w-${size} h-${size} aspect-square text-xs overflow-hidden grid place-content-center object-cover outline-2 outline-blue-300 outline-offset-2 ${className}`}
        onClick={() => setIsZoomed(true)}
        title={disableZoom ? '' : 'Click to zoom.'}
      >
        <ImageComponent
          src={avatarSrc}
          alt="Avatar"
        />
      </div>
      {isZoomed && !disableZoom && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={avatarSrc}
            alt="Zoomed Avatar"
            className="rounded-2xl shadow-2xl max-w-xs w-full h-auto border-4 border-white dark:border-zinc-800"
            style={{ maxHeight: "80vh" }}
          />
        </div>,
        document.body
      )}
    </>
  );
});

/**
 * Card subcomponent - Displays user profile card with avatar, nickname, and username
 * Combines Avatar, Nickname, and Username components for quick user display
 */
const Card: FC<CardProps> = memo(({ children, size = "8" }) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="shrink-0">
        <Avatar size={Number(size)} />
      </div>
      <div className="flex flex-col">
        <Nickname />
        <Username showAt className="text-xs opacity-50" />
        {children}
      </div>
    </div>
  );
});

// Attach subcomponents to main component
const UserIcon = Object.assign(UserIconComponent, {
  Username,
  Nickname,
  Avatar,
  Card,
});

export default UserIcon;
