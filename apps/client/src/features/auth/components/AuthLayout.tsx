import { DynamicBackground } from "@/components/ui/DynamicBackground";
import { Separator } from "@/components/ui/separator";
import type { JSX } from "react";

interface AuthLayoutInterface {
  children: JSX.Element;
}

export const AuthLayout = ({ children }: AuthLayoutInterface) => {
  return (
    <div>
      <DynamicBackground />

      <Separator orientation="horizontal" />
      <div className=" h-full min-h-screen   flex items-center justify-center w-full   shadow-md">
        <main className=" p-6  lg:w-6/12 max-w-lg   dark:bg-zinc-925 rounded-xl p-3 ">
          {children}
        </main>
      </div>
    </div>
  );
};
