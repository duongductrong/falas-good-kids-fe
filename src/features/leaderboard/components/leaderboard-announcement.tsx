"use client";
import dayjs from "dayjs";
import duration, { Duration } from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  const [endOfMonth] = useState(dayjs().endOf("month"));

  const getDiffEndOfMonth = useCallback(() => {
    return dayjs.duration(endOfMonth.diff(dayjs()));
  }, [endOfMonth]);

  const [diff, setDiff] = useState<Duration>(getDiffEndOfMonth());

  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(getDiffEndOfMonth());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <Timer className="size-10 text-base mx-auto mb-2" />
      <h2 className="text-muted-foreground text-sm mb-4">
        Ends in {endOfMonth.format("MMMM D, YYYY")}
      </h2>
      <p className="text-3xl text-foreground font-bold">
        {diff.days()}d {diff.hours()}h {diff.minutes()}m {diff.seconds()}s
      </p>
    </div>
  );
};
