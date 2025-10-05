"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useElementSize } from "@/hooks/use-element-size";
import { cn } from "@/lib/utils";

export interface ComboboxProps {
  name?: string;
  value?: string;
  options?: {
    value: string;
    label: React.ReactNode;
  }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export const Combobox = React.forwardRef(
  (
    {
      name,
      value: outerValue,
      placeholder,
      options = [],
      onChange,
      onBlur,
    }: ComboboxProps,
    outerRef: React.Ref<HTMLButtonElement>
  ) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(outerValue || "");

    const [ref, { width }] = useElementSize();

    React.useEffect(() => {
      onChange?.(value);
    }, [value]);

    React.useImperativeHandle(outerRef, () => ref.current as any);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            name={name}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="whitespace-nowrap flex w-full"
            ref={ref as React.Ref<HTMLButtonElement>}
            onBlur={onBlur}
          >
            <span
              data-has-value={!!value}
              className={cn(
                "block line-clamp-1 w-full text-left truncate",
                "data-[has-value=false]:text-muted-foreground"
              )}
            >
              {value
                ? options.find((option) => option.value === value)?.label
                : placeholder}
            </span>
            <ChevronsUpDown className="opacity-50 shrink-0 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          style={
            {
              "--radix-popover-trigger-width": width + "px",
            } as React.CSSProperties
          }
          className="w-[var(--radix-popover-trigger-width)] truncate p-0 overflow-hidden"
        >
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {options.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
