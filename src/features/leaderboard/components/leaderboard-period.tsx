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
import { usePeriodContext } from "@/features/period";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { CalendarDays, ChevronDown, Infinity } from "lucide-react";
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

  const handleRangeChange = (value: string) => {
    setRange(value as LeaderboardRange);
  };

  return (
    <Drawer variant="tray">
      <Container
        {...props}
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          className
        )}
      >
        <div className="mb-6 flex items-center gap-3">
          {/* Premium Period Tabs */}
          <div className="relative flex items-center gap-1 rounded-full bg-white/[0.03] p-1 backdrop-blur-xl border border-white/[0.08] shadow-[0_0_30px_-5px_rgba(124,58,237,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
            {/* Animated glow background for active state */}
            <div
              className={cn(
                "absolute top-1 h-[calc(100%-8px)] rounded-full transition-all duration-500 ease-out",
                "bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20",
                "shadow-[0_0_20px_2px_rgba(139,92,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
                "border border-white/10",
                range === LeaderboardRange.ALL_TIME
                  ? "left-1 w-[calc(50%-2px)]"
                  : "left-[calc(50%+1px)] w-[calc(50%-2px)]"
              )}
            />

            <button
              onClick={() => handleRangeChange(LeaderboardRange.ALL_TIME)}
              className={cn(
                "relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                range === LeaderboardRange.ALL_TIME
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              <Infinity
                className={cn(
                  "size-4 transition-all duration-300",
                  range === LeaderboardRange.ALL_TIME
                    ? "text-violet-400"
                    : "text-white/40"
                )}
              />
              <span>All time</span>
            </button>

            <button
              onClick={() => handleRangeChange(LeaderboardRange.MONTHLY)}
              className={cn(
                "relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                range === LeaderboardRange.MONTHLY
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              <CalendarDays
                className={cn(
                  "size-4 transition-all duration-300",
                  range === LeaderboardRange.MONTHLY
                    ? "text-fuchsia-400"
                    : "text-white/40"
                )}
              />
              <span>Monthly</span>
            </button>
          </div>

          {/* Monthly Period Selector Button */}
          {range === LeaderboardRange.MONTHLY ? (
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className="group relative h-auto rounded-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 shadow-[0_0_20px_-5px_rgba(217,70,239,0.15)]"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-fuchsia-400/90">T</span>
                  <span className="text-white">{duration}</span>
                  <ChevronDown className="size-3.5 text-white/50 group-hover:text-white/80 transition-colors duration-300" />
                </span>
              </Button>
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
