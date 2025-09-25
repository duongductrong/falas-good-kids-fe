import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { HonoringRank } from "./honoring-rank";

export interface HonoringRankReasonableProps extends ComponentProps<"div"> {
  ranking: number;
  fill: string;
  fillText?: string;
}

const HonoringRankReasonable = ({
  className,
  ranking,
  fill,
  fillText = "#fff",
  ...props
}: HonoringRankReasonableProps) => {
  return (
    <div {...props} className={cn("flex items-center gap-2", className)}>
      <div className="flex flex-col text-right">
        <p className="text-base font-bold text-foreground">203</p>
        <p className="text-xs text-muted-foreground">Votes</p>
      </div>
      <HonoringRank
        bannerColor={fill}
        text={ranking.toString()}
        textColor={fillText}
      />
      <div className="flex flex-col text-left">
        <p className="text-base font-bold text-foreground">002</p>
        <p className="text-xs text-muted-foreground">Wins</p>
      </div>
    </div>
  );
};

export default HonoringRankReasonable;
