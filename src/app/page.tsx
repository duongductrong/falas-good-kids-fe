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
import { PeriodProvider } from "@/features/period";
// import { FloatingVoteTransactions } from "@/features/vote";

export default function Home() {
  return (
    <PeriodProvider>
      <LeaderboardProvider>
        <BaseLayout className="relative pb-5 md:pb-20">
          <main className="flex justify-center">
            <div className="pl-16 pr-8 hidden items-center justify-center lg:flex h-screen top-0">
              <VerticalBars rotate="left" />
            </div>

            <div className="w-full">
              <LeaderboardPeriod className="mb-4 md:mb-10" />
              <LeaderboardTopPlayers />
              <LeaderboardAnnouncement className="mb-4 md:mb-10" />
              <LeaderboardFilter className="mb-6 md:mb-12" />
              <LeaderboardTable />
            </div>
            <div className="pr-16 pl-8 hidden lg:flex items-center justify-center h-screen top-0">
              <VerticalBars rotate="right" />
            </div>
          </main>

          {/* <FloatingVoteTransactions /> */}
        </BaseLayout>
      </LeaderboardProvider>
    </PeriodProvider>
  );
}
