import { useIsMobile } from "@/hooks/use-mobile";
import SidebarNav from "./SidebarNav";
import { useAppSelector } from "@/hooks/useAppSelector";
import { UserBadge } from "./UserBadge";

const AppSidebar = () => {
  const isMobile = useIsMobile();
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className=" sticky top-0 lg:w-3/12 z-200   ">
      <div className="rounded relative   w-full scrollbar-none  bottom-0 z-100">
       {
        !isMobile && ( <div className="flex items-center gap-3 pb-8 py-4 border-b border-gray-200 dark:border-gray-800">
       
          <UserBadge user={user} className="flex items-center gap-2">
            <UserBadge.Avatar className="size-14" />
            <div>
              <UserBadge.Nickname className="text-xl font-semibold" />
              <UserBadge.Username/>
            </div>
          </UserBadge>
        </div>)
       }
        <aside className=" overflow-y-auto h-screen  w-full dark:bg-zinc-950  ">
          <nav className=" w-full flex items-start overflow-scroll">
            <SidebarNav />
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default AppSidebar;
