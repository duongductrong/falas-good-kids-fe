import Image from "next/image";

export interface EmptyFolderProps {
  title: string;
  description: string;
}

export const EmptyFolder = ({ title, description }: EmptyFolderProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/assets/icons/empty-folder.png"
        alt="Empty State"
        width={100}
        height={100}
        className="size-24 mb-4"
      />

      <p className="text-sm text-muted-foreground font-medium mb-2">
        {title}
      </p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
