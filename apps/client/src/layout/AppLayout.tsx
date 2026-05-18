import { Navigate, Outlet } from "react-router-dom";
import UsersWithSameInterests from "../features/app/account/components/UsersWithSimilarInterests.js";
import AppSidebar from "../components/ui/AppSidebar.js";
import AppNavigationBar from "@/components/ui/AppNavigationBar.js";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAccount } from "@/features/app/account/hooks/useAccount";

const AppLayout = () => {
  const { isPending, error } = useAccount();

  if (error && !isPending) {
    return <Navigate to={`/sign-in`} />;
  }
  return (
    <div className="flex flex-col   w-full ">
      <AppNavigationBar />
      <SidebarProvider className="max-w-7xl   w-full mx-auto">
        <SidebarProvider className="w-fit relative p-0 ">
          <AppSidebar />
          <SidebarTrigger />
        </SidebarProvider>
        <SidebarInset className="bg-transparent  ">
          <div className="lg:px-4 w-full mt-16 lg:mt-13 ">
            <Outlet />
          </div>
        </SidebarInset>
        <SidebarProvider className="p-0 w-fit relative">
          <SidebarTrigger className="" />
          <UsersWithSameInterests />
        </SidebarProvider>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
