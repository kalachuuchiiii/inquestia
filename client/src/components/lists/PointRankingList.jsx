import { useEffect, useState } from "react";
import PointRankedCard from "../card/PointRankedUser.jsx";
import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";

const PointRankingList = () => {
  const [isAllTimeHigh, setIsAllTimeHigh] = useState(false);
  const [currentHighest, setCurrentHighest] = useState([]);
  const [allTimeHigh, setAllTimeHigh] = useState([]);
  const [userRank, setUserRank] = useState({
    core: { highest: 0, current: 0 },
    rank: 1,
  });

  const [getLeaderboard, { isLoading, error }] = useAsync(
    async ({ isAllTimeHigh = false }) => {
      // Avoid refetch if data is already loaded
      if (isAllTimeHigh && allTimeHigh.length > 0) return;
      if (!isAllTimeHigh && currentHighest.length > 0) return;

      const res = await fetchApi("get", "/user/leaderboard", { isAllTimeHigh });
      if (!res.success) throw new Error("Fetching leaderboard failed.");

      const { hallOfFamers = [], userRank: userRankData = [] } = res.leaderboard;
      if (userRankData[0]) setUserRank(userRankData[0]);

      if (isAllTimeHigh) {
        setAllTimeHigh(hallOfFamers);
      } else {
        setCurrentHighest(hallOfFamers);
      }
    }
  );

  useEffect(() => {
    if (!isLoading) getLeaderboard({ isAllTimeHigh });
  }, [isAllTimeHigh]);

  const ranklist = isAllTimeHigh ? allTimeHigh : currentHighest;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center w-full">
        <h1 className="text-3xl font-bold lato">Hall of Famers</h1>
        <p className="opacity-80">
          These users racked up the most cores — keep answering to rise in the
          leaderboard!
        </p>
      </div>

      {/* Tabs */}
      <div className="w-full flex justify-center gap-1 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setIsAllTimeHigh(false)}
          className={`w-full p-2 text-center transition ${
            !isAllTimeHigh
              ? "border-b-2 border-blue-600 font-medium text-blue-600"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          Current Highest
        </button>
        <button
          onClick={() => setIsAllTimeHigh(true)}
          className={`w-full p-2 text-center transition ${
            isAllTimeHigh
              ? "border-b-2 border-blue-600 font-medium text-blue-600"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          All-Time Highest
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-lg shadow-xl p-3 bg-white dark:bg-zinc-900">
        <div className="grid place-items-center grid-cols-10 p-2 border-b border-neutral-200 dark:border-neutral-700 text-sm font-semibold">
          <p className="col-span-1 col-start-1">Rank</p>
          <p className="col-span-7 col-start-2">User</p>
          <p className="col-span-2 col-start-9 text-right">Cores</p>
        </div>

        <div className="min-h-[24rem] p-4">
          {isLoading ? (
            <div className="w-full text-sm opacity-60 text-center">
              Preparing the leaderboard...
            </div>
          ) : ranklist.length > 0 ? (
            ranklist.map((user, i) => (
              <PointRankedCard
                key={user._id || i}
                sort={isAllTimeHigh ? "highest" : "current"}
                user={user}
              />
            ))
          ) : (
            <div className="text-center text-sm opacity-60">
              No leaderboard data available.
            </div>
          )}
        </div>

        {/* User rank summary */}
        <div className="text-center border-t border-neutral-200 dark:border-neutral-800 mt-2 pt-2 opacity-90 text-base">
          <h1>
            You’re ranked{" "}
            <span className="bg-neutral-100 dark:bg-zinc-800 px-2 py-1 lato text-zinc-900 dark:text-neutral-100 rounded">
              #{userRank.rank}
            </span>{" "}
            with{" "}
            {userRank.core[isAllTimeHigh ? "highest" : "current"] ?? 0} cores!
          </h1>
        </div>
        <p className="text-center text-xs opacity-50 mt-1">
          Each month, current cores are recalculated to 30%, keeping momentum
          while refreshing progress.
        </p>
      </div>
    </div>
  );
};

export default PointRankingList;
