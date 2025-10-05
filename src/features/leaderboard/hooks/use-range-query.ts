import { useQueryState } from "nuqs";
import { LeaderboardRange } from "../queries";

export const useRangeQuery = () => {
  const [range, setRange] = useQueryState("range", {
    defaultValue: LeaderboardRange.ALL_TIME,
  });

  return [range, setRange] as const;
};
