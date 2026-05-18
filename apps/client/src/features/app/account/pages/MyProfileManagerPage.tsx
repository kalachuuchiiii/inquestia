import { Button } from "@/components/ui/button.js";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.js";
import {
  EyeOffIcon,
  Image,
  MailCheckIcon,
  Pencil,
  Plus,
  Waypoints,
} from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item.js";
import { Separator } from "@/components/ui/separator.js";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.js";
import { UpdateBioDialogContent } from "@/features/app/account/components/UpdateBioDialogContent.js";
import { UpdateUsernameDialogContent } from "@/features/app/account/components/UpdateUsernameDialogContent.js";
import { UpdateNicknameDialogContent } from "@/features/app/account/components/UpdateNicknameDialogContent.js";
import { UpdateAvatarDialogContent } from "@/features/app/account/components/UpdateAvatarDialogContent.js";
import { UpdateSocialLinksDialogContent } from "@/features/app/account/components/UpdateSocialLinksDialogContent.js";
import { UpdatePasswordOTPForm } from "@/features/auth/components/UpdatePasswordOTPForm.js";
import { useUpdatePassword } from "@/features/auth/hooks/useUpdatePassword.js";
import { useAccount } from "../hooks/useAccount";
import { Link } from "react-router-dom";

const MyProfileManagerPage = () => {
  const { data: user } = useAccount();
  const updatePasswordControl = useUpdatePassword();
  if (!user) return;
  return (
    <div className="w-full pt-8 lg:flex gap-4 mx-auto">
      <aside>
        <div className="flex flex-col items-center justify-center gap-4">
          <Avatar className="size-50 avatar-ring">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"}>
                <Image /> Update avatar
              </Button>
            </DialogTrigger>
            <UpdateAvatarDialogContent />
          </Dialog>
        </div>
      </aside>
      <main className="w-full">
        <Item>
          <ItemContent>
            <ItemTitle>{user.nickname ?? "..."}</ItemTitle>
            <ItemDescription>Update your nickname</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"}>
                  <Pencil />
                </Button>
              </DialogTrigger>
              <UpdateNicknameDialogContent />
            </Dialog>
          </ItemActions>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>@{user.username ?? "..."}</ItemTitle>
            <ItemDescription>Update your username</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"}>
                  <Pencil />
                </Button>
              </DialogTrigger>
              <UpdateUsernameDialogContent />
            </Dialog>
          </ItemActions>
        </Item>

        <Item>
          <ItemContent>
            <ItemTitle>{user.bio ?? "..."}</ItemTitle>
            <ItemDescription>Update your bio</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"}>
                  <Pencil />
                </Button>
              </DialogTrigger>
              <UpdateBioDialogContent />
            </Dialog>
          </ItemActions>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Interests</ItemTitle>
            <ItemDescription>Update your interests</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Link to={`/interests`}>
              <Button variant={"outline"}>
                <Plus />
              </Button>
            </Link>
          </ItemActions>
        </Item>
        <Separator orientation="horizontal" className="my-4" />
        <Item>
          <ItemContent>
            <ItemTitle>
              <div className="flex items-center gap-2">
                <MailCheckIcon /> <p>{user.credential.email}</p>
              </div>
            </ItemTitle>
            <ItemDescription>Verified Email</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>
              <div className="flex items-center gap-2">
                <EyeOffIcon className="size-4" /> <p>**********</p>
              </div>
            </ItemTitle>
            <ItemDescription>Update your password</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"}>
                  <Pencil />
                </Button>
              </DialogTrigger>
              <UpdatePasswordOTPForm
                updatePasswordControl={updatePasswordControl}
              />
            </Dialog>
          </ItemActions>
        </Item>
        <Separator orientation="horizontal" className="my-4" />
        <Item>
          <ItemContent>
            <ItemTitle>
              {" "}
              <Waypoints /> Social Links
            </ItemTitle>
            {user.socialLinks.length > 0 ? (
              user.socialLinks.map((s) => (
                <ItemDescription>{s}</ItemDescription>
              ))
            ) : (
              <ItemDescription>No social links.</ItemDescription>
            )}
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"}>
                  <Pencil />
                </Button>
              </DialogTrigger>
              <UpdateSocialLinksDialogContent />
            </Dialog>
          </ItemActions>
        </Item>
      </main>
    </div>
  );
};

export default MyProfileManagerPage;
