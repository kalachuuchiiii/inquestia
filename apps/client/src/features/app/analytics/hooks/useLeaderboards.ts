import { useAppSelector } from "@/hooks/useAppSelector";
import api from "@/lib/axios.instance";
import type { User } from "@inquestia/schemas";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAccount } from "../../account/hooks/useAccount";

export const useLeaderboard = () => {
  const { data: user } = useAccount();
  const { data: leaderboard, isPending: isFetchingLeaderboard } = useQuery({
    queryFn: async () => {
      toast.loading("Fetching leaderboard...", {
        id: "fetch-leaderboard",
      });
      const res = await api.get<{ leaderboard: User[] }>(
        "/api/user/leaderboard"
      );
      toast.dismiss("fetch-leaderboard"); //most cores

      return res.data.leaderboard;
    },
    queryKey: ["leaderboards"],
    enabled: !!user,
  });

  return {
    leaderboard,
    isFetchingLeaderboard,
  };
};
