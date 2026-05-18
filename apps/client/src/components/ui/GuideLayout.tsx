import { Link, Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./sidebar";
import { Eye, Info, User, Workflow } from "lucide-react";
import { useAccount } from "@/features/app/account/hooks/useAccount";

export const GuideLayout = () => {
  const { data: user } = useAccount();

  const sections = [
    {
      label: "System & Account",
      children: [
        {
          id: "account",
          title: "Account",
          icon: <User />,
        },
        {
          id: "answers",
          title: "Answers & Visibility",
          icon: <Eye />,
        },

        { id: "algorithm", title: "Survey Algorithm", icon: <Workflow /> },
      ],
    },

    {
      label: "Progress & Rewards",
      children: [
        {
          id: "cores",
          title: "Cores (Points)",
          icon: <img src="/point.gif" />,
        },
        { id: "streaks", title: "Streaks", icon: <img src="/streak.gif" /> },
        {
          id: "leaderboards",
          title: "Leaderboards",
          icon: <img src="/leaderboard.gif" />,
        },
        {
          id: "inka",
          title: "Conversation (Inka)",
          icon: <img src="/inka.gif" />,
        },

        { id: "badges", title: "Badges", icon: <img src="/badge.png" /> },
      ],
    },
  ];

  return (
    <div>
      <SidebarProvider className="max-w-7xl relative mx-auto">
        <Sidebar className="sticky left-0 top-0">
          <SidebarHeader className="my-6">
            <h1 className="text-3xl font-bold tracking-tighter">Inquestia</h1>
          </SidebarHeader>
          <SidebarContent>
            {sections.map((s) => (
              <SidebarGroup>
                <SidebarGroupLabel>{s.label}</SidebarGroupLabel>
                {s.children.map((r) => (
                  <a href={`/documentation#${r.id}`}>
                    <SidebarMenuButton>
                      {r.icon}
                      {r.title}
                    </SidebarMenuButton>
                  </a>
                ))}
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
