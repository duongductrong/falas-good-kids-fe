"use client";

import { Avatar } from "@/components/ui/avatar";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePerson } from "@/features/person";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowBigUpDash, History, UserCircle } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { tabKeys, tabs } from "../constants/tab";
import { TrayProfileAchievements } from "./tray-profile-achievements";
import { TrayProfileOverview } from "./tray-profile-overview";
import { TrayProfileVotes } from "./tray-profile-votes";
import { TrayUpvote } from "./tray-upvote";

export interface TrayProfileProps extends PropsWithChildren {
  id: number | string;
}

const TrayProfile = ({ children, id }: TrayProfileProps) => {
  const [tab, setTab] = useState<keyof typeof tabKeys>(tabKeys.overview);

  const [isShow, setIsShow] = useState(false);

  const { data: person } = usePerson({
    enabled: isShow,
    variables: {
      id,
    },
    select: (res) => res.data,
  });

  return (
    <Drawer open={isShow} onOpenChange={setIsShow} variant="tray">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>Profile</DrawerTitle>
          <DrawerDescription>Your are viewing the profile.</DrawerDescription>
        </DrawerHeader>

        <ScrollArea>
          <div className="px-4 pb-4 flex flex-col max-h-[400px] w-full">
            {/* <div className="h-[100px] shrink-0 bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] rounded-md"></div> */}
            <div className="flex gap-4 px-4">
              <Avatar className="size-20 border-4 border-primary mb-4">
                <AvatarImage src={person?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-1">{person?.realName}</h2>
                <p className="text-sm text-muted-foreground">{person?.email}</p>
              </div>

              <p className="ml-auto pt-4">
                <span className="text-sm text-muted-foreground">
                  Current ranking:
                </span>{" "}
                <span className="text-foreground text-lg font-bold">
                  #{person?.rank}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {Object.entries(tabs).map(([key, tabInfo]) => (
                <Button
                  key={key}
                  variant={key === tab ? "default" : "outline"}
                  size="xs"
                  onClick={() => setTab(key as keyof typeof tabKeys)}
                >
                  <tabInfo.icon className="size-3" />
                  {tabInfo.label}
                </Button>
              ))}
            </div>

            {tab === tabKeys.overview && (
              <TrayProfileOverview id={Number(person?.id)} />
            )}
            {tab === tabKeys.votes && (
              <TrayProfileVotes id={Number(person?.id)} />
            )}
            {tab === tabKeys.achievements && <TrayProfileAchievements />}
          </div>
        </ScrollArea>

        <DrawerFooter className="flex flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TrayUpvote playerId={id}>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" rounded="full">
                    <ArrowBigUpDash className="size-4" />
                  </Button>
                </TooltipTrigger>
              </TrayUpvote>
              <TooltipContent>Upvote</TooltipContent>
            </Tooltip>
            <Tooltip>
              {/* <TrayHistory> */}
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" rounded="full">
                  <History className="size-4" />
                </Button>
              </TooltipTrigger>
              {/* </TrayHistory> */}
              <TooltipContent>Votes history (Coming Soon)</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex gap-4">
            <DrawerClose asChild>
              <Button variant="default">Dismiss</Button>
            </DrawerClose>
            <Button variant="outline">
              <UserCircle className="size-4" /> Visit profile
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TrayProfile;
