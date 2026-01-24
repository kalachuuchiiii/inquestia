import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAccountActions } from "../hooks/useAccountActions";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useState } from "react";
import type { TextInput } from "@/types";
import { Button } from "@/components/ui/button";

export const UpdateBioDialogContent = () => {
  const { updateBio, isUpdatingBio } = useAccountActions();
  const { user } = useAppSelector(state => state.user);
  const [bio, setBio] = useState(user.bio);

  const handleSetBio = (e: TextInput) => {
    setBio(e.target.value);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update your bio</DialogTitle>
        <DialogDescription>
            Tell people something about you
        </DialogDescription>
      </DialogHeader>
      <Textarea value = {bio} onChange={handleSetBio} placeholder="Who knows?" />
      <DialogFooter>
        <Button onClick={() => updateBio(bio)} disabled = {isUpdatingBio} className="inquestia-button">
            Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
