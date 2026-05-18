import { useIsMobile } from "@/hooks/use-mobile";
import { useAppSelector } from "@/hooks/useAppSelector";
import { UserBadge } from "./UserBadge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./sidebar";
import { categories } from "@/data/sidebarCategories";
import { Link } from "react-router-dom";
import { useAccount } from "@/features/app/account/hooks/useAccount";

const AppSidebar = () => {
  const isMobile = useIsMobile();
  const { data: user } = useAccount();

  return (
    <Sidebar className="sticky top-0 pt-15 dark:bg-zinc-950">
      <SidebarHeader>
        {user && (
          <UserBadge user={user} className="flex p-3 items-center gap-4">
            <UserBadge.Avatar className="size-14" />
            <div>
              <UserBadge.Nickname className="text-xl font-semibold" />
              <UserBadge.Username />
            </div>
          </UserBadge>
        )}
      </SidebarHeader>
      <SidebarContent className="p-2 list-none">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Assistant</SidebarGroupLabel>

          <Link to={"/inka"}>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <img src="/inka.gif" /> <p className="text-lg ">Inka</p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarGroup>
        {categories.map(({ name, routes }) => {
          return (
            <SidebarGroup key={name}>
              <SidebarGroupLabel className="text-sm">{name}</SidebarGroupLabel>
              {routes.map(({ to, label, icon: Icon }) => (
                <Link to={to} key={to}>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Icon /> <p className="text-lg">{label}</p>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
