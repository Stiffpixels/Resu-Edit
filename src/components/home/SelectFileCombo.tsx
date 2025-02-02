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
import { useRouter, useSearchParams } from "next/navigation"

export function SelectFileCombo({ files}: { files: { name?: string, key?: string }[]}) {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        id="select-files"
                    >
                        Select Files...
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search files..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No Type found</CommandEmpty>
                            <CommandGroup>
                                {files.map((files) => (
                                    <CommandItem
                                        key={files.key}
                                        value={files.key}
                                        onSelect={(selected) => {
                                            setOpen(false)
                                            router.push("/?id=" + selected || "")
                                        }}
                                    >
                                        {files.name}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                searchParams.get("id")===files.key?"opacity-100":"opacity-0"
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

