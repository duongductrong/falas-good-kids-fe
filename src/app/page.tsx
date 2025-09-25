import { BaseLayout, HonoringTop3, LiveFeed } from "@/features/leaderboard/";

export default function Home() {
  return (
    <BaseLayout>
      <HonoringTop3 className="mb-10" />
      <LiveFeed />
    </BaseLayout>
  );
}
