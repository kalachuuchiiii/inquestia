import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "@/state/slice/user";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Toaster } from "sonner";
import type { AppDispatch } from "@/state/store";
import AppRouter from "./AppRouter";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const { isDark } = useAppSelector((state) => state.theme);
  const { user = {}, accessToken } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isDark) {
      document.documentElement.classList.remove("dark");
      return;
    }

    document.documentElement.classList.add("dark");
  }, [isDark]);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  return (
    <div className=" mx-auto min-h-screen ">
      <Toaster position="top-center" />
      <AppRouter />
    </div>
  );
}

export default App;
