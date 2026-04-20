import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ArrowRight, ArrowRightLeft } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { useAccountActions } from "../hooks/useAccountActions";
import { toast } from "sonner";

export const UpdateAvatarDialogContent = () => {
  const [formData] = useState(new FormData());
  const [avatarFile, setAvatarFile] = useState<undefined | string>(undefined);
  const { user } = useAppSelector((state) => state.user);

  const { updateAvatar, isUpdatingAvatar } = useAccountActions();
  
  const handleSetAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? undefined;
    if (!file){
      toast.info("Missing file.");
      return;
    }
    formData.append("avatar", file);
    const previewSrc = URL.createObjectURL(file);
    setAvatarFile(previewSrc);
  };

  return (
    <DialogContent className="w-full">
      <DialogHeader>
        <DialogTitle>Update your avatar</DialogTitle>
        <DialogDescription>1x1 image</DialogDescription>
      </DialogHeader>
      <div className="flex items-center  justify-center w-full">
        <div className="flex flex-col justify-center items-center gap-2">
          <Avatar className="size-25 lg:size-35  avatar-ring">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>Your avatar</AvatarFallback>
          </Avatar>
          <Button disabled variant={"outline"}>
            Your avatar
          </Button>
        </div>
        <ArrowRight className="size-10" />
        <div className="flex flex-col justify-center items-center gap-2">
          <Avatar className="size-25 lg:size-45 avatar-ring">
            <AvatarImage src={avatarFile} />
            <AvatarFallback>New avatar</AvatarFallback>
          </Avatar>
          <Input
            className="w-30 lg:w-60"
            onChange={handleSetAvatar}
            type="file"
            accept="image/*"
          />
        </div>
      </div>
      <DialogFooter >
        <Button
          onClick={() => updateAvatar(formData)}
          disabled={!avatarFile || isUpdatingAvatar}
          className="inquestia-button w-full mt-4"
        >
          Upload Avatar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
