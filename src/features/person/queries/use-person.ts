import { ApiResponse, http } from "@/lib/http";
import { createQuery, createSuspenseQuery } from "react-query-kit";
import { Person } from "../types";

export interface LeaderboardRequest {
  id: number | string
}


export interface LeaderboardResponse
  extends ApiResponse<Person> { }

export const usePerson = createQuery<
  LeaderboardResponse,
  LeaderboardRequest
>({
  queryKey: ["persons/:id"],
  fetcher: ({ id }) => {
    return http.get("persons/:id".replace(":id", String(id))).then((res) => res.data);
  },
});

export const usePersonSuspense = createSuspenseQuery<
  LeaderboardResponse,
  LeaderboardRequest
>({
  queryKey: ["persons/:id"],
  fetcher: ({ id }) => {
    return http.get("persons/:id".replace(":id", String(id))).then((res) => res.data);
  },
});
