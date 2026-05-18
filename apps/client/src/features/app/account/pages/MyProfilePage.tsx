import UserProfile from "@/features/app/account/components/ui/UserProfileCard.js";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.js";
import { ChevronRight } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import MySurveys from "@/features/app/survey/components/MySurveys.js";
import { useAccount } from "../hooks/useAccount";

const MyProfilePage = () => {
  const { data: user } = useAccount();
  if (!user) return;
  return (
    <>
      <div className=" space-y-3 pb-4 md:py-0">
        <div className="  space-y-3 rounded-lg">
          <div className="space-y-4">
            <UserProfile user={user} />
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
