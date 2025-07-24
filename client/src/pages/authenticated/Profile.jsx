import UserProfile from '../../components/UserIcon.jsx';
import SurveyList from '../../components/SurveyList.jsx';
import SettingCard from '../../components/card/SettingCard.jsx';

const Profile = () => {

  const user = {
    avatar: "https://avatars.githubusercontent.com/u/202394364?v=4",
    username: "Kalachuuchiiii",
    nickname: "Paris Liam"
  }


  return <div className="p-3">
    <div className="backdrop-brightness-50 p-6 rounded-lg">
      <UserProfile className="flex gap-2">
        <div className="flex flex-col justify-center items-start gap-3">
          <UserProfile.Avatar className="" size="30" avatar={user.avatar} />
          <div className="text-left backdrop-brightness-150 w-full pl-3">
            <UserProfile.Username className="text-xl " username={user.nickname} />
            <UserProfile.Username className="text-xs opacity-80" username={`@${user.username}`} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs">Bio</p>
            <UserProfile.Bio bio="I love codinf" />
          </div>
          <button className="w-full text-center bg-zinc-900/50 text-white font-bold px-6 py-1 rounded-lg">Edit Profile</button>
        </div>
      </UserProfile>
    </div>

          <button className="w-full text-center my-8 text-lg">Your Surveys</button>

    <div className="flex p-2 text-sm gap-2 ">
      <p className="shrink-0">Sort by: </p>
      <select className="outline-none truncate w-full rounded" >
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="lowest_response">From lowest # of responses to high</option>
        <option value="highest_response">From highest # of responses to low</option>
      </select>
    </div>
    <SurveyList />
  </div>
}

export default Profile