"use client";

import { set } from "lodash-es";
import React, { createContext, useContext, useMemo } from "react";
import { useTopicQuery } from "../hooks/use-topic-query";
import {
  LeaderboardRequest,
  LeaderboardResponse,
  useLeaderboardSuspense,
} from "../queries/use-leaderboard";
import { Voter } from "./voter-avatars";

export type Player = {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  scores: number;
  voters: Voter[];
  rank?: number;
};

export interface LeaderboardContextType {
  players: Player[];

  top3Players: Player[];
  restOfPlayers: Player[];
}

const LeaderboardContext = createContext<LeaderboardContextType | null>(null);

export interface LeaderboardProviderProps {
  children: React.ReactNode;
}

export const LeaderboardProvider = (props: LeaderboardProviderProps) => {
  const [topicId] = useTopicQuery();
  const variables = useMemo<LeaderboardRequest>(() => {
    const record = {};
    if (topicId) {
      set(record, "topicId", topicId);
    }

    return record;
  }, [topicId]);

  const { data } = useLeaderboardSuspense({
    variables: variables,
  });

  const players = useBuildCompetitors(data);

  const value = useMemo<LeaderboardContextType>(() => {
    const lastIndexTop3 = players.reduce((count, player) => {
      if (count === 3) return count;

      return player.scores >= 1 ? count + 1 : count;
    }, 0);

    return {
      players: players,
      top3Players: players.slice(0, lastIndexTop3),
      restOfPlayers: players
        .slice(lastIndexTop3)
        .map((player, idx) => ({ ...player, rank: idx + 4 })),
    };
  }, [players]);

  return (
    <LeaderboardContext.Provider value={value}>
      {props.children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboardContext = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error("useLeaderboard must be used within a LeaderboardProvider");
  }
  return context;
};

export const useBuildCompetitors = (data: LeaderboardResponse | undefined) => {
  return useMemo(
    () =>
      (data?.data || []).map<Player>((player, index) => ({
        id: player.id,
        name: player.realName,
        email: player.email,
        avatar: player.avatar,
        scores: player.scores,
        voters: player.voters.map((voter) => ({
          id: voter.id,
          name: voter.realName,
          avatar: voter.avatar,
        })),
        rank: index + 1,
      })),
    [data]
  );
};
