import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import ModalStyle from "../ModalStyle.jsx";
import { updateUser } from "../../../state/slice/user.js";
import { Button } from "@/components/ui/button.js";
import { Textarea } from "@/components/ui/textarea.js";
import type { TextInput } from "@/types/input.js";
import { BioSchema, type UserDTO } from "@shared/index.js";
import { useApi } from "@/hooks/useApi.js";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";

const EditUsername = ({ onClose = () => {}, previousBio = "" }) => {
  const [bio, setBio] = useState(previousBio);
  const dispatch = useDispatch();
  const api = useApi();
  const {
    mutate: saveBio,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const promise = new Promise<
        AxiosResponse<{ message: string; success: boolean; user: UserDTO }>
      >((resolve, reject) => {
        try {
          const validatedBio = BioSchema.parse(bio);
          resolve(
            api.patch("/api/user/bio", {
              bio: validatedBio,
            })
          );
        } catch (e) {
          reject(e);
        }
      });
      await toast.promise(promise, {
        loading: "Updating bio...",
        error: (err) => err.response.data.message,
        success: (res) => res.data.message,
      });
      return await promise;
    },
    onSuccess: (res) => {
      if (res?.data.success && res?.data.user) {
        dispatch(updateUser({ user: res.data.user }));
        onClose();
      }
    },
  });

  const handleChange = (e: TextInput) => {
    setBio(e.target.value);
  };

  return (
    <ModalStyle label="Update your bio" onClose={onClose}>
      <div className="space-y-1">
        <Textarea
          maxLength={100}
          onChange={handleChange}
          placeholder="A short description of yourself"
          className="rounded-lg bg-neutral-100 dark:bg-zinc-700"
          value={bio}
        />
      </div>

      <div className="my-1 w-full flex justify-end">
        <Button onClick={() => saveBio()} disabled={isPending}>
          Save
        </Button>
      </div>
    </ModalStyle>
  );
};

export default EditUsername;
