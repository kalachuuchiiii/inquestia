import api from "@/lib/axios.instance";
import type { User, UserWithCredential } from "@inquestia/schemas";
import { useQuery } from "@tanstack/react-query";

export const useAccount = () =>
  useQuery({
    queryFn: async () => {
      const res = await api.get<{ user: UserWithCredential }>(
        "/api/auth/account"
      );
      return res.data.user;
    },
    retry: 3,
    queryKey: ["account"],
  });
