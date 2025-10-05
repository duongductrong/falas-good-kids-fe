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
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isEmpty, isNil } from "lodash-es";
import { useMemo } from "react";
import { useUpdateEffect } from "react-use";
import { useDurationQuery } from "../hooks/use-duration-query";
import { useRangeQuery } from "../hooks/use-range-query";
import Container, { ContainerProps } from "../layout/container";
import { LeaderboardRange } from "../queries";
import { useLeaderboardRange } from "../queries/use-leaderboard-range";

dayjs.extend(customParseFormat);

export interface LeaderboardPeriodProps extends ContainerProps {}

export const LeaderboardPeriod = ({
  className,
  ...props
}: LeaderboardPeriodProps) => {
  const [range, setRange] = useRangeQuery();
  const [duration, setDuration] = useDurationQuery();

  const { data: leaderboardRange } = useLeaderboardRange({
    select: (resp) => resp.data,
  });

  const currentMonth = useMemo(
    () => dayjs(`01.${duration}`, "DD.MM.YYYY"),
    [duration]
  );

  const months = useMemo(() => {
    const months: {
      month: string;
      label: string;
      isCurrent: boolean;
    }[] = [];

    if (!leaderboardRange?.range || leaderboardRange.range.length < 2) {
      return months;
    }

    const [start, end] = leaderboardRange.range;

    if (!start || !end) {
      return months;
    }

    let startDate = dayjs(start * 1000);
    const endDate = dayjs(end * 1000);

    while (startDate.isBefore(endDate)) {
      const isActive = startDate
        .startOf("month")
        .isSame(dayjs(currentMonth), "month");

      months.push({
        month: startDate.format("MM.YYYY"),
        label: startDate.format("MMMM YYYY"),
        isCurrent: isActive,
      });

      startDate = startDate.add(1, "month");
    }

    return months.reverse();
  }, [leaderboardRange?.range, currentMonth]);

  useUpdateEffect(() => {
    if (
      ((range === LeaderboardRange.MONTHLY && isNil(duration)) ||
        isEmpty(duration)) &&
      months.length
    ) {
      setDuration(months[0].month);
    }

    if (range === LeaderboardRange.ALL_TIME) {
      setDuration("");
    }
  }, [duration, range]);

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
              <Button variant="secondary">Month: {currentMonth.format("MMMM YYYY")}</Button>
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
              {months.map((item) => (
                <Button
                  key={item.month}
                  variant={item.isCurrent ? "default" : "outline"}
                  className={cn("h-auto flex-col gap-1 py-4")}
                  onClick={() => {
                    setDuration(item.month);
                  }}
                >
                  <span className="text-lg font-bold">{item.month}</span>
                  <span className="text-xs font-normal opacity-70">
                    {item.label}
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
