import { useEffect, useState } from "react";
import PointRankedCard from "../card/PointRankedUser.jsx";
import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";

const PointRankingList = () => {
  const [hallOfFamers, sethallOfFamers] = useState([]);
  const [userRank, setUserRank] = useState({
    core: { current: 0 },
    rank: 1,
  });

  const [getLeaderboard, { isLoading, error }] = useAsync(
    async () => {
      const res = await fetchApi("get", "/user/leaderboard", { isAllTimeHigh: false });
      if (!res.success) throw new Error("Fetching leaderboard failed.");

      const { hallOfFamers: hallOfFamerList, userRank: userRankData = [] } = res.leaderboard;
      if (userRankData[0]) setUserRank(userRankData[0]); 
        sethallOfFamers(hallOfFamerList);
    
    }
  );

  useEffect(() => {
    if (!isLoading) getLeaderboard();
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center w-full">
        <h1 className="text-3xl font-semibold text-gradient">Hall of Famers</h1>
        <p className="opacity-80">
          These users racked up the most cores — keep answering to rise in the
          leaderboard!
        </p>
      </div>

      {/* Tabs */}
  

      {/* Leaderboard Table */}
      <div className="rounded-lg shadow-xl p-3 bg-white dark:bg-zinc-900">
        <div className="grid place-items-center grid-cols-10 p-2 border-b border-neutral-200 dark:border-neutral-700 text-sm font-semibold">
          <p className="col-span-1 col-start-1">Rank</p>
          <p className="col-span-7 col-start-2">User</p>
          <p className="col-span-2 col-start-9 text-right">Cores</p>
        </div>

        <div className="min-h-[24rem] space-y-1 p-4">
          {isLoading ? (
            <div className="w-full text-sm opacity-60 text-center">
              Preparing the leaderboard...
            </div>
          ) : hallOfFamers.length > 0 ? (
            hallOfFamers.map((user, i) => (
              <PointRankedCard
                key={user?._id || i}
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
            {userRank?.core?.current} cores!
          </h1>
        </div>
      
      </div>
    </div>
  );
};

export default PointRankingList;
