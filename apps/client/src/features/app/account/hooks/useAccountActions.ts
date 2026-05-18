import api from "@/lib/axios.instance";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useAccount } from "./useAccount";

export const useAccountActions = () => {
  const { data: user, refetch } = useAccount();
  const dispatch = useDispatch();

  const { mutate: updateSocialLinks, isPending: isUpdatingSocialLinks } =
    useMutation({
      mutationFn: async (socialLinks: string[]) => {
        const p = api.patch("/api/user/me/social-links", { socialLinks });
        toast.promise(p, {
          loading: "Updating social links...",
          success: (res) => res.data.message,
          error: (err) => err.response.data.message,
        });
        return await p;
      },
      onSuccess: () => {
        refetch();
      },
    });

  const { mutate: updateAvatar, isPending: isUpdatingAvatar } = useMutation({
    mutationFn: async (formData: FormData) => {
      const p = api.patch<{ avatarUrl: string; message: string }>(
        "/api/user/me/avatar",
        formData
      );
      toast.promise(p, {
        loading: "Updating avatar...",
        error: (err) => err.response.data.message,
        success: (res) => res.data.message,
      });
      return await p;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: updateNickname, isPending: isUpdatingNickname } = useMutation(
    {
      mutationFn: async (nickname: string) => {
        const p = api.patch(`/api/user/me/nickname`, { nickname });
        toast.promise(p, {
          loading: "Updating nickname...",
          error: (err) => err.response.data.message,
          success: (res) => res.data.message,
        });
        return await p;
      },
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: updateUsername, isPending: isUpdatingUsername } = useMutation(
    {
      mutationFn: async (username: string) => {
        const p = api.patch(`/api/user/me/username`, { username });
        toast.promise(p, {
          loading: "Updating username...",
          error: (err) => err.response.data.message,
          success: (res) => res.data.message,
        });
        return await p;
      },
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: updateBio, isPending: isUpdatingBio } = useMutation({
    mutationFn: async (bio: string) => {
      const p = api.patch(`/api/user/me/bio`, { bio });
      toast.promise(p, {
        loading: "Updating bio...",
        error: (err) => err.response.data.message,
        success: (res) => res.data.message,
      });
      return await p;
    },
    onSuccess: () => {
      refetch();
    },
  });

  return {
    updateBio,
    isUpdatingBio,
    updateUsername,
    isUpdatingUsername,
    updateNickname,
    isUpdatingNickname,
    updateAvatar,
    isUpdatingAvatar,
    updateSocialLinks,
    isUpdatingSocialLinks,
  };
};
