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
import _ from "lodash";

export const UpdateNicknameDialogContent = () => {
  const { updateNickname, isUpdatingNickname } = useAccountActions();
  const { user } = useAppSelector((state) => state.user);
  const [nickname, setNickname] = useState<string>(user.nickname ?? "");

  const handleSetNickname = (e: TextInput) => {
    setNickname(e.target.value);
  };

  const hasNoDifference = _.isEqual(user.nickname, nickname);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update your nickname</DialogTitle>
        <DialogDescription>Your display name</DialogDescription>
      </DialogHeader>
      <Input
        value={nickname}
        onChange={handleSetNickname}
        placeholder="Hometownhero"
      />
      <DialogFooter>
        <Button
          onClick={() => updateNickname(nickname)}
          disabled={isUpdatingNickname || hasNoDifference}
          className="inquestia-button"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
