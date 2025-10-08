"use client";

import { cn } from "@/lib/utils";
import Container, { ContainerProps } from "../layout/container";
import { LeaderboardAwards } from "./leaderboard-awards";
import { LeaderboardAwardsPlayer } from "./leaderboard-awards-player";
import { LeaderboardAwardsPodium } from "./leaderboard-awards-podium";
import LeaderboardPlayerRanking from "./leaderboard-player-ranking";
import { useLeaderboardContext } from "./leaderboard-provider";

export interface LeaderboardTopPlayersProps extends ContainerProps {}

export const LeaderboardTopPlayers = ({
  className,
  ...props
}: LeaderboardTopPlayersProps) => {
  const { top3Players } = useLeaderboardContext();

  return (
    <Container
      {...props}
      className={cn("flex md:gap-6 lg:gap-16 justify-around [&>*]:w-full pt-4", className)}
    >
      <LeaderboardAwards player={top3Players?.[1]}>
        <LeaderboardAwardsPodium
          achievement={
            <LeaderboardPlayerRanking
              fill="#0255F5"
              ranking={2}
              voteCount={top3Players?.[1]?.scores || 0}
              winCount={0}
            />
          }
          className="translate-y-10"
        >
          <LeaderboardAwardsPlayer top="2" color="#0255F5" />
        </LeaderboardAwardsPodium>
      </LeaderboardAwards>
      <LeaderboardAwards player={top3Players?.[0]}>
        <LeaderboardAwardsPodium
          achievement={
            <LeaderboardPlayerRanking
              fill="#E63946"
              ranking={1}
              voteCount={top3Players?.[0]?.scores || 0}
              winCount={0}
            />
          }
          className="group"
        >
          <LeaderboardAwardsPlayer top="1" color="#E63946" />
        </LeaderboardAwardsPodium>
      </LeaderboardAwards>
      <LeaderboardAwards player={top3Players?.[2]}>
        <LeaderboardAwardsPodium
          achievement={
            <LeaderboardPlayerRanking
              fill="#00AE01"
              ranking={3}
              voteCount={top3Players?.[2]?.scores || 0}
              winCount={0}
            />
          }
          className="translate-y-10"
        >
          <LeaderboardAwardsPlayer top="3" color="#00AE01" />
        </LeaderboardAwardsPodium>
      </LeaderboardAwards>
    </Container>
  );
};

export const NO_ONE_HAS_ACHIEVED = "No one has achieved";
