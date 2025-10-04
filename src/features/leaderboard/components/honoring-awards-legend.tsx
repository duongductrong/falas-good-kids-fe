import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Circle } from "lucide-react";
import Image from "next/image";
import { ComponentProps } from "react";

export interface HonoringAwardsLegendProps extends ComponentProps<"div"> {
  avatar: string;
  name: string;
  top: "1" | "2" | "3";
  color?: string;
}

export const HonoringAwardsLegend = ({
  className,
  avatar,
  name,
  top = "1",
  color = "#fff",
  ...props
}: HonoringAwardsLegendProps) => {
  const ranking = 1;
  return (
    <div
      className={cn("flex gap-8 justify-between [&>*]:w-full pb-14", className)}
      {...props}
    >
      <div className="flex flex-col gap-2 flex flex-col items-center">
        <div className="relative">
          <Image
            className="absolute bottom-full left-1/2 -translate-x-1/2 z-10 size-14"
            src={`/assets/icons/crown-${top}.png`}
            alt="Crown"
            width={150}
            height={150}
          />
          {avatar ? (
            <div className="relative p-3 cursor-pointer">
              <Avatar className="size-24 flex-shrink-0">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="font-semibold">
                  {"UN"}
                </AvatarFallback>
              </Avatar>

              <Image
                src="/assets/icons/avatar-award.png"
                alt="Avatar Award"
                width={150}
                height={150}
                className="absolute top-0 right-0 -translate-y-px"
              />
            </div>
          ) : (
            <Circle className="size-30" />
          )}
        </div>
        <div
          data-top={top}
          className={cn("text-base md:text-xl text-foreground font-bold")}
        >
          {name}
        </div>
        <div
          data-top={top}
          className={cn("text-2xl text-foreground font-bold mb-4", {
            "text-top-1": top === "1",
            "text-top-2": top === "2",
            "text-top-3": top === "3",
          })}
        >
          Top #{top}
        </div>
      </div>
    </div>
  );
};
