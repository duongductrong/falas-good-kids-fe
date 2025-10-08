import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePersonVotesHistory } from "@/features/person/queries/use-person-votes-history";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { PropsWithChildren } from "react";

export interface VoteHistoryItem {
  id: number;
  person: {
    id: number;
    realName: string;
    avatar?: string;
  };
  type: "sent" | "received";
  category: string;
  date: string;
}

export interface TrayProfileVotesProps extends PropsWithChildren {
  id: number | string;
}

export const TrayProfileVotes = ({ id, ...props }: TrayProfileVotesProps) => {
  const { data: votes } = usePersonVotesHistory({
    variables: {
      id: Number(id),
    },
    select: (resp) => {
      const originalData = resp.data;

      return originalData.map<VoteHistoryItem>((vote) => ({
        id: vote.id,
        person: {
          id: vote.votedBy?.id ?? 0,
          realName: vote.votedBy?.realName ?? "",
          avatar: vote.votedBy?.avatar,
        },
        category: vote.topic?.text ?? "",
        type: vote.votedBy?.id === Number(id) ? "sent" : "received",
        date: vote.votedDate,
      }));
    },
  });

  return (
    <div className="flex flex-col h-full">
      <Label className="mb-1">Recent votes</Label>
      <p className="text-sm text-muted-foreground mb-4">
        View your votes history
      </p>

      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="flex flex-col gap-2">
          {votes?.slice(0, 3).map((vote, index) => (
            <VoteHistoryItem key={vote.id} vote={vote} />
          ))}
        </div>

        <Button size="xs" variant="default" className="mt-4">
          View all votes <ArrowRight className="size-3" />
        </Button>
      </ScrollArea>
    </div>
  );
};

interface VoteHistoryItemProps {
  vote: VoteHistoryItem;
}

const VoteHistoryItem = ({ vote }: VoteHistoryItemProps) => {
  const formattedDate = new Date(vote.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-start gap-3 group">
      {/* Avatar */}
      <Avatar className="size-10 shrink-0">
        <AvatarImage src={vote.person.avatar} alt={vote.person.realName} />
        <AvatarFallback className="text-xs">
          {getInitials(vote.person.realName)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-medium text-foreground truncate">
            {vote.person.realName}
          </p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-sm text-muted-foreground truncate max-w-[250px] cursor-help mb-1">
              {vote.category}
            </p>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-xs">{vote.category}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="ml-auto flex flex-col gap-1">
        <div
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
            vote.type === "sent"
              ? "bg-chart-1/20 text-chart-1"
              : "bg-chart-2/20 text-chart-2"
          )}
        >
          {vote.type === "sent" ? (
            <>
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
              Sent
            </>
          ) : (
            <>
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 13l5 5m0 0l5-5m-5 5V6"
                />
              </svg>
              Received
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground/80 text-right">{formattedDate}</p>
      </div>
    </div>
  );
};
