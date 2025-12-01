import { ApiResponse, http } from "@/lib/http";
import { createQuery, createSuspenseQuery } from "react-query-kit";
import { PeriodConfig } from "../types";

export interface PeriodConfigsRequest {}

export interface PeriodConfigsResponse extends ApiResponse<PeriodConfig[]> {}

export const usePeriodConfigs = createQuery<
  PeriodConfigsResponse,
  PeriodConfigsRequest
>({
  queryKey: ["periods/configs"],
  fetcher: () => {
    return http.get("periods/configs").then((res) => res.data);
  },
});

export const usePeriodConfigsSuspense = createSuspenseQuery<
  PeriodConfigsResponse,
  PeriodConfigsRequest
>({
  queryKey: ["periods/configs"],
  fetcher: () => {
    return http.get("periods/configs").then((res) => res.data);
  },
});
