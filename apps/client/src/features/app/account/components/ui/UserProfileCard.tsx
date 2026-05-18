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
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ChevronRight, X } from "lucide-react";
import type { User } from "@inquestia/schemas";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useAccount } from "../../hooks/useAccount";

const UserProfileCard = ({ user }: { user: User }) => {
  const displayName = user.nickname ?? user.username;
  const { data: authUser } = useAccount();

  return (
    <div className="space-y-6 lg:mt-6">
      <Dashboard user={user} />
      <p className="tracking-tighter italic mx-2">{user.bio}</p>
      <Separator />
      <div className="flex items-center gap-2">
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
              {user.socialLinks?.length > 0 ? (
                user.socialLinks?.map((link) => {
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
        {user._id === authUser?._id && (
          <div className="space-y-6 ">
            <Link to="/profile/manager">
              <Button variant={"default"} className="">
                <p>Profile Manager</p>
                <ChevronRight />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
