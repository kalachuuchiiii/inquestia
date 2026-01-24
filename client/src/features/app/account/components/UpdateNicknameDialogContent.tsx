import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAccountActions } from "../hooks/useAccountActions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useState } from "react";
import type { TextInput } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const UpdateNicknameDialogContent = () => {
  const { updateNickname, isUpdatingNickname } = useAccountActions();
  const { user } = useAppSelector((state) => state.user);
  const [username, setNickname] = useState(user.nickname);

  const handleSetNickname = (e: TextInput) => {
    setNickname(e.target.value);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update your username</DialogTitle>
        <DialogDescription>Your display name</DialogDescription>
      </DialogHeader>
      <Input
        value={username}
        onChange={handleSetNickname}
        placeholder="Hometownhero"
      />
      <DialogFooter>
        <Button
          onClick={() => updateNickname(username)}
          disabled={isUpdatingNickname}
          className="inquestia-button"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
