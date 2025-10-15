import { IoReorderThreeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { FaBolt } from "react-icons/fa6";
import { GiAtomicSlashes } from "react-icons/gi";
import { FaBell } from "react-icons/fa";

// Base NavBar wrapper
const NavBar = memo(
  ({
    onToggleSidebar,
    className = "",
    children,
  }) => {
    return (
      <nav
        className={`top-0 z-20 rounded-t-2xl left-0 inset-x-0 sticky h-19 
          px-6 py-4 w-full bg-blue-50 flex justify-between items-center 
           dark:bg-zinc-900/70 backdrop-blur-md 
          shadow-sm transition-colors ${className}`}
      >
        {children}
      </nav>
    );
  }
);

// Group wrapper for navbar items
NavBar.Relate = memo(({ gap = "gap-4", children }) => {
  return <div className={`flex items-center ${gap}`}>{children}</div>;
});

// Brand / App name
NavBar.App = memo(({ disabled = false }) => {
  const { mode } = useSelector((state) => state.theme);
  const textColor = mode === "Dark" ? "text-white" : "text-gray-900";

  return (
    <NavLink to = '/home'
      className={`font-bold text-xl tracking-tight select-none 
        transition-colors ${textColor} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      Inquestia<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">.ask</span>
    </NavLink>
  );
});

import { useState, useRef, useEffect } from "react";
import NotificationDropdown from "./dropdown/NotificationDropdown";




NavBar.Points = () => {
  const { user = { core: { current: 0 }, boosterPoint: 0 } } = useSelector(state => state.user);
  return (
    <div className="flex items-center gap-3 px-3 py-1 rounded-xl  shadow ">
      <div className="flex items-center text-pink-600 gap-1">
        <GiAtomicSlashes className="" size={18} />
        <span className="font-bold  text-sm">{user.core.current}</span>
        <span className="text-xs text-gray-500 ml-1">Cores</span>
      </div>
      <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-2" />
      <div className="flex items-center gap-1">
        <FaBolt className="text-blue-500" size={16} />
        <span className="font-bold text-blue-700 dark:text-blue-200 text-sm">{user.boosterPoint || 0}</span>
        <span className="text-xs text-gray-500 ml-1">Boost</span>
      </div>
    </div>
  );
}

NavBar.NotificationBell = () => {
  const { hasUnreadNotifications } = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative z-50" ref={bellRef}>
      <div className="grid grid-cols-1 grid-rows-1 place-content-center cursor-pointer" onClick={() => setOpen(o => !o)}>
        {hasUnreadNotifications && (
          <div className="w-full z-20 row-start-1 col-start-1 flex justify-end items-start">
            <div className="size-2 bg-red-500 rounded-full aspect-square"></div>
          </div>
        )}
        <div className="row-start-1 col-start-1">
          <FaBell size={20} />
        </div>
      </div>
      {open && (
     <NotificationDropdown />
      )}
    </div>
  );
}
NavBar.SideBarToggler = memo(({ onToggleSidebar = () => {}, size = 24 }) => {
  const { mode } = useSelector((state) => state.theme);
  const iconColor = mode === "Dark" ? "white" : "black";

  return (
    <button
      onClick={onToggleSidebar}
      aria-label="Toggle Sidebar"
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
    >
      <IoReorderThreeOutline color={iconColor} size={size} />
    </button>
  );
});

// Auth button (login/signup)
NavBar.SignUp = memo(() => {
  return (
    <a
      href="/login"
      aria-label="Login"
      className="px-5 py-2 font-medium text-white 
        bg-blue-600 rounded-xl shadow-md 
        hover:bg-blue-700 active:scale-95 
        transition-transform"
    >
      Login
    </a>
  );
});

export default NavBar;
