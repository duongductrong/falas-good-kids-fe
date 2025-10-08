import { PropsWithChildren } from "react";
import { TrayProfileRankingTrends } from "./tray-profile-ranking-trends";

export interface TrayProfileOverviewProps extends PropsWithChildren {
  id: number | string;
}

export const TrayProfileOverview = ({ id }: TrayProfileOverviewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <TrayProfileRankingTrends id={id} />
    </div>
  );
};
