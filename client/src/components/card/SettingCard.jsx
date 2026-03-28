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

/* ------------------------
   🔹 Reusable Button Wrapper
-------------------------*/
const SettingButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="group w-full flex justify-between items-center px-4 py-3 rounded-xl
               bg-neutral-100/60 dark:bg-zinc-900/60
               border border-neutral-200 dark:border-zinc-800
               hover:border-blue-400/50 hover:shadow-md dark:hover:shadow-blue-900/20
               transition-all duration-200 ease-out"
  >
    <div className="flex-1 text-left font-medium text-zinc-700 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
      {children}
    </div>
  </button>
);

/* ------------------------
   🔹 Card Container
-------------------------*/
const SettingCard = ({ children }) => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <div className="space-y-5">{children}</div>
  </div>
);

/* ------------------------
   🎨 Theme Selector
-------------------------*/
SettingCard.Theme = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  const handleChangeTheme = (e) => dispatch(changeTheme(e.target.value));

  return (
    <div className="flex items-center justify-between p-4 rounded-xl
                    bg-neutral-100/70 dark:bg-zinc-900/70
                    border border-neutral-200 dark:border-zinc-800
                    shadow-sm">
      <span className="font-semibold text-zinc-800 dark:text-zinc-100">
        Theme
      </span>
      <select
        value={mode}
        onChange={handleChangeTheme}
        className="rounded-lg px-3 py-1.5 text-sm font-medium
                   bg-white dark:bg-zinc-800 
                   border border-neutral-300 dark:border-zinc-700 
                   text-zinc-700 dark:text-zinc-100
                   focus:outline-none focus:ring-2 focus:ring-blue-400/60 
                   shadow-sm transition"
      >
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
      </select>
    </div>
  );
};

/* ------------------------
   💱 Exchange Center
-------------------------*/
SettingCard.ExchangeCenter = () => (
  <SettingButton>
    <NavLink to="/exchange-center">Exchange Center</NavLink>
  </SettingButton>
);

/* ------------------------
   🧩 Section Wrapper (Grouped Options)
-------------------------*/
SettingCard.NewOption = ({ label, children }) => (
  <div className="rounded-2xl p-5 
                  bg-neutral-50 dark:bg-zinc-900/80
                  border border-neutral-200 dark:border-zinc-800 
                  shadow-sm transition">
    <p className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-300">
      {label}
    </p>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

/* ------------------------
   🚪 Logout Button
-------------------------*/
SettingCard.Logout = () => {
  const swal = useSwal();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [handleLogout] = useAsync(async () => {
    const res = await fetchApi("post", "/user/logout");
    if (res?.success) {
      dispatch(resetState());
      nav("/login");
    }
  });

  const logout = () =>
    swal(
      {
        icon: "warning",
        title: "Logout?",
        text: "You’ll need to log in again to access your account.",
        confirmButtonColor: "#06b6d4",
        confirmButtonText: "Yes, log me out",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      },
      handleLogout
    );

  return (
    <SettingButton>
      <button
        onClick={logout}
        className="text-red-500 font-semibold w-full text-left hover:text-red-600 transition-colors"
      >
        Logout
      </button>
    </SettingButton>
  );
};

/* ------------------------
   ✏️ Account Edit
-------------------------*/
/* ------------------------
   💬 Feedback
-------------------------*/
SettingCard.Feedback = () => (
  <SettingButton>
    <NavLink to="/cs">Feedback</NavLink>
  </SettingButton>
);

/* ------------------------
   💳 Transactions
-------------------------*/
SettingCard.Transactions = () => (
  <SettingButton>
    <NavLink to="/transactions">Transactions</NavLink>
  </SettingButton>
);

export default SettingCard;
