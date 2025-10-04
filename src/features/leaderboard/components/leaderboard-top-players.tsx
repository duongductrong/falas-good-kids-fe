"use client";

import { cn } from "@/lib/utils";
import Container, { ContainerProps } from "../layout/container";
import { HonoringAwardsLegend } from "./honoring-awards-legend";
import { HonoringAwardsPodium } from "./honoring-awards-podium";
import HonoringRankReasonable from "./honoring-rank-reasonable";
import { useLeaderboardContext } from "./leaderboard-provider";

export interface LeaderboardTopPlayersProps extends ContainerProps {}

export const LeaderboardTopPlayers = ({ className, ...props }: LeaderboardTopPlayersProps) => {
  const { top3Players } = useLeaderboardContext();

  return (
    <Container
      {...props}
      className={cn(
        "flex gap-16 justify-around [&>*]:w-full",
        className
      )}
    >
      <HonoringAwardsPodium
        achievement={
          <HonoringRankReasonable
            fill="#0255F5"
            ranking={2}
            voteCount={top3Players?.[1]?.scores || 0}
            winCount={0}
          />
        }
        className="translate-y-10"
      >
        <HonoringAwardsLegend
          name={top3Players?.[1]?.name || NO_ONE_HAS_ACHIEVED}
          avatar={top3Players?.[1]?.avatar || ""}
          top="2"
          color="#0255F5"
        />
      </HonoringAwardsPodium>
      <HonoringAwardsPodium
        achievement={
          <HonoringRankReasonable
            fill="#E63946"
            ranking={1}
            voteCount={top3Players?.[0]?.scores || 0}
            winCount={0}
          />
        }
        className="group"
      >
        <HonoringAwardsLegend
          name={top3Players?.[0]?.name || NO_ONE_HAS_ACHIEVED}
          avatar={top3Players?.[0]?.avatar || ""}
          top="1"
          color="#E63946"
        />
      </HonoringAwardsPodium>
      <HonoringAwardsPodium
        achievement={
          <HonoringRankReasonable
            fill="#00AE01"
            ranking={3}
            voteCount={top3Players?.[2]?.scores || 0}
            winCount={0}
          />
        }
        className="translate-y-10"
      >
        <HonoringAwardsLegend
          name={top3Players?.[2]?.name || NO_ONE_HAS_ACHIEVED}
          avatar={top3Players?.[2]?.avatar || ""}
          top="3"
          color="#00AE01"
        />
      </HonoringAwardsPodium>
    </Container>
  );
};

export const NO_ONE_HAS_ACHIEVED = "No one has achieved";
