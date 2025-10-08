import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { usePersonVotesHistory } from "@/features/person/queries/use-person-votes-history";
import { History } from "lucide-react";
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

export const TrayProfileVotes = ({ id }: TrayProfileVotesProps) => {
  const {
    data: votes,
    isLoading,
    isFetching,
  } = usePersonVotesHistory({
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
        type: Number(vote.votedBy?.id) === Number(id) ? "sent" : "received",
        date: vote.votedDate,
      }));
    },
  });

  const isPending = isLoading || isFetching;

  return (
    <div className="flex flex-col h-full">
      <Label className="mb-1">Vote History</Label>
      <p className="text-sm text-muted-foreground mb-4">
        Recent votes sent and received by this person
      </p>

      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="flex flex-col gap-4">
          {isPending ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-2 w-full">
                <Skeleton className="size-6 rounded-full" />
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="w-[20%] h-2" />
                  <Skeleton className="w-full h-2" />
                  <Skeleton className="w-full h-2" />
                </div>
              </div>
            ))
          ) : votes?.length ? (
            votes
              ?.slice(0, 5)
              .map((vote, index) => (
                <VoteHistoryItem key={vote.id} vote={vote} />
              ))
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <History className="size-4" />
                </EmptyMedia>
                <EmptyDescription>
                  This person hasn&apos;t sent or received any votes yet. Check
                  back later!
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
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
    <div className="flex items-start gap-4 group pb-3 border-b border-border border-dashed">
      {/* Avatar */}
      <Avatar className="size-5 shrink-0">
        <AvatarImage src={vote.person.avatar} alt={vote.person.realName} />
        <AvatarFallback className="text-xs">
          {getInitials(vote.person.realName)}
        </AvatarFallback>
      </Avatar>

      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          {vote.person.realName}
        </span>{" "}
        {vote.type === "received" ? "voted for" : "was recognized for"} the{" "}
        <span className="font-medium text-foreground">{vote.category}</span>{" "}
        topic{" "}
      </p>

      <div className="ml-auto flex flex-col gap-1 shrink-0 whitespace-nowrap">
        <p className="text-xs text-muted-foreground/80 text-right">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};
