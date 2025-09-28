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
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowBigUpDash, UserCircle } from "lucide-react";
import { PropsWithChildren } from "react";
import { TrayUpvote } from "./tray-upvote";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <div className="px-4 pb-4 flex flex-col items-center max-h-[400px]">
            <Avatar className="size-20 mb-4">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h2 className="text-2xl font-bold mb-1">Trọng Dương</h2>
            <p className="text-sm text-muted-foreground">
              trongduong@example.com
            </p>

            <h2 className="text-lg font-bold mb-2 mt-4">Votes</h2>
            <div className="flex flex-wrap justify-center gap-8 w-full">
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

            <h2 className="text-lg font-bold mb-2 mt-6">Achievements</h2>
            <div className="flex flex-wrap justify-center gap-8 w-full">
              <div className="flex flex-col gap-2 items-center">
                <Image
                  src="/assets/icons/badge-top-1.png"
                  alt="Top 1"
                  width={32}
                  height={32}
                />
                <span className="text-sm font-bold">#1 October 2025</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Image
                  src="/assets/icons/badge-top-2.png"
                  alt="Top 2"
                  width={32}
                  height={32}
                />
                <span className="text-sm font-bold">
                  #2 September 2025
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter className="flex flex-row justify-between items-center gap-4">
          <div>
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
