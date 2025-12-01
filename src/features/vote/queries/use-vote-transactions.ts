import { Vote } from "@/features/vote";
import { ApiResponse, http } from "@/lib/http";
import { createInfiniteQuery } from "react-query-kit";

export interface VoteTransactionsRequest {
  page?: number;
  size?: number;
  sortOrder?: "DESC" | "ASC";
  sortField?: string;
}

export interface VoteTransactionsResponse extends ApiResponse<Vote[]> {}

export const useVoteTransactions = createInfiniteQuery<
  VoteTransactionsResponse,
  VoteTransactionsRequest
>({
  queryKey: ["votes/transactions"],
  fetcher: (variables, { pageParam = 1 }) => {
    return http
      .get("votes", {
        params: {
          page: pageParam,
          size: variables.size ?? 10,
          sortOrder: variables.sortOrder ?? "DESC",
          sortField: variables.sortField ?? "createdAt",
        },
      })
      .then((resp) => resp.data);
  },
  getNextPageParam: (lastPage) => {
    const { page, size, total } = lastPage.meta;
    const hasNextPage = page * size < total;
    return hasNextPage ? page + 1 : undefined;
  },
  initialPageParam: 1,
});

