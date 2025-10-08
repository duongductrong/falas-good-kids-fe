import { CircleStar, Target, Vote } from "lucide-react";

export const tabKeys = {
  overview: "overview",
  votes: "votes",
  achievements: "achievements",
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
  [tabKeys.achievements]: {
    label: "Achievements",
    icon: CircleStar,
  },
};
