import { cn } from "@/lib/utils";
import Container, { ContainerProps } from "../layout/container";
import { HonoringAwardsLegend } from "./honoring-awards-legend";
import { HonoringAwardsPodium } from "./honoring-awards-podium";
import HonoringRankReasonable from "./honoring-rank-reasonable";

export interface HonoringTop3Props extends ContainerProps {}

export const HonoringTop3 = ({ className, ...props }: HonoringTop3Props) => {
  return (
    <Container
      {...props}
      className={cn(
        "flex gap-16 justify-around [&>*]:w-full pt-6 pb-20",
        className
      )}
    >
      <HonoringAwardsPodium
        top={<HonoringRankReasonable fill="#0255F5" ranking={2} />}
        className="translate-y-10"
      >
        <HonoringAwardsLegend
          name="Trọng Dương"
          avatar="https://trongduong.com/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F39333905%3Fv%3D4&w=256&q=75"
          top="2"
          color="#0255F5"
        />
      </HonoringAwardsPodium>
      <HonoringAwardsPodium
        top={<HonoringRankReasonable fill="#E63946" ranking={1} />}
      >
        <HonoringAwardsLegend
          name="Trân Nguyễn"
          avatar="https://trongduong.com/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F39333905%3Fv%3D4&w=256&q=75"
          top="1"
          color="#E63946"
        />
      </HonoringAwardsPodium>
      <HonoringAwardsPodium
        top={<HonoringRankReasonable fill="#00AE01" ranking={3} />}
        className="translate-y-10"
      >
        <HonoringAwardsLegend
          name="Trân Nguyễn"
          avatar="https://trongduong.com/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F39333905%3Fv%3D4&w=256&q=75"
          top="3"
          color="#00AE01"
        />
      </HonoringAwardsPodium>
    </Container>
  );
};
