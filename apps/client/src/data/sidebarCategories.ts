import {
  CircleStar,
  Clock,
  Cog,
  Handshake,
  Home,
  Plus,
  Search,
  StarsIcon,
  User,
  type LucideIcon,
} from "lucide-react";

type Route = {
  label: string;
  to: string;
  icon: LucideIcon;
};

type Category = {
  name: string;
  routes: Route[];
};

export const categories: Category[] = [
  {
    name: "Main",
    routes: [
      { label: "Feed", to: "/feed", icon: Home },
      { label: "Search", to: "/search", icon: Search },
      { label: "Leaderboards", to: "/leaderboard", icon: CircleStar },
    ],
  },
  {
    name: "Create",
    routes: [{ label: "Create", to: "/create", icon: Plus }],
  },
  {
    name: "Personal",
    routes: [
      { label: "Profile", to: "/my-profile", icon: User },
      { label: "My Responses", to: "/my-responses", icon: Clock },
    ],
  },
  {
    name: "Social",
    routes: [
      { label: "Shared to you", to: "/shared-surveys", icon: Handshake },
    ],
  },
  {
    name: "System",
    routes: [{ label: "Settings", to: "/settings", icon: Cog }],
  },
];
