import { BaseLayout, HonoringTop3, LiveFeed } from "@/features/leaderboard/";
import { VerticalBars } from "@/features/leaderboard/components/vertical-bars";

export default function Home() {
  return (
    <BaseLayout className="relative">
      <HonoringTop3 className="mb-10" />
      <LiveFeed />

      <div className="absolute top-1/2 right-[3.88vw] -translate-y-1/2">
        <VerticalBars rotate="left" />
      </div>

      <div className="absolute top-1/2 left-[3.88vw] -translate-y-1/2">
        <VerticalBars rotate="right" />
      </div>
    </BaseLayout>
  );
}
