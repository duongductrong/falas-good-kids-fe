import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

export interface FooterProps extends ComponentProps<"footer"> {}

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer {...props} className={cn(className)}>
      <h2>Footer</h2>
    </footer>
  );
};
