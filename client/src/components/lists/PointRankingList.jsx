import { useQuery } from "@tanstack/react-query";
import PointRankedCard from "../card/PointRankedUser.jsx";
import { fetchApi } from "../../utils/fetchApi.js";

const PointRankingList = () => {
  // Fetch leaderboard data using TanStack Query
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await fetchApi("get", "/user/leaderboard", {
        isAllTimeHigh: false,
      });
      if (!res.success) throw new Error("Fetching leaderboard failed.");
      return res.leaderboard;
    },
    refetchOnWindowFocus: false, // optional, prevents auto-refresh
  });

  const hallOfFamers = data?.hallOfFamers ?? [];
  const userRank = data?.userRank?.[0] ?? {
    core: { current: 0 },
    rank: 1,
  };

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
          ) : isError ? (
            <div className="text-center text-sm opacity-60 text-red-500">
              {error.message || "Failed to load leaderboard."}
            </div>
          ) : hallOfFamers.length > 0 ? (
            hallOfFamers.map((user, i) => (
              <PointRankedCard key={user?._id || i} user={user} />
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
            <span className="text-xl md:text-2xl italic font-semibold text-gradient">
              #{userRank.rank}
            </span>{" "}
            with {userRank?.core?.current} cores!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PointRankingList;
