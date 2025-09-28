import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

export interface AchievementStyle1Props extends ComponentProps<"div"> {}

const AchievementStyle1 = ({
  className,
  children,
  ...props
}: AchievementStyle1Props) => {
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <Image
        src="/assets/icons/archivement-badge.png"
        alt="Amanotes"
        width={200}
        height={200}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
      />
      <p className="whitespace-nowrap font-bold leading-6 px-6 -translate-y-px">{children}</p>
    </div>
  );
};

export default AchievementStyle1;
