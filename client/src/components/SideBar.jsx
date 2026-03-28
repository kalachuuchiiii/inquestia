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
      className={`sticky md:min-h-screen  bottom-0  dark:bg-black  md:top-0 z-40  `}
    >
      <aside className="flex justify-start  items-start flex-col  md:h-screen  ">
        <nav className="  w-[100vw] md:w-fit flex md:flex-col  overflow-auto scrollbar-none">
          {navRoutes?.length > 0 &&
            navRoutes.map((info) => (
              <NavIcon
                isLargeScreen={isLargeScreen}
                key={info.path}
                info={info}
              />
            ))}
        </nav>

        {isLargeScreen && (
          <div className="px-4 hidden md:block py-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500">
            © 2025 Inquestia.ask
          </div>
        )}
      </aside>
    </AnimationWrapper>
  );
};

export default Sidebar;
