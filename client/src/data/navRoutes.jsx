import { FaRankingStar } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { BsCollection } from "react-icons/bs";
import { TbSettings2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { RiFilePaper2Line } from "react-icons/ri";

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
      path: "/surveys", 
      label: "Your surveys", 
      icon: <BsCollection />
    },
    {
      path: "/quests", 
      label: "Quests", 
      icon: <RiFilePaper2Line />
    },
    {
      path: "/settings", 
      label: "Settings", 
      icon: <TbSettings2 />
    },
    {
      path: "/templates", 
    label: "Create a Survey", 
    icon: <GoPlus />
    }
  ]