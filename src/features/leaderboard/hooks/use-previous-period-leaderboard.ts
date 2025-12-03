"use client";

import { useMemo } from "react";
import { usePeriodContext } from "@/features/period";
import { useLeaderboard } from "../queries/use-leaderboard";
import { useBuildCompetitors } from "../components/leaderboard-provider";

export const usePreviousPeriodLeaderboard = () => {
  const { periodConfigs, duration } = usePeriodContext();

  const previousPeriod = useMemo(() => {
    if (!periodConfigs || periodConfigs.length === 0) return null;

    const currentIndex = periodConfigs.findIndex(
      (config) => config.label === duration || config.isCurrent
    );

    if (currentIndex === -1 || currentIndex === periodConfigs.length - 1) {
      return null;
    }

    return periodConfigs[currentIndex + 1] || null;
  }, [periodConfigs, duration]);

  const { data, isLoading, isFetching } = useLeaderboard({
    variables: {
      duration: previousPeriod?.label,
    },
    enabled: !!previousPeriod?.label,
  });

  const players = useBuildCompetitors(data);

  const top3Players = useMemo(() => {
    const lastIndexTop3 = players.reduce((count, player) => {
      if (count === 3) return count;
      return player.scores >= 1 ? count + 1 : count;
    }, 0);

    return players.slice(0, lastIndexTop3);
  }, [players]);

  return {
    previousPeriod,
    players,
    top3Players,
    isLoading,
    isFetching,
    hasPreviousData: top3Players.length > 0,
  };
};

