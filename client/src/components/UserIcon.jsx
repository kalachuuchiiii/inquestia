import { memo } from "react";
import { UserContext } from '../context/userContext.js';
import ImageComponent from './html/Image.jsx';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import useCtx from '../hooks/useCTX.js';
import Textarea from './html/Textarea.jsx';
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

UserIcon.Nickname = memo(({nickname = "", className = ""}) => {
  const { user = {
    nickname: '' , 
    username: ''
  } }= useCtx(UserContext);
  return <p className = {className}>{user.nickname || user.username}</p>
})

UserIcon.Avatar = memo(({size = 20, className = ''}) => {
  const { user = {
    avatar: null
    }}= useCtx(UserContext)
  
  return <div className = {`rounded-full size-${size} text-xs overflow-hidden grid place-content-center object-cover outline-2 outline-blue-300 outline-offset-2 ${className}`}>
    <ImageComponent className = "w-full  h-full object-cover " src = {user.avatar} alt = "Avatar" />
  </div>
})


UserIcon.Card = ({children, className = '' ,size = "10"}) => {
  
  return <div className = "flex gap-3 items-center ">
    <UserIcon.Avatar size = {size} /> 
    <div className = "flex flex-col ">
       <UserIcon.Nickname />
          <UserIcon.Username showAt className = "text-xs opacity-50" />
          {children}
    </div>
  </div>
}


export default UserIcon