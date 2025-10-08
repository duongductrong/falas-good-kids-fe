import { ApiResponse, http } from "@/lib/http";
import { createQuery, createSuspenseQuery } from "react-query-kit";

export interface RankingTrendRequest {
  id: number;
}

export interface RankingTrendResponse
  extends ApiResponse<
    {
      totalVotes: number;
      ranked: number;
      month: string;
    }[]
  > {}

export const useLeaderboardRankingTrend = createQuery<
  RankingTrendResponse,
  RankingTrendRequest
>({
  queryKey: ["leaderboard/:personId/ranking-trend"],
  fetcher: ({ id }) => {
    return http
      .get(
        "leaderboard/:personId/ranking-trend".replace(
          ":personId",
          id.toString()
        )
      )
      .then((res) => res.data);
  },
});

export const useLeaderboardRankingTrendSuspense = createSuspenseQuery<
  RankingTrendResponse,
  RankingTrendRequest
>({
  queryKey: ["leaderboard/:personId/ranking-trend"],
  fetcher: ({ id }) => {
    return http
      .get(
        "leaderboard/:personId/ranking-trend".replace(
          ":personId",
          id.toString()
        )
      )
      .then((res) => res.data);
  },
});
