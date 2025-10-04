import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowUp, Circle } from "lucide-react";
import Image from "next/image";
import { ComponentProps } from "react";
import { TrayUpvote } from "./tray-upvote";
import TrayProfile from "./tray-profile";

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
          <Image
            className="absolute bottom-full left-1/2 -translate-x-1/2 z-10 size-14"
            src={`/assets/icons/crown-${top}.png`}
            alt="Crown"
            width={150}
            height={150}
          />
          {avatar ? (
            <div className="relative p-3 cursor-pointer">
              <Avatar className="size-24 flex-shrink-0">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="font-semibold">
                  {"UN"}
                </AvatarFallback>
              </Avatar>

              <Image
                src="/assets/icons/avatar-award.png"
                alt="Avatar Award"
                width={150}
                height={150}
                className="absolute top-0 right-0 -translate-y-px"
              />
            </div>
          ) : (
            <Circle className="size-30" />
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p
            data-top={top}
            className={cn("text-base md:text-xl text-foreground font-bold")}
          >
            {name}
          </p>
          <div className="flex gap-2 mb-4">
            <TrayUpvote>
              <Button size="xs" variant="default" className="shrink-0 w-fit">
                Upvote <ArrowUp className="size-3" />
              </Button>
            </TrayUpvote>
            <TrayProfile>
              <Button size="xs" variant="outline" className="shrink-0 w-fit">
                View profile
              </Button>
            </TrayProfile>
          </div>
        </div>
      </div>
    </div>
  );
};
