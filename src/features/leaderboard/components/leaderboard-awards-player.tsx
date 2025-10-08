import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowUp, Circle, Search } from "lucide-react";
import Image from "next/image";
import { ComponentProps } from "react";
import { useLeaderboardAwardsContext } from "./leaderboard-awards";
import TrayProfile from "./tray-profile";
import { TrayUpvote } from "./tray-upvote";

export interface LeaderboardAwardsPlayerProps extends ComponentProps<"div"> {
  top: "1" | "2" | "3";
  color?: string;
}

export const LeaderboardAwardsPlayer = ({
  className,
  top = "1",
  color = "#fff",
  ...props
}: LeaderboardAwardsPlayerProps) => {
  const { player } = useLeaderboardAwardsContext();

  return (
    <div
      className={cn("flex gap-8 justify-between [&>*]:w-full pb-14", className)}
      {...props}
    >
      <div className="flex flex-col gap-2 flex flex-col items-center">
        <div className="relative">
          <Image
            className="absolute bottom-full left-1/2 -translate-x-1/2 z-10 size-7 sm:size-14"
            src={`/assets/icons/crown-${top}.png`}
            alt="Crown"
            width={150}
            height={150}
          />
          {player?.avatar ? (
            <div className="relative p-3 cursor-pointer">
              <Avatar className="size-12 sm:size-24 flex-shrink-0">
                <AvatarImage src={player?.avatar} alt={player?.name} />
                <AvatarFallback className="font-semibold">
                  {player?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
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
            <div className="size-15 md:size-30 rounded-full">
              <Circle className="size-15 md:size-30 text-muted-foreground" />
              <Search className="size-5 md:size-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p
            data-top={top}
            className={cn("text-sm sm:text-base md:text-xl text-foreground font-bold text-center")}
          >
            {player?.name || "No one has achieved"}
          </p>
          {player ? (
            <div className="flex flex-col items-center md:flex-row gap-2 mb-1 md:mb-4">
              <TrayUpvote playerId={player?.id}>
                <Button size="xs" variant="default" className="shrink-0 w-fit">
                  Upvote <ArrowUp className="size-3" />
                </Button>
              </TrayUpvote>
              <TrayProfile id={player?.id}>
                <Button size="xs" variant="outline" className="shrink-0 w-fit">
                  View profile
                </Button>
              </TrayProfile>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Vote for someone to see them here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
