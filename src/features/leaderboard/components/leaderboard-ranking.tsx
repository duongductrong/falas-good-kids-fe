import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowBigUpDash } from "lucide-react";
import Image from "next/image";
import TrayProfile from "./tray-profile";
import { TrayUpvote } from "./tray-upvote";
import { VoterAvatars, type Voter } from "./voter-avatars";

export interface Competitor {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  scores: number;
  voters: Voter[];
  rank?: number;
}

export interface LeaderboardRankingProps {
  competitor: Competitor;
  className?: string;
  showRank?: boolean;
}

export const LeaderboardRanking = ({
  competitor,
  className,
  showRank = true,
}: LeaderboardRankingProps) => {
  const ranking = Number(competitor.rank) <= 3 ? competitor.rank : "n";

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-2 rounded-lg border border-border transition-colors",
        className
      )}
    >
      {/* Rank */}
      {showRank && ranking && (
        <Image
          src={`/assets/icons/badge-top-${ranking}.png`}
          alt={`Top ${ranking}`}
          width={32}
          height={32}
        />
      )}

      {showRank ? (
        <span className="text-sm text-muted-foreground font-semibold">
          #{competitor.rank}
        </span>
      ) : null}

      {/* Player Avatar */}
      <TrayProfile id={competitor.id}>
        <div className="relative p-3 cursor-pointer">
          <Avatar className="size-10 flex-shrink-0">
            <AvatarImage src={competitor.avatar} alt={competitor.name} />
            <AvatarFallback className="font-semibold">
              {competitor.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <Image
            src={
              ranking && Number(ranking) <= 3
                ? "/assets/icons/avatar-award.png"
                : "/assets/icons/avatar-award-2.png"
            }
            alt="Avatar Award"
            width={70}
            height={70}
            className="absolute top-0 right-0 -translate-y-px"
          />
        </div>
      </TrayProfile>

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <TrayProfile id={competitor.id}>
            <h3 className="font-semibold text-foreground truncate text-sm cursor-pointer">
              {competitor.name}
            </h3>
          </TrayProfile>
        </div>
        <TrayProfile id={competitor.id}>
          <p className="text-sm text-muted-foreground truncate cursor-pointer">
            {competitor.email}
          </p>
        </TrayProfile>
      </div>

      {/* Votes and Voters */}
      <div className="flex-shrink-0 text-right">
        <div className="flex items-center justify-end gap-2 mb-2">
          <span className="text-lg font-bold text-foreground">
            {competitor.scores}
          </span>
          <span className="text-sm text-muted-foreground">
            {competitor.scores === 1 ? "vote" : "votes"}
          </span>
        </div>

        <VoterAvatars
          voters={competitor.voters}
          maxVisible={3}
          size="sm"
          className="justify-end"
        />
      </div>

      <Tooltip>
        <TrayUpvote playerId={competitor.id}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" rounded="full">
              <ArrowBigUpDash className="size-4" />
            </Button>
          </TooltipTrigger>
        </TrayUpvote>
        <TooltipContent>Upvote</TooltipContent>
      </Tooltip>
    </div>
  );
};
