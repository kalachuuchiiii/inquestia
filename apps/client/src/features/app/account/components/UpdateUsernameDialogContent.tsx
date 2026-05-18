import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAccountActions } from "../hooks/useAccountActions";
import { useState } from "react";
import type { TextInput } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import _ from "lodash";
import { useAccount } from "../hooks/useAccount";

export const UpdateUsernameDialogContent = () => {
  const { updateUsername, isUpdatingUsername } = useAccountActions();
  const { data: user } = useAccount();

  const [username, setUsername] = useState(user?.username ?? "");

  const handleSetUsername = (e: TextInput) => {
    setUsername(e.target.value);
  };

  const hasNoDifference = _.isEqual(user?.username, username);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update your username</DialogTitle>
        <DialogDescription>Your unique identifier</DialogDescription>
      </DialogHeader>
      <Input
        value={username}
        onChange={handleSetUsername}
        placeholder="@hometownhero"
      />
      <DialogFooter>
        <Button
          onClick={() => updateUsername(username)}
          disabled={isUpdatingUsername || hasNoDifference}
          className="inquestia-button"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
