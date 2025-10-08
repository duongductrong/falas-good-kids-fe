import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Header } from "./header";

export interface BaseLayoutProps extends ComponentProps<"div"> {}

export const BaseLayout = ({
  className,
  children,
  ...props
}: BaseLayoutProps) => {
  return (
    <div {...props} className={cn("bg-background", className)}>
      <Header className="mb-4 md:mb-10" />
      {children}
    </div>
  );
};
