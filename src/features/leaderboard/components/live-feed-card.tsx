import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowBigUpDash, User } from "lucide-react";
import { ComponentProps } from "react";
import LeaderboardRanking from "./leaderboard-player-ranking";
import TrayProfile from "./tray-profile";
import { TrayUpvote } from "./tray-upvote";

export interface LiveFeedCardProps extends ComponentProps<"div"> {
  ranking: number;
}

export const LiveFeedCard = ({
  className,
  ranking,
  ...props
}: LiveFeedCardProps) => {
  const colors = ["#E63946", "#0255F5", "#00AE01"];
  const defaultColor = "#222B53";

  return (
    <div
      {...props}
      className={cn(
        "min-w-[300px] flex-1 rounded-lg border border-border px-4 py-6",
        className
      )}
    >
      <div className="flex items-center flex-col justify-center gap-2">
        <Avatar className="size-14 mb-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <LeaderboardRanking
          ranking={ranking}
          fill={colors?.[ranking - 1] || defaultColor}
        />

        <section className="flex items-center justify-between w-full">
          <div className="flex flex-row flex-wrap items-center gap-12">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex items-center gap-2 *:cursor-pointer">
            <Tooltip>
              <TooltipContent>See profile</TooltipContent>
              <TrayProfile id={1}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                  >
                    <User className="size-5" />
                  </Button>
                </TooltipTrigger>
              </TrayProfile>
            </Tooltip>
            <Tooltip>
              <TooltipContent>Upvote</TooltipContent>
              <TrayUpvote>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                  >
                    <ArrowBigUpDash className="size-5" />
                  </Button>
                </TooltipTrigger>
              </TrayUpvote>
            </Tooltip>
          </div>
        </section>
      </div>
    </div>
  );
};
