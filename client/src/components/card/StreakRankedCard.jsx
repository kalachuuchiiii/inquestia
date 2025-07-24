import UserHeader from '../UserIcon.jsx';

const StreakRanked = ({user = {
  streak: 1, 
  username: "", 
  nickname: "", 
  avatar: ""
}, i = 0}) => {


return <UserHeader className = " p-3 rounded grid grid-cols-10 grid-rows-1 " user = {user}>
      <p className = "col-span-1 m-auto col-start-1 pr-2">{i + 1}</p> 

      <div className = "flex col-span-7 col-start-2 justify-start items-center gap-3">
        <UserHeader.Avatar size = "10" /> 
        <div className = "flex flex-col">
          <UserHeader.Nickname />
                  <UserHeader.Username showAt className = "text-sm opacity-70" />
        </div>
      </div> 
            <p className = "col-span-2 m-auto flex col-start-9">{user.streak}</p>
    </UserHeader>
}

export default StreakRanked