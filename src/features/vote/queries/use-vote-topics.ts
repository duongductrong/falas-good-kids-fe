import { ApiResponse, http } from "@/lib/http";
import { createQuery, createSuspenseQuery } from "react-query-kit";
import { VoteTopic } from "../types";

export interface VoteTopicsRequest { }


export interface VoteTopicsResponse
  extends ApiResponse<VoteTopic[]> { }

export const useVoteTopics = createQuery<
  VoteTopicsResponse,
  VoteTopicsRequest
>({
  queryKey: ["votes/topics"],
  fetcher: () => {
    return http.get("votes/topics").then((res) => res.data);
  },
});

export const useVoteTopicsSuspense = createSuspenseQuery<
  VoteTopicsResponse,
  VoteTopicsRequest
>({
  queryKey: ["votes/topics"],
  fetcher: () => {
    return http.get("votes/topics").then((res) => res.data);
  },
});
