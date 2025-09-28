import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowBigUpDash } from "lucide-react";
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
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-2 rounded-lg border transition-colors",
        className
      )}
    >
      {/* Rank */}
      {showRank && player.rank && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          {player.rank}
        </div>
      )}

      {/* Player Avatar */}
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

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-foreground truncate text-sm">
            {player.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground truncate">{player.email}</p>
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

      <TrayUpvote asChildTrigger>
        <Button variant="ghost" size="icon" rounded="full">
          <ArrowBigUpDash className="size-4" />
        </Button>
      </TrayUpvote>
    </div>
  );
};
