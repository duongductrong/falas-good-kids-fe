"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PropsWithChildren, useMemo, useState } from "react";
import {
  LeaderboardResponse,
  useLeaderboard,
} from "../queries/use-leaderboard";
import { Competitor, LeaderboardRanking } from "./leaderboard-ranking";
import { LeaderboardEmpty } from "./leaderboard-empty";

export interface TrayLeaderboardProps extends PropsWithChildren {}

export const TrayLeaderboard = ({ children }: TrayLeaderboardProps) => {
  const [open, setOpen] = useState(false);

  const { data } = useLeaderboard({
    enabled: open,
  });

  const competitors = useBuildCompetitors(data);

  return (
    <Drawer open={open} onOpenChange={setOpen} variant="tray">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="mx-auto">
        <DrawerHeader>
          <DrawerTitle>Leaderboard</DrawerTitle>
          <DrawerDescription>View the leaderboard.</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="px-4 relative">
          <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-t from-transparent to-background pointer-events-none" />

          <div className="max-h-[500px] flex flex-col gap-3 mt-6 mb-6">
            {competitors.length === 0 ? (
              <LeaderboardEmpty />
            ) : (
              competitors.map((competitor) => (
                <LeaderboardRanking
                  key={competitor.id}
                  competitor={competitor}
                  showRank={true}
                />
              ))
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        </ScrollArea>
        <DrawerFooter className="flex flex-row justify-end items-center gap-4">
          <DrawerClose asChild>
            <Button variant="default">Dismiss</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const useBuildCompetitors = (data: LeaderboardResponse | undefined) => {
  return useMemo(
    () =>
      (data?.data || []).map<Competitor>((competitor, index) => ({
        id: competitor.id,
        name: competitor.realName,
        email: competitor.email,
        avatar: competitor.avatar,
        scores: competitor.scores,
        voters: competitor.voters.map((voter) => ({
          id: voter.id,
          name: voter.realName,
          avatar: voter.avatar,
        })),
        rank: index + 1,
      })),
    [data]
  );
};
