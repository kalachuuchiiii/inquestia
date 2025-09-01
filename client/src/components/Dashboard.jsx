import { IoStatsChartOutline } from "react-icons/io5";

const Dashboard = ({ user = {} }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-950 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <IoStatsChartOutline size={20} className="text-blue-600" />
        <h2 className="text-lg font-semibold">Stats Overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Streak Section */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-900">
          <p className="text-sm text-gray-500">Highest Streak</p>
          <h1 className="text-2xl font-bold text-blue-600">
            {user.streak?.highest ?? 0} day(s)
          </h1>
          <p className="mt-2 text-sm text-gray-500">Current Streak</p>
          <p className="text-lg font-medium">
            {user.streak?.current ?? 0} day(s)
          </p>
        </div>

        {/* Points Section */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-900">
          <p className="text-sm text-gray-500">Highest Points</p>
          <h1 className="text-2xl font-bold text-green-600">
            {user.point?.highest ?? 0}
          </h1>
          <p className="mt-2 text-sm text-gray-500">Current Points</p>
          <p className="text-lg font-medium">{user.point?.current ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
