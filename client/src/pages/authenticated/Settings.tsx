import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { changeTheme } from "../../state/slice/theme";
import { resetState } from "../../state/slice/user";
import type { AppDispatch, RootState } from "@/state/store";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/axios.instance";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogoutModal from "@/components/modals/LogoutModal";

const SettingButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex justify-between items-center px-4 py-3 rounded-xl
               bg-neutral-100/60 dark:bg-zinc-900/60
               border border-neutral-200 dark:border-zinc-800
               hover:border-blue-400/50 hover:shadow-md transition"
  >
    <div className="flex-1 text-left font-medium">{children}</div>
  </button>
);

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const { mode } = useSelector((state: RootState) => state.theme);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(changeTheme(e.target.value));

  const { mutate: handleLogout, isPending } = useMutation({
    mutationFn: async () => {
      const promise = API.post("/api/auth/logout");
      await toast.promise(promise, {
        loading: "Logging you out...",
        success: "Log out success!",
        error: (err) => err.response.data.message || "Internal Server Error.",
      });
      const res = await promise;
      return res;
    },
    onSuccess: (res) => {
      if (res.data.success) {
        dispatch(resetState());
        setIsLogoutDialogOpen(false);
        nav("/login");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      {/* Theme */}
      <div className="flex justify-between items-center p-4 rounded-xl border">
        <span className="font-semibold">Theme</span>
        <select value={mode} onChange={handleThemeChange}>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </div>

      {/* Navigation */}
      <SettingButton>
        <NavLink to="/exchange-center">Exchange Center</NavLink>
      </SettingButton>

      <SettingButton>
        <NavLink to="/transactions">Transactions</NavLink>
      </SettingButton>

      <SettingButton>
        <NavLink to="/cs">Feedback</NavLink>
      </SettingButton>

      {/* Logout Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogTrigger asChild>
          <SettingButton>
            <span className="text-red-500 font-semibold">Logout</span>
          </SettingButton>
        </DialogTrigger>
        <LogoutModal />
      </Dialog>
    </div>
  );
};

export default SettingsPage;
