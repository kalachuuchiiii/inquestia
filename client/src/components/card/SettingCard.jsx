import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import useToggler from "../../hooks/useToggler.js";
import LogoutModal from "../modals/LogoutModal.jsx";
import { changeTheme } from "../../state/slice/theme.js";

import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import { resetState } from "../../state/slice/user.js";
import useSwal from "../../hooks/useSwal.js";

const SettingButton = ({ children = null, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-zinc-800 dark:to-zinc-900 shadow hover:shadow-md transition-all border border-blue-100 dark:border-zinc-800 hover:scale-[1.02]"
    >
      {children}
    </button>
  );
};

const SettingCard = ({ children = null }) => {
  return (
    <div className="max-w-2xl mx-auto w-full py-8 px-2">
      <div className="mb-8 p-6 rounded-2xl  text-center">
        <h1 className="text-4xl lato font-extrabol text-zinc-950 dark:text-neutral-100 mb-2 drop-shadow">Settings</h1>
        <p className="text-base text-gray-600 dark:text-gray-300">Adjust themes, and manage your account to your preferences</p>
      </div>
      <div className="space-y-5">{children}</div>
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
    <div className="w-full flex text-zinc-950 dark:text-neutral-100 justify-between items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-zinc-800 dark:to-zinc-900 shadow border border-blue-100 dark:border-zinc-800">
      <span className="font-medium ">Theme</span>
      <select
        value={mode}
        onChange={handleChangeTheme}
        className="rounded px-3 py-1  bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-zinc-950 dark:text-neutral-100 focus:outline-none shadow"
      >
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
      </select>
    </div>
  );
};

SettingCard.ExchangeCenter = () => {

  return  <SettingButton>
      <NavLink to="/exchange-center">
        <p>Exchange Center</p>
      </NavLink>
    </SettingButton>
}

// Section with label + children
SettingCard.NewOption = ({ label = "", children = null }) => {
  return (
    <div className="rounded-2xl py-4 px-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-zinc-800 dark:to-zinc-900 shadow border border-blue-100 dark:border-zinc-800">
      <p className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-200">{label}</p>
      <div className="flex flex-col gap-2 items-start text-sm ">{children}</div>
    </div>
  );
};

// Logout
SettingCard.Logout = () => {
  const swal = useSwal()
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [handleLogout, { isLoading, error }] = useAsync(async () => {
    const res = await fetchApi("post", "/user/logout");
    if (res?.success) {
      dispatch(resetState());
      nav("/login");
    }
  });
  const logout = () => {
    swal(
      {
        icon: "warning",
        title: "Are you sure you want to Logout?",
        text: "You will need to log in again to access your account.",
        confirmButtonColor: "#06b6d4",
        confirmButtonText: "Yes, Log me out",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      },
      handleLogout
    );
  }
 
  return (
    <>
      <SettingButton >
        <button onClick = {logout} className="text-red-400 text-left w-full">Logout</button>
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
