import UserProfile from '../../components/UserIcon.jsx';
import SettingCard from '../../components/card/SettingCard.jsx';
import { useSelector } from 'react-redux';
import Textarea from '../../components/html/Textarea.jsx';
import ExternalLinksList from '../../components/lists/ExternalLinksList.jsx';
import ArrowButton from '../../components/html/ArrowButton.jsx';

const Profile = () => {
  const { user = {
    nickname: '', 
    username: '', 
    bio: '', 
    avatar: '', 
    _id: '',
    externalLinks: []
  } } = useSelector(state => state.user);


  return <div className="p-3">
    <div className="backdrop-brightness-50 p-6 space-y-3 rounded-lg">
      <UserProfile user={user} className="flex gap-2">
        <div className="flex flex-col justify-center items-start gap-3">
          <UserProfile.Avatar className="" size="30" />
        </div>
                  <div className="text-left backdrop-brightness-150 text-sm w-full pl-3">
            <UserProfile.Nickname className="text-lg" />
            <UserProfile.Username showAt className="text-xs opacity-70" />
                          <div className="flex flex-col w-full justify-between">
          <div className = "w-full">
                <Textarea placeholder = "No bio yet" readOnly displayLimit = {false} className = "w-full border-l-1 border-l-white text-xs mt-2" value = {user.bio} maxLength = {60} />
          </div>
        </div>
          </div>
      </UserProfile>
      <ExternalLinksList hideDeleteButton externalLinks = {user.externalLinks} />
      <ArrowButton to = "/profile/edit" >
        View Account
      </ArrowButton>
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
   
  </div>
}

export default Profile