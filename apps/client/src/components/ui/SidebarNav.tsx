import { NavLink } from "react-router-dom";
import { FaRankingStar, FaRobot } from "react-icons/fa6";
import { CiUser, CiSearch } from "react-icons/ci";
import { GoPlus, GoHome } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "lucide-react";

const iconBase =
  "size-10 flex items-center justify-center rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-md dark:hover:shadow-blue-900/40";

type NavItemProps = {
  to: string;
  label: string;
  children: React.ReactNode;
};

function NavItem({ to, label, children }: NavItemProps) {
  const isMobile = useIsMobile();

  return (
    <NavLink
      to={to}
      className="flex py-5 px-3 w-full  pr-4  items-center gap-4 group"
    >
      {children}
      {!isMobile && (
        <span className="text-lg truncate text-center text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-white transition">
          {label}
        </span>
      )}
    </NavLink>
  );
}

export default function SidebarNav() {
  return (
    <div className="flex w-full flex-row lg:pb-60 fixed lg:relative  dark:bg-background  bottom-0 lg:flex-col  gap-4">
      {/* Create */}
      <NavItem to="/create" label="Create">
        <div className="flex items-center  justify-center rounded-xl transition-all duration-300 ease-out hover:scale-105 dark:hover:shadow-blue-900/40 inquestia-button">
          <GoPlus className="size-10" />
        </div>
      </NavItem>
       <NavItem to="/my-profile" label="Profile">
        <div
          className={`${iconBase} bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-zinc-800`}
        >
          <User size={22} />
        </div>
      </NavItem>

      {/* Feed */}
      <NavItem to="/feed" label="Feed">
        <div
          className={`${iconBase} bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-zinc-800`}
        >
          <GoHome size={22} />
        </div>
      </NavItem>

      {/* Search */}
      <NavItem to="/search" label="Search">
        <div
          className={`${iconBase} bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-zinc-800`}
        >
          <CiSearch size={22} />
        </div>
      </NavItem>

      {/* Leaderboards */}
      <NavItem to="/leaderboard" label="Leaderboards">
        <div
          className={`${iconBase} bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-zinc-800`}
        >
          <FaRankingStar size={20} />
        </div>
      </NavItem>

      {/* Responses */}
      <NavItem to="/my-responses" label="My Responses">
        <div
          className={`${iconBase} bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-zinc-800`}
        >
          <MdHistory size={22} />
        </div>
      </NavItem>

      {/* Shared */}
      <NavItem to="/shared-surveys" label="Shared to you">
        <div
          className={`${iconBase} bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-zinc-800`}
        >
          <FaHandshake size={20} />
        </div>
      </NavItem>

      {/* Inko */}
      <NavItem to="/inko" label="Inko">
        <div
          className={`${iconBase} bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-zinc-800`}
        >
          <FaRobot size={22} />
        </div>
      </NavItem>

      {/* Settings */}
      <NavItem to="/settings" label="Settings">
        <div
          className={`${iconBase} bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-zinc-800`}
        >
          <TbSettings2 size={22} />
        </div>
      </NavItem>
    </div>
  );
}
