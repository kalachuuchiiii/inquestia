import UserProfile from "../UserIcon.jsx";
import Dashboard from "../Dashboard.jsx";
import ExternalLinksList from "../lists/ExternalLinksList.jsx";

const UserProfileCard = ({ user = {} }) => {
  const bio = user?.bio || "No bio yet";
  const links = user?.externalLinks || [];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <UserProfile user={user} className="flex gap-4 items-center">
        <UserProfile.Avatar size="40" className="text-20" />
        <div className="text-left">
          <UserProfile.Nickname className="text-lg font-semibold" />
          <UserProfile.Username showAt className="text-xs opacity-70" />
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 max-w-xs line-clamp-3">
            {bio}
          </p>
        </div>
      </UserProfile>

      {/* Dashboard */}
      <div className="p-4 rounded-lg shadow-md bg-white dark:bg-zinc-900">
        <h2 className="text-sm font-medium mb-2 opacity-80">Dashboard</h2>
        <Dashboard user={user} />
      </div>

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
