"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePeriodContext } from "@/features/period";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { isEmpty, isNil } from "lodash-es";
import { useEffect } from "react";
import { useRangeQuery } from "../hooks/use-range-query";
import Container, { ContainerProps } from "../layout/container";
import { LeaderboardRange } from "../queries";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

export interface LeaderboardPeriodProps extends ContainerProps {}

export const LeaderboardPeriod = ({
  className,
  ...props
}: LeaderboardPeriodProps) => {
  const [range, setRange] = useRangeQuery();
  const { periodConfigs, currentPeriod, duration, setDuration } =
    usePeriodContext();

  useEffect(() => {
    if (range === LeaderboardRange.ALL_TIME) {
      setDuration("");
      return;
    }

    const isMissingDuration =
      range === LeaderboardRange.MONTHLY && isNil(duration);

    if ((isMissingDuration || isEmpty(duration)) && currentPeriod) {
      setDuration(currentPeriod?.label);
    }
  }, [duration, currentPeriod, range, setDuration]);

  return (
    <Drawer variant="tray">
      <Container
        {...props}
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          className
        )}
      >
        <div className="mb-6 flex items-center gap-2">
          <Tabs defaultValue={range} onValueChange={setRange}>
            <TabsList>
              <TabsTrigger value={LeaderboardRange.ALL_TIME}>
                All time
              </TabsTrigger>
              <TabsTrigger value={LeaderboardRange.MONTHLY}>
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {range === LeaderboardRange.MONTHLY ? (
            <DrawerTrigger asChild>
              <Button variant="secondary">T{duration}</Button>
            </DrawerTrigger>
          ) : null}
        </div>
      </Container>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Leaderboard Period</DrawerTitle>
          <DrawerDescription>
            Select the period you want to see the leaderboard for.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-8">
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-3 gap-3">
              {periodConfigs?.map((periodItem) => (
                <Button
                  key={periodItem.label}
                  variant={periodItem.isActive ? "default" : "outline"}
                  className={cn("h-auto flex-col gap-1 py-4")}
                  onClick={() => {
                    setDuration(periodItem.label);
                  }}
                >
                  <span className="text-lg font-bold">{periodItem.label}</span>
                  <span className="text-xs font-normal opacity-70">
                    {dayjs(periodItem.startDate).format("DD.MM.YYYY")} -{" "}
                    {dayjs(periodItem.endDate).format("DD.MM.YYYY")}
                  </span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
