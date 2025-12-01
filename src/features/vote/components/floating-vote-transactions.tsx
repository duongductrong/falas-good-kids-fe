"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronRight, Sparkles, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Vote } from "../types";
import { useVoteTransactions } from "../queries/use-vote-transactions";

dayjs.extend(relativeTime);

interface FloatingVoteTransactionsProps {
  defaultOpen?: boolean;
  className?: string;
}

export function FloatingVoteTransactions({
  defaultOpen = true,
  className,
}: FloatingVoteTransactionsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useVoteTransactions({
    variables: { size: 15, sortOrder: "DESC" },
  });

  const transactions = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 z-10 flex items-center",
        className
      )}
    >
      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className={cn(
          "relative flex items-center justify-center",
          "w-10 h-20 rounded-l-xl",
          "bg-gradient-to-b from-card/95 to-card/80",
          "backdrop-blur-xl border border-r-0 border-border/50",
          "shadow-2xl shadow-black/30",
          "hover:bg-accent/20 transition-colors",
          "group"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={isOpen ? "Collapse vote feed" : "Expand vote feed"}
      >
        <div className="absolute inset-0 rounded-l-xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronRight className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </motion.div>
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-chart-1 via-chart-2 to-chart-3 rounded-full opacity-60" />
      </motion.button>

      {/* Main Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
              opacity: { duration: 0.15 },
            }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "w-[340px] h-[520px] flex flex-col",
                "bg-gradient-to-b from-card/98 to-card/95",
                "backdrop-blur-2xl",
                "border border-l-0 border-border/40",
                "rounded-l-2xl",
                "shadow-2xl shadow-black/40"
              )}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-border/30">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="size-9 rounded-xl bg-gradient-to-br from-chart-1/20 to-chart-2/20 flex items-center justify-center">
                      <Zap className="size-4 text-chart-1" />
                    </div>
                    <motion.div
                      className="absolute -top-0.5 -right-0.5 size-2.5 bg-chart-3 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Live Activity
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {transactions.length > 0
                        ? `${transactions.length} recent votes`
                        : "Watching for votes..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto scrollbar-hidden"
              >
                <div className="px-4 py-3 space-y-2">
                  {isLoading ? (
                    <TransactionsSkeleton />
                  ) : transactions.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <>
                      {transactions.map((vote, index) => (
                        <TransactionItem
                          key={vote.id}
                          vote={vote}
                          index={index}
                        />
                      ))}
                      {/* Load More Trigger */}
                      <div ref={loadMoreRef} className="py-2">
                        {isFetchingNextPage && <LoadingMore />}
                        {!hasNextPage && transactions.length > 0 && (
                          <p className="text-xs text-center text-muted-foreground/60 py-2">
                            You&apos;ve reached the beginning
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer Gradient */}
              <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TransactionItemProps {
  vote: Vote;
  index: number;
}

function TransactionItem({ vote, index }: TransactionItemProps) {
  const voterName = vote.votedBy?.realName ?? "Anonymous";
  const targetName = vote.votedFor?.realName ?? "Someone";
  const topic = vote.topic?.text ?? "Recognition";
  const timeAgo = dayjs(vote.createdAt).fromNow();

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: Math.min(index * 0.03, 0.3),
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "group relative p-3 rounded-xl",
        "bg-gradient-to-r from-secondary/30 to-secondary/10",
        "border border-border/20",
        "hover:border-border/40 hover:bg-secondary/40",
        "transition-all duration-200"
      )}
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-chart-1/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative flex items-start gap-3">
        {/* Avatars */}
        <div className="relative shrink-0">
          <Avatar className="size-8 ring-2 ring-background">
            <AvatarImage src={vote.votedBy?.avatar} alt={voterName} />
            <AvatarFallback className="text-[10px] bg-secondary">
              {getInitials(voterName)}
            </AvatarFallback>
          </Avatar>
          {vote.votedFor?.avatar && (
            <Avatar className="absolute -bottom-1 -right-1 size-5 ring-2 ring-background">
              <AvatarImage src={vote.votedFor.avatar} alt={targetName} />
              <AvatarFallback className="text-[8px] bg-chart-1/20">
                {getInitials(targetName)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs leading-relaxed">
            <span className="font-medium text-foreground">{voterName}</span>
            <span className="text-muted-foreground"> voted for </span>
            <span className="font-medium text-foreground">{targetName}</span>
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full",
                "text-[10px] font-medium",
                "bg-chart-1/15 text-chart-1"
              )}
            >
              <Sparkles className="size-2.5" />
              {topic}
            </span>
            <span className="text-[10px] text-muted-foreground/70">
              {timeAgo}
            </span>
          </div>
          {vote.message && (
            <p className="text-[11px] text-muted-foreground mt-2 italic line-clamp-2">
              &ldquo;{vote.message}&rdquo;
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TransactionsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="p-3 rounded-xl bg-secondary/20 border border-border/10"
        >
          <div className="flex items-start gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingMore() {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <motion.div
        className="size-1.5 rounded-full bg-chart-1"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
      />
      <motion.div
        className="size-1.5 rounded-full bg-chart-2"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
      />
      <motion.div
        className="size-1.5 rounded-full bg-chart-3"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="size-14 rounded-2xl bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center mb-4">
        <Sparkles className="size-6 text-muted-foreground" />
      </div>
      <h4 className="text-sm font-medium text-foreground mb-1">
        No activity yet
      </h4>
      <p className="text-xs text-muted-foreground max-w-[200px]">
        Vote transactions will appear here as they happen.
      </p>
    </motion.div>
  );
}

