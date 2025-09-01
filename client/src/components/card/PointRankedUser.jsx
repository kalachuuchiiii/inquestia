import UserHeader from "../UserIcon.jsx";

const PointRanked = ({ user = {}, sort = "current" }) => {
  const points = user?.point?.[sort] ?? 0;

  return (
    <UserHeader
      className="p-3 rounded-lg grid grid-cols-10 items-center hover:bg-neutral-50 dark:hover:bg-zinc-800 transition"
      user={user}
    >
      {/* Rank */}
      <p className="col-span-1 text-center font-semibold">{user?.rank ?? "-"}</p>

      {/* User Info */}
      <div className="flex col-span-7 items-center gap-3">
        <UserHeader.Avatar size="10" />
        <div className="flex flex-col">
          <UserHeader.Nickname />
          <UserHeader.Username showAt className="text-sm opacity-70" />
        </div>
      </div>

      {/* Points */}
      <p className="col-span-2 text-right font-medium">{points}</p>
    </UserHeader>
  );
};

export default PointRanked;
