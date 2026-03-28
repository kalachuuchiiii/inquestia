import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserBadge } from "@/components/ui/UserBadge";
import Dashboard from "../UserDashboard";
import type { UserDTO } from "@inquestia/types";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { X } from "lucide-react";

const UserProfileCard = ({ user }: { user: UserDTO }) => {
  const displayName = user.nickname ?? user.username;

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <UserBadge user={user} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserBadge.Avatar className="size-10" />
            <div className="flex flex-col ">
              <UserBadge.Nickname className="font-semibold lg:text-lg" />
              <UserBadge.Username className="lg:text-base" />
            </div>
            <UserBadge.Badge />
          </div>
        </UserBadge>
        <p>{user.bio}</p>
      </header>
      <Dashboard user={user} />
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"}>Socials</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{displayName}'s Socials</DialogTitle>
            <DialogDescription>Check out my socials here</DialogDescription>
          </DialogHeader>
          <div className="my-2 divide-y-2 ">
            {user.socialLinks.length > 0 ? (
              user.socialLinks.map((link) => {
                return (
                  <a
                    target="_blank"
                    href={String(link)}
                    className="w-full hover:underline"
                  >
                    {link}{" "}
                  </a>
                );
              })
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia>
                    <X />
                  </EmptyMedia>
                  <EmptyTitle>
                    {displayName} has no socials set up yet.
                  </EmptyTitle>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileCard;
