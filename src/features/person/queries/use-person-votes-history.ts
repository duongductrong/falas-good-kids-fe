import { Vote } from "@/features/vote";
import { ApiResponse, http } from "@/lib/http";
import { createQuery, createSuspenseQuery } from "react-query-kit";

export interface PersonVotesHistoryRequest {
  id: number;
  page?: number;
  size?: number;
  sortOrder?: "DESC" | "ASC";
  sortField?: string;
}

export interface PersonVotesHistoryResponse extends ApiResponse<Vote[]> {}

export const usePersonVotesHistory = createQuery<
  PersonVotesHistoryResponse,
  PersonVotesHistoryRequest
>({
  queryKey: ["persons/:id/history-votes"],
  fetcher: ({ id, page, size, sortOrder, sortField }) => {
    return http
      .get("persons/:id/history-votes".replace(":id", String(id)), {
        params: {
          page,
          size,
          sortOrder,
          sortField,
        },
      })
      .then((resp) => resp.data);
  },
});

export const usePersonVotesHistorySuspense = createSuspenseQuery<
  PersonVotesHistoryResponse,
  PersonVotesHistoryRequest
>({
  queryKey: ["persons/:id/history-votes"],
  fetcher: ({ id, page, size, sortOrder, sortField }) => {
    return http
      .get("persons/:id/history-votes".replace(":id", String(id)), {
        params: {
          page,
          size,
          sortOrder,
          sortField,
        },
      })
      .then((resp) => resp.data);
  },
});
