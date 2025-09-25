import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { HonoringRank } from "./honoring-rank";
import HonoringRankReasonable from "./honoring-rank-reasonable";

export interface LiveFeedCardProps extends ComponentProps<"div"> {
  ranking: number;
}

export const LiveFeedCard = ({
  className,
  ranking,
  ...props
}: LiveFeedCardProps) => {
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

        <HonoringRankReasonable ranking={ranking} fill="#222B53" />
      </div>
    </div>
  );
};
