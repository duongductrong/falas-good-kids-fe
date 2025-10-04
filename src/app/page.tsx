import {
  BaseLayout,
  LeaderboardAnnouncement,
  LeaderboardTable,
  LeaderboardTopPlayers,
} from "@/features/leaderboard/";
import LeaderboardFilter from "@/features/leaderboard/components/leaderboard-filter";
import { LeaderboardProvider } from "@/features/leaderboard/components/leaderboard-provider";
import { VerticalBars } from "@/features/leaderboard/components/vertical-bars";

export default function Home() {
  return (
    <LeaderboardProvider>
      <BaseLayout className="relative pb-20">
        <main className="flex justify-center">
          <div className="pl-16 pr-8 flex items-center justify-center">
            <VerticalBars rotate="left" />
          </div>

          <div className="w-full">
            <LeaderboardFilter className="mb-12" />
            <LeaderboardTopPlayers />
            <LeaderboardAnnouncement className="mb-20" />
            <LeaderboardTable />
          </div>
          <div className="pr-16 pl-8 flex items-center justify-center">
            <VerticalBars rotate="right" />
          </div>
        </main>
      </BaseLayout>
    </LeaderboardProvider>
  );
}
