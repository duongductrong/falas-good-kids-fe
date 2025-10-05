"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVoteTopics } from "@/features/vote";
import { cn } from "@/lib/utils";
import { Badge } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useUpdateEffect } from "react-use";
import { useTopicQuery } from "../hooks/use-topic-query";
import Container, { ContainerProps } from "../layout/container";

export interface LeaderboardFilterProps extends ContainerProps {}

export const LeaderboardFilter = ({
  className,
  ...props
}: LeaderboardFilterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [topic, setTopic] = useTopicQuery();

  const [selectedTopic, setSelectedTopic] = useState<string>(topic);

  const { data: topics } = useVoteTopics({
    select(data) {
      return [
        {
          id: 0,
          label: "All topics",
          value: "",
        },
      ].concat(
        data.data.map((topic) => ({
          id: topic.id,
          label: topic.text,
          value: topic.id.toString(),
        }))
      );
    },
  });

  useUpdateEffect(() => {
    if (!isShow) {
      setSelectedTopic(topic);
    }
  }, [isShow]);

  const selectedTopicData = useMemo(() => {
    return topics?.find((topic) => topic.value === selectedTopic);
  }, [topics, selectedTopic]);

  return (
    <Container
      {...props}
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <Tooltip>
        <Drawer variant="tray" open={isShow} onOpenChange={setIsShow}>
          <DrawerTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="outline" className="whitespace-normal h-fit">
                <Badge className="size-4" /> Topic:{" "}
                <p className="truncate max-w-[200px]">
                  {selectedTopicData?.label || "All topics"}
                </p>
              </Button>
            </TooltipTrigger>
          </DrawerTrigger>

          <TooltipContent>
            <p>{selectedTopicData?.label || "All topics"}</p>
          </TooltipContent>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Choose the topic you want to see</DrawerTitle>
              <DrawerDescription>
                Filter the leaderboard by topic to see rankings for specific
                categories. View achievements across all topics or focus on
                individual areas of excellence.
              </DrawerDescription>
            </DrawerHeader>

            <ScrollArea>
              <FieldGroup className="p-4 max-h-[500px]">
                <FieldSet>
                  <RadioGroup
                    value={selectedTopic}
                    onValueChange={setSelectedTopic}
                    className="grid grid-cols-2 gap-4"
                    ref={ref}
                  >
                    {topics?.map((topic) => (
                      <FieldLabel
                        key={topic.value}
                        htmlFor={topic.value || "all"}
                      >
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>{topic.label}</FieldTitle>
                            <FieldDescription>
                              Show rank of {topic.label} for the selected
                              period.
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value={topic.value}
                            id={topic.value || "all"}
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </FieldSet>
              </FieldGroup>
            </ScrollArea>
            <DrawerFooter className="flex items-center flex-row *:flex-1 gap-4">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>

              <DrawerClose
                onClick={() => {
                  setTopic(selectedTopic);
                }}
                asChild
              >
                <Button variant="default">Apply</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Tooltip>
    </Container>
  );
};
