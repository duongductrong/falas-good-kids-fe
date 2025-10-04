"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVoteTopics } from "@/features/vote";
import { cn } from "@/lib/utils";
import Container, { ContainerProps } from "../layout/container";

export interface LeaderboardPeriodProps extends ContainerProps {}

export const LeaderboardPeriod = ({
  className,
  ...props
}: LeaderboardPeriodProps) => {
  const { data: topics } = useVoteTopics({
    select(data) {
      return data.data.map((topic) => ({
        label: topic.text,
        value: topic.id,
      }));
    },
  });

  return (
    <Container
      {...props}
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <Tabs defaultValue="all-time" className="mb-6">
        <TabsList>
          <TabsTrigger value="all-time">All time</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          {/* <TabsTrigger value="weekly">Weekly</TabsTrigger> */}
        </TabsList>
      </Tabs>
    </Container>
  );
};
