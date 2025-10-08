import { cn } from "@/lib/utils";
import { Slot, SlotProps } from "@radix-ui/react-slot";

export interface ContainerProps extends SlotProps {
  asChild?: boolean;
}

const Container = ({ className, asChild, ...props }: ContainerProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp {...props} className={cn("max-w-[1280px] mx-auto px-2 md:px-4", className)} />
  );
};

export default Container;
