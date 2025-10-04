import { create } from "zustand";

export interface LeaderboardFilterStore {
  topic: string;
  setTopic: (topic: string) => void;
}

export const useLeaderboardFilterStore = create<LeaderboardFilterStore>((set) => ({
  topic: "all-topics",
  setTopic: (topic) => set({ topic }),
}));