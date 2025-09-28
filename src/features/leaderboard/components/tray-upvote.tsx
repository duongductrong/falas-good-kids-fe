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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropsWithChildren } from "react";

export interface TrayUpvoteProps extends PropsWithChildren {
  asChildTrigger?: boolean;
}

export const TrayUpvote = ({
  children,
  asChildTrigger = false,
}: TrayUpvoteProps) => {
  return (
    <Drawer variant="tray">
      <DrawerTrigger asChild={asChildTrigger}>{children}</DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>Upvote</DrawerTitle>
          <DrawerDescription>
            Upvote the user to show your support.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4">
          <Input
            name="name"
            placeholder="Name"
            className="w-full"
            autoFocus
            required
          />
          <Input
            name="email"
            placeholder="Enterprise email (Optional)"
            className="w-full"
          />
          <Select name="topic">
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Reason"
                defaultValue="learn_unlearn_relearn"
                aria-required="true"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="learn_unlearn_relearn">
                Learn, unlearn, relearn
              </SelectItem>
              <SelectItem value="try_new_things">
                Try new things. Fail fast. Fail cheap.
              </SelectItem>
              <SelectItem value="create_value_progress">
                Create and value progress
              </SelectItem>
              <SelectItem value="do_what_you_say">
                Do what you say, say what you mean
              </SelectItem>
              <SelectItem value="take_action_produce_results">
                Constantly take action to produce results instead of waiting,
                hoping, and blaming
              </SelectItem>
              <SelectItem value="listen_give_feedforward">
                Listen genuinely and give constructive feedforward to the right
                people on time
              </SelectItem>
              <SelectItem value="data_informed_decisions">
                Make data-informed decisions and take actions based on
                customer&apos;s needs and feedback
              </SelectItem>
              <SelectItem value="experience_as_customers">
                Experience and play games as customers
              </SelectItem>
              <SelectItem value="deliver_wow">
                Deliver &quot;WOW&quot; to users
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DrawerFooter className="flex flex-row items-center gap-4 *:flex-1">
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
          <Button variant="default">Upvote</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
