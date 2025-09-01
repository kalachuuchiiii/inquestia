import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import useToggler from "../../hooks/useToggler.js";
import LogoutModal from "../modals/LogoutModal.jsx";
import { changeTheme } from "../../state/slice/theme.js";

const SettingButton = ({ children = null, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center p-2"
    >
      {children}
    </button>
  );
};

const SettingCard = ({ children = null }) => {
  return (
    <div>
      <div className="my-8 p-2">
        <h1 className="text-4xl lato">Settings</h1>
        <p className="text-base">
          Adjust themes, and manage your account to your preferences
        </p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// Theme Selector
SettingCard.Theme = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  const handleChangeTheme = (e) => {
    dispatch(changeTheme(e.target.value));
  };

  return (
    <div className="w-full justify-between flex p-2">
      <p>Theme</p>
      <select
        value={mode}
        onChange={handleChangeTheme}
        className="outline-none"
      >
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
      </select>
    </div>
  );
};

// Section with label + children
SettingCard.NewOption = ({ label = "", children = null }) => {
  return (
    <div className="rounded-lg py-3 px-6">
      <p className="font-bold text-lg my-3">{label}</p>
      <div className="flex flex-col gap-1 items-start text-sm divide-y-1">
        {children}
      </div>
    </div>
  );
};

// Logout
SettingCard.Logout = () => {
  const [isLogoutModalOpen, , close, toggle] = useToggler();

  return (
    <>
      <AnimatePresence>
        {isLogoutModalOpen && <LogoutModal onClose={close} />}
      </AnimatePresence>
      <SettingButton onClick={toggle}>
        <span className="text-red-400">Logout</span>
      </SettingButton>
    </>
  );
};

// Account Edit
SettingCard.Account = () => {
  return (
    <SettingButton>
      <NavLink to="/profile/edit">
        <p>Update profile</p>
      </NavLink>
    </SettingButton>
  );
};

export default SettingCard;
