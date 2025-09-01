import { IoReorderThreeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { memo } from "react";

// Base NavBar wrapper
const NavBar = memo(
  ({
    onToggleSidebar,
    className = "",
    children,
  }) => {
    return (
      <nav
        className={`top-0 z-20 left-0 inset-x-0 sticky h-19 
          px-6 py-4 w-full flex justify-between items-center 
          bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md 
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
    <p
      className={`font-bold text-xl tracking-tight select-none 
        transition-colors ${textColor} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      Inquestia<span className="text-blue-600">.ask</span>
    </p>
  );
});

// Sidebar toggler (mobile menu)
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
        transition-transform transition-colors"
    >
      Login
    </a>
  );
});

export default NavBar;
