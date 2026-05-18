import { NavLink } from "react-router-dom";
import { UserBadge } from "./UserBadge";
import { useIsMobile } from "@/hooks/use-mobile";
import millify from "millify";
import { useAccount } from "@/features/app/account/hooks/useAccount";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const AppNavigationBar = () => {
  const { data: user } = useAccount();
  const isMobile = useIsMobile();

  if (!user) return;

  return (
    <nav
      className={`top-0  z-50 pointer-events-none rounded-t-2xl left-0 inset-x-0 fixed h-20
          px-3 lg:px-6 py-4 w-full flex justify-center lg:justify-between items-center 
            bg-transparent
      `}
    >
      <header className="flex items-center">
        <p className="text-3xl tracking-tighter hidden lg:block font-bold">
          Inquestia
        </p>
      </header>
      <div className="flex  items-center gap-3">
        <div className={`flex items-center `}>
          <>
            <div className="flex flex items-center gap-6 ">
              <div className="pointer-events-auto">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      className={"flex items-center gap-1 truncate"}
                      to="/documentation"
                    >
                      <img src="/documentation.gif" className="size-6" />
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent>Documentation</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <img src="/streak.gif" />
                  <span className="font-bold">
                    {millify(user?.streak?.current ?? 0, { precision: 2 })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/point.gif" />
                  <span className="font-bold">
                    {millify(user?.core?.current ?? 0, { precision: 2 })}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <img src="/boost.gif" />
                  <span className="font-bold">{user.boosterPoint ?? 0}</span>
                </div>
              </div>
            </div>
          </>
        </div>
        <UserBadge user={user}>
          <UserBadge.Avatar />
        </UserBadge>
      </div>
    </nav>
  );
};

export default AppNavigationBar;
