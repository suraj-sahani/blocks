"use client";

import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { Activity, useState } from "react";
import { Spinner } from "./spinner";

type Props = {
  options: { label: string; value: string; id: string }[];
  placeholder: string;
  value: string;
  onSelectOption: (val: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function AutoComplete({
  options,
  placeholder,
  value,
  onSelectOption,
  disabled = false,
  loading = false,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between border-input text-foreground hover:bg-transparent hover:text-foreground"
          disabled={disabled || loading}
        >
          {value && options.find((option) => option.id === value)?.label
            ? options.find((option) => option.id === value)?.label
            : placeholder}
          <Activity mode={loading ? "hidden" : "visible"}>
            <ChevronDown className="opacity-50" />
          </Activity>

          <Activity mode={loading ? "visible" : "hidden"}>
            <Spinner />
          </Activity>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => (
                <CommandItem
                  key={option.value + index}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onSelectOption(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
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
