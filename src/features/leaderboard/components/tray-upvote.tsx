"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useVoteTopics } from "@/features/vote";
import { useUpvoteByAnonymous } from "@/features/vote/queries/use-upvote-by-anonymous";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { FormControl, FormField, FormItem, FormMessage } from "hookform-field";
import { PropsWithChildren, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useLeaderboard } from "../queries";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").nullable(),
  topicId: z
    .number()
    .or(z.string())
    .refine((val) => !!val, "Topic is required"),
  receiverId: z
    .number()
    .or(z.string())
    .refine((val) => !!val, "Receiver is required"),
  message: z.string().min(1, "Message is required"),
});

export interface TrayUpvoteProps extends PropsWithChildren {
  playerId: string | number;
}

export const TrayUpvote = ({ children, playerId }: TrayUpvoteProps) => {
  const ql = useQueryClient();

  const [open, setOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverId: playerId,
    },
  });

  const { data: topics } = useVoteTopics({
    select(data) {
      return data.data.map((topic) => ({
        label: topic.text,
        value: topic.id.toString(),
        id: topic.id,
      }));
    },
  });

  const { mutate: upvoteByAnonymous } = useUpvoteByAnonymous({
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
        name: "",
        topicId: "",
      });
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);
    upvoteByAnonymous({
      anonymous: data.name,
      receiverId: Number(data.receiverId),
      topicId: Number(data.topicId),
      email: data.email || undefined,
      message: data.message || undefined,
    });
  });

  console.log("values", methods.watch());
  console.log("errors", methods.formState.errors);

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

            <div className="flex flex-col gap-4 px-4">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enterprise email (Optional)"
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
                        placeholder="Reason"
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
            </div>

            <DrawerFooter className="flex flex-row items-center gap-4 *:flex-1">
              <DrawerClose asChild>
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </DrawerClose>
              <Button variant="default" type="submit">
                Upvote
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </FormProvider>
  );
};
