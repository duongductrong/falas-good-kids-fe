import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowBigUpDash, MoveUpRight } from "lucide-react";
import Image from "next/image";
import TrayProfile from "./tray-profile";
import { TrayUpvote } from "./tray-upvote";
import { VoterAvatars, type Voter } from "./voter-avatars";

export interface Player {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  votes: number;
  voters: Voter[];
  rank?: number;
}

export interface VoterRankingProps {
  player: Player;
  className?: string;
  showRank?: boolean;
}

export const VoterRanking = ({
  player,
  className,
  showRank = true,
}: VoterRankingProps) => {
  const ranking = Number(player.rank) <= 3 ? player.rank : "n";

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-2 rounded-lg border transition-colors",
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

      {/* Player Avatar */}
      <TrayProfile>
        <div className="relative p-3 cursor-pointer">
          <Avatar className="size-10 flex-shrink-0">
            <AvatarImage src={player.avatar} alt={player.name} />
            <AvatarFallback className="font-semibold">
              {player.name
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
          <TrayProfile>
            <h3 className="font-semibold text-foreground truncate text-sm cursor-pointer">
              {player.name}
            </h3>
          </TrayProfile>
        </div>
        <TrayProfile>
          <p className="text-sm text-muted-foreground truncate cursor-pointer">
            {player.email}
          </p>
        </TrayProfile>
      </div>

      {/* Votes and Voters */}
      <div className="flex-shrink-0 text-right">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-foreground">
            {player.votes}
          </span>
          <span className="text-sm text-muted-foreground">
            {player.votes === 1 ? "vote" : "votes"}
          </span>
        </div>

        <VoterAvatars
          voters={player.voters}
          maxVisible={3}
          size="sm"
          className="justify-end"
        />
      </div>

      <Tooltip>
        <TrayUpvote>
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
