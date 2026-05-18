import { ChartPie, Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <ChartPie
      role="status"
      aria-label="Loading"
      className={cn("size-12 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
