
import { NavLink } from "react-router-dom";
import { FaBolt } from "react-icons/fa6";
import { GiAtomicSlashes } from "react-icons/gi";
import {  FaBook } from "react-icons/fa";
import { UserBadge } from "./UserBadge";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { AppIcon } from "./AppIcon";
import millify from "millify";

// Base NavBar wrapper
const AppNavigationBar = () => {
  const { user } = useAppSelector((state) => state.user);
  const isMobile = useIsMobile();

  return (
    <nav
      className={`top-0 bg-white z-20 rounded-t-2xl left-0 inset-x-0 sticky h-19 
          px-6 py-4 w-full flex justify-center lg:justify-between items-center 
           dark:bg-zinc-900/70 backdrop-blur-md 
          shadow-sm `}
    >
      <AppIcon className="lg:size-50 size-16" />
      <div className="flex  items-center gap-3">
        <div className={`flex items-center `}>
          <>
            <div className="flex lg:text-base text-sm items-center gap-3 px-3 py-1 rounded-xl  shadow ">
              <div>
                <NavLink
                  className={"flex items-center gap-1 truncate"}
                  to="/documentation"
                >
                  {" "}
                  <FaBook /> {!isMobile && <p>Documentation</p>}
                </NavLink>
              </div>
              <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-2" />
              <div className="flex items-center text-pink-600 gap-1">
                <GiAtomicSlashes className="" size={18} />
                <span className="font-bold">
                  {millify(user?.core?.current ?? 0, { precision: 2 })}
                </span>
                {!isMobile && (
                  <span className="text-xs text-gray-500 ml-1">Cores</span>
                )}
              </div>
              <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-2" />
              <div className="flex items-center gap-1">
                <FaBolt className="text-blue-500" size={16} />
                <span className="font-bold text-blue-700 dark:text-blue-200 ">
                  {user.boosterPoint ?? 0}
                </span>
                {!isMobile && <span className="text-gray-500 ml-1">Boost</span>}
              </div>
            </div>
          </>
        </div>
        <UserBadge user={user} >
           <UserBadge.Avatar />
        </UserBadge> 
      </div>
    </nav>
  );
};

export default AppNavigationBar;
