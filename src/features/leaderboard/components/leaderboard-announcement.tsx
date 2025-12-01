"use client";
import { usePeriodContext } from "@/features/period";
import dayjs from "dayjs";
import duration, { Duration } from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Timer } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Container, { ContainerProps } from "../layout/container";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export interface LeaderboardAnnouncementProps extends ContainerProps {}

export const LeaderboardAnnouncement = (
  props: LeaderboardAnnouncementProps
) => {
  return (
    <Container {...props}>
      <EndOfTheMonth />
    </Container>
  );
};

export const EndOfTheMonth = () => {
  const { currentPeriod: endOfPeriod } = usePeriodContext();

  const endDate = useMemo(() => {
    if (!endOfPeriod || !dayjs(endOfPeriod.endDate).isValid()) return null;

    return dayjs(endOfPeriod.endDate);
  }, [endOfPeriod]);

  const getDiffEndOfMonth = useCallback(() => {
    if (!endDate) return null;
    return dayjs.duration(endDate.diff(dayjs()));
  }, [endDate]);

  const [diff, setDiff] = useState<Duration | null>(getDiffEndOfMonth());

  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(getDiffEndOfMonth());
    }, 1000);

    return () => clearInterval(timer);
  }, [getDiffEndOfMonth]);

  if (!diff || !endDate) return null;

  return (
    <div className="text-center">
      <Timer className="size-10 text-base mx-auto mb-2 text-muted-foreground" />
      <h2 className="text-muted-foreground text-sm mb-4">
        Ends in {endDate.format("MMMM D, YYYY HH:mm")}
      </h2>
      <p className="text-3xl text-foreground font-bold">
        {diff.days()}d {diff.hours()}h {diff.minutes()}m {diff.seconds()}s
      </p>
    </div>
  );
};
