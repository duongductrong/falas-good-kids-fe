"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { isEmpty, isNil } from "lodash-es";
import { Telescope } from "lucide-react";
import { useLeaderboardRankingTrend } from "../queries/use-leaderboard-ranking-trend";

const chartConfig = {} satisfies ChartConfig;

export interface TrayProfileRankingTrendsProps {
  id: number | string;
}

export function TrayProfileRankingTrends({
  id,
}: TrayProfileRankingTrendsProps) {
  const { data: trends } = useLeaderboardRankingTrend({
    variables: {
      id: Number(id),
    },
    enabled: !Number.isNaN(Number(id)),
    select: (resp) => {
      return resp.data || [];
    },
  });

  return (
    <div className="bg-transparent">
      <Label className="mb-1">Ranking Trends</Label>
      <p className="text-sm text-muted-foreground mb-2">
        Track ranking position and total votes over the past months.
      </p>
      {isNil(trends) || isEmpty(trends) ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <Telescope className="size-4" />
            </EmptyMedia>
            <EmptyDescription>
              This person hasn&apos;t been ranked yet. Start voting to see their
              ranking trends!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ChartContainer className="w-full h-[150px]" config={chartConfig}>
          <LineChart
            width={300}
            height={150}
            accessibilityLayer
            data={trends}
            margin={{
              top: 24,
              left: -32,
              right: 32,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="line" nameKey="ranked" />
              }
            />
            <YAxis reversed offset={0} axisLine={false} tick={false} />
            <XAxis dataKey="month" axisLine={false} />
            <Line
              dataKey="ranked"
              type="natural"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={{
                fill: "var(--chart-3)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="ranked"
                formatter={(val: any) =>
                  Number(val) === 999 ? `No ranked` : `Ranked #${val}`
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      )}
    </div>
  );
}
