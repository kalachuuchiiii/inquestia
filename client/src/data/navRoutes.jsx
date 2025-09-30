import { FaRankingStar } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

const size = 25;

export const navRoutes = [
  {
    path: "/create",
    label:'Create',
    icon: (
      <div className="size-10 aspect-square rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-200 dark:from-indigo-700 dark:via-blue-900 dark:to-blue-950 shadow-lg flex items-center justify-center  font-bold transition-all duration-200 hover:scale-110 border-2 border-blue-100 dark:border-blue-950">
        <GoPlus size={28} />
      </div>
    ),
  },
  {
    path: "/home",
    label: 'Home',
    icon: (
      <div className="size-10 aspect-square rounded-full bg-gradient-to-br from-blue-200 via-blue-400 to-indigo-300 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-900 shadow flex items-center justify-center  transition-all duration-200 hover:scale-110">
        <GoHome size={22} />
      </div>
    ),
  },
  {
    path: "/browse",
    label: 'Browse',
    icon: (
      <div className="size-10 aspect-square rounded-full bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200 dark:from-blue-700 dark:via-blue-900 dark:to-purple-900 shadow flex items-center justify-center  transition-all duration-200 hover:scale-110">
        <CiSearch size={22} />
      </div>
    ),
  },
  {
    path: "/profile",
    label: 'Profile',
    icon: (
      <div className="size-10 aspect-square rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200 dark:from-indigo-800 dark:via-purple-900 dark:to-blue-950 shadow flex items-center justify-center  transition-all duration-200 hover:scale-110">
        <CiUser size={22} />
      </div>
    ),
  },
  {
    path: "/leaderboard",
    label: 'Leaderboards',
    icon: (
      <div className="size-10 aspect-square rounded-full bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-800 shadow flex items-center justify-center transition-all  duration-200 hover:scale-110">
        <FaRankingStar size={22} />
      </div>
    ),
  },
  {
    path: "/response-history",
    label: 'Response History',
    icon: (
      <div className="size-10 aspect-square rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-800 shadow flex items-center justify-center  transition-all duration-200 hover:scale-110">
        <MdHistory size={22} />
      </div>
    ),
  },
  {
    path: "/settings",
    label: 'Settings',
    icon: (
      <div className="size-10 aspect-square rounded-full bg-gradient-to-br from-blue-100 via-blue-300 to-gray-200 dark:from-blue-950 dark:via-blue-900 dark:to-gray-800 shadow flex items-center justify-center  transition-all duration-200 hover:scale-110">
        <TbSettings2 size={22} />
      </div>
    ),
  },
];