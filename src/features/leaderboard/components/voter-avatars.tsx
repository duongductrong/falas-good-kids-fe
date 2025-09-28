import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Voter {
  id: string;
  name: string;
  avatar?: string;
}

export interface VoterAvatarsProps {
  voters: Voter[];
  maxVisible?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const VoterAvatars = ({ 
  voters, 
  maxVisible = 3, 
  className,
  size = "sm" 
}: VoterAvatarsProps) => {
  const visibleVoters = voters.slice(0, maxVisible);
  const remainingCount = Math.max(0, voters.length - maxVisible);
  
  const sizeClasses = {
    sm: "size-6",
    md: "size-8", 
    lg: "size-10"
  };

  if (voters.length === 0) {
    return (
      <div className={cn("text-xs text-muted-foreground", className)}>
        No votes yet
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-2">
        {visibleVoters.map((voter, index) => (
          <Avatar 
            key={voter.id} 
            className={cn(
              sizeClasses[size],
              "border-2 border-background relative z-10",
              index > 0 && "ml-0"
            )}
            style={{ zIndex: maxVisible - index }}
          >
            <AvatarImage src={voter.avatar} alt={voter.name} />
            <AvatarFallback className="text-xs">
              {voter.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
        
        {remainingCount > 0 && (
          <div 
            className={cn(
              sizeClasses[size],
              "bg-muted border-2 border-background rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground relative"
            )}
            style={{ zIndex: 1 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
};
