import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/AppSidebar.js";

import { useState, useEffect, useRef } from "react";
import UsersWithSameInterests from "../features/app/account/components/UsersWithSimilarInterests.js";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import AppSidebar from "../components/ui/AppSidebar.js";
import { useIsMobile } from "@/hooks/use-mobile.js";
import AppNavigationBar from "@/components/ui/AppNavigationBar.js";
import { TooltipProvider } from "@/components/ui/tooltip.js";

const AuthenticatedLayout = () => {
  const { user, accessToken } = useAppSelector((state) => state.user);
  const upperRef = useRef(null);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-screen w-full">
      <AppNavigationBar />

      <div className="flex gap-3 max-w-450 px-3 w-full py-5 mx-auto overflow-y-auto ">
        {!!accessToken && <AppSidebar />}

       <div className="lg:w-11/12 w-full scrollbar-none">
         <TooltipProvider>
          <Outlet />
        </TooltipProvider>
       </div>

        {!isMobile && !!accessToken && <UsersWithSameInterests />}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
