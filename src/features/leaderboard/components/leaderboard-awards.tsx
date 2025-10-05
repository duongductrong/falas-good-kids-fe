import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { Player } from "./leaderboard-provider";

export interface LeaderboardAwardsProps extends PropsWithChildren {
  player: Player;
}

export const LeaderboardAwards = ({
  player,
  children,
}: LeaderboardAwardsProps) => {
  const value = useMemo<LeaderboardAwardsContextType>(
    () => ({ player }),
    [player]
  );

  console.log(player);

  return (
    <LeaderboardAwardsContext.Provider value={value}>
      {children}
    </LeaderboardAwardsContext.Provider>
  );
};

export interface LeaderboardAwardsContextType {
  player: Player;
}

export const LeaderboardAwardsContext =
  createContext<LeaderboardAwardsContextType>(
    {} as LeaderboardAwardsContextType
  );

export const useLeaderboardAwardsContext = () => {
  const context = useContext(LeaderboardAwardsContext);
  if (!context) {
    throw new Error(
      "useLeaderboardAwardsContext must be used within a LeaderboardAwardsProvider"
    );
  }
  return context;
};
