import UserProfile from "../../components/card/UserProfileCard.jsx";

import { useSelector } from "react-redux";

import ArrowButton from "../../components/html/ArrowButton.jsx";
import { Outlet, NavLink, Link } from "react-router-dom";
import usePath from "../../hooks/usePath.js";
import { Button } from "@/components/ui/button.js";
import { ChevronRight } from "lucide-react";
const Profile = () => {
  const { user = {} } = useSelector((state) => state.user);

  const { isInThisPath } = usePath();

  return (
    <>
      <div className=" space-y-3 py-4 md:py-0">
        <div className=" p-6 shadow-lg space-y-3 rounded-lg">
          <div className="space-y-4">
            <UserProfile user={user} />
          </div>
          <div className="space-y-6 mt-5">
            <Link to="/profile/edit">
              <Button variant={"outline"}>
                <p>View Account</p>
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-1 w-full justify-center items-center">
          <NavLink
            to="/profile"
            className={` text-center w-full  p-2 ${
              isInThisPath("/profile") &&
              " border-b-zinc-900 dark:border-b-neutral-100  border-b-1"
            }`}
          >
            Posts
          </NavLink>
          <NavLink
            to="/profile/drafts"
            className={`  text-center w-full p-2 ${
              isInThisPath("/profile/drafts") &&
              " border-b-zinc-900 border-b-1 dark:border-b-neutral-100"
            }`}
          >
            Drafts
          </NavLink>
        </div>
        <div className="min-h-50 space-y-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Profile;
