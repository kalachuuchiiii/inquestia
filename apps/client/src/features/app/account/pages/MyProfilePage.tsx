
import UserProfile from "@/features/app/account/components/ui/UserProfileCard.js";
import {  Link } from "react-router-dom";
import { Button } from "@/components/ui/button.js";
import { ChevronRight } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import MySurveys from "@/features/app/survey/components/MySurveys.js";

const MyProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>  
      <div className=" space-y-3 py-4 md:py-0">
        <div className=" p-6  shadow-md  space-y-3 rounded-lg">
          <div className="space-y-4">
            <UserProfile user={user} />
          </div>
          <div className="space-y-6 mt-5">
            <Link to="/profile/manager">
              <Button variant={"outline"} className="inquestia-button">
                <p>Profile Manager</p>
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>

        <div className="min-h-50 space-y-2">
          <MySurveys />
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
