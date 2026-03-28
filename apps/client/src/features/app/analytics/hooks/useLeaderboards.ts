
import { useAppSelector } from "@/hooks/useAppSelector";
import api from "@/lib/axios.instance";
import type { GetLeaderboardResponse } from "@inquestia/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLeaderboard = () => {
  const { accessToken } = useAppSelector((state) => state.user);
  const { data: leaderboard, isPending: isFetchingLeaderboard } = useQuery({
    queryFn: async () => {
      await toast.loading("Fetching leaderboard...", {
        id: "fetch-leaderboard",
      });
      const res = await api.get<GetLeaderboardResponse>(
        "/api/user/leaderboard"
      );
      await toast.dismiss("fetch-leaderboard"); //most cores

      return res.data.leaderboard;
    },
    queryKey: ["leaderboards"],
    enabled: !!accessToken,
  });

  return {
    leaderboard,
    isFetchingLeaderboard,
  };
};
