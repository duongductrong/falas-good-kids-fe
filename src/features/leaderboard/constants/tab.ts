import { Target, Vote } from "lucide-react";

export const tabKeys = {
  overview: "overview",
  votes: "votes",
} as const;

export const tabs = {
  [tabKeys.overview]: {
    label: "Overview",
    icon: Target,
  },
  [tabKeys.votes]: {
    label: "Votes",
    icon: Vote,
  },
};
