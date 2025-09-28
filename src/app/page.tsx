import { BaseLayout, HonoringTop3, LiveFeed } from "@/features/leaderboard/";
import { VerticalBars } from "@/features/leaderboard/components/vertical-bars";

export default function Home() {
  return (
    <BaseLayout className="relative">
      <main className="flex justify-center">
        <div className="pl-16 pr-8 flex items-center justify-center">
          <VerticalBars rotate="left" />
        </div>

        <div className="w-full">
          <HonoringTop3 className="mb-10" />
          <LiveFeed />
        </div>
        <div className="pr-16 pl-8 flex items-center justify-center">
          <VerticalBars rotate="right" />
        </div>
      </main>
    </BaseLayout>
  );
}
