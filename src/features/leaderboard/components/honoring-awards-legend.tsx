import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { HexAvatar } from "./hex-avatar";

export interface HonoringAwardsLegendProps extends ComponentProps<"div"> {
  avatar: string;
  name: string;
  top: "1" | "2" | "3";
  color?: string;
}

export const HonoringAwardsLegend = ({
  className,
  avatar,
  name,
  top = "1",
  color = "#fff",
  ...props
}: HonoringAwardsLegendProps) => {
  return (
    <div
      className={cn("flex gap-8 justify-between [&>*]:w-full pb-14", className)}
      {...props}
    >
      <div className="flex flex-col gap-2 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 [background:linear-gradient(to_bottom,rgba(87,102,189,0.5)_0%,rgba(0,0,0,0.5)_100%)] rounded-lg" />
          <HexAvatar
            avatarUrl={avatar}
            size={120}
            strokeColor={color}
            strokeWidth={8}
            className="relative"
          />
        </div>
        <div
          data-top={top}
          className={cn("text-base text-foreground font-bold mb-2")}
        >
          {name}
        </div>
        <div
          data-top={top}
          className={cn("text-lg text-foreground font-bold mb-2", {
            "text-top-1": top === "1",
            "text-top-2": top === "2",
            "text-top-3": top === "3",
          })}
        >
          Number #{top}
        </div>
      </div>
    </div>
  );
};
