import { FaRankingStar } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
export const navRoutes = [
    {
    path: "/home", 
    label: "Homepage", 
    icon: <GoHome />
    },
    {
    path: "/profile", 
    label: "Profile", 
    icon: <CiUser />
    }, 
  {
    path: "/leaderboard", 
    label: "Leaderboards", 
    icon: <FaRankingStar />
    }, 
    {
      path: '/response-history', 
      label: "Response History", 
      icon: <MdHistory />
    },
    {
      path: "/settings", 
      label: "Settings", 
      icon: <TbSettings2 />
    },
    {
      path: "/create", 
    label: "Create a Survey", 
    icon: <GoPlus />
    }
  ]