"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { HandCoins } from "lucide-react";
import Image from "next/image";
import LeaderboardSignal2 from "../assets/leaderboard-signal-2.svg";
import Container from "../layout/container";
import { useLeaderboardContext } from "./leaderboard-provider";
import { LeaderboardRanking } from "./leaderboard-ranking";

export interface LeaderboardTableProps {}

export const LeaderboardTable = (props: LeaderboardTableProps) => {
  const { restOfPlayers } = useLeaderboardContext();

  return (
    <Container>
      <div className={cn("flex flex-col gap-0.5 p-4 md:gap-1.5 md:text-left")}>
        <Image
          src={LeaderboardSignal2}
          alt="Leaderboard Signal 2"
          className="size-12 translate-y- 1 mx-auto"
        />
        <h2 className="text-foreground font-semibold text-center">Top users</h2>
        <p className="text-muted-foreground text-sm text-center">
          Stay tuned! The leaderboard updates daily to showcase everyone&rsquo;s
          achievements. <br />
          Keep up the great work and you might find yourself at the top!
        </p>
      </div>

      <div className="flex flex-col gap-3 pb-10 pt-4">
        {restOfPlayers.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <Image
                src="/assets/icons/empty-folder.png"
                alt="Empty State"
                width={100}
                height={100}
                className="size-24 mb-4"
              />
              <EmptyTitle>The rest of the leaderboard is empty.</EmptyTitle>
              <EmptyDescription>
                No one has earned any points yet. Be the first to participate!
                or vote for someone to get the top rank.
              </EmptyDescription>
            </EmptyHeader>

            <EmptyContent>
              <Button variant="outline" size="sm">
                <HandCoins className="size-4" />
                Vote for someone now!
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          restOfPlayers.map((competitor) => (
            <LeaderboardRanking
              key={competitor.id}
              competitor={competitor}
              showRank={true}
            />
          ))
        )}
      </div>
    </Container>
  );
};
