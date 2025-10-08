import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { HonoringRank } from "./honoring-rank";

export interface LeaderboardPlayerRankingProps extends ComponentProps<"div"> {
  ranking: number;
  fill: string;
  fillText?: string;
  voteCount?: number;
  winCount?: number;
}

const LeaderboardPlayerRanking = ({
  className,
  ranking,
  fill,
  fillText = "#fff",
  voteCount = 0,
  winCount = 0,
  ...props
}: LeaderboardPlayerRankingProps) => {
  return (
    <div {...props} className={cn("flex items-center gap-2", className)}>
      <div className="hidden flex-col text-right sm:flex">
        <p className="text-base font-bold text-foreground">{voteCount}</p>
        <p className="text-xs text-muted-foreground">Votes</p>
      </div>
      <HonoringRank
        bannerColor={fill}
        text={ranking.toString()}
        textColor={fillText}
      />
      <div className="hidden flex-col text-left sm:flex">
        <p className="text-base font-bold text-foreground">{winCount}</p>
        <p className="text-xs text-muted-foreground">Wins</p>
      </div>
    </div>
  );
};

export default LeaderboardPlayerRanking;
