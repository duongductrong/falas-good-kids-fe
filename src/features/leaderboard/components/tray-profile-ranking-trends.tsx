"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { useLeaderboardRankingTrend } from "../queries/use-leaderboard-ranking-trend";

const chartData = [
  { month: "Jan", label: "#1", votes: 275 },
  { month: "Feb", label: "#3", votes: 200 },
  { month: "Mar", label: "#10", votes: 187 },
  { month: "Apr", label: "#2", votes: 173 },
  { month: "May", label: "#8", votes: 90 },
];

const chartConfig = {} satisfies ChartConfig;

export interface TrayProfileRankingTrendsProps {
  id: number | string;
}

export function TrayProfileRankingTrends({ id }: TrayProfileRankingTrendsProps) {
  const { data: trends } = useLeaderboardRankingTrend({
    variables: {
      id: Number(id),
    },
    select: (resp) => resp.data || [],
  });

  return (
    <div className="bg-transparent">
      <Label className="mb-1">Ranking Journey</Label>
      <p className="text-sm text-muted-foreground mb-2">
        Your ranking journey over time
      </p>
      <ChartContainer className="w-full h-[150px]" config={chartConfig}>
        <LineChart
          width={300}
          height={150}
          accessibilityLayer
          data={trends}
          margin={{
            top: 24,
            left: 24,
            right: 24,
          }}
        >
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" nameKey="ranked" />}
          />
          <XAxis dataKey="month" axisLine={false} />
          <Line
            dataKey="totalVotes"
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
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </div>
  );
}
