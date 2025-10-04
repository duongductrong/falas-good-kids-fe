import { ApiResponse, http } from "@/lib/http";
import { createQuery, createSuspenseQuery } from "react-query-kit";
import { VoteTopic } from "../types";

export interface LeaderboardRequest { }


export interface LeaderboardResponse
  extends ApiResponse<VoteTopic[]> { }

export const useVoteTopics = createQuery<
  LeaderboardResponse,
  LeaderboardRequest
>({
  queryKey: ["votes/topics"],
  fetcher: () => {
    return http.get("votes/topics").then((res) => res.data);
  },
});

export const useVoteTopicsSuspense = createSuspenseQuery<
  LeaderboardResponse,
  LeaderboardRequest
>({
  queryKey: ["votes/topics"],
  fetcher: () => {
    return http.get("votes/topics").then((res) => res.data);
  },
});
