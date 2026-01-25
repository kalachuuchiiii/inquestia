import { UserBadge } from "../UserBadge";
import Dashboard from "../UserDashboard";
import SocialLinksList from "../lists/SocialLinks";
import type { UserDTO } from "@shared/types";

const UserProfileCard = ({ user }: { user: UserDTO }) => {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <UserBadge displayBadge user={user} />
        <p>{user.bio}</p>
      </header>
      <Dashboard user={user} />

      <SocialLinksList socialLinks={user.socialLinks} />
    </div>
  );
};

export default UserProfileCard;
