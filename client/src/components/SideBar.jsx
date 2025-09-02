import AnimationWrapper from "./AnimationWrapper.jsx";
import { navRoutes } from "../data/navRoutes.jsx";
import NavBar from "./NavBar.jsx";
import NavIcon from "./NavIcon.jsx";
import UserIcon from "../components/UserIcon.jsx";
import { useSelector } from "react-redux";

const Sidebar = ({ onClose = () => {}, isLargeScreen = false }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <AnimationWrapper
      variants="fromLeft"
      className={`${
        isLargeScreen ? "sticky min-h-screen" : "fixed h-screen"
      } top-0 z-40 overflow-hidden`}
    >
      <aside className="flex flex-col w-68 h-screen bg-neutral-50 dark:bg-zinc-950 shadow-xl">
        {/* Header / Brand */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
          <NavBar.SideBarToggler onToggleSidebar={onClose} size="28" />
          <NavBar.App />
        </div>

        {/* User Info */}
       

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-6 overflow-y-auto scrollbar-none">
          {navRoutes?.length > 0 &&
            navRoutes.map((info) => (
              <NavIcon key={info.path} info={info} />
            ))}
        </nav>

        {/* Footer (optional for extra actions) */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500">
          © 2025 Inquestia.ask
        </div>
      </aside>
    </AnimationWrapper>
  );
};

export default Sidebar;
