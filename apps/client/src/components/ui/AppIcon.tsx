import type { ComponentProps } from "react";
import inquestiaIcon from "/inquestia.png";

export const AppIcon = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div className="h-fit w-fit pointer-events-none">
      <div {...props}>
        <img
          src={inquestiaIcon}
          className="h-full object-contain pointer-events-none w-full dark:invert"
        />
      </div>
    </div>
  );
};
