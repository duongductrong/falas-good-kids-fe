import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container, { ContainerProps } from "../layout/container";
import { cn } from "@/lib/utils";

export interface LeaderboardFilterProps extends ContainerProps {}

const LeaderboardFilter = ({ className, ...props }: LeaderboardFilterProps) => {
  return (
    <Container
      {...props}
      className={cn("flex items-center justify-center", className)}
    >
      <Tabs defaultValue="all-time">
        <TabsList>
          <TabsTrigger value="all-time">All time</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
      </Tabs>
    </Container>
  );
};

export default LeaderboardFilter;
