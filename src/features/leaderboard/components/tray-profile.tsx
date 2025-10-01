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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  ArrowBigUpDash,
  HandIcon,
  History,
  TrophyIcon,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import { PropsWithChildren } from "react";
import TrayHistory from "./tray-history";
import { TrayUpvote } from "./tray-upvote";

export interface TrayProfileProps extends PropsWithChildren {}

const TrayProfile = ({ children }: TrayProfileProps) => {
  return (
    <Drawer variant="tray">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>Profile</DrawerTitle>
          <DrawerDescription>Your are viewing the profile.</DrawerDescription>
        </DrawerHeader>

        <ScrollArea>
          <div className="px-4 pb-4 flex flex-col max-h-[400px]">
            <div className="h-[100px] shrink-0 bg-blue-500 rounded-md"></div>
            <div className="flex gap-4 translate-x-4">
              <Avatar className="size-20 border-4 border-primary -translate-y-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-1">Trọng Dương</h2>
                <p className="text-sm text-muted-foreground">
                  trongduong@example.com
                </p>
              </div>
            </div>

            <Tabs defaultValue="votes">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="votes">
                  <HandIcon className="size-4 mr-1 shrink-0" />
                  Votes
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  <TrophyIcon className="size-4 mr-1 shrink-0" />
                  Achievements
                </TabsTrigger>
              </TabsList>
              <TabsContent value="votes" className="h-[200px]">
                <div className="flex flex-wrap gap-8 w-full">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">
                      {new Intl.NumberFormat("en-US").format(1230)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Total received
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">
                      {new Intl.NumberFormat("en-US").format(2300)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Total sent
                    </span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="achievements" className="h-[200px]">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/assets/icons/badge-top-1.png"
                      alt="Top 1"
                      width={32}
                      height={32}
                    />
                    <span className="text-sm font-bold">#1 October 2025</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/assets/icons/badge-top-2.png"
                      alt="Top 2"
                      width={32}
                      height={32}
                    />
                    <span className="text-sm font-bold">#2 September 2025</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        <DrawerFooter className="flex flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TrayUpvote>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" rounded="full">
                    <ArrowBigUpDash className="size-4" />
                  </Button>
                </TooltipTrigger>
              </TrayUpvote>
              <TooltipContent>Upvote</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TrayHistory>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" rounded="full">
                    <History className="size-4" />
                  </Button>
                </TooltipTrigger>
              </TrayHistory>
              <TooltipContent>Votes history</TooltipContent>
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
