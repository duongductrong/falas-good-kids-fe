import { EmptyFolder } from "@/components/ui/empty-custom";

export const LeaderboardEmpty = () => {
  return (
    <EmptyFolder
      title="The leaderboard is empty."
      description="No one has earned any points yet. Be the first to participate!"
    />
  );
};
