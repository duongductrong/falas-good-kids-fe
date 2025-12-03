"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Calendar, Crown, TrendingUp } from "lucide-react";
import { ComponentProps } from "react";
import Container from "../layout/container";
import { useLeaderboardMonthlyHistory } from "../queries/use-leaderboard-monthly-history";
import TrayProfile from "./tray-profile";

export interface LeaderboardMonthlyHistoryProps extends ComponentProps<"div"> {}

export const LeaderboardMonthlyHistory = ({
  className,
  ...props
}: LeaderboardMonthlyHistoryProps) => {
  const { data, isLoading } = useLeaderboardMonthlyHistory({
    variables: {
      limit: 6,
      excludeCurrent: true,
    },
  });

  const monthlyHistory = data?.data || [];

  // Don't render if no data or still loading
  if (isLoading || monthlyHistory.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative py-12 border-t border-border/40",
        "bg-gradient-to-b from-transparent via-muted/5 to-transparent",
        className
      )}
      {...props}
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/30">
            <Calendar className="size-3.5 text-muted-foreground/70" />
            <span className="text-xs font-medium text-muted-foreground/80 tracking-wide">
              RECOGNITION TIMELINE
            </span>
          </div>
          <h3 className="text-lg  font-semibold text-foreground/80">
            Past Champions
          </h3>
          <p className="text-sm text-muted-foreground/60 text-center max-w-md">
            A look back at those who earned the community&apos;s recognition
          </p>
        </div>

        {/* Timeline */}
        <ScrollArea className="w-full pb-4">
          <div className="flex gap-4 px-4">
            {monthlyHistory.map((month) => (
              <MonthCard key={month.monthLabel} month={month} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Container>
    </div>
  );
};

interface MonthCardProps {
  month: {
    monthLabel: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    topPlayers: Array<{
      id: number;
      name: string;
      email: string;
      avatar?: string;
      scores: number;
      rank: 1 | 2 | 3;
    }>;
  };
}

const MonthCard = ({ month }: MonthCardProps) => {
  const hasWinners = month.topPlayers.length > 0;

  return (
    <div
      className={cn(
        "flex-shrink-0 w-[240px] rounded-xl border border-border/30",
        "bg-card/40 backdrop-blur-sm p-5",
        "opacity-70 hover:opacity-100 transition-all duration-300",
        "hover:shadow-md hover:border-border/50",
        "relative overflow-hidden"
      )}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Month label */}
      <div className="mb-4 relative">
        <h4 className=" text-sm font-semibold text-foreground/70 tracking-tight">
          {month.monthLabel}
        </h4>
        <div className="h-px bg-gradient-to-r from-border/40 via-border/20 to-transparent mt-2" />
      </div>

      {/* Winners */}
      {hasWinners ? (
        <div className="space-y-3">
          {month.topPlayers.map((player) => (
            <TrayProfile key={player.id} id={player.id}>
              <div
                className={cn(
                  "flex items-center gap-2.5 cursor-pointer group",
                  "transition-transform duration-200 hover:translate-x-0.5"
                )}
              >
                {/* Rank indicator */}
                <div className="flex-shrink-0 relative">
                  {player.rank === 1 ? (
                    <Crown className="size-3.5 text-amber-500/60" />
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground/40 w-3.5 text-center">
                      {player.rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <Avatar className="size-8 border border-border/20">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback className="text-xs bg-muted/50 text-muted-foreground/70">
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Player info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground/80 truncate group-hover:text-foreground transition-colors">
                    {player.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground/50">
                    {player.scores} {player.scores === 1 ? "vote" : "votes"}
                  </p>
                </div>
              </div>
            </TrayProfile>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <TrendingUp className="size-6 text-muted-foreground/20 mb-2" />
          <p className="text-xs text-muted-foreground/40">No rankings</p>
          <p className="text-[10px] text-muted-foreground/30 mt-1">
            this month
          </p>
        </div>
      )}
    </div>
  );
};
