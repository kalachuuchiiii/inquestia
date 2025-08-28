import UserProfile from '../UserIcon.jsx';
import Textarea from '../html/Textarea.jsx';
import Dashboard from '../Dashboard.jsx';
import ExternalLinksList from '../lists/ExternalLinksList.jsx';
const UserProfileCard = ({user = {
  
}}) => {


  return <>
    <UserProfile user={user} className="flex gap-2">
      <div className="flex flex-col justify-center items-start gap-3">
        <UserProfile.Avatar className="" size="30" />
      </div>
      <div className="text-left backdrop-brightness-150 text-sm w-full pl-3">
        <UserProfile.Nickname className="text-lg" />
        <UserProfile.Username showAt className="text-xs opacity-70" />
        <div className="flex flex-col w-full justify-between">
          <div className="w-full">
            <Textarea placeholder="No bio yet" readOnly displayLimit={false} className="rounded bg-zinc-900 w-full  text-xs mt-2" value={user.bio} maxLength={60} />
          </div>
        </div>
      </div>
    </UserProfile>
    <Dashboard user = {user} />
    <ExternalLinksList hideDeleteButton externalLinks={user.externalLinks}  />
  </>
}

export default UserProfileCard