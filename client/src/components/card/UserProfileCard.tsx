import { UserBadge } from "../UserBadge";
import Dashboard from "../UserDashboard";
import SocialLinksList from "../lists/SocialLinks";
import type { UserDTO } from "@shared/types";

const UserProfileCard = ({ user }: { user: UserDTO }) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <UserBadge displayBadge user={user} />

      {/* Dashboard */}

      <Dashboard user={user} />

      {/* External Links */}

      <SocialLinksList socialLinks={user.socialLinks} />
    </div>
  );
};

export default UserProfileCard;
