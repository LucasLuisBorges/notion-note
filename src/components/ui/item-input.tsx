import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ItemInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full border-b-2 bg-transparent focus-visible:ring-0 focus-visible:outline-none rounded-md px-3 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        autoComplete="off"
        ref={ref}
        {...props}
      />
    );
  }
);
ItemInput.displayName = "ItemInput";

export { ItemInput };
