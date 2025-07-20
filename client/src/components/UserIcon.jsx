import { createContext, useContext, memo } from "react";
const UserContext = createContext();
import Image from './html/Image.jsx';
import useCtx from '../hooks/useCTX.js';
const UserIcon = memo(({className = "", children, user}) => {


return <UserContext.Provider value = {{
  user
}}>
  <div className = {className}>
{children}
</div>
</UserContext.Provider>
})

UserIcon.Username = memo(({className = ""}) => {
  const { user = {
    username: '...' 
  } }= useCtx(UserContext);
  
  return <p className = {className}>{user?.username || '...'}</p>
})

UserIcon.Avatar = memo(({className, size = "16"}) => {
  const { user = {
    avatar: "/jonas.jpeg" 
    }}= useCtx(UserContext);
  
  return <div className = {`rounded-full size-${size} text-xs overflow-hidden grid place-content-center outline-2 outline-blue-300 outline-offset-2 ${className}`}>
    <Image className = "w-full  h-full object-cover" src = {user?.avatar} alt = "Avatar" />
  </div>
})

UserIcon.Card = ({children, size = "10"}) => {
  
  return <div className = "flex gap-2 items-center w-full">
    <UserIcon.Avatar size = {size} /> 
    <div className = "flex flex-col ">
          <UserIcon.Username className = "font-semibold" />
          {children}
    </div>
  </div>
}


export default UserIcon