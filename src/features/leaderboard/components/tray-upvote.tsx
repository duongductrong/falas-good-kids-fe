"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { usePerson } from "@/features/person";
import { useVoteTopics } from "@/features/vote";
import { useUpvoteByAnonymous } from "@/features/vote/queries/use-upvote-by-anonymous";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormControl, FormField, FormItem, FormMessage } from "hookform-field";
import { AlertCircleIcon, HandCoins, MoveDown } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useLeaderboard } from "../queries";

const formSchema = z.object({
  email: z
    .string({
      error: "Enter your enterprise email",
    })
    .email("Invalid email format")
    .min(1, "Enter your enterprise email"),
  topicId: z
    .number()
    .or(z.string())
    .refine((val) => !!val, "Topic is required"),
  receiverId: z
    .number()
    .or(z.string())
    .refine((val) => !!val, "Receiver is required"),
  message: z
    .string({
      error: "Message is required",
    })
    .min(1, "Message is required"),
});

export interface TrayUpvoteProps extends PropsWithChildren {
  playerId: string | number;
}

export const TrayUpvote = ({ children, playerId }: TrayUpvoteProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const ql = useQueryClient();

  const [open, setOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverId: playerId,
    },
  });

  const { data: receiver } = usePerson({
    variables: {
      id: playerId,
    },
    select: (resp) => resp.data,
    enabled: open,
  });

  const { data: topics } = useVoteTopics({
    select(data) {
      return data.data.map((topic) => ({
        label: topic.text,
        value: topic.id.toString(),
        id: topic.id,
      }));
    },
    enabled: open,
  });

  const { mutate: upvoteByAnonymous, isPending: isVoting } =
    useUpvoteByAnonymous({
      onSuccess() {
        toast.success("Upvote successful");

        ql.invalidateQueries({
          queryKey: useLeaderboard.getKey(),
        });

        setOpen(false);

        methods.reset({
          receiverId: playerId,
          email: undefined,
          message: undefined,
          topicId: "",
        });
      },
      onError(error) {
        if (error instanceof AxiosError) {
          setAlertMessage(
            error.response?.data?.message || "Something went wrong"
          );
        }
      },
    });

  const handleSubmit = methods.handleSubmit((data) => {
    upvoteByAnonymous({
      receiverId: Number(data.receiverId),
      topicId: Number(data.topicId),
      email: data.email,
      message: data.message || undefined,
    });
  });

  return (
    <FormProvider {...methods}>
      <Drawer variant="tray" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <form onSubmit={handleSubmit}>
            <DrawerHeader>
              <DrawerTitle>Upvote</DrawerTitle>
              <DrawerDescription>
                Upvote the user to show your support.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col items-center gap-4 px-4 mb-4">
              <p className="text-sm flex items-center gap-2 font-medium">
                Your vote will sent to <HandCoins className="size-4" />
              </p>
              <MoveDown className="size-8" />
              <div className="flex flex-col items-center gap-2">
                <Avatar className="size-12">
                  <AvatarImage src={receiver?.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium">{receiver?.realName}</p>
                  <p className="text-sm text-muted-foreground">
                    {receiver?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your enterprise email (e.g. john.doe@amanotes.com)"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="topicId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        {...field}
                        placeholder="Enter your reason"
                        options={topics}
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter your message" />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-destructive" />
                  </FormItem>
                )}
              />

              {alertMessage ? (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Unable to upvote.</AlertTitle>
                  <AlertDescription>
                    <p>{alertMessage}</p>
                  </AlertDescription>
                </Alert>
              ) : null}
            </div>

            <DrawerFooter className="flex flex-row items-center gap-4 *:flex-1">
              <DrawerClose asChild>
                <Button variant="ghost" type="button" disabled={isVoting}>
                  Cancel
                </Button>
              </DrawerClose>
              <Button variant="default" type="submit" disabled={isVoting}>
                {isVoting ? <Spinner className="mr-1" /> : null} Upvote
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </FormProvider>
  );
};
