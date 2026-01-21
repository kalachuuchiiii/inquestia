import { UserBadge } from "../UserBadge";
import Dashboard from "../Dashboard";
import ExternalLinksList from "../lists/ExternalLinksList";
import type { UserDTO } from "@shared/types";

const UserProfileCard = ({ user }:{user: UserDTO}) => {
  const bio = user?.bio || "No bio yet";
  const links = user?.externalLinks || [];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <UserBadge user={user} />

      {/* Dashboard */}

      <Dashboard user={user} />

      {/* External Links */}
      {links.length > 0 && (
        <div className="p-4 rounded-lg shadow-md bg-white dark:bg-zinc-900">
          <h2 className="text-sm font-medium mb-2 opacity-80">
            External Links
          </h2>
          <ExternalLinksList hideDeleteButton externalLinks={links} />
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
