import Image from "next/image";
import { Button } from "./button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "./empty";

export interface EmptyFolderProps {
  title: string;
  description: string;
}

export const EmptyFolder = ({ title, description }: EmptyFolderProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <Image
          src="/assets/icons/empty-folder.png"
          alt="Empty State"
          width={100}
          height={100}
          className="size-24 mb-4"
        />
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button variant="outline" size="sm">
          Vote for someone now!
        </Button>
      </EmptyContent>
    </Empty>
  );
};
