import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hand } from "lucide-react";
import { PropsWithChildren } from "react";

export interface TrayHistoryProps extends PropsWithChildren {}

interface HistoryItem {
  id: string;
  voterName: string;
  voterAvatar: string;
  targetName: string;
  targetAvatar: string;
  timestamp: string;
  voteType: "upvote" | "downvote";
}

const mockHistoryData: HistoryItem[] = [
  {
    id: "1",
    voterName: "Alice Johnson",
    voterAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    targetName: "Bob Smith",
    targetAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    timestamp: "2 minutes ago",
    voteType: "upvote",
  },
  {
    id: "2",
    voterName: "Charlie Brown",
    voterAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    targetName: "Diana Prince",
    targetAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    timestamp: "5 minutes ago",
    voteType: "upvote",
  },
  {
    id: "3",
    voterName: "Eva Martinez",
    voterAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    targetName: "Frank Wilson",
    targetAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    timestamp: "12 minutes ago",
    voteType: "upvote",
  },
  {
    id: "4",
    voterName: "Grace Lee",
    voterAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    targetName: "Henry Davis",
    targetAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    timestamp: "18 minutes ago",
    voteType: "upvote",
  },
  {
    id: "5",
    voterName: "Ivy Chen",
    voterAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    targetName: "Jack Thompson",
    targetAvatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    timestamp: "25 minutes ago",
    voteType: "upvote",
  },
  {
    id: "6",
    voterName: "Kevin Park",
    voterAvatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    targetName: "Luna Rodriguez",
    targetAvatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    timestamp: "32 minutes ago",
    voteType: "upvote",
  },
  {
    id: "7",
    voterName: "Maya Patel",
    voterAvatar:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
    targetName: "Noah Kim",
    targetAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    timestamp: "45 minutes ago",
    voteType: "upvote",
  },
  {
    id: "8",
    voterName: "Olivia White",
    voterAvatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
    targetName: "Peter Jones",
    targetAvatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
    timestamp: "1 hour ago",
    voteType: "upvote",
  },
  {
    id: "9",
    voterName: "Quinn Taylor",
    voterAvatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face",
    targetName: "Rachel Green",
    targetAvatar:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face",
    timestamp: "1 hour ago",
    voteType: "upvote",
  },
  {
    id: "10",
    voterName: "Sam Wilson",
    voterAvatar:
      "https://images.unsplash.com/photo-1528892952291-009c663ce843?w=150&h=150&fit=crop&crop=face",
    targetName: "Tara Singh",
    targetAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    timestamp: "2 hours ago",
    voteType: "upvote",
  },
];

const TrayHistory = ({ children }: TrayHistoryProps) => {
  return (
    <Drawer variant="tray">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-w-3xl w-full">
        <DrawerHeader>
          <DrawerTitle>Vote Histories</DrawerTitle>
          <DrawerDescription>
            Recent voting activities from the community.
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="mb-4">
          <div className="px-4 pb-4 space-y-3 max-h-[60vh]">
            {mockHistoryData.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <Avatar className="size-10 flex-shrink-0">
                  <AvatarImage src={item.voterAvatar} alt={item.voterName} />
                  <AvatarFallback>
                    {item.voterName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-none truncate">
                      <span className="font-semibold">{item.voterName}</span>{" "}
                      voted for{" "}
                      <span className="font-semibold">{item.targetName}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.timestamp}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Hand className="size-4 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default TrayHistory;
