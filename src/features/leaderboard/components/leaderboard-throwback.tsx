"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, HandCoins, Trophy } from "lucide-react";
import Image from "next/image";
import { ComponentProps } from "react";
import Container from "../layout/container";
import { usePreviousPeriodLeaderboard } from "../hooks/use-previous-period-leaderboard";
import { Player } from "./leaderboard-provider";
import { TrayLeaderboard } from "./tray-leaderboard";

export interface LeaderboardThrowbackProps extends ComponentProps<"div"> {}

export const LeaderboardThrowback = ({
  className,
  ...props
}: LeaderboardThrowbackProps) => {
  const { previousPeriod, top3Players, hasPreviousData, isLoading } =
    usePreviousPeriodLeaderboard();

  if (isLoading || !hasPreviousData || !previousPeriod) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent",
        "before:via-transparent before:to-background before:z-10",
        "before:pointer-events-none",
        className
      )}
      {...props}
    >
      <Container className="relative">
        <div
          className={cn(
            "rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm",
            "p-6 md:p-8 max-w-4xl mx-auto"
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                "bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10",
                "border border-amber-500/20",
                "shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)]"
              )}
            >
              <Clock className="size-4 text-amber-400/80" />
              <span className="text-sm font-medium text-amber-300/90">
                Last Month&apos;s Champions
              </span>
              <span className="text-xs text-amber-400/60 font-semibold">
                {previousPeriod.label}
              </span>
            </div>
          </div>

          {/* Throwback podium - muted/grayscale styling */}
          <div
            className={cn(
              "flex gap-4 sm:gap-6 lg:gap-8 justify-around",
              "grayscale-[30%] opacity-70 hover:grayscale-0 hover:opacity-100",
              "transition-all duration-500 ease-out"
            )}
          >
            <ThrowbackPlayer
              player={top3Players?.[1]}
              rank={2}
              color="#0255F5"
              className="translate-y-4"
            />

            <ThrowbackPlayer
              player={top3Players?.[0]}
              rank={1}
              color="#E63946"
            />

            <ThrowbackPlayer
              player={top3Players?.[2]}
              rank={3}
              color="#00AE01"
              className="translate-y-4"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] relative z-[999] pb-4">
            <div className="flex flex-col items-center text-center gap-4">
              {/* Message */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground/80">
                  This month&apos;s leaderboard is waiting for you!
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Be the first to vote and help someone claim the spotlight.
                </p>
              </div>

              <TrayLeaderboard>
                <Button
                  size="default"
                  className={cn(
                    "gap-2 group",
                    "bg-gradient-to-r from-violet-600 to-fuchsia-600",
                    "hover:from-violet-500 hover:to-fuchsia-500",
                    "shadow-[0_0_20px_-5px_rgba(139,92,246,0.4)]",
                    "hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.6)]",
                    "transition-all duration-300"
                  )}
                >
                  <HandCoins className="size-4" />
                  Vote for Someone
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </TrayLeaderboard>
            </div>
          </div>
        </div>

        <div className="absolute -top-1 -left-1 size-3 border-t border-l border-amber-500/30 rounded-tl" />
        <div className="absolute -top-1 -right-1 size-3 border-t border-r border-amber-500/30 rounded-tr" />
        <div className="absolute -bottom-1 -left-1 size-3 border-b border-l border-amber-500/30 rounded-bl" />
        <div className="absolute -bottom-1 -right-1 size-3 border-b border-r border-amber-500/30 rounded-br" />
      </Container>
    </div>
  );
};

interface ThrowbackPlayerProps extends ComponentProps<"div"> {
  player?: Player;
  rank: 1 | 2 | 3;
  color: string;
}

const ThrowbackPlayer = ({
  player,
  rank,
  color,
  className,
  ...props
}: ThrowbackPlayerProps) => {
  const initials = player?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 w-full max-w-[140px]",
        className
      )}
      {...props}
    >
      {/* Rank badge */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          "size-6 sm:size-8 rounded-full",
          "border border-white/10 bg-white/5"
        )}
        style={{
          boxShadow: `0 0 12px -2px ${color}30`,
        }}
      >
        {rank === 1 ? (
          <Trophy className="size-3 sm:size-4 text-amber-400/80" />
        ) : (
          <span
            className="text-xs sm:text-sm font-bold"
            style={{ color: `${color}90` }}
          >
            {rank}
          </span>
        )}
      </div>

      {/* Avatar */}
      <div className="relative">
        {player?.avatar ? (
          <div className="relative">
            <Avatar className="size-14 sm:size-16 border-2 border-white/10">
              <AvatarImage src={player.avatar} alt={player.name} />
              <AvatarFallback
                className="text-xs font-semibold bg-white/5"
                style={{ color: `${color}80` }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            {rank === 1 && (
              <Image
                className="absolute -top-3 left-1/2 -translate-x-1/2 size-5 sm:size-7 opacity-60"
                src="/assets/icons/crown-1.png"
                alt="Crown"
                width={50}
                height={50}
              />
            )}
          </div>
        ) : (
          <div
            className={cn(
              "size-10 sm:size-14 rounded-full",
              "bg-white/5 border border-white/10",
              "flex items-center justify-center"
            )}
          >
            <span className="text-xs text-muted-foreground/50">?</span>
          </div>
        )}
      </div>

      {/* Name */}
      <p className="text-xs sm:text-sm font-medium text-foreground/70 text-center truncate max-w-full">
        {player?.name || "—"}
      </p>

      {/* Score */}
      {player && (
        <p className="text-[10px] sm:text-xs text-muted-foreground/50">
          {player.scores} votes
        </p>
      )}
    </div>
  );
};
