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
import { PropsWithChildren } from "react";
import { Player, VoterRanking } from "./voter-ranking";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TrayLeaderboardProps extends PropsWithChildren {
  asChildTrigger?: boolean;
}

export const TrayLeaderboard = ({
  children,
  asChildTrigger = false,
}: TrayLeaderboardProps) => {
  return (
    <Drawer variant="tray">
      <DrawerTrigger asChild={asChildTrigger}>{children}</DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>Leaderboard</DrawerTitle>
          <DrawerDescription>View the leaderboard.</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="px-4">
          <div className="max-h-[500px] flex flex-col gap-3">
            {mockupPlayers.map((player) => (
              <VoterRanking key={player.id} player={player} showRank={true} />
            ))}
          </div>
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

// Mockup data for demonstration
const mockupPlayers: Player[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    votes: 127,
    rank: 1,
    voters: [
      {
        id: "v1",
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: "v2",
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: "v3",
        name: "Mike Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: "v4",
        name: "Sarah Davis",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: "v5",
        name: "Tom Brown",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    ],
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    votes: 89,
    rank: 2,
    voters: [
      {
        id: "v6",
        name: "Emma Wilson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: "v7",
        name: "Alex Chen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    ],
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@example.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    votes: 45,
    rank: 3,
    voters: [
      {
        id: "v8",
        name: "David Lee",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
      },
    ],
  },
  {
    id: "4",
    name: "David Martinez",
    email: "david.martinez@example.com",
    votes: 12,
    rank: 4,
    voters: [],
  },
];
