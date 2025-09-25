import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import LeaderboardSignal2 from "../assets/leaderboard-signal-2.svg";
import Container, { ContainerProps } from "../layout/container";
import { LiveFeedCard } from "./live-feed-card";

export interface LiveFeedProps extends ContainerProps {}

export const LiveFeed = ({ className, ...props }: LiveFeedProps) => {
  return (
    <Container {...props} className={cn(className)}>
      <section className="flex items-center gap-4 justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image
            src={LeaderboardSignal2}
            alt="Leaderboard Signal 2"
            className="size-8 translate-y-1"
          />

          <p className="text-base font-bold">Monthly Leaderboard</p>

          <div className="w-px h-4 bg-border mx-4" />

          <p className="text-sm text-muted-foreground">
            Last 20 users who have the most points will be displayed here.
          </p>
        </div>

        <aside>
          <Button size="sm">See more

            <ArrowRightIcon className="size-4" />
          </Button>
        </aside>
      </section>

      <div className="flex gap-4 overflow-x-auto scrollbar-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <LiveFeedCard key={index} ranking={index + 4} />
        ))}
      </div>
    </Container>
  );
};
