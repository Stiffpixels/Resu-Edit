"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"

const types = [
    {
        value: "paragraph",
        label: "Paragraph",
    },
    {
        value: "table",
        label: "Table",
    },
    {
        value: "table row",
        label: "Table Row",
    }
]

export function PlaceholderCombo({btnRef}:{btnRef:React.RefObject<HTMLButtonElement>}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        id="placeholder-type"
                        ref={btnRef}
                    >
                        {value
                            ? types.find((type) => type.value === value)?.label
                            : "Select Type..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search type..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No Type found</CommandEmpty>
                            <CommandGroup>
                                {types.map((type) => (
                                    <CommandItem
                                        key={type.value}
                                        value={type.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {type.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === type.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

