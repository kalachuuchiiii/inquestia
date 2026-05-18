import type { ReactNode } from "react";
import { Spinner } from "./spinner";

const LoadingDisplay = ({ children }: { children?: ReactNode | string }) => {
  return (
    <div className="min-h-96 flex-col z-10  flex justify-center animate-pulse duration-200 items-center w-full gap-1">
      <div className="flex gap-2 flex-col text-2xl font-bold tracking-tighter items-center">
        <Spinner />
        {children}
      </div>
    </div>
  );
};

export default LoadingDisplay;
