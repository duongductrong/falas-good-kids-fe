import { useQueryState } from "nuqs";

export const useDurationQuery = () => {
  const [duration, setDuration] = useQueryState("duration", {
    defaultValue: "",
  });

  return [duration, setDuration] as const;
};
