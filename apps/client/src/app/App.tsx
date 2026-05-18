import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Toaster } from "sonner";
import AppRouter from "./AppRouter";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  const { isDark } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (!isDark) {
      document.documentElement.classList.remove("dark");
      return;
    }

    document.documentElement.classList.add("dark");
  }, [isDark]);

  return (
    <div className=" min-h-screen   w-full  ">
      <Toaster position="top-center" />
      <TooltipProvider>
        <AppRouter />
      </TooltipProvider>
    </div>
  );
}

export default App;
