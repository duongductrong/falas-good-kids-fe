import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

export interface HonoringAwardsPodiumProps extends ComponentProps<"div"> {
  top: ReactNode;
}

export const HonoringAwardsPodium = ({
  className,
  children,
  top,
  ...props
}: HonoringAwardsPodiumProps) => {
  return (
    <div
      {...props}
      className={cn(
        "relative w-full perspective-midrange",
        "transform-cpu will-change-transform",
        className
      )}
    >
      <div
        className={cn(
          "w-full min-h-12 w-full",
          "flex items-center justify-center"
        )}
      >
        {children}
      </div>
      <div className="relative w-full h-[150px] transform-3d perspective-midrange">
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full",
            "origin-top -rotate-x-[120deg]",
            "bg-gradient-to-b from-primary/80 via-primary/30 to-primary/10"
          )}
        />
        <div
          className={cn(
            "w-full h-full",
            "border-x border-t border-border/50 flex items-center justify-center",
            "bg-gradient-to-b from-primary/50 to-transparent"
          )}
        >
          {top}
        </div>
      </div>
    </div>
  );
};
