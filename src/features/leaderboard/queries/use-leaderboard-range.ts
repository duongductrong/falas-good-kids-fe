import { ApiResponse, http } from "@/lib/http";
import { createQuery, createSuspenseQuery } from "react-query-kit";

export interface LeaderboardRangeRequest {}

export interface LeaderboardRangeResponse
  extends ApiResponse<{
    from: [number, number];
    to: [number, number];
    range: [number, number];
  }> {}

export const useLeaderboardRange = createQuery<
  LeaderboardRangeResponse,
  LeaderboardRangeRequest
>({
  queryKey: ["leaderboard/range"],
  fetcher: () => {
    return http.get("leaderboard/range").then((res) => res.data);
  },
});

export const useLeaderboardRangeSuspense = createSuspenseQuery<
  LeaderboardRangeResponse,
  LeaderboardRangeRequest
>({
  queryKey: ["leaderboard/range"],
  fetcher: () => {
    return http.get("leaderboard/range").then((res) => res.data);
  },
});
