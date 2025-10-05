import { ApiResponse, http } from "@/lib/http";
import { Person } from "@/shared/types";
import { createQuery, createSuspenseQuery } from "react-query-kit";

export enum LeaderboardRange {
  CURRENT_MONTH = "current_month",
  CURRENT_YEAR = "current_year",
  ALL_TIME = "all_time",
}

export enum LeaderboardSortOrder {
  DESC = "DESC",
  ASC = "ASC",
}

export interface LeaderboardRequest {
  range?: LeaderboardRange;
  sortOrder?: LeaderboardSortOrder;
  size?: number
  topicId?: number
}

export type LeaderboardCompetitor = Pick<
  Person,
  "id" | "realName" | "avatar" | "email"
> & {
  id: string | number;
  scores: number;
  voters: Pick<Person, "id" | "realName" | "avatar">[];
};

export interface LeaderboardResponse
  extends ApiResponse<LeaderboardCompetitor[]> { }

export const useLeaderboard = createQuery<
  LeaderboardResponse,
  LeaderboardRequest
>({
  queryKey: ["useLeaderboard"],
  fetcher: () => {
    return http.get("leaderboard").then((res) => res.data);
  },
});

export const useLeaderboardSuspense = createSuspenseQuery<
  LeaderboardResponse,
  LeaderboardRequest
>({
  queryKey: ["useLeaderboard"],
  fetcher: (variables) => {
    return http.get("leaderboard", { params: variables }).then((res) => res.data);
  },
});
