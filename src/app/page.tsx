import {
  BaseLayout,
  LeaderboardAnnouncement,
  LeaderboardFilter,
  LeaderboardPeriod,
  LeaderboardProvider,
  LeaderboardTable,
  LeaderboardTopPlayers,
} from "@/features/leaderboard/";
import { VerticalBars } from "@/features/leaderboard/components/vertical-bars";

export default function Home() {
  return (
    <LeaderboardProvider>
      <BaseLayout className="relative pb-5 md:pb-20">
        <main className="flex justify-center">
          <div className="pl-16 pr-8 hidden items-center justify-center lg:flex">
            <VerticalBars rotate="left" />
          </div>

          <div className="w-full">
            <LeaderboardPeriod className="mb-4 md:mb-10" />
            <LeaderboardTopPlayers />
            <LeaderboardAnnouncement className="mb-4 md:mb-10" />
            <LeaderboardFilter className="mb-6 md:mb-12" />
            <LeaderboardTable />
          </div>
          <div className="pr-16 pl-8 hidden lg:flex items-center justify-center">
            <VerticalBars rotate="right" />
          </div>
        </main>
      </BaseLayout>
    </LeaderboardProvider>
  );
}
