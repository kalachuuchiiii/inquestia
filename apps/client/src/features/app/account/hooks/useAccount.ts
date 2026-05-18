import api from "@/lib/axios.instance";
import type { User, UserWithCredential } from "@inquestia/schemas";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAccount = () => {
  const navigate = useNavigate();

  return useQuery({
    queryFn: async () => {
      const res = await api.get<{ user: UserWithCredential }>(
        "/api/auth/account"
      );
      const user = res.data.user;
      if (!user.isFinishedOnboarding) {
        navigate("/interests");
      }
      return res.data.user;
    },
    retry: 3,
    queryKey: ["account"],
  });
};
