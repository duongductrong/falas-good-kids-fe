import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { LeaderboardBackground } from "../components/leaderboard-background";
import { Header } from "./header";

export interface BaseLayoutProps extends ComponentProps<"div"> {}

export const BaseLayout = ({
  className,
  children,
  ...props
}: BaseLayoutProps) => {
  return (
    <div {...props} className={cn("relative min-h-screen", className)}>
      <LeaderboardBackground />
      <div className="relative z-10">
        <Header className="mb-4 md:mb-10" />
        {children}
      </div>
    </div>
  );
};
