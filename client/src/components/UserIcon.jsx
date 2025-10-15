import { memo } from "react";
import { UserContext } from '../context/userContext.js';
import ImageComponent from './html/Image.jsx';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { SiDeepcool } from "react-icons/si";
import useCtx from '../hooks/useCTX.js'
const UserIcon = memo(({className = "", children, user}) => {
  const { user: sessionUser } = useSelector(state => state.user);

return <UserContext.Provider value = {{
  user, 
  sessionUser
}}>
  <div className = {className}>
{children}
</div>
</UserContext.Provider>
})

UserIcon.Username = memo(({className = "", username = "", showAt = false}) => {
  const { user = {
    username: '' 
  }, sessionUser = {} }= useCtx(UserContext);
  const navigateTo = user?._id === sessionUser?._id ? "/profile" : `/users/${user?.username}`
  
  return <NavLink to = {navigateTo} className = {className}>{showAt && '@'}{user?.username || username}</NavLink>
})

UserIcon.Nickname = memo(({nickname = "", className = '', badgeSize = 'md'}) => {
  const { user = {
    nickname: '' , 
    username: '',
    badge: {
      badge: ''
    }
  } }= useCtx(UserContext);
  return (
    <div className={`${className} flex overflow-x-scroll gap-2 items-center`}>
      <p className=" truncate ">{user?.nickname || user?.username}</p>
      {user?.badge?.badge && (
        <>
          <p> <SiDeepcool /> </p>
          <p className={user?.badge?.style}
          >
            {user?.badge?.badge}
          </p>
        </>
      )}
    </div>
  );
})

import { useState } from "react";
import { createPortal } from "react-dom";
import BadgeText from "./card/BadgeText.jsx";
import { MdVerified } from "react-icons/md";

UserIcon.Avatar = memo(({size = 20, className = '', disableZoom = false}) => {
  const { user = {
    avatar: 'https://www.maximizingresultsllc.com/wp-content/uploads/2016/07/profile-placeholder.jpg'
    }}= useCtx(UserContext)
  const [isZoomed, setIsZoomed] = useState(false);
  const avatarSrc = user?.avatar || "https://i.pinimg.com/originals/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg"

  return (
    <>
      <div
        className={`cursor-pointer rounded-full w-${size} h-${size} aspect-square text-xs overflow-hidden grid place-content-center object-cover outline-2 outline-blue-300 outline-offset-2 ${className}`}
        onClick={() => setIsZoomed(true)}
        title={ disableZoom ? null : 'Click to zoom.'}
      >
        <ImageComponent
          src={ avatarSrc}
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
})


UserIcon.Card = ({children, className = '' ,size = "8"}) => {

  return <div className = "flex gap-3 items-center ">
    <div className="shrink-0"><UserIcon.Avatar size = {size} /> </div>
    <div className = "flex flex-col ">
       <UserIcon.Nickname /> 
          <UserIcon.Username showAt className = "text-xs opacity-50" />
          {children}
    </div>
  </div>
}


export default UserIcon