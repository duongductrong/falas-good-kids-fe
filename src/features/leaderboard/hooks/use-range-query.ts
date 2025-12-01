import { useQueryState } from "nuqs";
import { LeaderboardRange } from "../queries";

export const useRangeQuery = () => {
  const [range, setRange] = useQueryState("range", {
    defaultValue: LeaderboardRange.MONTHLY,
  });

  return [range, setRange] as const;
};
