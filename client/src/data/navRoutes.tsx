import { FaRankingStar, FaRobot } from "react-icons/fa6";
import { CiUser, CiSearch } from "react-icons/ci";
import { GoPlus, GoHome } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa";

const iconBase =
  "size-10 flex items-center justify-center rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-md dark:hover:shadow-blue-900/40";

export const navRoutes = [
  // 🌟 Highlighted "Create"
  {
    path: "/create",
    label: "Create",
    icon: (
      <div
        className={`flex items-center size-10 md:size-16 justify-center rounded-xl transition-all duration-300 ease-out hover:scale-105 dark:hover:shadow-blue-900/40
         inquestia-bg
          text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] 
          hover:shadow-[0_0_25px_rgba(129,140,248,0.8)] 
          border border-white/20 scale-110`}
      >
        <GoPlus className="size-12 md:size-40"/>
      </div>
    ),
  },

  // 🏠 Home
  {
    path: "/home",
    label: "Home",
    icon: (
      <div
        className={`${iconBase} 
          bg-neutral-100 dark:bg-zinc-900 
          text-neutral-700 dark:text-neutral-200 
          border border-neutral-200 dark:border-zinc-800`}
      >
        <GoHome size={22} />
      </div>
    ),
  },

  // 🔍 Browse
  {
    path: "/browse",
    label: "Browse",
    icon: (
      <div
        className={`${iconBase} 
          bg-neutral-100 dark:bg-zinc-900 
          text-neutral-700 dark:text-neutral-200 
          border border-neutral-200 dark:border-zinc-800`}
      >
        <CiSearch size={22} />
      </div>
    ),
  },

  // 👤 Profile
  {
    path: "/profile",
    label: "Profile",
    icon: (
      <div
        className={`${iconBase} 
          bg-neutral-100 dark:bg-zinc-900 
          text-neutral-700 dark:text-neutral-200 
          border border-neutral-200 dark:border-zinc-800`}
      >
        <CiUser size={22} />
      </div>
    ),
  },

  // 🏆 Leaderboard
  {
    path: "/leaderboard",
    label: "Leaderboards",
    icon: (
      <div
        className={`${iconBase} 
          bg-neutral-100 dark:bg-zinc-900 
          text-neutral-700 dark:text-neutral-200 
          border border-neutral-200 dark:border-zinc-800`}
      >
        <FaRankingStar size={20} />
      </div>
    ),
  },

  // 📜 Response History
  {
    path: "/response-history",
    label: "Response History",
    icon: (
      <div
        className={`${iconBase} 
          bg-neutral-100 dark:bg-zinc-900 
          text-neutral-700 dark:text-neutral-200 
          border border-neutral-200 dark:border-zinc-800`}
      >
        <MdHistory size={22} />
      </div>
    ),
  },

  // 🤝 Shared Surveys
  {
    path: "/shared-surveys",
    label: "Shared to you",
    icon: (
      <div
        className={`${iconBase} 
          bg-neutral-100 dark:bg-zinc-900 
          text-neutral-700 dark:text-neutral-200 
          border border-neutral-200 dark:border-zinc-800`}
      >
        <FaHandshake size={20} />
      </div>
    ),
  },
   {
    path: "/chatbot",
    label: "Inko",
    icon: (
      <div
        className={`${iconBase} 
          bg-neutral-100 dark:bg-zinc-900 
          text-neutral-700 dark:text-neutral-200 
          border border-neutral-200 dark:border-zinc-800`}
      >
        <FaRobot size={22} />
      </div>
    ),
  },

  // ⚙️ Settings
  {
    path: "/settings",
    label: "Settings",
    icon: (
      <div
        className={`${iconBase} 
          bg-neutral-100 dark:bg-zinc-900 
          text-neutral-700 dark:text-neutral-200 
          border border-neutral-200 dark:border-zinc-800`}
      >
        <TbSettings2 size={22} />
      </div>
    ),
  },
];
