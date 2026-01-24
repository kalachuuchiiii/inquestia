import { useApi } from "@/hooks/useApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { updateUser } from "@/state/slice/user";
import type { UpdateMyAvatarResponse } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useAccountActions = () => {
  const api = useApi();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const { mutate: updateSocialLinks, isPending: isUpdatingSocialLinks } = useMutation({
    mutationFn: async(socialLinks: string[]) => {
       const p = api.patch('/api/user/me/social-links', { socialLinks });
       await toast.promise(p, {
        loading: 'Updating social links...',
        success: res => res.data.message,
        error: (err) => err.response.data.message
       })
       return await p;
    },
    onSuccess: (_, socialLinks) => {
      dispatch(updateUser({ user: { ...user, socialLinks }}));
    }
  })

  const { mutate: updateAvatar, isPending: isUpdatingAvatar } = useMutation({
    mutationFn: async (formData: FormData) => {
      const p = api.patch<UpdateMyAvatarResponse>("/api/user/me/avatar", formData);
      await toast.promise(p, {
        loading: "Updating avatar...",
        error: (err) => err.response.data.message,
        success: (res) => res.data.message,
      });
      return await p;
    },
     onSuccess: (res) => {
        dispatch(updateUser({ user: { ...user, avatar: res.data.avatarUrl } }));
      },
  });

  const { mutate: updateNickname, isPending: isUpdatingNickname } = useMutation(
    {
      mutationFn: async (nickname: string) => {
        const p = api.patch(`/api/user/me/nickname`, { nickname });
        await toast.promise(p, {
          loading: "Updating nickname...",
          error: (err) => err.response.data.message,
          success: (res) => res.data.message,
        });
        return await p;
      },
      onSuccess: (_, nickname) => {
        dispatch(updateUser({ user: { ...user, nickname } }));
      },
    }
  );

  const { mutate: updateUsername, isPending: isUpdatingUsername } = useMutation(
    {
      mutationFn: async (username: string) => {
        const p = api.patch(`/api/user/me/username`, { username });
        await toast.promise(p, {
          loading: "Updating username...",
          error: (err) => err.response.data.message,
          success: (res) => res.data.message,
        });
        return await p;
      },
      onSuccess: (_, username) => {
        dispatch(updateUser({ user: { ...user, username } }));
      },
    }
  );

  const { mutate: updateBio, isPending: isUpdatingBio } = useMutation({
    mutationFn: async (bio: string) => {
      const p = api.patch(`/api/user/me/bio`, { bio });
      await toast.promise(p, {
        loading: "Updating bio...",
        error: (err) => err.response.data.message,
        success: (res) => res.data.message,
      });
      return await p;
    },
    onSuccess: (_, bio) => {
      dispatch(updateUser({ user: { ...user, bio } }));
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
    isUpdatingSocialLinks
  };
};
