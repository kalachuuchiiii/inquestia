import { createContext, useContext, memo } from "react";
const UserContext = createContext();


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
  const context = useContext(UserContext);
  
  return <p className = {className}>{context?.user?.username}</p>
})

UserIcon.Avatar = memo(({className, size = "16"}) => {
  const context = useContext(UserContext);
  
  return <div className = {`rounded-full size-${size} text-xs grid place-content-center ${className}`}>
    <img className = "w-full outline-2 outline-blue-300 outline-offset-2 rounded-full h-full object-cover" src = {context?.user?.avatar} alt = "Your Avatar" />
  </div>
})


export default UserIcon