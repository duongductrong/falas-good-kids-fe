import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { ComponentProps } from "react";
import LeaderBoardSignal from "../assets/leaderboard-signal.svg";
import Container from "./container";

export interface HeaderProps extends ComponentProps<"header"> {}

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <Container asChild>
      <header
        {...props}
        className={cn("py-4 flex items-center justify-between", className)}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo/amanotes.png"
            width={200}
            height={200}
            alt="Amanotes"
            className="size-10"
          />
          <XIcon className="size-6 text-foreground ml-4" />
          <Image
            src={LeaderBoardSignal}
            alt="Leader Board Flag"
            className="size-12 translate-y-1"
          />
          <h2 className="text-xl font-black tracking-wider">LEADERBOARD</h2>

          <div className="h-6 w-px bg-border mx-4"></div>

          <p className="text-sm text-muted-foreground">
            The top is updated every day. Try to do <br /> great things to get
            the top rank.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <CircleIcon className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View the leaderboard.</TooltipContent>
          </Tooltip>
        </div>
      </header>
    </Container>
  );
};
